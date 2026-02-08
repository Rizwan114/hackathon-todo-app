from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .api import task_routes, auth_routes
from .database.database import create_db_and_tables
from .handlers.auth_errors import unauthorized_exception_handler, forbidden_exception_handler
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
from fastapi import HTTPException as FastAPIHTTPException

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    yield
    # Shutdown (if needed)

app = FastAPI(
    title="Todo Backend API",
    description="REST API for managing user tasks in the Todo Full-Stack Web Application",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(task_routes.router, prefix="/api", tags=["tasks"])

# Add error handlers
app.add_exception_handler(FastAPIHTTPException, unauthorized_exception_handler)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Backend API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}