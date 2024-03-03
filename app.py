from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/static/</Users/nunomota/Documents/GO/templates:background.jpg>')
def serve_static(filename):
    return send_from_directory('static', background.jpg)