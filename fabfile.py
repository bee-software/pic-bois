import sys
from fabric.context_managers import prefix
from fabric.decorators import task
from fabric.operations import local

VIRTUALENV = '.py27'

@task(default=True)
def default():
    lint()
    test()


@task
def setup():
    local('virtualenv --distribute --python=python2.7 %s' % VIRTUALENV)
    with prefix(_activate_virtual_env()):
        local('pip install -r requirements.txt --use-mirrors')
        local('pip install -r test-requires.txt --use-mirrors')

@task
def lint():
    with prefix(_activate_virtual_env()):
        local('pylint --rcfile=./build/pylintrc --reports=n features picbois')

@task
def test():
    with prefix(_activate_virtual_env()):
        local('nosetests')

@task
def start(debug=False):
    with prefix(_activate_virtual_env()):
        if debug:
            local('python run_debug.py')
        else:
            local('gunicorn picbois:app')


def _activate_virtual_env():
    if not hasattr(sys, 'real_prefix'):
        return '. %s/bin/activate' % VIRTUALENV
    else:
        return 'true'

