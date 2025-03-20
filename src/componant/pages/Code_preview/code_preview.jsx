import "../../../App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import { useState } from "react";
import Prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { useEffect } from "react";

const CodePreview = () => {
    const [code, setCode] = useState(`
       paste your code here...... 
        
      `);
    const [review, setReview] = useState(``);
    const [loading, setLoading] = useState(false);

    const CodeReview = async () => {
        const reviewButton = document.querySelector('.right');
        reviewButton.scrollIntoView({ behavior: 'smooth' });
    
        setLoading(true);
        try {
            const response = await axios.post("https://code-review-o1q5.onrender.com/ai/review", { code });
            setReview(response.data);
        } catch (error) {
            console.error("Error fetching review:", error);
            setReview("Error fetching review. Please check the console.");
        } finally {
            setLoading(false);
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
                <div className="review" onClick={CodeReview}>Review
                 
                </div>
            </div>

            <div className="right">
                {loading ? (
                    <div><img style={{width:"60px"}} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif" alt="" /></div>
                ) : (
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {review}
                    </Markdown>
                )}
            </div>
        </main>
    );
};

export default CodePreview;