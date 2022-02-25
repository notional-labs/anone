FROM ubuntu:latest
MAINTAINER Master Pi

WORKDIR /root/
ENV PATH $PATH:/usr/local/go/bin:/root/go/bin
COPY ./genesis.json .
RUN apt update && apt install iproute2 make git wget gcc -y
RUN wget https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf go1.17.7.linux-amd64.tar.gz && rm go1.17.7.linux-amd64.tar.gz
RUN git clone https://github.com/notional-labs/anone
RUN cd anone && git checkout testnet-1.0.3 && make install
RUN anoned init notional && cp genesis.json .anone/config/genesis.json
RUN ip a
