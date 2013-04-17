import inspect
from picbois.utils import get_current_file_dir


def phantomjs():
    return get_current_file_dir(inspect.currentframe()) + '/../node_modules/phantomjs/lib/phantom/bin/phantomjs'
