from picbois import APP as app
from flask import render_template


@app.route('/')
def main():
    return render_template('main.html')

@app.route('/<template_name>.html')
def template(template_name):
    return render_template(template_name + '.html')