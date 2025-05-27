import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("FLASK_SECRET_KEY", "dev_secret_key")

# Enable CORS so React frontend can talk to Flask backend
CORS(app)

# Example: API endpoint to get all courses
@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = [
        {"id": 1, "title": "Makeup Basics", "description": "Learn basic makeup skills."},
        {"id": 2, "title": "Skincare Essentials", "description": "Learn how to care for your skin."}
    ]
    return jsonify(courses)

# Example: API endpoint to get course details
@app.route('/api/course/<int:course_id>', methods=['GET'])
def get_course(course_id):
    # You will replace this with real DB lookup
    course = {"id": course_id, "title": "Makeup Basics", "description": "Learn basic makeup skills."}
    return jsonify(course)

# Example: API endpoint for user login (just a dummy example)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    # Replace with real user validation
    if username == 'admin' and password == 'password':
        return jsonify({"message": "Logged in successfully", "token": "fake-jwt-token"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
