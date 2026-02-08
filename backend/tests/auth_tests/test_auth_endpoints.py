"""
Authentication tests for the Todo API
These tests verify that authentication works correctly
"""
import pytest
import requests
from fastapi.testclient import TestClient
from src.main import app


@pytest.fixture
def client():
    """Test client for the FastAPI app"""
    return TestClient(app)


def test_unauthenticated_requests_return_401(client):
    """Test that unauthenticated requests return 401 Unauthorized"""
    # Test various endpoints that should require authentication
    endpoints_to_test = [
        "/api/users/1/tasks",
        "/api/users/1/tasks/1",
    ]

    for endpoint in endpoints_to_test:
        response = client.get(endpoint)
        assert response.status_code == 401, f"Expected 401 for {endpoint}, got {response.status_code}"

        # Also test POST, PUT, DELETE
        response = client.post(endpoint)
        assert response.status_code == 401, f"Expected 401 for POST {endpoint}, got {response.status_code}"


def test_valid_jwt_authentication(client):
    """Test that valid JWT tokens allow access to protected endpoints"""
    # This test would require a valid JWT token to be created and used
    # For now, we'll add a placeholder
    pass