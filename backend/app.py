from flask import Flask, request, jsonify
from flask_cors import CORS
import wikipedia

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    topic = data.get("topic", "").strip()
    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    try:
        summary = wikipedia.summary(topic, sentences=5)
        return jsonify({"summary": summary})
    except wikipedia.exceptions.DisambiguationError as e:
        return jsonify({"error": "Ambiguous topic", "options": e.options[:5]}), 400
    except wikipedia.exceptions.PageError:
        return jsonify({"error": "No page found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
