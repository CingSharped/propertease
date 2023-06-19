import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Typography, Grid, Paper } from "@mui/material";

//import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Documents() {
  const [documents, setDocuments] = useState([]); //store & update an array of documents from backend
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleDocumentClick = (document) => {
    if (selectedDocument === document) {
      setSelectedDocument(null); // Close the document if it's already open
    } else {
      setSelectedDocument(document); // Open the clicked document
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      {documents.map((document) => (
        <Paper
          key={document.id}
          onClick={() => handleDocumentClick(document)}
          sx={{
            cursor: "pointer",
            p: 2,
            border: document === selectedDocument ? "1px solid #ccc" : "none",
            backgroundColor: document === selectedDocument ? "#f0f0f0" : "transparent",
            mb: 2,
          }}
        >
          <Typography variant="h6">{document.filename}</Typography>
          {document === selectedDocument && (
            <div className="pdf-container">
              <Document
                file={{
                  url: `http://localhost:5000/documents/${document.id}/download`,
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page key={index} pageNumber={index + 1}  />
                ))}
              </Document>
            </div>
          )}
        </Paper>
      ))}
    </Box>
  );
  
}

export default Documents;
