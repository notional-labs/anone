#!/bin/bash

set -ue

DESTDIR=$HOME
PREFIX=${PREFIX:-go}
UNAME_S="$(uname -s 2>/dev/null)"
UNAME_M="$(uname -m 2>/dev/null)"
PROTOC_VERSION=3.13.0
PROTOC_GRPC_GATEWAY_VERSION=1.14.7

f_abort() {
  local l_rc=$1
  shift

  echo $@ >&2
  exit ${l_rc}
}

case "${UNAME_S}" in
Linux)
  PROTOC_ZIP="protoc-${PROTOC_VERSION}-linux-x86_64.zip"
  PROTOC_GRPC_GATEWAY_BIN="protoc-gen-grpc-gateway-v${PROTOC_GRPC_GATEWAY_VERSION}-linux-x86_64"
  ;;
Darwin)
  PROTOC_ZIP="protoc-${PROTOC_VERSION}-osx-x86_64.zip"
  PROTOC_GRPC_GATEWAY_BIN="protoc-gen-grpc-gateway-v${PROTOC_GRPC_GATEWAY_VERSION}-darwin-x86_64"
  ;;
*)
  f_abort 1 "Unknown kernel name. Exiting."
esac

TEMPDIR="$(mktemp -d)"

trap "rm -rvf ${TEMPDIR}" EXIT

f_print_installing_with_padding() {
  printf "Installing %30s ..." "$1" >&2
}

f_print_done() {
  echo -e "\tDONE" >&2
}

f_ensure_tools() {
  ! which curl &>/dev/null && f_abort 2 "couldn't find curl, aborting" || true
}

f_ensure_dirs() {
  mkdir -p "${DESTDIR}/${PREFIX}/bin"
}

f_needs_install() {
  if [ -x $1 ]; then
    echo -e "\talready installed. Skipping." >&2
    return 1
  fi

  return 0
}

f_install_protoc_gen_grpc_gateway() {
  f_print_installing_with_padding protoc-gen-grpc-gateway
  f_needs_install "${DESTDIR}/${PREFIX}/bin/protoc-gen-grpc-gateway" || return 0

  curl -o "${DESTDIR}/${PREFIX}/bin/protoc-gen-grpc-gateway" -sSL "https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v${PROTOC_GRPC_GATEWAY_VERSION}/${PROTOC_GRPC_GATEWAY_BIN}"
  f_print_done
}

f_ensure_tools
f_ensure_dirs
f_install_protoc_gen_grpc_gateway