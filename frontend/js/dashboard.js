const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", () => {

    const reviews = document.getElementById("reviews").value;

    if(reviews.trim()===""){

        alert("Please paste some reviews first.");

        return;

    }

    alert("AI Analysis will be added in the next step 🚀");

});