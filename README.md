# 🚀 InsightFlow AI

An AI-powered product feedback analyzer that transforms customer reviews into actionable business insights using **Google Gemini AI**. Simply paste reviews from platforms like Amazon, Flipkart, Swiggy, Zomato, Play Store, or App Store to get sentiment analysis, pain points, themes, feature recommendations, and an executive product summary.

---

## 🌐 Live Demo

- **🚀 Live Application:** https://insight-flow-ai-peach.vercel.app
- **⚡ Backend API:** https://insightflow-ai-fhst.onrender.com
- **📄 API Documentation:** https://insightflow-ai-fhst.onrender.com/docs
- **💻 GitHub Repository:** https://github.com/codewithkanishka01/InsightFlow-AI

---

## ✨ Features

- 🤖 AI-powered review analysis using **Google Gemini AI**
- 😊 Sentiment Analysis (Positive, Negative & Neutral)
- 📊 Theme Detection from customer reviews
- 🚨 Automatic Pain Point Identification
- 💡 AI-generated Feature Recommendations
- 📄 Executive Product Summary
- 📈 Interactive Charts using Chart.js
- 🌙 Light & Dark Mode
- 📥 Download Analysis Report
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js
- Lucide Icons

### Backend
- FastAPI
- Python
- Google Gemini API
- Pydantic

### Deployment
- Vercel (Frontend)
- Render (Backend)

### Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
InsightFlow-AI
│
├── backend
│   ├── app.py
│   ├── prompts.py
│   ├── requirements.txt
│
├── frontend
│   ├── index.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/codewithkanishka01/InsightFlow-AI.git
cd InsightFlow-AI
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**Windows**
```bash
venv\Scripts\activate
```

**macOS/Linux**
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run the backend:

```bash
uvicorn app:app --reload
```

### 3️⃣ Frontend

Open the `frontend` folder using **Live Server** or any static server and start analyzing reviews.

---

## 📊 Sample Insights

- Overall Sentiment Distribution
- Top Customer Pain Points
- Most Discussed Themes
- Feature Recommendations
- Executive Product Brief
- Interactive Dashboard & Charts

---

## 🚀 Future Improvements

- CSV/Excel Review Upload
- PDF Report Export
- User Authentication
- Analysis History
- Multi-language Support
- Cloud Database Integration

---

## 👩‍💻 Author

**Kanishka Pandey**

- GitHub: https://github.com/codewithkanishka01
- Project Repository: https://github.com/codewithkanishka01/InsightFlow-AI

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
