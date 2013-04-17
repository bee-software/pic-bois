[![build status](https://secure.travis-ci.org/les-epicuriens-du-logiciel/pic-bois.png)](http://travis-ci.org/les-epicuriens-du-logiciel/pic-bois)

#requirements
- Install python 2.7
- Install virtualenv: sudo pip install virtualenv
- Install fabric: sudo pip install fabric
- Install node : http://nodejs.org
- Install phantomjs: npm install phantomjs

#setup
- fab setup

#to run pylint & python tests & feature tests
- fab

#to run js tests
- fab karma:start : once to start karma
- fab karme:run : to run the tests

# to run the server
- fab start