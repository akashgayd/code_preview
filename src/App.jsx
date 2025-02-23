import "./App.css";
import "prismjs/themes/prism-tomorrow.css";

import Editor from "react-simple-code-editor";
import { useState } from "react";
import Prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


const App = () => {
  const [code, setCode] = useState(`
    function sum() {
      return 1 + 1;
    }
  `);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false); // Renamed 'loder' to 'loading' for clarity

  // Removed unnecessary useEffect

  const CodeReview = async () => {
    setLoading(true);
    try {
      const response = await axios.post( "https://code-review-o1q5.onrender.com/ai/review", // Use environment variable
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review. Please check the console."); // Display an error message to the user
    } finally {
      setLoading(false); // Ensure loading is always set to false
    }
  };

  return (
    <main style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              border: "1px solid black",
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
            }}
          />
        </div>
        <div className="review" onClick={CodeReview}>Review</div>
      </div>

      <div className="right">
        {loading ? (
          <div><img style={{width:"100px"}} src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="" /></div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        )}
      </div>
    </main>
  );
};

export default App;