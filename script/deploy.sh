#!/bin/sh
# This is a comment!

HOSTNAME="192.168.88.100"
DEST_DIR="next-server"
SCRIPT1="cd ./${DEST_DIR}; rm -rf *; "
SCRIPT2="cd ./${DEST_DIR}; npm install; npm run build; pm2 restart sg_iob_web-app;"
excludeList="--exclude=.next --exclude=.vscode --exclude=node_modules --exclude=script --exclude=nodered"

ssh ${HOSTNAME} "${SCRIPT1}"
rsync -av -e ssh ${excludeList} ./* ${HOSTNAME}:~/${DEST_DIR}
ssh ${HOSTNAME} "${SCRIPT2}"