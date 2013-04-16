from flask import Flask

app = Flask(__name__, static_folder="./www/static", template_folder="./www/templates")

import templates