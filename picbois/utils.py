import inspect
import os

def get_current_file_path(currentframe):
    return os.path.abspath(inspect.getfile(currentframe))

def get_current_file_dir(currentframe):
    return os.path.dirname(get_current_file_path(currentframe))