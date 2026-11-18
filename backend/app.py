
from flask import Flask, request, jsonify
from flask_cors import CORS
from detector import detect_mismatches

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "DocGuard Backend is running!"


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "JSON input required"}), 400

        old_code = data.get("old_code", "")
        new_code = data.get("new_code", "")
        documentation = data.get("documentation", "")

        if not all([old_code, new_code, documentation]):
            return jsonify({
                "error": "Old code, new code and documentation are required."
            }), 400

        results = detect_mismatches(
            old_code,
            new_code,
            documentation
        )

        return jsonify({
            "success": True,
            "total_issues": len(results),
            "results": results
        })

    except Exception as error:
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(debug=True)

