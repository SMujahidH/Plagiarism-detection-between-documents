from fastapi import APIRouter, UploadFile, File, Query
from typing import List
from ..services.copycheck import compute_similarity
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/api/copy-plagiarism/")
async def advanced_plagiarism(
    files: List[UploadFile] = File(...),
    threshold: float = Query(50.0, description="Similarity threshold in percentage")
):
    """
    API endpoint for advanced plagiarism detection between multiple files.
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_paths = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        file_paths.append(file_path)

    # Compute similarity
    raw_results = compute_similarity(file_paths, threshold)

    # Cleanup uploaded files
    for path in file_paths:
        os.remove(path)

    # Format the results
    results = [
        {
            "file1": result["file1"],
            "file2": result["file2"],
            "similarity": f"{result['similarity']:.2f}%",
            "is_significant": result["is_significant"]
        }
        for result in raw_results
    ]

    return {"results": results}
