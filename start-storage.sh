#!/bin/sh

uwsgi -s /tmp/storage.sock --manage-script-name --mount /storage=storage:app --plugin python3 --uid www-data --gid www-data --master --processes 2 --vacuum --die-on-term
