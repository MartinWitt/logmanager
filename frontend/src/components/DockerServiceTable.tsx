import { EntityModelDockerService } from "../rest";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DockerServiceTableParams {
  services: Array<EntityModelDockerService>;
}

export function DockerServiceTable(props: DockerServiceTableParams) {
  const services = props.services;
  const navigate = useNavigate();
  const navigateToService = (service: EntityModelDockerService) => {
    console.log("Navigating to service", service);
    navigate(service!._links!.self!.href!);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service Names</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service: EntityModelDockerService, index: number) => (
            <TableRow key={index} onClick={() => navigateToService(service)}>
              <TableCell>{service.names?.join(", ")}</TableCell>
              <TableCell>{service.image}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>{service.id}</TableCell>
              <TableCell>
                {new Date(service.createdAt || 0).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
