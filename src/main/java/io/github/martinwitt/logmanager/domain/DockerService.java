package io.github.martinwitt.logmanager.domain;

import java.util.List;

public record DockerService(
        List<String> names, String image, String status, String id, List<PortMapping> ports, Long createdAt) {}
