# syntax=docker/dockerfile:1

## Build
FROM golang:1.17-bullseye as build

WORKDIR /anone
COPY . /anone
RUN make install

## Deploy
FROM gcr.io/distroless/base-debian11

WORKDIR /

EXPOSE 26656
EXPOSE 26657
EXPOSE 1317
EXPOSE 9090

ENTRYPOINT ["/anone"]