const analyzeBtn = document.getElementById("analyzeBtn");
const reviewInput = document.getElementById("reviewInput");
const overlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const themeBtn = document.getElementById("themeToggle");

// ==========================================
// Theme Synchronization Logic
// ==========================================
function applyTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        if (themeBtn) {
            themeBtn.innerHTML = '<i data-lucide="sun"></i><span>Light Mode</span>';
        }
    } else {
        document.body.classList.remove("dark");
        if (themeBtn) {
            themeBtn.innerHTML = '<i data-lucide="moon"></i><span>Dark Mode</span>';
        }
    }
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initial theme check
applyTheme();

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        applyTheme();
    });
}

// ==========================================
// Analyze Reviews Functionality
// ==========================================
analyzeBtn.addEventListener("click", async () => {
    const reviews = reviewInput.value.trim();

    if (!reviews) {
        alert("Please paste reviews first.");
        return;
    }

    const originalBtnText = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i data-lucide="loader" class="spin"></i><span>Analyzing...</span>';
    analyzeBtn.disabled = true;
    if (window.lucide) lucide.createIcons();

    overlay.style.display = "flex";

    const messages = [
        "Analyzing customer reviews...",
        "Finding pain points...",
        "Generating product insights...",
        "Preparing dashboard..."
    ];

    let i = 0;
    loadingText.innerText = messages[0];
    const interval = setInterval(() => {
        i++;
        loadingText.innerText = messages[i % messages.length];
    }, 1200);

    try {
        const response = await fetch(
  "https://insightflow-ai-fhst.onrender.com/analyze",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      reviews: reviews
    })
  }
);

        const data = await response.json();
        console.log(data);

        // Save latest analysis
        localStorage.setItem("analysis", JSON.stringify(data));

        // Save history
        let history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
        history.unshift({
            date: new Date().toLocaleString(),
            platform: document.getElementById("platform").value,
            data: data
        });

        // Keep only last 10 analyses
        history = history.slice(0, 10);
        localStorage.setItem("analysisHistory", JSON.stringify(history));

        clearInterval(interval);
        window.location.href = "dashboard.html";

    } catch (error) {
        clearInterval(interval);
        overlay.style.display = "none";
        console.error(error);
        alert("Something went wrong. Please check if backend is running.");
    } finally {
        analyzeBtn.innerHTML = originalBtnText;
        analyzeBtn.disabled = false;
        if (window.lucide) lucide.createIcons();
    }
});