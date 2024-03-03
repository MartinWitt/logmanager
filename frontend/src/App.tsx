import { useEffect, useState } from "react";
import { EntityModelDockerService } from "./rest";
import { DockerServiceTable } from "./components/DockerServiceTable.tsx";
import { dockerServicesApi } from "./client.tsx";

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
