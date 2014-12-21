#!/bin/bash

mongod --replSet foo --dbpath 1 --port 37001 --smallfiles --oplogSize 50 --logpath log.1 --logappend --fork
