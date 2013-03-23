#requirements
- Install node: http://nodejs.org/
- Install make: on mac http://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac

#setup
- npm install

#to run the feature tests
- ./jake feature

#to run the unit tests
- ./jake test

#to run lint static analysis
- ./jake lint

#to run the app locally
- console : node web.js + open http://localhost:5000
- console heroku : install Heroku Toolbelt (https://devcenter.heroku.com/articles/nodejs) + foreman start