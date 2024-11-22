#!/bin/bash

# Navigate to your application directory
cd /opt/nodejs/

# Pull the latest code
git pull origin prod

# Install dependencies (if necessary)
# For Node.js projects
npm install

# Restart services (if necessary)
//sudo systemctl restart your_service
