# Bash Interactor
A solution to allow you to interact with a Unix shell (Bash) bidirectionally using a web page - run commands &amp; scripts, and receive their output back.
# Instructions (Ubuntu)
1) Create a directory for your new project, and move to it.
   
   `sudo mkdir /home/user/myproject/`
   
   `cd /home/user/myproject/`

2) Update/upgrade, and install all required packages/modules.
   
   `sudo apt-get update`
   
   `sudo apt-get upgrade`
   
   `sudo apt-get install npm`
   
   `sudo npm install node`
   
   `sudo npm install ws`
   
   `sudo npm install exec`

3) Create websocket server run file, give it executable permissions, and start it running.

   `sudo vi websocket_server.js` --> input websocket_server code from this repo, remembering to change the script paths and listen port to your requirements.
   
   `sudo chmod +x websocket_server.js`
   
   `sudo nodejs websocket_server.js`

5) Test & Play

    - Host the `index.html` or run it locally.

    - Remember to change the websocket connector to match your server's IP/hostname/port - use "ws://" for no TLS, or "wss://" if you're using TLS.
# Notes
With kind help from @Morgester
