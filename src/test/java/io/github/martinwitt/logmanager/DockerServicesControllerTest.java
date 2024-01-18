package io.github.martinwitt.logmanager;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.*;

import io.github.martinwitt.logmanager.domain.*;
import io.github.martinwitt.logmanager.usecase.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class DockerServicesControllerTest {

    @Mock
    private GetDockerServices getDockerServices;

    @Mock
    private GetDockerLogs getDockerLogs;

    @InjectMocks
    private DockerServicesController dockerServicesController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(dockerServicesController).build();
    }

    @Test
    public void testGetDockerLogs() throws Exception {
        String id = "testId";
        DockerLogs mockLogs = new DockerLogs("test"); // set values as per your requirements
        DockerService mockService = new DockerService(
                List.of("testId"), "testName", "status", id, List.of(), 10L); // set values as per your requirements
        when(getDockerServices.getServices()).thenReturn(List.of(mockService));
        when(getDockerLogs.getLogs(any(DockerService.class))).thenReturn(mockLogs);

        mockMvc.perform(get("/services/" + id + "/logs")).andExpect(status().isOk());
    }
}
