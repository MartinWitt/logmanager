package io.github.martinwitt.logmanager.usecase;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.transport.DockerHttpClient;
import com.github.dockerjava.zerodep.ZerodepDockerHttpClient;
import io.github.martinwitt.logmanager.domain.DockerLogs;
import io.github.martinwitt.logmanager.domain.DockerService;
import java.net.URI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class GetDockerLogs {

    private static final Logger log = LoggerFactory.getLogger(GetDockerLogs.class);
    private final DockerClient dockerClient;

    public GetDockerLogs() {
        log.info("Creating Docker client");
        String localDockerHost = isWindows() ? "tcp://localhost:2375" : "unix:///var/run/docker.sock";
        DockerHttpClient httpClient = new ZerodepDockerHttpClient.Builder()
                .dockerHost(URI.create(localDockerHost))
                .build();
        DockerClientConfig localDockerHostConfig = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost(localDockerHost)
                .build();
        dockerClient = DockerClientBuilder.getInstance(localDockerHostConfig)
                .withDockerHttpClient(httpClient)
                .build();
    }

    public DockerLogs getLogs(DockerService dockerService) {
        log.info("Getting logs for service {}", dockerService.names());
        String id = dockerService.id();
        LogCollector callback = new LogCollector();
        try {
            dockerClient
                    .logContainerCmd(id)
                    .withStdOut(true)
                    .withStdErr(true)
                    .withTimestamps(true)
                    .withTailAll()
                    .exec(callback)
                    .awaitCompletion();
        } catch (InterruptedException e) {
            log.error("Error while getting logs", e);
            throw new RuntimeException(e);
        }
        return new DockerLogs(callback.getLog());
    }

    private boolean isWindows() {
        String os = System.getProperty("os.name").toLowerCase();
        return os.contains("win");
    }

    private static final class LogCollector extends ResultCallback.Adapter<Frame> {
        private final StringBuilder log = new StringBuilder();

        @Override
        public void onNext(Frame object) {
            log.append(new String(object.getPayload()));
        }

        public String getLog() {
            return log.toString();
        }
    }
}
