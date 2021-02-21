#! /bin/sh

export NODE_ENV=production

npm run r
# npm run b

cd __performance__
# npm run run_hogan
# npm run run_jgan

node run.js
