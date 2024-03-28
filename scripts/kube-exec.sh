#! /bin/bash

die() {
    echo "[ERROR] $1"
    echo "$USAGE" # To be filled by the caller.
    # Kill the caller.
    if [ -n "$TOP_PID" ]; then kill -s TERM "$TOP_PID"; else exit 1; fi
}

run() {
    remote_host="$1"

    [ -z "$remote_host" ] && die "Remote host not specified."

    set -x

    # First remove old dir
    ssh $remote_host rm -rf ~/kubernetes/fastpyfolio/*

    # Copy new dir
    scp -r -v ./kubernetes/* $remote_host:~/kubernetes/fastpyfolio/

    ssh $remote_host 'kubectl apply -k ~/kubernetes/fastpyfolio --force'
}

run "$1"

