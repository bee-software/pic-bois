from flask import request, make_response, jsonify
from picbois import APP as app

GOALS = []

def options():
    response = make_response('', 204)
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] if 'Origin' in request.headers else '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'accept, origin, content-type'
    return response

@app.route('/games/<game_id>/goals/', methods=['GET', 'OPTIONS'])
def games_goals(game_id):
    if request.method == 'OPTIONS':
        return options()
    response = make_response(jsonify({'goals': GOALS}), 200)
    if 'Origin' in request.headers:
        response.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
    return response
