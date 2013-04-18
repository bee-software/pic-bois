import json
import re
from flask import request, abort, make_response, jsonify
from picbois import APP as app

VALID_PLAYER_NUMBER = re.compile("[0-9][0-9]")

@app.route('/goals', methods=['POST'])
def goals():
    scored_by, assisted_by = extract_player_numbers_from(request.data)
    if not scored_by or not VALID_PLAYER_NUMBER.match(scored_by):
        abort(400)

    if assisted_by and not VALID_PLAYER_NUMBER.match(assisted_by):
        abort(400)

    return make_response(jsonify({'success': True}), 201)


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
