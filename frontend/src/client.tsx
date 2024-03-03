import { Configuration, DockerServicesControllerApi } from "./rest";

export const dockerServicesApi = new DockerServicesControllerApi(
  new Configuration({
    basePath: "",
  }),
);
