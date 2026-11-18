
import ast
import re


def extract_functions(code):
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return {}

    functions = {}

    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            functions[node.name] = [
                arg.arg for arg in node.args.args
            ]

    return functions


def split_sentences(documentation):
    return [
        sentence.strip()
        for sentence in re.split(r'(?<=[.!?])\s+', documentation)
        if sentence.strip()
    ]


def detect_mismatches(old_code, new_code, documentation):
    old_functions = extract_functions(old_code)
    new_functions = extract_functions(new_code)

    sentences = split_sentences(documentation)
    results = []
    reported = set()

    def add_result(result):
        key = (
            result["type"],
            result["function"],
            result["outdated_sentence"]
        )

        if key not in reported:
            results.append(result)
            reported.add(key)

    # RULE 1: Detect removed functions
    for function_name in old_functions:

        if function_name not in new_functions:

            for sentence in sentences:
                if re.search(
                    rf"\b{re.escape(function_name)}\b",
                    sentence,
                    re.IGNORECASE
                ):
                    add_result({
                        "type": "Removed function",
                        "function": function_name,
                        "outdated_sentence": sentence,
                        "code_change": f"Function '{function_name}' removed",
                        "reason": (
                            f"The function '{function_name}' existed "
                            "in the old code but is missing from "
                            "the updated code."
                        ),
                        "suggestion": (
                            f"Remove or rewrite this documentation "
                            f"because '{function_name}' no longer exists."
                        )
                    })

    # RULE 2: Detect changed function parameters
    for function_name, old_params in old_functions.items():

        if function_name not in new_functions:
            continue

        new_params = new_functions[function_name]

        for old_param, new_param in zip(old_params, new_params):

            if old_param == new_param:
                continue

            for sentence in sentences:

                if (
                    re.search(
                        rf"\b{re.escape(function_name)}\b",
                        sentence,
                        re.IGNORECASE
                    )
                    and re.search(
                        rf"\b{re.escape(old_param)}\b",
                        sentence,
                        re.IGNORECASE
                    )
                ):
                    suggestion = re.sub(
                        rf"\b{re.escape(old_param)}\b",
                        new_param,
                        sentence,
                        flags=re.IGNORECASE
                    )

                    suggestion = re.sub(
                        r"\ba (?=[aeiouAEIOU])",
                        "an ",
                        suggestion,
                        flags=re.IGNORECASE
                    )

                    suggestion = re.sub(
                        r"\ban (?=[^aeiouAEIOU])",
                        "a ",
                        suggestion,
                        flags=re.IGNORECASE
                    )

                    add_result({
                        "type": "Parameter mismatch",
                        "function": function_name,
                        "outdated_sentence": sentence,
                        "code_change": f"{old_param} → {new_param}",
                        "reason": (
                            f"The parameter changed from "
                            f"'{old_param}' to '{new_param}', "
                            "but documentation still mentions "
                            f"'{old_param}'."
                        ),
                        "suggestion": suggestion
                    })

    return results

