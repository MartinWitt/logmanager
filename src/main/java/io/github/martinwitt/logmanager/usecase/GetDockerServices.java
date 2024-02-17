package io.github.martinwitt.logmanager.usecase;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.transport.DockerHttpClient;
import com.github.dockerjava.zerodep.ZerodepDockerHttpClient;
import io.github.martinwitt.logmanager.domain.DockerService;
import io.github.martinwitt.logmanager.domain.PortMapping;
import jakarta.annotation.PreDestroy;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class GetDockerServices {

    private static final Logger logger = LoggerFactory.getLogger(GetDockerServices.class);

    private final DockerClient dockerClient;

    public GetDockerServices() {
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

    public List<DockerService> getServices() {
        List<DockerService> services = new ArrayList<>();
        List<Container> exec = dockerClient.listContainersCmd().exec();
        for (Container container : exec) {
            String[] names = container.getNames();
            String image = container.getImage();
            String status = container.getStatus();
            String id = container.getId();
            List<PortMapping> ports = Arrays.stream(container.getPorts())
                    .map(port -> new PortMapping(
                            port.getIp(),
                            nullToMinusOne(port.getPrivatePort()),
                            nullToMinusOne(port.getPublicPort()),
                            port.getType()))
                    .toList();

            Long createdAt = container.getCreated();
            services.add(new DockerService(Arrays.asList(names), image, status, id, ports, createdAt));
        }
        return services;
    }

    private boolean isWindows() {
        String os = System.getProperty("os.name").toLowerCase();
        return os.contains("win");
    }

    @PreDestroy
    public void close() {
        try {
            dockerClient.close();
        } catch (IOException e) {
            logger.error("Error while closing docker client", e);
        }
    }

    private int nullToMinusOne(Integer integer) {
        return integer == null ? -1 : integer;
    }
}
