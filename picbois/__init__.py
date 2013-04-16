from flask import Flask, jsonify

APP = Flask(__name__, static_folder="./www/static", template_folder="./www/templates")

import templates


@APP.route('/goals', methods=['POST'])
def goals():
    return jsonify({'message': "saved: goal scored by player 23 and assisted by player 10"})
