# Simple Logging Manager

## Description

This project is a simple logging manager implemented as a Spring Boot application. It provides a user interface for reading logs from each service, enhancing convenience for developers and operators in monitoring application behavior and troubleshooting issues. The application is packaged as a Docker container and uploaded to GitHub Packages.

The application realizes its performance and efficiency through GraalVM's Native Image technology, which compiles the application into a standalone executable. Note that access to the Docker socket is a necessity for this application.

## Spring Boot Dependencies

We are utilizing numerous Spring Boot dependencies to make the most efficient and robust logging manager. These dependencies provide a wide array of features such as data access, messaging, security, and web development. Our dependencies are continuously updated to ensure we are leveraging the latest technologies and security features.

## Installation

You can pull the Docker image from GitHub Packages with the following command:
docker run -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/MartinWitt/logmanager:latest
