
// Get HTML elements
const oldCode = document.getElementById("oldCode");
const newCode = document.getElementById("newCode");
const documentation = document.getElementById("documentation");

const analyzeBtn = document.getElementById("analyzeBtn");
const resultContent = document.getElementById("resultContent");

// Check that all required HTML elements exist
if (
    !oldCode ||
    !newCode ||
    !documentation ||
    !analyzeBtn ||
    !resultContent
) {
    console.error("DocGuard: Required HTML elements were not found.");
} else {

    // Handle Analyze button click
    analyzeBtn.addEventListener("click", function () {

        // Read and clean user inputs
        const oldValue = oldCode.value.trim();
        const newValue = newCode.value.trim();
        const docValue = documentation.value.trim();

        // Check previous code
        if (!oldValue) {
            showMessage(
                "Please enter your previous code.",
                "error"
            );
            oldCode.focus();
            return;
        }

        // Check updated code
        if (!newValue) {
            showMessage(
                "Please enter your updated code.",
                "error"
            );
            newCode.focus();
            return;
        }

        // Check documentation
        if (!docValue) {
            showMessage(
                "Please enter your project documentation.",
                "error"
            );
            documentation.focus();
            return;
        }

        // All inputs are valid
        showMessage(
            "All inputs received successfully! Your frontend is ready for backend integration.",
            "success"
        );

    });

    // Display messages safely
    function showMessage(message, type) {
        resultContent.textContent = message;
        resultContent.className = type;
    }

}
