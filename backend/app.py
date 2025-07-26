from flask import Flask, request, jsonify
from flask_cors import CORS
import wikipedia
import os
import logging

app = Flask(__name__)

# Configure CORS for production
CORS(app, origins=["*"], methods=["GET", "POST", "OPTIONS"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "Wikipedia Summarizer API is running!", "version": "1.0.0"})

@app.route("/api/summarize", methods=["POST", "OPTIONS"])
def summarize():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return jsonify({"status": "OK"}), 200
    
    topic = "unknown"  # Initialize topic for error logging
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400
            
        topic = data.get("topic", "").strip()
        if not topic:
            return jsonify({"error": "Topic is required"}), 400

        logger.info(f"Searching for topic: {topic}")
        
        # Set a timeout and limit for Wikipedia search
        wikipedia.set_rate_limiting(True)
        summary = wikipedia.summary(topic, sentences=5, auto_suggest=True)
        
        logger.info(f"Successfully retrieved summary for: {topic}")
        return jsonify({"summary": summary, "topic": topic})
        
    except wikipedia.exceptions.DisambiguationError as e:
        logger.warning(f"Disambiguation error for topic: {topic}")
        return jsonify({
            "error": "Ambiguous topic", 
            "message": "Multiple pages found. Please be more specific.",
            "options": e.options[:5]
        }), 400
        
    except wikipedia.exceptions.PageError:
        logger.warning(f"Page not found for topic: {topic}")
        return jsonify({
            "error": "No page found", 
            "message": "No Wikipedia page found for this topic."
        }), 404
        
    except wikipedia.exceptions.HTTPTimeoutError:
        logger.error(f"Timeout error for topic: {topic}")
        return jsonify({
            "error": "Request timeout", 
            "message": "Wikipedia request timed out. Please try again."
        }), 408
        
    except Exception as e:
        logger.error(f"Unexpected error for topic '{topic}': {str(e)}")
        return jsonify({
            "error": "Internal server error", 
            "message": "An unexpected error occurred. Please try again later."
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
