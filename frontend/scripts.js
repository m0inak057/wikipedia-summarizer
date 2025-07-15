async function getSummary() {
  const topic = document.getElementById("topic").value.trim();
  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = "⏳ Fetching summary...";

  try {
    const response = await fetch("https://wikipedia-summarizer-backend.onrender.com/api/summarize",
 {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    if (data.summary) {
      summaryDiv.innerHTML = `<strong>📄 Summary:</strong><br><br>${data.summary}`;
    } else if (data.options) {
      summaryDiv.innerHTML = `<strong>⚠️ Ambiguous topic.</strong> Try one of: <em>${data.options.join(", ")}</em>`;
    } else {
      summaryDiv.innerHTML = `<strong>❌ ${data.error}</strong>`;
    }
  } catch (error) {
    summaryDiv.innerHTML = `<strong>🚫 Error connecting to server.</strong>`;
    console.error("Request failed:", error);
  }
}
