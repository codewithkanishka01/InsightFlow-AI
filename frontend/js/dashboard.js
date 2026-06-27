const analysis = JSON.parse(localStorage.getItem("analysis"));

if (!analysis) {
    alert("No analysis found. Please analyze reviews first.");
    window.location.href = "index.html";
}

// ==========================================
// Theme Synchronization Logic
// ==========================================
const themeBtn = document.getElementById("themeToggle");

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
        // Reload to refresh Chart.js theme colors
        location.reload();
    });
}

// ==========================================
// Animated Counter
// ==========================================
function animateValue(id, endValue, suffix = "") {
    const element = document.getElementById(id);
    if (!element) return;
    
    const duration = 1200;
    const increment = endValue / (duration / 20);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
        }
        element.textContent = Math.round(current * 10) / 10 + suffix;
    }, 20);
}

// Run counter animations
animateValue("totalReviews", analysis.total_reviews);
animateValue("positivePercent", analysis.positive_percentage, "%");
animateValue("negativePercent", analysis.negative_percentage, "%");
const aiConfElem = document.getElementById("aiConfidence");
if (aiConfElem) aiConfElem.textContent = "98%";

// ==========================================
// Dynamic Section Updates (HTML preserved)
// ==========================================
const updateCardBody = (cardId, contentHTML) => {
    const card = document.getElementById(cardId);
    if (card) {
        const body = card.querySelector(".card-body") || card;
        body.innerHTML = contentHTML;
    }
};

// Pain Points
updateCardBody("painPoints", `
    <ul>
        ${analysis.pain_points.map(item => `<li>${item}</li>`).join("")}
    </ul>
`);

// Themes
updateCardBody("themes", `
    <ul>
        ${analysis.themes.map(item => `<li>${item.theme} (${item.mentions})</li>`).join("")}
    </ul>
`);

// Sentiment details
updateCardBody("sentiment", `
    <div class="sentiment-grid">
        <div class="sentiment-box positive">
            <div class="dot green"></div>
            <h3>Positive</h3>
            <p>${analysis.positive_percentage}%</p>
        </div>
        <div class="sentiment-box negative">
            <div class="dot red"></div>
            <h3>Negative</h3>
            <p>${analysis.negative_percentage}%</p>
        </div>
        <div class="sentiment-box neutral">
            <div class="dot yellow"></div>
            <h3>Neutral</h3>
            <p>${analysis.neutral_percentage}%</p>
        </div>
    </div>
`);

// Feature Recommendations
updateCardBody("recommendations", `
    <ul>
        ${analysis.feature_suggestions.map(item => `<li>${item}</li>`).join("")}
    </ul>
`);

// Product Brief
updateCardBody("brief", `
    <p>${analysis.summary}</p>
`);

// ==========================================
// Chart.js Visualizations Setup
// ==========================================
const isDark = document.body.classList.contains("dark");
const labelColor = isDark ? "#cbd5e1" : "#475569";
const gridColor = isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)";

Chart.defaults.font.family = "'Inter', 'Poppins', sans-serif";
Chart.defaults.color = labelColor;

// 1. Doughnut Sentiment Chart
const sentimentChartCtx = document.getElementById("sentimentChart");
if (sentimentChartCtx) {
    new Chart(sentimentChartCtx, {
        type: "doughnut",
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                data: [
                    analysis.positive_percentage,
                    analysis.negative_percentage,
                    analysis.neutral_percentage
                ],
                backgroundColor: [
                    "#10b981", // Success Green
                    "#ef4444", // Danger Red
                    "#f59e0b"  // Warning Yellow
                ],
                borderWidth: isDark ? 2 : 1,
                borderColor: isDark ? "#111827" : "#ffffff"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 16,
                        font: { size: 12, weight: "500" },
                        color: labelColor
                    }
                },
                tooltip: {
                    padding: 12,
                    cornerRadius: 8,
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    titleColor: isDark ? "#ffffff" : "#0f172a",
                    bodyColor: isDark ? "#cbd5e1" : "#475569",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                    borderWidth: 1
                }
            }
        }
    });
}

// 2. Bar Theme Chart
const themeChartCtx = document.getElementById("themeChart");
if (themeChartCtx) {
    new Chart(themeChartCtx, {
        type: "bar",
        data: {
            labels: analysis.themes.map(t => t.theme),
            datasets: [{
                label: "Mentions",
                data: analysis.themes.map(t => t.mentions),
                backgroundColor: isDark ? "rgba(99, 102, 241, 0.85)" : "#4f46e5",
                hoverBackgroundColor: "#4338ca",
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    padding: 12,
                    cornerRadius: 8,
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    titleColor: isDark ? "#ffffff" : "#0f172a",
                    bodyColor: isDark ? "#cbd5e1" : "#475569",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: labelColor, font: { size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: labelColor, font: { size: 11 }, precision: 0 }
                }
            }
        }
    });
}

// ==========================================
// Download PDF Report
// ==========================================
const downloadBtn = document.getElementById("downloadPDF");
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("InsightFlow AI Intelligence Report", 20, y);
        y += 15;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Total Reviews Analyzed: ${analysis.total_reviews}`, 20, y);
        y += 8;
        doc.text(`Positive Sentiment: ${analysis.positive_percentage}%`, 20, y);
        y += 8;
        doc.text(`Negative Sentiment: ${analysis.negative_percentage}%`, 20, y);
        y += 8;
        doc.text(`Neutral Sentiment: ${analysis.neutral_percentage}%`, 20, y);
        y += 15;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("Top Customer Pain Points", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        analysis.pain_points.forEach(item => {
            doc.text("- " + item, 20, y);
            y += 8;
        });
        y += 8;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("AI Feature Recommendations", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        analysis.feature_suggestions.forEach(item => {
            doc.text("- " + item, 20, y);
            y += 8;
        });
        y += 8;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("Executive Summary", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const summary = doc.splitTextToSize(analysis.summary, 170);
        doc.text(summary, 20, y);

        doc.save("InsightFlow_Intelligence_Report.pdf");
    });
}

// ==========================================
// Analysis History Loading
// ==========================================
const historyData = JSON.parse(localStorage.getItem("analysisHistory")) || [];
const historyList = document.getElementById("historyList");

if (historyList) {
    if (historyData.length === 0) {
        historyList.innerHTML = '<p class="empty-text">No previous analyses found.</p>';
    } else {
        historyList.innerHTML = historyData.map((item, index) => `
            <div class="history-item">
                <div>
                    <h3>${item.platform || "Custom Analysis"}</h3>
                    <p>${item.date}</p>
                </div>
                <button class="loadHistory" data-index="${index}">
                    Load
                </button>
            </div>
        `).join("");

        document.querySelectorAll(".loadHistory").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                localStorage.setItem("analysis", JSON.stringify(historyData[index].data));
                location.reload();
            });
        });
    }
}

// ==========================================
// Form Submission Listener on Dashboard Page
// ==========================================
const analyzeFormBtn = document.getElementById("analyzeBtn");
const reviewsTextarea = document.getElementById("reviews");
const platformSelect = document.getElementById("platform");
const overlay = document.getElementById("loadingOverlay");

if (analyzeFormBtn && reviewsTextarea) {
    analyzeFormBtn.addEventListener("click", async () => {
        const reviews = reviewsTextarea.value.trim();

        if (!reviews) {
            alert("Please paste reviews first.");
            return;
        }

        const originalBtnHTML = analyzeFormBtn.innerHTML;
        analyzeFormBtn.innerHTML = '<i data-lucide="loader" class="spin"></i><span>Analyzing...</span>';
        analyzeFormBtn.disabled = true;
        if (window.lucide) lucide.createIcons();

        if (overlay) overlay.style.display = "flex";

        try {
            const response = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reviews: reviews
                })
            });

            const data = await response.json();

            // Save latest analysis
            localStorage.setItem("analysis", JSON.stringify(data));

            // Save history
            let history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
            history.unshift({
                date: new Date().toLocaleString(),
                platform: platformSelect.value || "Custom",
                data: data
            });
            history = history.slice(0, 10);
            localStorage.setItem("analysisHistory", JSON.stringify(history));

            location.reload();
        } catch (error) {
            if (overlay) overlay.style.display = "none";
            console.error(error);
            alert("Something went wrong. Please check if backend is running.");
        } finally {
            analyzeFormBtn.innerHTML = originalBtnHTML;
            analyzeFormBtn.disabled = false;
            if (window.lucide) lucide.createIcons();
        }
    });
}