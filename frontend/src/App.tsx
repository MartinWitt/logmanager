import { useEffect, useState } from "react";
import { DockerServicesControllerApi, EntityModelDockerService } from "./rest";
import { DockerServiceTable } from "./components/DockerServiceTable.tsx";

const dockerServicesApi = new DockerServicesControllerApi();

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
