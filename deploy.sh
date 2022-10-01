#!/bin/bash

docker build . -t srizan10/api

docker stop api

docker rm api

docker run -d -t --name api -p 8083:7272 --restart unless-stopped srizan10/api