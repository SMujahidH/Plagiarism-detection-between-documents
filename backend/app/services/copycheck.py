import os
import re
import chardet
from docx import Document
import fitz  # PyMuPDF for PDF processing
from typing import List, Dict, Union
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_text(text: str) -> str:
    """
    Preprocess text by removing special characters and converting to lowercase.
    """
    text = re.sub(r'[^\w\s]', '', text)  # Remove special characters
    text = text.lower()  # Convert to lowercase
    return text

def extract_text_from_docx(file_path: str) -> str:
    """
    Extract text from a DOCX file.
    """
    doc = Document(file_path)
    return preprocess_text("\n".join([para.text for para in doc.paragraphs]))

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """
    pdf = fitz.open(file_path)
    text = ""
    for page in pdf:
        text += page.get_text()
    pdf.close()
    return preprocess_text(text)

def extract_text_from_txt(file_path: str) -> str:
    """
    Extract text from a TXT file, handling encoding.
    """
    with open(file_path, "rb") as file:
        raw_data = file.read()
        detected_encoding = chardet.detect(raw_data)['encoding']
        if not detected_encoding:
            raise ValueError("Unable to detect file encoding.")
        text = raw_data.decode(detected_encoding)
    return preprocess_text(text)

def load_text_from_file(file_path: str) -> str:
    """
    Load and process text from a file based on its extension.
    """
    if file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    elif file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith(".txt"):
        return extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_path}")


def compute_similarity(file_paths: List[str], threshold: float = 50.0) -> List[Dict[str, Union[str, float, bool]]]:
    """
    Compute plagiarism scores between multiple documents and filter by threshold.
    """
    # Load and preprocess text from files
    documents = [load_text_from_file(file) for file in file_paths]

    # Vectorize documents using TF-IDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)

    # Compute cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Generate similarity results
    results = []
    for i in range(len(file_paths)):
        for j in range(i + 1, len(file_paths)):
            similarity_score = float(cosine_sim[i][j]) * 100  # Convert to percentage
            is_significant = similarity_score >= threshold
            results.append({
                "file1": os.path.basename(file_paths[i]),
                "file2": os.path.basename(file_paths[j]),
                "similarity": similarity_score,
                "is_significant": bool(is_significant)  # Convert numpy.bool_ to Python bool
            })
    return results