import React, { useState } from "react";
import axios from "axios";

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
          required
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px 15px" }}>
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default UrlShortener;
