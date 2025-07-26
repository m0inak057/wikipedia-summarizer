// Configuration for API endpoint
const API_BASE_URL = "https://wikipedia-summarizer-backend.onrender.com";

// UI Elements
let topicInput, summaryDiv, searchBtn, btnText, btnLoading;

// Initialize UI elements
function initializeElements() {
  topicInput = document.getElementById("topic");
  summaryDiv = document.getElementById("summary");
  searchBtn = document.getElementById("search-btn");
  btnText = document.getElementById("btn-text");
  btnLoading = document.getElementById("btn-loading");
}

// Set button loading state
function setButtonLoading(isLoading) {
  if (isLoading) {
    searchBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
    summaryDiv.classList.add("loading");
  } else {
    searchBtn.disabled = false;
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
    summaryDiv.classList.remove("loading");
  }
}

async function getSummary() {
  const topic = topicInput.value.trim();
  
  // Validate input
  if (!topic) {
    summaryDiv.innerHTML = `<strong>⚠️ Please enter a topic to search.</strong>`;
    summaryDiv.style.display = "flex";
    return;
  }

  // Show loading state
  setButtonLoading(true);
  summaryDiv.innerHTML = "⏳ Fetching summary...";
  summaryDiv.style.display = "flex";

  try {
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.ok && data.summary) {
      summaryDiv.innerHTML = `
        <div>
          <strong>📄 Summary for "${data.topic || topic}":</strong><br><br>
          ${data.summary}
        </div>
      `;
    } else if (data.options && data.options.length > 0) {
      summaryDiv.innerHTML = `
        <div>
          <strong>⚠️ ${data.message || 'Ambiguous topic'}</strong><br><br>
          <strong>Suggestions:</strong> <em>${data.options.join(", ")}</em>
        </div>
      `;
    } else if (data.error) {
      summaryDiv.innerHTML = `
        <div>
          <strong>❌ ${data.error}</strong><br>
          ${data.message ? `<em>${data.message}</em>` : ''}
        </div>
      `;
    } else {
      summaryDiv.innerHTML = `<div><strong>❌ Unexpected response from server.</strong></div>`;
    }
  } catch (error) {
    let errorMessage;
    if (error.name === 'AbortError') {
      errorMessage = `<div><strong>⏰ Request timed out. Please try again.</strong></div>`;
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = `
        <div>
          <strong>🚫 Cannot connect to server.</strong><br>
          <em>Please check your internet connection or try again later.</em>
        </div>
      `;
    } else {
      errorMessage = `
        <div>
          <strong>🚫 Error connecting to server.</strong><br>
          <em>Please try again later.</em>
        </div>
      `;
    }
    summaryDiv.innerHTML = errorMessage;
    console.error("Request failed:", error);
  } finally {
    setButtonLoading(false);
  }
}

// Add Enter key support for input field
function setupEventListeners() {
  if (topicInput) {
    topicInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter' && !searchBtn.disabled) {
        getSummary();
      }
    });

    // Clear summary when input changes
    topicInput.addEventListener('input', function() {
      if (summaryDiv.innerHTML && topicInput.value.trim() === '') {
        summaryDiv.innerHTML = '';
        summaryDiv.style.display = 'none';
      }
    });
  }

  // Add click handler to search button
  if (searchBtn) {
    searchBtn.addEventListener('click', function(event) {
      event.preventDefault();
      if (!searchBtn.disabled) {
        getSummary();
      }
    });
  }
}

// Test API connection on page load
async function testConnection() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      console.log("✅ API connection successful");
      return true;
    } else {
      console.warn("⚠️ API responded with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ API connection failed:", error);
    return false;
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
  
  // Test connection and show status
  testConnection().then(isConnected => {
    if (!isConnected) {
      // Show connection warning in summary div
      summaryDiv.innerHTML = `
        <div>
          <strong>⚠️ Connection Warning</strong><br>
          <em>Unable to connect to the API server. Please check your internet connection.</em>
        </div>
      `;
      summaryDiv.style.display = "flex";
    }
  });
  
  // Focus on input field
  if (topicInput) {
    topicInput.focus();
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible' && topicInput) {
    topicInput.focus();
  }
});
