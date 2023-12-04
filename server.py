from flask import Flask, request, render_template, jsonify
from flask_mysqldb import MySQL


app = Flask(__name__)

# db connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo'

mysql = MySQL(app)

# test route
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/logout")
def logout():
    return render_template("logout.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/savetodo", methods = ["POST"])
def post_todo():
    try:
        data = request.json
        print(data)
        for todo in data:

            taskName = todo['taskName']
            dateCompleted = todo['dateCompleted']
            completionStatus = todo['completionStatus']

            cur = mysql.connection.cursor()
            # despite saving completionsStatus as string it knew it was number when
            # I did get request
            cur.execute('''
                INSERT INTO todoitem (taskName, dateCompleted, completionStatus)
                    VALUES (%s, %s, %s)''', (taskName, dateCompleted, completionStatus))
            mysql.connection.commit()
        return "posted sucessfully"
    
    except Exception as e:
        return jsonify({'error': str(e)})

# get
@app.route("/gettodos")
def get_todos():
    try:
        cur = mysql.connection.cursor()
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

    
    
app.run(debug=True)
