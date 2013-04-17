import re
from flask import request, abort
from picbois import APP as app


@app.route('/goals', methods=['POST'])
def goals():
    if not 'scoredBy' in request.form:
        abort(400)

    scoredBy = request.form['scoredBy']
    assistedBy = request.form['assistedBy']

    validNumbers = re.compile("[0-9][0-9]")

    if not validNumbers.match(scoredBy) or not validNumbers.match(assistedBy):
        abort(400)
    return "", 201