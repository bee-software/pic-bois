import re
from flask import request, abort, make_response, jsonify
from picbois import APP as app

VALID_PLAYER_NUMBER = re.compile("[0-9][0-9]")

@app.route('/goals', methods=['POST'])
def goals():
    scored_by, assisted_by = extract_player_numbers_from(request.form)
    if not scored_by or not VALID_PLAYER_NUMBER.match(scored_by):
        abort(400)

    if assisted_by and not VALID_PLAYER_NUMBER.match(assisted_by):
        abort(400)

    return make_response(jsonify({'success': True}), 201)


def extract_player_numbers_from(form):
    scored_by, assisted_by = None, None
    if 'scoredBy' in form:
        scored_by = form['scoredBy']

    if 'assistedBy' in form:
        assisted_by = form['assistedBy']
    return scored_by, assisted_by
