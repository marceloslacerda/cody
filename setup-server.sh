#!/bin/sh -e
INSTALL_DIR=/usr/local/cody/
CODE_DIR=$INSTALL_DIR/code/
CURRENT_DIR=$(dirname $0)

apt-get install nginx uwsgi uwsgi-plugin-python3 python3-flask
rm -rf $INSTALL_DIR
cp -r $CURRENT_DIR $INSTALL_DIR
mkdir -p $CODE_DIR
chgrp -R www-data $CODE_DIR
chmod -R g+rw $CODE_DIR
rm -f /var/www/html/cody
ln -s $INSTALL_DIR/static/ /var/www/html/cody
cp cody.service /etc/systemd/system/

echo 'Add this to nginx'
echo '       location = /storage { rewrite ^ /storage/; }'
echo '       location /storage { try_files $uri @storage; }'
echo '       location @storage {'
echo '         include uwsgi_params;'
echo '         uwsgi_pass unix:/tmp/storage.sock;'
echo '       }'
