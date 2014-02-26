### Installation
- Install node.js >= v0.11.8
- Clone this repo
- Enter repo directory
- run `npm install`
- run `npm start` to start the app

### Features
The basic server can be written quickly, and simply, but what fun is that?  I wanted to mess around a bit, so here's a short feature run-down:

- Actual chat server uses ES6 generators.  A couple of commands actually utilize this!
- Auto-loads whatever handlers are in `/handlers`
- private messaging
- Colors, ooohhhhhhh, aaahhhhhhh.  Too many?  Nah.
- Magic Ports (I just wanted to see if it was possible)
- Basic web UI powered by web-sockets
- Web stuffs powered by jade/stylus
- A bunch of code just ripped from other projects of mine (all my code though)
- I dunno, more features

### Usage
- Telnet: telnet localhost 9399
- HTTP: http://localhost:9399
- __WHAT?!?__  Telnet and HTTP are on the same port?  Yep!  Deal with it >_<
- Type `/help` for, you know, help

### TODO (if this were a real project)
- Swap out the local arrays for a redis server (I didn't want to deal with giving instructions on setting up redis, but it's not much harder)
- Give the web interface a real UI, with rooms & stuff
- Better error handling in web ui (for disconnects, etc)
- Actually cache styl/jade instead of rendering it on every connection
- Clean up some of the generator code
- Add unit tests and actually test the app a bit :)
- Stored usernames with ssh/ssl, or bcrypt, or all the fancy security stuffs!
- Add a mind-control interface so you can just think at the app (actually this already works, but you probably need a firmware upgrade to receive responses)