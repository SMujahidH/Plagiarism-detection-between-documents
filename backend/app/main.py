from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.copychecker import router as copychecker_router

app = FastAPI()

# Allow requests from specific origins (frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)


# Advanced plagiarism detection
app.include_router(copychecker_router, tags=["Copy Detection"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Plagiarism Detection API"}
