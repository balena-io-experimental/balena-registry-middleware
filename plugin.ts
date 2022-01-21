import { Request, Plugin } from "container-registry-proxy/dist/plugins";
import * as sdk from "./sdk";

const customPlugin: Plugin = {
  name: "Balena Registry Middleware",
  description:
    "Map balenaCloud fleet releases to balenaCloud registry image paths.",
  requestPipe: async (request: Request) => {
    const { parameters, host, https } = request;

    // console.debug(request);

    if (!parameters?.repository) {
      // console.log("Dropping request because the repository is undefined.");
      // return undefined;
      console.log("Forwarding request because the repository is undefined.");
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
      console.log(
        "Dropping request because the release version could not be found. Is the fleet public?"
      );
      return undefined;
    }

    // console.debug(`fleet: ${fleet}`);
    // console.debug(`service: ${service}`);
    // console.debug(`version: ${version}`);

    const imageLocation = await sdk.getImageLocation(fleet, service, version);

    if (!imageLocation) {
      console.log(
        "Dropping request because the image location could not be found. Is the fleet public?"
      );
      return undefined;
    }

    // console.log(`Found image location  ${imageLocation}`);

    const newRequest = {
      ...request,
      parameters: {
        ...parameters,
        repository: imageLocation.split("/").slice(2).join("/"),
        tag: "latest",
      },
      host: imageLocation.split("/")[0],
    };

    console.debug(newRequest);

    return newRequest;
  },
};

export default customPlugin;
