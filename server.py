from flask import Flask, render_template


app = Flask(__name__)

# db connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/todo'

@app.route("/")
def hello():
    return render_template("index.html")


app.run(debug=True)