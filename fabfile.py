from fabric.context_managers import prefix
from fabric.operations import local

VIRTUALENV = '.py27'


def setup():
    local('virtualenv --distribute --python=python2.7 %s' % VIRTUALENV)
    with prefix('. %s/bin/activate' % VIRTUALENV):
        local('pip install -r requirements.txt --use-mirrors')
        local('pip install -r test-requires.txt --use-mirrors')


def test():
    with prefix('. %s/bin/activate' % VIRTUALENV):
        local('nosetests --with-coverage --cover-branches --cover-package=features,picbois')


def lint():
    with prefix('. %s/bin/activate' % VIRTUALENV):
        local('pylint features picbois')


def start():
    with prefix('. %s/bin/activate' % VIRTUALENV):
        local('python picbois/run.py')
