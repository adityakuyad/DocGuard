
// Get HTML elements
const oldCode = document.getElementById("oldCode");
const newCode = document.getElementById("newCode");
const documentation = document.getElementById("documentation");

const analyzeBtn = document.getElementById("analyzeBtn");
const resultContent = document.getElementById("resultContent");

// Display a message
function showMessage(message, type) {
    resultContent.textContent = message;
    resultContent.className = type;
}

// Handle Analyze button click
analyzeBtn.addEventListener("click", async function () {

    const oldValue = oldCode.value.trim();
    const newValue = newCode.value.trim();
    const docValue = documentation.value.trim();

    // Validate inputs
    if (!oldValue || !newValue || !docValue) {
        showMessage(
            "Please fill in all three input sections.",
            "error"
        );
        return;
    }

    // Show loading status
    analyzeBtn.disabled = true;
    showMessage("Analyzing documentation... Please wait.", "loading");

    try {
        // Send data to Flask backend
        const response = await fetch(
            "http://127.0.0.1:5000/analyze",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    old_code: oldValue,
                    new_code: newValue,
                    documentation: docValue
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Analysis failed.");
        }

        // Clear previous results
        resultContent.replaceChildren();

        if (data.total_issues === 0) {
            showMessage(
                "No documentation mismatches detected!",
                "success"
            );
            return;
        }

        resultContent.className = "warning";

        const heading = document.createElement("h3");
        heading.textContent =
            `${data.total_issues} documentation issue(s) found`;

        resultContent.appendChild(heading);

        // Display each detected issue
        data.results.forEach((issue, index) => {
            const card = document.createElement("div");
            card.className = "issue-card";

            const title = document.createElement("h3");
            title.textContent = `${index + 1}. ${issue.type}`;

            card.appendChild(title);

            const fields = [
                ["Function", issue.function],
                ["Outdated documentation", issue.outdated_sentence],
                ["Code change", issue.code_change],
                ["Why this is an issue", issue.reason],
                ["Suggested correction", issue.suggestion]
            ];

            fields.forEach(([label, value]) => {
                const paragraph = document.createElement("p");
                paragraph.textContent = `${label}: ${value}`;
                card.appendChild(paragraph);
            });

            resultContent.appendChild(card);
        });

    } catch (error) {
        showMessage(
            "Backend connection error: " + error.message,
            "error"
        );
    } finally {
        analyzeBtn.disabled = false;
    }
});
