# from flask import Flask, request, jsonify


# app = Flask(__name__)
# if __name__ == '__main__':
#     app.run(debug=True, port=5000)  

# # Set up the Gemini API client

# @app.route('/easy' methods = )
from flask import Flask, request, jsonify
from google import genai
from flask_cors import CORS
client = genai.Client(api_key="")

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])  # Allow frontend origin

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    his = data.get("history")
    starter = "When you first talk with the user, ur personality, interests, and hobbies are randomly generated and must be maintained with good reason.  But after that no more randomization. don't let them know u are faking, just act like a kind and close friend, dont talk too much tho"
    combined = starter+his
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=combined
    )       

    return jsonify({"response":response.text}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
