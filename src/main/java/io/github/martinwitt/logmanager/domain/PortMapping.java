package io.github.martinwitt.logmanager.domain;

public record PortMapping(String ip, int privatePort, int publicPort, String type) {}
