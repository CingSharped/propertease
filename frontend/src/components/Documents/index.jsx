import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [selectedFile, setSelectedFile] = useState(null);

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
      setSelectedDocument(null);
    } else {
      setSelectedDocument(document);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.post("http://localhost:5000/documents", formData);
        const newDocument = response.data;
        setDocuments([...documents, newDocument]);
        setSelectedFile(null);
        fetchDocuments();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const getButtonText = () => {
    if (selectedFile) {
      return selectedFile.name;
    } else {
      return "Choose a file";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <Grid container spacing={2}>
        {documents.map((document) => (
          <Grid item xs={12} key={document.id}>
            <Paper
              onClick={() => handleDocumentClick(document)}
              sx={{
                cursor: "pointer",
                p: 2,
                border: document === selectedDocument ? "1px solid #ccc" : "none",
                backgroundColor: document === selectedDocument ? "#f0f0f0" : "transparent",
              }}
            >
              <Typography variant="h6">{document.filename}</Typography>
              {document === selectedDocument && (
                <Box mt={2} className="pdf-container">
                  <Document
                    file={{
                      url: `http://localhost:5000/documents/${document.id}/download`,
                    }}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  >
                    {Array.from(new Array(numPages), (_, index) => (
                      <Page key={index} pageNumber={index + 1} />
                    ))}
                  </Document>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
                <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span" sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}>
            {getButtonText()}
          </Button>
        </label>
        <Button variant="contained" onClick={handleFileSubmit}>
          Upload
        </Button>
      </Box>
    </Box>
  );
}

export default Documents;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Document, Page, pdfjs } from "react-pdf";
// import Button from "@mui/material/Button";

// //import "./App.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// function App() {
//   const [documents, setDocuments] = useState([]);
//   const [numPages, setNumPages] = useState(null);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [scale, setScale] = useState(1.0);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/documents");
//       setDocuments(response.data);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   };

//   const handleDocumentClick = (document) => {
//     if (selectedDocument === document) {
//       setSelectedDocument(null);
//     } else {
//       setSelectedDocument(document);
//     }
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await axios.post(
//         "http://localhost:5000/documents",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const newDocument = response.data;
//       setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
//     } catch (error) {
//       console.error("Error uploading document:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Documents</h1>
//       <div className="upload-container">
//         <input type="file" onChange={handleFileChange} />
//         <Button variant="contained" onClick={handleFileSubmit}>
//           Upload
//         </Button>
//       </div>
//       {documents.map((document) => (
//         <div
//           key={document.id}
//           className={`document ${
//             document === selectedDocument ? "active" : ""
//           }`}
//           onClick={() => handleDocumentClick(document)}
//         >
//           <h2>{document.filename}</h2>
//           {document === selectedDocument && (
//             <div className="pdf-container">
//               <Document
//                 file={{
//                   url: `http://localhost:5000/documents/${document.id}/download`,
//                 }}
//                 onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//               >
//                 {Array.from(new Array(numPages), (_, index) => (
//                   <Page key={index} pageNumber={index + 1} scale={scale} />
//                 ))}
//               </Document>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
