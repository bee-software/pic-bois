import sys
from fabric.context_managers import prefix
from fabric.decorators import task
from fabric.operations import local

VIRTUALENV = '.py27'

@task(default=True)
def default():
    lint()
    test_py()
    test_js()

@task
def setup():
    local('virtualenv --distribute --python=python2.7 {env}'.format(env=VIRTUALENV))
    install_requirements()

@task
def install_requirements():
    with prefix(_activate_virtual_env()):
        local('pip install -r requirements.txt --use-mirrors')
        local('pip install -r test-requires.txt --use-mirrors')

@task
def deploy():
    local('git push heroku python:master')

@task
def lint():
    with prefix(_activate_virtual_env()):
        local('pylint --rcfile=./build/pylintrc --reports=n features picbois')

@task
def test_py():
    with prefix(_activate_virtual_env()):
        local('nosetests')

@task
def test_js():
    local('PHANTOMJS_BIN=./node_modules/.bin/phantomjs ./node_modules/.bin/karma start --single-run --browsers PhantomJS build/karma.conf.js')

@task
def karma(*args):
    local('./node_modules/.bin/karma %s build/karma.conf.js' % args)

@task
def start(bind='0.0.0.0', port='5000'):
    with prefix(_activate_virtual_env()):
        local('python simple_daemon.py start {host} {port}'.format(host=bind, port=port))

@task
def stop():
    with prefix(_activate_virtual_env()):
        local('python simple_daemon.py stop')

@task
def run(debug=False):
    with prefix(_activate_virtual_env()):
        if debug:
            local('python run_debug.py')
        else:
            local('gunicorn picbois:APP')


def _activate_virtual_env():
    if not hasattr(sys, 'real_prefix'):
        return '. {env}/bin/activate'.format(env=VIRTUALENV)
    else:
        return 'true'

