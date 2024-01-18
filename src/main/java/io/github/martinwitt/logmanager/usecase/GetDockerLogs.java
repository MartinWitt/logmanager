package io.github.martinwitt.logmanager.usecase;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.transport.DockerHttpClient;
import com.github.dockerjava.zerodep.ZerodepDockerHttpClient;
import java.net.URI;

import io.github.martinwitt.logmanager.domain.*;
import org.springframework.stereotype.Service;

@Service
public class GetDockerLogs {

    private final DockerClient dockerClient;

    public GetDockerLogs() {
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
        String id = dockerService.id();
        LogCollector callback = new LogCollector();
        try {
            dockerClient
                    .logContainerCmd(id)
                    .withStdOut(true)
                    .withStdErr(true)
                    .withTailAll()
                    .exec(callback)
                    .awaitCompletion();
        } catch (InterruptedException e) {
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
