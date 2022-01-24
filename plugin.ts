import { Request, Plugin } from "container-registry-proxy/dist/plugins";
import * as sdk from "./balena";

const customPlugin: Plugin = {
  name: "Balena Registry Middleware",
  description:
    "Use balenaCloud fleet slugs to pull images from the balenaCloud container registry.",
  requestPipe: async (request: Request) => {
    const { parameters, host, https } = request;

    // console.debug(request);

    if (!parameters?.repository) {
      // console.log("Dropping request because the repository is undefined.");
      // return undefined;
      return request;
    }

    const repository = parameters.repository.split("/");

    let fleet = repository.slice(0, 2).join("/");
    let service = repository[2] || "main";
    let version = parameters.tag || "latest";

    if (!version || version === "latest" || version === "current") {
      version = (await sdk.getTargetRelease(fleet)) || "";
    }

    if (!version) {
      // console.log(
      //   "Dropping request because the release version could not be found. Is the fleet public?"
      // );
      // return undefined;
      return request;
    }

    // console.debug(`fleet: ${fleet}`);
    // console.debug(`service: ${service}`);
    // console.debug(`version: ${version}`);

    const imageLocation = await sdk.getImageLocation(fleet, service, version);

    if (!imageLocation) {
      // console.log(
      //   "Dropping request because the image location could not be found. Is the fleet public?"
      // );
      // return undefined;
      return request;
    }

    console.log(`Found image location  ${imageLocation}`);

    const newRequest = {
      ...request,
      parameters: {
        ...parameters,
        repository: imageLocation.split("/").slice(1).join("/"),
        tag: "latest",
      },
      host: imageLocation.split("/")[0],
    };

    // console.debug(newRequest);

    return newRequest;
  },
};

export default customPlugin;
