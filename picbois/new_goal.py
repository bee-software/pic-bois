import json
import re
from flask import request, abort, make_response, jsonify
from picbois import APP as app
from games import GOALS as games_goals

VALID_PLAYER_NUMBER = re.compile(r"\d{1,2}$")


def options():
    response = make_response('', 204)
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] if 'Origin' in request.headers else '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'accept, origin, content-type'
    return response


@app.route('/goals', methods=['POST', 'OPTIONS'])
def goals():
    if request.method == 'OPTIONS':
        return options()

    scored_by, assisted_by = extract_player_numbers_from(request.data)
    if not scored_by or not VALID_PLAYER_NUMBER.match(scored_by):
        abort(400)

    if assisted_by and not VALID_PLAYER_NUMBER.match(assisted_by):
        abort(400)

    if scored_by == assisted_by:
        abort(400)

    games_goals.append({'scoredBy': scored_by, 'assistedBy': assisted_by})

    response = make_response(jsonify({'success': True}), 201)
    if 'Origin' in request.headers:
        response.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
    return response


def extract_player_numbers_from(data):
    scored_by, assisted_by = None, None
    try:
        params = json.loads(data)

        if 'scoredBy' in params:
            scored_by = params['scoredBy']

        if 'assistedBy' in params:
            assisted_by = params['assistedBy']
    except ValueError:
        pass

    return scored_by, assisted_by
