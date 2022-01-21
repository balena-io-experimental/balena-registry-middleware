import { Request, Plugin } from 'container-registry-proxy/dist/plugins'

const customPlugin: Plugin =  {
  name: "Custom Plugin",
  description: "Drops all requests which are to repositories which do not start with 'addono'",
  requestPipe: async (request: Request) => {
    if (!request.parameters?.repository) {
      console.log("Dropping request because the repository is undefined")
      return undefined
    } else if(!request.parameters.repository.startsWith("addono")) {
      console.log("Dropping request because the repository doesn't start with 'addono'")
      return undefined
    }

    return request
  }
}

export default customPlugin