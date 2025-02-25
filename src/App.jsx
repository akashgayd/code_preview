import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import { useState } from "react";
import Prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import AdSense from "react-adsense";

const App = () => {
    const [code, setCode] = useState(`
        function sum() {
          return 1 + 1;
        }
      `);
    const [review, setReview] = useState(``);
    const [loading, setLoading] = useState(false);

    const CodeReview = async () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
      
        setLoading(true);
        try {
            const response = await axios.post( "https://code-review-o1q5.onrender.com/ai/review",
                { code }
            );
            setReview(response.data);
        } catch (error) {
            console.error("Error fetching review:", error);
            setReview("Error fetching review. Please check the console.");
        } finally {
            setLoading(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smooth scrolling
        });
    };

    return (
        <main style={{ display: "flex", gap: "20px", padding: "20px" }}>
             <AdSense.Google

              data-ad-client="ca-pub-3451748995611548"
              data-ad-slot="1234567890"
              style={{ display: "block" }}
              format="auto"
              responsive="true"
              />
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