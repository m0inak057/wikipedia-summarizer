
 📄 Wikipedia Summarizer

A clean and responsive web application that summarizes any topic using the **Wikipedia API**. Built with a lightweight **HTML/CSS/JS frontend** and a **Python Flask backend**.


### 🔗 Live Demo

👉 Frontend (Vercel): [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)


### 🧠 Features

* 🔍 Search for any topic from Wikipedia
* 📄 Displays a 5-sentence summary
* ⚠️ Handles ambiguous topics with smart suggestions
* ❌ Graceful handling of missing topics
* 🌐 Fully responsive and mobile-friendly
* 🎨 Smooth hover and focus effects

---

### 🛠️ Tech Stack

**Frontend:**

* HTML5
* CSS3 (with responsive design)
* JavaScript (Fetch API)

**Backend:**

* Python 3
* Flask
* Wikipedia (Python library)
* Flask-CORS

---

### 🚀 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/your-username/wikipedia-summarizer.git
cd wikipedia-summarizer
```

#### 2. Backend Setup

```bash
cd backend
pip install flask wikipedia flask-cors
python app.py
```

Make sure Flask is running on `http://127.0.0.1:5000`.

#### 3. Frontend Setup

Open `frontend/index.html` directly in a browser, or deploy using Vercel.

---

### 📁 Project Structure

```
wikipedia-summarizer/
│
├── backend/
│   └── app.py              # Flask backend serving the summary API
│
├── frontend/
│   ├── index.html          # Main HTML interface
│   ├── style.css           # CSS styles and media queries
│   └── script.js           # JavaScript to call Flask API
│
├── main.py                 # Optional entry point or utility script
└── README.md               # This file
```

---

### ✨ Future Improvements

* Voice-based search input
* Multilingual Wikipedia summaries
* Rich media preview (images + links)
* Serverless backend deployment

---

### 🙌 Author

Made by Moinak Mondal 
LinkedIn - https://www.linkedin.com/in/moinakm/
Feel free to fork, star, or suggest improvements!


