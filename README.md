[![build status](https://secure.travis-ci.org/les-epicuriens-du-logiciel/pic-bois.png)](http://travis-ci.org/les-epicuriens-du-logiciel/pic-bois)

#requirements
- Install node 0.8.x: http://nodejs.org/
- Install make: on mac http://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac
- Install Heroku Toolbelt: https://devcenter.heroku.com/articles/nodejs

#setup
- npm install

#to run the feature tests
- ./jake feature

#to run the unit tests
- ./jake test

#to run lint static analysis
- ./jake lint

#to run the app locally
- ./jake start + open http://localhost:5000
- ./jake stop

#to deploy on heroku
- ./jake deploy