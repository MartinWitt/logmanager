package io.github.martinwitt.logmanager;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import io.github.martinwitt.logmanager.domain.DockerLogs;
import io.github.martinwitt.logmanager.domain.DockerService;
import io.github.martinwitt.logmanager.usecase.GetDockerLogs;
import io.github.martinwitt.logmanager.usecase.GetDockerServices;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DockerServicesController {

    private static final Logger log = LogManager.getLogger(DockerServicesController.class);
    private final GetDockerServices getDockerServices;
    private final GetDockerLogs getDockerLogs;

    public DockerServicesController(GetDockerServices getDockerServices, GetDockerLogs getDockerLogs) {
        this.getDockerServices = getDockerServices;
        this.getDockerLogs = getDockerLogs;
    }

    @GetMapping("/services")
    public CollectionModel<EntityModel<DockerService>> all() {
        log.info("Getting all services");
        List<EntityModel<DockerService>> services = getDockerServices.getServices().stream()
                .map(service -> {
                    Link selfLink = WebMvcLinkBuilder.linkTo(
                                    methodOn(DockerServicesController.class).one(service.id()))
                            .withSelfRel();
                    return EntityModel.of(service, selfLink);
                })
                .collect(Collectors.toList());
        Link link = WebMvcLinkBuilder.linkTo(
                        methodOn(DockerServicesController.class).all())
                .withSelfRel();
        return CollectionModel.of(services, link);
    }

    @GetMapping("/services/{id}")
    public EntityModel<DockerService> one(@PathVariable String id) {
        DockerService dockerService = getDockerServices.getServices().stream()
                .filter(service -> service.id().equals(id))
                .findFirst()
                .orElseThrow();
        Link selfLink = WebMvcLinkBuilder.linkTo(
                        methodOn(DockerServicesController.class).one(id))
                .withSelfRel();
        Link logsLink = WebMvcLinkBuilder.linkTo(
                        methodOn(DockerServicesController.class).logs(id))
                .withRel("logs");
        return EntityModel.of(dockerService, selfLink, logsLink);
    }

    @GetMapping("/services/{id}/logs")
    public EntityModel<DockerLogs> logs(@PathVariable String id) {
        DockerService dockerService = getDockerServices.getServices().stream()
                .filter(service -> service.id().equals(id))
                .findFirst()
                .orElseThrow();
        DockerLogs logs = getDockerLogs.getLogs(dockerService);
        Link selfLink = WebMvcLinkBuilder.linkTo(
                        methodOn(DockerServicesController.class).logs(id))
                .withSelfRel();
        return EntityModel.of(logs, selfLink);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception ex) {
        ApiError apiError = new ApiError(ex.getMessage());
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    record ApiError(String messages) {}
}
