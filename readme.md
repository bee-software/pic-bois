[![build status](https://secure.travis-ci.org/les-epicuriens-du-logiciel/pic-bois.png)](http://travis-ci.org/les-epicuriens-du-logiciel/pic-bois)

#requirements
- python 2.7
- virtualenv: sudo pip install virtualenv
- fabric: sudo pip install fabric
- node : http://nodejs.org

#setup
- fab setup

#to run feature tests & pylint & python tests & javascript tests
- fab

#to run js tests for development
- fab karma:start : once to start karma
- fab karma:run : to run the tests

# to run the server
- fab start