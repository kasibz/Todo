from flask import Flask, request, render_template, jsonify
from flask_mysqldb import MySQL
import bcrypt

import os


app = Flask(__name__)

# db connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo'

db = MySQL(app)

# test route
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        return ({"message":"posted sucessfully"})

@app.route("/logout")
def logout():
    return render_template("logout.html")

@app.route("/signup", methods = ["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template("signup.html")
    
    if request.method == "POST":
        try:
            username = request.json.get('username')
            password = request.json.get('password')

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
            return ({"message":f"welcome {username}!"})
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

        #unpack data
        result = []
        for row in data:
            result.append({
                "id": row[0],
                "taskName": row[1],
                "dateCompleted": row[2],
                "completionStatus": row[3]
            })

        cur.close()
        return jsonify(result)

    # render_template gives you the view. I don't want the view
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/users")
def users():
    try:
        cur = db.connection.cursor()
        cur.execute("SELECT * FROM user")
        data = cur.fetchall()

                #unpack data
        result = []
        for row in data:
            result.append({
                "id": row[0],
                "username": row[1],
                "password": row[2]
            })

        cur.close()
        return jsonify(result)

    # render_template gives you the view. I don't want the view
    except Exception as e:
        return jsonify({'error': str(e)})
    
app.run(debug=True)
