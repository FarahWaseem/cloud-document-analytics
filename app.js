/**
 * Cloud Document Analytics System
 *
 *Cloud-based document analytics features that this application offers are the following:
 *- Uploads and storage of documents
 *- Document sorting in titles
 *Search of the documents by keywords and highlighting
 *Classification of documents on the content level
 *Statistics of document collection
 *
 *The localStorage storage of current implementation is in browser
 *There is an option to implement in the future the Firebase cloud services
 *
 *Name of the Author: Farah Waseem Skaik
 *Time: June, 2025
 *Course: Cloud and Distributed Systems (SICT 4313)
 *Dr. Rebhi S. Baraka
 *
 *
 */

// Firebase configuration (for future cloud implementation)
const firebaseConfig = {
 apiKey: "AIzaSyCVA-84gUB_IPW8KXBZLx_YSA27pcPkxiw",
  authDomain: "cloud-document-analytics-dea7b.firebaseapp.com",
  projectId: "cloud-document-analytics-dea7b",
  storageBucket: "cloud-document-analytics-dea7b.firebasestorage.app",
  messagingSenderId: "441070003699",
  appId: "1:441070003699:web:09abb08784bd662b62de86",
  measurementId: "G-04KCWJ0SKR"
};

// Initialize Firebase (even if we don't use Storage in current implementation)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * DOM Element References
 * Get references to all HTML elements needed for interaction
 */
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const uploadProgress = document.getElementById("uploadProgress");
const documentsList = document.getElementById("documentsList");
const sortBtn = document.getElementById("sortBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");
const classifyBtn = document.getElementById("classifyBtn");
const classificationResults = document.getElementById("classificationResults");
const statsInfo = document.getElementById("statsInfo");

/**
 * Saves a document object to localStorage
 *
 * @param {Object} document - The document object to store
 * @param {string} document.id - Unique identifier for the document
 * @param {string} document.name - Original filename of the document
 * @param {number} document.size - Size of the document in bytes
 * @param {string} document.uploadDate - ISO date string of upload time
 * @param {string} document.title - Extracted or derived title
 * @param {string} document.category - Classification category
 */
function saveDocumentToLocalStorage(document) {
  // Get previously stored documents
  let documents = JSON.parse(localStorage.getItem("documents") || "[]");

  // Add new document
  documents.push(document);

  // Save updated array
  localStorage.setItem("documents", JSON.stringify(documents));
}

/**
 * Retrieves all documents from localStorage
 *
 * @returns {Array} Array of document objects
 */
function getDocumentsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("documents") || "[]");
}

/**
 * Handles file upload process
 * - Reads selected files
 * - Extracts metadata
 * - Simulates upload progress
 * - Stores document information
 * - Updates UI with results
 */
uploadBtn.addEventListener("click", async () => {
  const files = fileInput.files;
  if (files.length === 0) {
    alert("Please select at least one file");
    return;
  }

  uploadProgress.innerHTML = "Uploading...";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      // Simulate upload process
      uploadProgress.innerHTML = `Uploading ${file.name}: 0%`;

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay to simulate upload
        uploadProgress.innerHTML = `Uploading ${file.name}: ${progress}%`;
      }

      // Extract text from PDF (simulation)
      // In a real application, we would use PDF.js to extract text

      // Save file data in local storage
      const documentData = {
        id: Date.now().toString() + i, // Unique identifier
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        // Extract default title from filename
        title: file.name.replace(".pdf", "").replace(/_/g, " "),
        // Default classification
        category: file.name.toLowerCase().includes("cloud")
          ? "Cloud Computing"
          : file.name.toLowerCase().includes("data")
          ? "Data Analytics"
          : "Other",
      };

      saveDocumentToLocalStorage(documentData);

      uploadProgress.innerHTML += `<br>Successfully uploaded ${file.name}`;

      // Update document list
      loadDocuments();

      // Update statistics
      updateStats();
    } catch (error) {
      console.error("Error:", error);
      uploadProgress.innerHTML += `<br>Error occurred: ${error.message}`;
    }
  }
});

/**
 * Loads and displays all documents from storage
 * Updates the documentsList element with formatted HTML
 */
function loadDocuments() {
  try {
    const documents = getDocumentsFromLocalStorage();
    let html = "<ul>";
    documents.forEach((doc) => {
      html += `<li>
        <strong>${doc.title || doc.name}</strong> 
        <span>Size: ${formatFileSize(doc.size)}</span>
        <span>Category: ${doc.category || "Uncategorized"}</span>
      </li>`;
    });
    html += "</ul>";
    documentsList.innerHTML = html || "No documents found";
  } catch (error) {
    console.error("Error loading documents:", error);
    documentsList.innerHTML = "Error loading documents";
  }
}

/**
 * Formats file size in bytes to human-readable format
 *
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "1.23 MB")
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
  else return (bytes / 1048576).toFixed(2) + " MB";
}

/**
 * Updates statistics about document collection and performance
 * Displays information in the statsInfo element
 */
function updateStats() {
  try {
    const documents = getDocumentsFromLocalStorage();
    let totalSize = 0;
    let count = documents.length;

    documents.forEach((doc) => {
      totalSize += doc.size || 0;
    });

    const startTime = performance.now();

    // Simulate operations to measure performance
    const sortTime = measurePerformance(() => {
      const docs = [...documents];
      docs.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
    });

    const searchTime = measurePerformance(() => {
      const searchTerm = "cloud";
      documents.filter((doc) =>
        (doc.title || doc.name).toLowerCase().includes(searchTerm)
      );
    });

    const classifyTime = measurePerformance(() => {
      documents.forEach((doc) => {
        const name = (doc.title || doc.name).toLowerCase();
        if (name.includes("cloud")) doc._tempCategory = "Cloud Computing";
        else if (name.includes("data")) doc._tempCategory = "Data Analytics";
        else doc._tempCategory = "Other";
      });
    });

    statsInfo.innerHTML = `
      <p>Number of documents: ${count}</p>
      <p>Total size: ${formatFileSize(totalSize)}</p>
      <p>Sort operation time: ${sortTime.toFixed(2)} ms</p>
      <p>Search operation time: ${searchTime.toFixed(2)} ms</p>
      <p>Classification operation time: ${classifyTime.toFixed(2)} ms</p>
    `;
  } catch (error) {
    console.error("Error updating statistics:", error);
    statsInfo.innerHTML = "Error updating statistics";
  }
}

/**
 * Measures performance of a callback function
 *
 * @param {Function} callback - Function to measure
 * @returns {number} Execution time in milliseconds
 */
function measurePerformance(callback) {
  const start = performance.now();
  callback();
  return performance.now() - start;
}

/**
 * Sorts documents by title
 * Updates storage and UI with sorted results
 */
sortBtn.addEventListener("click", () => {
  try {
    const startTime = performance.now();

    const documents = getDocumentsFromLocalStorage();

    // Sort documents by title
    documents.sort((a, b) => {
      const titleA = (a.title || a.name).toLowerCase();
      const titleB = (b.title || b.name).toLowerCase();
      return titleA.localeCompare(titleB);
    });

    // Save sorted documents
    localStorage.setItem("documents", JSON.stringify(documents));

    const endTime = performance.now();
    const sortTime = endTime - startTime;

    // Update display
    loadDocuments();

    // Add confirmation message
    documentsList.innerHTML =
      `<p>Documents sorted by title (${sortTime.toFixed(2)} ms)</p>` +
      documentsList.innerHTML;
  } catch (error) {
    console.error("Error sorting documents:", error);
    documentsList.innerHTML = "Error sorting documents";
  }
});

/**
 * Searches documents for keywords
 * Displays results with highlighted matches
 */
searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    alert("Please enter search text");
    return;
  }

  try {
    const startTime = performance.now();

    const documents = getDocumentsFromLocalStorage();
    const results = documents.filter(
      (doc) =>
        (doc.title || doc.name).toLowerCase().includes(searchTerm) ||
        (doc.category || "").toLowerCase().includes(searchTerm)
    );

    const endTime = performance.now();
    const searchTime = endTime - startTime;

    if (results.length > 0) {
      let html = `<p>Search results for "${searchTerm}" (${searchTime.toFixed(
        2
      )} ms):</p><ul>`;
      results.forEach((doc) => {
        // Highlight search text
        let title = doc.title || doc.name;
        const highlightedTitle = title.replace(
          new RegExp(searchTerm, "gi"),
          (match) => `<mark>${match}</mark>`
        );

        html += `<li>
          <strong>${highlightedTitle}</strong>
          <span>Category: ${doc.category || "Uncategorized"}</span>
        </li>`;
      });
      html += "</ul>";
      searchResults.innerHTML = html;
    } else {
      searchResults.innerHTML = `<p>No results found for "${searchTerm}" (${searchTime.toFixed(
        2
      )} ms)</p>`;
    }
  } catch (error) {
    console.error("Error searching:", error);
    searchResults.innerHTML = "Error during search";
  }
});

/**
 * Classifies documents based on content keywords
 * Updates storage and UI with classification results
 */
classifyBtn.addEventListener("click", () => {
  try {
    const startTime = performance.now();

    const documents = getDocumentsFromLocalStorage();

    // Classify documents based on keywords in title
    documents.forEach((doc) => {
      const name = (doc.title || doc.name).toLowerCase();

      if (
        name.includes("cloud") ||
        name.includes("aws") ||
        name.includes("azure")
      ) {
        doc.category = "Cloud Computing";
      } else if (
        name.includes("data") ||
        name.includes("analytics") ||
        name.includes("analysis")
      ) {
        doc.category = "Data Analytics";
      } else if (name.includes("security") || name.includes("privacy")) {
        doc.category = "Security";
      } else if (name.includes("ai") || name.includes("machine learning")) {
        doc.category = "Artificial Intelligence";
      } else {
        doc.category = "Other";
      }
    });

    // Save classified documents
    localStorage.setItem("documents", JSON.stringify(documents));

    const endTime = performance.now();
    const classifyTime = endTime - startTime;

    // Display classification results
    let categories = {};
    documents.forEach((doc) => {
      const category = doc.category || "Uncategorized";
      categories[category] = (categories[category] || 0) + 1;
    });

    let html = `<p>Classification results (${classifyTime.toFixed(
      2
    )} ms):</p><ul>`;
    for (const [category, count] of Object.entries(categories)) {
      html += `<li>${category}: ${count} document(s)</li>`;
    }
    html += "</ul>";

    classificationResults.innerHTML = html;

    // Update document list
    loadDocuments();
  } catch (error) {
    console.error("Error classifying:", error);
    classificationResults.innerHTML = "Error during classification";
  }
});

// Initialize application when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadDocuments();
  updateStats();
});
