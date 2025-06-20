![Screenshot 2025-06-18 182740](https://github.com/user-attachments/assets/222c8cf5-1bff-45c6-a770-31d7e24484d0) # Document Analytics System

A Searching, sorting and classification of document collections cloud-based service. The project was done as an assignment of the Cloud and Distributed Systems course (SICT 4313) at the Islamic University of Gaza.

 ## Features

- **Uploading of documents** : Uploading PDF documents to the system
- **Document Sorting**: Divide documents in terms of their titles
- **Document Search**: Search and find text with highlighted results
- **Document Classification**: Organize documents in folders according to content
- **Statistics**: See collection performance and statistics in documents

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Storage**: Browser localStorage (current implementation)
- **Future Cloud Integration**: Firebase (Storage, Firestore, Authentication)

 ## Project Structure
cloud-document-analytics/
├──index.html           User interface HTML file
├──styles.css        CSS styles of the application
├──app.js               The JavaScript code containing the entire functionality
├──README.md      Project notes

 ## Installation and Set up

1. Copy this repository:
git clone https://github.com/FarahWaseem/cloud-document-analytics.git

2. Open `index.html` in a web browser

3. The current implementation does not need any further installation

 ## Usage

 ### Uploading Documents

1. To select PDF documents click on choose file
2. Choose one or several PDF files
3. To process the documents, click Upload Files

 ### Sorting Documents

1. To sort documents alphabetically click, sort by title

 ### Searching Documents

1. Feed in keywords in the search box
2. To search matching documents, click in "Search"
3. The matches highlighted on search results will be displayed

### Classifying Documents

1. Touch Classify to classify documents
2. View category results of view classifications

 ## Implementation Details

### Document Storage

The present version stores document metadata as browser localStorage. This would be substituted with a Firebase Storage and Firestore in a production environment.

### Document Processing

**Title Extraction**: is currently based on the name of the file, and can be improved to scrap based on the contents on PDF
**Search Algorithm**: Just simple matching keywords and highlighting them
**Classification Algorithm**; Keyword based classification to preset categories

### Performance Metrics

The application reads and shows:
The total documents and size of documents
- Sorting work time
- Searching time
- Operation time of classification

## Future Enhancements

Switch to Firebase cloud storage and processing
- Extract a PDF text by PDF.js
- Introduce user authentication and sharing of documents
- Apply classification using machine learning
Add support to other document types (DOCX, TXT )

## Screenshots
![Screenshot 2025-06-18 182701](https://github.com/user-attachments/assets/5a9429b2-9d02-44ce-82bc-45c36762e6d1)
![Screenshot 2025-06-18 182713](https://github.com/user-attachments/assets/79903062-2ac4-46f6-b8dc-265ef455f58c)
![Screenshot 2025-06-18 182740](https://github.com/user-attachments/assets/07ce1485-fdbb-4354-aae4-f5f8f94fc91b)
![Screenshot 2025-06-18 182754](https://github.com/user-attachments/assets/231d9cc2-ff60-4884-ab84-e7d570de0a6f)

## Author

Farah Waseem Skaik

## License

This project is not licensed to be distributed and is given in as an academic requirement.

## Acknowledgments

- Dr. Rebhi S. Baraka, Course Instructor
- Islamic University of Gaza, Faculty of Information Technology
