package io.github.martinwitt.logmanager.domain;

public class DockerLogs {

    private final String logs;

    public DockerLogs(String logs) {
        this.logs = logs;
    }

    public String getLogs() {
        return logs;
    }
}
