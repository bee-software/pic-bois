from flask import Flask

APP = Flask(__name__, static_folder="./www/static", template_folder="./www/templates")

import templates
import new_goal