#!/bin/sh
docker compose down --remove-orphans
rm -rf ~/dev/docker-volumes/deepkit-starter/edgedb/*
