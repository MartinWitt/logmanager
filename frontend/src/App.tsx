import { useEffect, useState } from "react";
import {
  Configuration,
  DockerServicesControllerApi,
  EntityModelDockerService,
} from "./rest";
import { DockerServiceTable } from "./components/DockerServiceTable.tsx";

const dockerServicesApi = new DockerServicesControllerApi(
  new Configuration({
    basePath: "http://127.0.0.1:8080",
  }),
);

function App() {
  const [servicesList, setServices] = useState<Array<EntityModelDockerService>>(
    [],
  );
  useEffect(() => {
    dockerServicesApi.all().then((response) => {
      setServices(response.data._embedded?.dockerServiceList || []);
    });
  });
  return <DockerServiceTable services={servicesList} />;
}

export default App;
