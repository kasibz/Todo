from flask import Flask, request, render_template, redirect, jsonify, url_for, flash, session
from flask_mysqldb import MySQL
import bcrypt
from pathlib import Path
import os
from dotenv import load_dotenv
from functools import wraps

app = Flask(__name__)

BASE_DIR = Path(__file__)
load_dotenv(os.path.join(BASE_DIR, '.env'))
app.secret_key = os.environ.get('SECRET_KEY')

# db connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo'
app.config['MYSQL_CURSORCLASS'] = "DictCursor"

db = MySQL(app)

# custom decorator to protect route
def login_required(f):
    @wraps(f)
    # short answer, you can pass anything to this function
    # long answer... protecting route by checking user_id in session
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# home
@app.route("/")
@login_required
def home():
    return render_template("index.html")

@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    
    if request.method == "POST":
        try:
            username = request.form['username']
            password = request.form['password']

            if not username:
                return jsonify({'error': 'Missing username!'}), 400
            
            if not password:
                return jsonify({'error': 'Missing password!'}), 400

            cur = db.connection.cursor()
            cur.execute('''
                SELECT * FROM user WHERE username = %s
                ''', (username,))
            user = cur.fetchone()
            if not user:
                return "Missing User", 400
            
            # using .get instead of bracket gave me a NoneType
            if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                session['user_id'] = user['id']
                flash(f"Logged in as {username}")
                return redirect(url_for('home'))
            else:
                return ({"message": "no user found"}, 400)
            
        except Exception as e:
            return jsonify({'error': str(e)})

@app.route("/logout", methods = ["GET", "POST"])
@login_required
def logout():
    if request.method == "GET":
        return render_template("logout.html")
    
    if request.method == "POST":
        session.clear()
        return redirect(url_for('login'))

@app.route("/signup", methods = ["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("signup.html")
    
    if request.method == "POST":
        try:
            username = request.form['username']
            password = request.form['password']

            if not username:
                return jsonify({'error': 'Missing username!'})
            
            if not password:
                return jsonify({'error': 'Missing password!'})
            
            # hash the password before storing, but encode in utf
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            cur = db.connection.cursor()
            # despite saving completionsStatus as string it knew it was number when
            # I did get request
            cur.execute('''
                INSERT INTO user (username, password)
                    VALUES (%s, %s)''', (username, hashed))
            db.connection.commit()
            flash(f"log back in {username}!")
            return redirect(url_for('login'))
        except Exception as e:
            return jsonify({'error': str(e)})


@app.route("/savetodo", methods = ["POST"])
def post_todo():
    try:
        data = request.json
        print(data)
        for todo in data:

            taskName = todo['taskName']
            dateCompleted = todo['dateCompleted']
            completionStatus = todo['completionStatus']

            cur = db.connection.cursor()
            # despite saving completionsStatus as string it knew it was number when
            # I did get request
            cur.execute('''
                INSERT INTO todoitem (taskName, dateCompleted, completionStatus)
                    VALUES (%s, %s, %s)''', (taskName, dateCompleted, completionStatus))
            db.connection.commit()
        return ({"message":"posted sucessfully"})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# get
@app.route("/gettodos")
def get_todos():
    try:
        cur = db.connection.cursor()
        cur.execute("SELECT * FROM todoitem")
        data = cur.fetchall()

        cur.close()
        return jsonify(data)

    # render_template gives you the view. I don't want the view
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/users")
def users():
    try:
        cur = db.connection.cursor()
        cur.execute("SELECT * FROM user")
        data = cur.fetchall()

        cur.close()
        return jsonify(data)

    # render_template gives you the view. I don't want the view
    except Exception as e:
        return jsonify({'error': str(e)})
    
app.run(debug=True)
