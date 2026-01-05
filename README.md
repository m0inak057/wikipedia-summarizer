# 📄 Wikipedia Summarizer

A modern, responsive web application that provides instant Wikipedia summaries for any topic. Built with a clean **HTML/CSS/JS frontend** and a robust **Python Flask backend**.

## 🔗 Live Demo

👉 **Frontend (Vercel)**: [[https://wikipedia-summarizer-moinak1.vercel.app](https://news-scraper-ivory.vercel.app/))  
👉 **Backend API (Render)**: [[https://wikipedia-summarizer-moinak.onrender.com](https://wikipedia-summarizer-moinak.onrender.com)

## 🧠 Features

* 🔍 **Smart Search**: Search for any topic from Wikipedia
* 📄 **Instant Summaries**: Get concise 5-sentence summaries
* ⚠️ **Disambiguation Handling**: Smart suggestions for ambiguous topics
* ❌ **Error Handling**: Graceful handling of missing topics and network issues
* 🌐 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
* ⚡ **Fast & Reliable**: Optimized for speed with proper timeout handling
* 🎨 **Modern UI**: Clean, accessible interface with loading states
* ⌨️ **Keyboard Support**: Press Enter to search

---

## 🛠️ Tech Stack

### Frontend
* **HTML5** - Semantic markup with accessibility features
* **CSS3** - Modern styling with gradients, animations, and responsive design
* **Vanilla JavaScript** - ES6+ with Fetch API and async/await
* **Vercel** - Static site hosting and deployment

### Backend
* **Python 3.9+** - Modern Python with type hints
* **Flask** - Lightweight web framework
* **Wikipedia API** - Python library for Wikipedia access
* **Flask-CORS** - Cross-origin resource sharing
* **Gunicorn** - Production WSGI server
* **Render** - Cloud hosting platform

---

## 🚀 Getting Started

### Prerequisites
* Python 3.9 or higher
* Node.js (for local development)
* Git

### 1. Clone the Repository
```bash
git clone https://github.com/m0inak057/wikipedia-summarizer.git
cd wikipedia-summarizer
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
# Open index.html in your browser or use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

---

## 📁 Project Structure

```
wikipedia-summarizer/
│
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── stylesheet.css      # Styles and responsive design
│   ├── scripts.js          # JavaScript functionality
│   └── vercel.json         # Vercel deployment config
│
├── main.py                 # Standalone CLI version
├── render.yaml             # Render deployment config
└── README.md               # This file
```

---

## 🌐 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`
   - **Environment**: Python 3.9.16

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend/`
3. Deploy automatically on push

---

## 🔧 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "status": "Wikipedia Summarizer API is running!",
  "version": "1.0.0"
}
```

### `POST /api/summarize`
Get Wikipedia summary for a topic
```json
// Request
{
  "topic": "Albert Einstein"
}

// Success Response
{
  "summary": "Albert Einstein was a German-born theoretical physicist...",
  "topic": "Albert Einstein"
}

// Error Response
{
  "error": "No page found",
  "message": "No Wikipedia page found for this topic."
}
```

---

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**: Make sure the backend is running and accessible
**Timeout Errors**: Check your internet connection and try again
**Deployment Issues**: Verify environment variables and build commands

### Error Codes
* `400` - Bad request (missing topic or ambiguous)
* `404` - Page not found
* `408` - Request timeout
* `500` - Internal server error

---

## ✨ Future Improvements

* 🎤 Voice-based search input
* 🌍 Multilingual Wikipedia summaries
* 🖼️ Rich media preview (images + links)
* 📱 Progressive Web App (PWA) features
* 🔍 Search history and favorites
* 📊 Usage analytics dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Author

**Moinak Mondal**  
🔗 GitHub: [https://github.com/m0inak057](https://github.com/m0inak057)  
📧 Email: moinak.mondal@example.com

---

⭐ **Star this repo if you found it helpful!**
