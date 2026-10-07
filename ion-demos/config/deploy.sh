#!/usr/bin/env bash
# Build and deploy the carrier API.
set -euo pipefail

readonly TAG="${1:-latest}"
IMAGE="ghcr.io/example/carrier-api:${TAG}"

build() {
  local dir="$1"
  echo "Building ${IMAGE} from ${dir}..."
  docker build -t "$IMAGE" "$dir"
}

if [[ -z "${API_TOKEN:-}" ]]; then
  echo "API_TOKEN is not set" >&2
  exit 1
fi

for service in api worker; do
  build "./${service}" && echo "done: $service ($(date +%s))"
done
