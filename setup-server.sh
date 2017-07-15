#!/bin/sh -e

apt-get install nginx uwsgi uwsgi-plugin-python3 python3-flask
mkdir -p code/
chgrp -R www-data code/
chmod -R g+rw code/
echo 'Add this to nginx'
echo '       location = /storage { rewrite ^ /storage/; }'
echo '       location /storage { try_files $uri @storage; }'
echo '       location @storage {'
echo '         include uwsgi_params;'
echo '         uwsgi_pass unix:/tmp/storage.sock;'
echo '       }'
