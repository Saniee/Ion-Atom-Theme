# Multi-stage build for the carrier API.
FROM rust:1.90 AS build
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
RUN cargo build --release --locked

FROM debian:bookworm-slim
ARG VERSION=1.4.2
ENV RUST_LOG=info PORT=8080
COPY --from=build /app/target/release/carrier-api /usr/local/bin/
EXPOSE 8080
HEALTHCHECK --interval=30s CMD ["curl", "-f", "http://localhost:8080/health"]
ENTRYPOINT ["carrier-api"]
