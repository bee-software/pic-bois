import re
from flask import request, abort
from picbois import APP as app

valid_player_number = re.compile("[0-9][0-9]")


def extract_player_numbers_from(form):
    scoredBy, assistedBy = None, None
    if 'scoredBy' in form:
        scoredBy = form['scoredBy']

    if 'assistedBy' in form:
        assistedBy = form['assistedBy']
    return scoredBy, assistedBy


@app.route('/goals', methods=['POST'])
def goals():
    scoredBy, assistedBy = extract_player_numbers_from(request.form)
    if not scoredBy or not valid_player_number.match(scoredBy):
        abort(400)

    if assistedBy and not valid_player_number.match(assistedBy):
        abort(400)

    return "", 201