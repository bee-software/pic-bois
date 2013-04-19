import inspect
import os


def phantomjs():
    return get_current_file_dir(inspect.currentframe()) + '/../node_modules/phantomjs/lib/phantom/bin/phantomjs'


def get_current_file_dir(currentframe):
    return os.path.dirname(get_current_file_path(currentframe))


def get_current_file_path(currentframe):
    return os.path.abspath(inspect.getfile(currentframe))