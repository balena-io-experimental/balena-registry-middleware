# balena-registry-middleware

Use balenaCloud fleet slugs to pull images from the balenaCloud container registry.

## Description

Since images in balenaCloud registry are stored as a unique hash, this proxy will
allow pulling those same images with a human-readable format.

## Usage

Note that only public (open) fleet images can be pulled with this proxy.

```bash
docker pull localhost:5000/balenalabs/balenasound/audio:latest
```

The expected image reference format is `{proxy_host}/{fleet_slug}/{service}/{version}`.

- `proxy_host` is the host:port where the proxy is running, such as `localhost:5000`
- `fleet_slug` is a balenaCloud fleet slug in the format `org/fleet`
- `service` the fleet service image to pull, or `main` if only one service
- `version` the fleet release version string, such as `3.8.2+rev1`

## Acknowledgements

This project is forked from the following plugin template:

<https://github.com/Addono/container-registry-proxy-custom-plugin-example>
