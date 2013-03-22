# Requirements

- Install node: http://nodejs.org/
- Install make: on mac http://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac

# Setup
- run npm install

# To run the feature tests
- console: ./node_modules/jasmine-node/bin/jasmine-node features --captureExceptions
- webstorm: create a node.js configuration with the proper parameters

#to run the spec tests
- console: ./node_modules/jasmine-node/bin/jasmine-node spec --captureExceptions

#to run the app locally
- console : node web.js + open http://localhost:5000
- console heroku : install Heroku Toolbelt (https://devcenter.heroku.com/articles/nodejs) + foreman start