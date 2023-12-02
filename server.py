from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL


app = Flask(__name__)

# db connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo'

mysql = MySQL(app)

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/db")
def home():
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
                "dateCreated": row[2],
                "dateCompleted": row[3],
                "completionStatus": row[4],
                "priority": row[5],
                "timeToComplete": row[6]
            })

        cur.close()
        return jsonify(result)

    # render_template gives you the view. I don't want the view
    except Exception as e:
        return jsonify({'error': str(e)})

    
    
app.run(debug=True)