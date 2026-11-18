
// Get the input elements
const oldCode = document.getElementById("oldCode");
const newCode = document.getElementById("newCode");
const documentation = document.getElementById("documentation");

// Get the button and result area
const analyzeBtn = document.getElementById("analyzeBtn");
const resultContent = document.getElementById("resultContent");

// What happens when the button is clicked
analyzeBtn.addEventListener("click", function () {

    // Read the user's input
    const oldValue = oldCode.value.trim();
    const newValue = newCode.value.trim();
    const docValue = documentation.value.trim();

    // Check whether all inputs are filled
    if (oldValue === "" || newValue === "" || docValue === "") {

        resultContent.textContent =
            "Please fill in all three input boxes before analysis.";

        return;
    }

    // Show a temporary success message
    resultContent.textContent =
        "All inputs received! Ready to analyze documentation.";

});
