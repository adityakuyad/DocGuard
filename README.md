# DocGuard 🛡️
### Documentation Drift Detection Tool

**Keep your documentation consistent with your code.**

## 1. Problem Statement

Software documentation often becomes outdated when developers modify source code but forget to update the corresponding documentation.

This creates confusion, incorrect information, and maintenance difficulties for developers.

## 2. Our Solution

DocGuard is a documentation drift detection prototype that compares previous code, updated code, and project documentation to identify potential inconsistencies.

It highlights outdated documentation sentences, explains the detected code changes, and suggests corrections.

## 3. Key Features

- **Code Comparison:** Compares original and updated Python code.
- **Parameter Change Detection:** Identifies renamed function parameters referenced in documentation.
- **Removed Function Detection:** Detects documentation references to functions removed from updated code.
- **Sentence Identification:** Highlights the exact documentation sentence that may be outdated.
- **Explanation:** Explains why the documentation may no longer match the code.
- **Suggested Correction:** Provides a suggested updated sentence.
- **Web Interface:** Simple interface for submitting code and documentation.

## 4. Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| Code Analysis | Python AST |
| Text Matching | Regular Expressions |
| API Communication | REST API, JSON |

## 5. How DocGuard Works

1. User provides the previous source code.
2. User provides the updated source code.
3. User provides project documentation.
4. JavaScript sends the inputs to the Flask backend.
5. Python analyzes the code changes and documentation.
6. DocGuard identifies supported documentation mismatches.
7. The results display the outdated sentence, code change, explanation, and suggested correction.

## 6. Project Structure

```text
DocGuard/
│
├── backend/
│   ├── app.py
│   ├── detector.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## 7. Installation and Setup

### Prerequisites

- Python 3
- pip
- Git
- A modern web browser

### Step 1: Clone the repository

```bash
git clone https://github.com/adityakuyad/DocGuard.git
cd DocGuard
```

### Step 2: Create a virtual environment

```bash
python3 -m venv venv
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

### Step 3: Install dependencies

```bash
pip install -r backend/requirements.txt
```

### Step 4: Start the backend

```bash
python backend/app.py
```

The Flask backend runs at:

`http://127.0.0.1:5000`

### Step 5: Start the frontend

Open another terminal from the project root and run:

```bash
python3 -m http.server 5500
```

Open this address in your browser:

`http://127.0.0.1:5500/frontend/index.html`

## 8. Testing

The current prototype has been manually tested with these scenarios:

| Test Scenario | Expected Result |
|---|---|
| Function parameter renamed | Detect mismatch |
| No code changes | No mismatch |
| Function removed | Detect outdated reference |
| Unrelated documentation sentence | No mismatch in tested example |

## 9. Current Limitations

- Currently supports basic Python function analysis.
- Detects function parameter renames and removed functions.
- Does not yet understand every semantic or behavioral code change.
- Text matching is rule-based and may produce false positives or miss complex cases.
- Does not yet provide automatic CI/CD pull request checks.

## 10. Future Scope

- Support for multiple programming languages.
- Improved semantic documentation analysis.
- Automatic code-to-documentation mapping.
- GitHub Pull Request integration.
- CI/CD pipeline integration.
- More advanced mismatch detection and correction suggestions.

## 11. Team

**DocGuard Development Team**

Built as a hackathon project to help developers maintain reliable and up-to-date software documentation.

---

*DocGuard is an early-stage prototype. Its current detection capabilities are limited to the supported rules described above.*