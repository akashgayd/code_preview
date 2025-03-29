import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";
import { Copy, CheckCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import "../../../App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";

const MyFallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={{ color: "red" }}>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const CodePreview = () => {
  const [code, setCode] = useState(`
    function greet(name) {
      console.log(\`Hello, \${name}!\`);
    }
    greet("World");

    paste your code here.....
  `);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyStatuses, setCopyStatuses] = useState({});
  const topRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Add responsive breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, review]);

  // Recursive function to extract text content from React elements
  const extractTextContent = (element) => {
    if (!element) return "";

    // If it's a string, return it directly
    if (typeof element === "string") return element;

    // If it's an array, map through it and join the results
    if (Array.isArray(element)) {
      return element.map(extractTextContent).join("");
    }

    // If it's a React element with children
    if (element.props && element.props.children) {
      return extractTextContent(element.props.children);
    }

    // Fallback for other cases
    return "";
  };

  const handleCopy = (element, key) => {
    // Extract all text content from the code block
    const textToCopy = extractTextContent(element);

    setCopyStatuses((prev) => ({ ...prev, [key]: "copying" }));

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied text:", textToCopy);
        updateStatus(key, "copied");
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        updateStatus(key, "failed");
      });
  };

  const updateStatus = (key, status) => {
    setCopyStatuses((prev) => ({ ...prev, [key]: status }));
    setTimeout(() => {
      setCopyStatuses((prev) => {
        const newStatuses = { ...prev };
        delete newStatuses[key];
        return newStatuses;
      });
    }, 2000);
  };

  const fetchCodeReview = async () => {
    setLoading(true);
    // Scroll to top of the page when review button is clicked
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    try {
      const response = await axios.post(
        "https://code-review-o1q5.onrender.com/ai/review",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Style for the main container - responsive layout
  const mainContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "20px",
    padding: isMobile ? "10px" : "20px",
    maxWidth: "100%",
    overflowX: "hidden"
  };

  // Style for left and right sections
  const sectionStyle = {
    width: isMobile ? "100%" : "50%",
    marginBottom: isMobile ? "20px" : "0"
  };

  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      {/* Reference element for scrolling to top */}
      <div ref={topRef}></div>
      <main style={mainContainerStyle}>
        <div className="left" style={sectionStyle}>
          <div ref={editorContainerRef} style={{ position: "relative" }}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: "monospace",
                fontSize: isMobile ? 12 : 14,
                backgroundColor: "#2d2d2d",
                color: "#f8f8f2",
                borderRadius: "5px",
                marginBottom: "50px", // Add space for the button
                minHeight: "200px",
                width: "100%",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
            {/* Position the button at the bottom of the editor */}
            <div style={{ 
              position: "absolute", 
              bottom: "10px", 
              left: "0", 
              width: "100%", 
              display: "flex", 
              justifyContent: "center",
              padding: "10px 0"
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="review"
                onClick={fetchCodeReview}
                style={{
                  padding: isMobile ? "10px 20px" : "8px 16px",
                  borderRadius: "7px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: isMobile ? "16px" : "14px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Review
              </motion.button>
            </div>
          </div>
        </div>

        <div className="right" style={sectionStyle}>
          <div style={{
            backgroundColor: "#2a2a2a",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            maxWidth: "100%",
            overflowX: "auto"
          }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif"
                  alt="Loading..."
                  width={isMobile ? 40 : 50}
                />
                <p style={{ color: "#f0f0f0", marginTop: "10px" }}>Analyzing your code...</p>
              </div>
            ) : (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: ({ node, children, ...props }) => {
                    const key = node?.position?.start?.line || Math.random();

                    return (
                      <pre
                        style={{
                          position: "relative",
                          backgroundColor: "#4a4a4a",
                          padding: "10px",
                          borderRadius: "5px",
                          overflowX: "auto",
                          fontSize: isMobile ? "12px" : "14px",
                          marginBottom: "15px",
                        }}
                        {...props}
                      >
                        {children}
                        <motion.button
                          onClick={() => handleCopy(children, key)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.25rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                            border: "none",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          }}
                        >
                          {copyStatuses[key] === "copied" ? (
                            <CheckCircle size={isMobile ? 14 : 16} />
                          ) : (
                            <Copy size={isMobile ? 14 : 16} />
                          )}
                        </motion.button>
                      </pre>
                    );
                  },
                  // Update code display for mobile
                  code: ({ node, inline, className, children, ...props }) => {
                    // Only do special handling for block code, not inline code
                    if (inline)
                      return (
                        <code className={className} style={{ fontSize: isMobile ? "12px" : "14px" }} {...props}>
                          {children}
                        </code>
                      );

                    return (
                      <code className={className} style={{ fontSize: isMobile ? "12px" : "14px" }} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Make paragraphs in markdown responsive
                  p: ({ node, children, ...props }) => (
                    <p style={{ fontSize: isMobile ? "14px" : "16px", lineHeight: "1.6", color: "#f0f0f0" }} {...props}>
                      {children}
                    </p>
                  ),
                  // Make headings in markdown responsive
                  h1: ({ node, children, ...props }) => (
                    <h1 style={{ fontSize: isMobile ? "22px" : "26px", marginBottom: "15px", color: "#f0f0f0" }} {...props}>
                      {children}
                    </h1>
                  ),
                  h2: ({ node, children, ...props }) => (
                    <h2 style={{ fontSize: isMobile ? "20px" : "22px", marginBottom: "12px", color: "#f0f0f0" }} {...props}>
                      {children}
                    </h2>
                  ),
                  h3: ({ node, children, ...props }) => (
                    <h3 style={{ fontSize: isMobile ? "18px" : "20px", marginBottom: "10px", color: "#f0f0f0" }} {...props}>
                      {children}
                    </h3>
                  )
                }}
              >
                {review || "Click the Review button to analyze your code."}
              </Markdown>
            )}
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default CodePreview;