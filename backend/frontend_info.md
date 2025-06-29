# 🚀 Frontend Developer Handoff: Marketplace API

## API Base URL

```
Development: http://localhost:8000/api/
Production: https://your-domain.com/api/
```

**🆕 NEW: AI Mentor Chatbot available at `/api/mentor/` endpoints!**

---

## 📋 Authentication Flow

### 1. User Registration

```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPass123!",
  "password_confirm": "StrongPass123!",
  "role": "STUDENT"  // Options: STUDENT, STARTUP, MENTOR, ADMIN
}
```

**Response (201):**

```json
{
	"user": {
		"id": 1,
		"username": "john_doe",
		"email": "john@example.com",
		"role": "STUDENT",
		"is_active": false,
		"date_joined": "2025-06-29T10:00:00Z"
	},
	"message": "Registration successful. Please check your email for verification."
}
```

### 2. Email Verification

```http
GET /api/auth/verify-email/?token=abc123xyz
```

**Response (200):**

```json
{
	"message": "Email verified successfully"
}
```

### 3. User Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

**Response (200):**

```json
{
	"access": "<jwt_access_token>",
	"refresh": "<jwt_refresh_token>",
	"user": {
		"id": 1,
		"username": "john_doe",
		"email": "john@example.com",
		"role": "STUDENT"
	}
}
```

### 4. Token Refresh

```http
POST /api/auth/refresh/
Content-Type: application/json

{
  "refresh": "<jwt_refresh_token>"
}
```

**Response (200):**

```json
{
	"access": "<new_jwt_access_token>"
}
```

---

## 👤 User Management

### Get Current User

```http
GET /api/users/me/
Authorization: Bearer {access_token}
```

### Update User Profile

```http
PUT /api/users/me/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "newemail@example.com"
}
```

### Change Password

```http
POST /api/users/change_password/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "old_password": "OldPass123!",
  "new_password": "NewPass123!"
}
```

---

## 🏪 Marketplace API

### Categories

#### List Categories

```http
GET /api/categories/
```

#### Create Category (Admin Only)

```http
POST /api/categories/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "New Category",
  "description": "Category description"
}
```

### Products

#### List Products with Filtering

```http
GET /api/products/?category=1&min_price=10&max_price=100&search=laptop&status=ACTIVE
```

#### Get Product Details

```http
GET /api/products/1/
```

#### Create Product (Startup Only)

```http
POST /api/products/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": "29.99",
  "discounted_price": "24.99",
  "inventory_count": 100,
  "category": 1,
  "image_urls": ["https://example.com/image.jpg"],
  "featured": false
}
```

#### Update Product (Startup Owner Only)

```http
PUT /api/products/1/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": "34.99",
  "inventory_count": 80
}
```

#### Delete Product (Startup Owner Only)

```http
DELETE /api/products/1/
Authorization: Bearer {access_token}
```

### Reviews

#### Add Product Review

```http
POST /api/products/1/reviews/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great product! Highly recommended."
}
```

### Orders

#### List User Orders

```http
GET /api/orders/
Authorization: Bearer {access_token}
```

#### Create Order

```http
POST /api/orders/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "items": [
    { "product": 1, "quantity": 2 },
    { "product": 3, "quantity": 1 }
  ]
}
```

#### Get Order Details

```http
GET /api/orders/1/
Authorization: Bearer {access_token}
```

---

## 🤖 Mentor Chatbot API

### Chat with AI Mentor

```http
POST /api/mentor/chat/
Content-Type: application/json

{
  "message": "How do I validate my startup idea?",
  "session_id": "user-session-123"  // Optional: auto-generated if not provided
}
```

**Response (200):**

```json
{
	"response": "Validation is crucial! Here's how: 1) Talk to 50+ potential customers...",
	"session_id": "user-session-123",
	"response_type": "faq_match", // greeting, faq_match, goodbye, fallback
	"suggestions": [
		"How do I validate my startup idea?",
		"What makes a good business model?"
	],
	"category": "startup_basics"
}
```

### Get Chat History

```http
GET /api/mentor/history/{session_id}/
```

### Browse FAQ Categories

```http
GET /api/mentor/categories/
```

**Response:**

```json
{
	"categories": [
		{
			"key": "startup_basics",
			"display_name": "Startup Basics",
			"count": 3
		},
		{ "key": "funding", "display_name": "Funding & Investment", "count": 3 }
	]
}
```

### Browse FAQ Entries

```http
GET /api/mentor/faqs/?category=funding
```

### Get Mentor Suggestions

```http
GET /api/mentor/suggestions/
```

**Response:**

```json
{
	"suggestions": ["How do I get started?", "Tell me about funding"],
	"categories": ["startup_basics", "funding", "team_building"]
}
```

---

## 🎨 React Integration Examples

### Authentication Hook

```javascript
// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (token) {
			fetchUser();
		} else {
			setLoading(false);
		}
	}, []);

	const fetchUser = async () => {
		try {
			const response = await fetch(
				"http://localhost:8000/api/users/me/",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"access_token"
						)}`,
					},
				}
			);

			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
			} else {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
			}
		} catch (error) {
			console.error("Error fetching user:", error);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		const response = await fetch("http://localhost:8000/api/auth/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("access_token", data.access);
			localStorage.setItem("refresh_token", data.refresh);
			setUser(data.user);
			return { success: true };
		} else {
			const error = await response.json();
			return { success: false, error };
		}
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
```

### API Client

```javascript
// utils/api.js
const API_BASE_URL = "http://localhost:8000/api";

class ApiClient {
	async request(endpoint, options = {}) {
		const token = localStorage.getItem("access_token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
			...options,
		};

		const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

		if (response.status === 401) {
			// Token expired, try to refresh
			const refreshed = await this.refreshToken();
			if (refreshed) {
				// Retry original request
				config.headers[
					"Authorization"
				] = `Bearer ${localStorage.getItem("access_token")}`;
				return fetch(`${API_BASE_URL}${endpoint}`, config);
			} else {
				// Redirect to login
				window.location.href = "/login";
			}
		}

		return response;
	}

	async refreshToken() {
		const refreshToken = localStorage.getItem("refresh_token");
		if (!refreshToken) return false;

		try {
			const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("access_token", data.access);
				return true;
			}
		} catch (error) {
			console.error("Token refresh failed:", error);
		}

		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		return false;
	}

	// Products
	async getProducts(params = {}) {
		const queryString = new URLSearchParams(params).toString();
		const response = await this.request(`/products/?${queryString}`);
		return response.json();
	}

	async getProduct(id) {
		const response = await this.request(`/products/${id}/`);
		return response.json();
	}

	async createProduct(productData) {
		const response = await this.request("/products/", {
			method: "POST",
			body: JSON.stringify(productData),
		});
		return response.json();
	}

	// Orders
	async createOrder(orderData) {
		const response = await this.request("/orders/", {
			method: "POST",
			body: JSON.stringify(orderData),
		});
		return response.json();
	}

	async getOrders() {
		const response = await this.request("/orders/");
		return response.json();
	}

	// Chatbot
	async sendChatMessage(message, sessionId) {
		const response = await this.request("/mentor/chat/", {
			method: "POST",
			body: JSON.stringify({ message, session_id: sessionId }),
		});
		return response.json();
	}

	async getChatHistory(sessionId) {
		const response = await this.request(`/mentor/history/${sessionId}/`);
		return response.json();
	}

	async getFAQCategories() {
		const response = await this.request("/mentor/categories/");
		return response.json();
	}

	async getFAQs(category) {
		const query = category ? `?category=${category}` : "";
		const response = await this.request(`/mentor/faqs/${query}`);
		return response.json();
	}
}

export default new ApiClient();
```

### Product Component Example

```javascript
// components/ProductCard.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import ApiClient from "../utils/api";

const ProductCard = ({ product }) => {
	const { user } = useAuth();

	const handleAddToCart = async () => {
		if (!user) {
			// Redirect to login
			return;
		}

		try {
			await ApiClient.createOrder({
				items: [{ product: product.id, quantity: 1 }],
			});
			// Show success message
		} catch (error) {
			// Handle error
			console.error("Failed to add to cart:", error);
		}
	};

	return (
		<div className="product-card">
			<img src={product.image_urls[0]} alt={product.name} />
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<div className="price">
				{product.discounted_price ? (
					<>
						<span className="original-price">${product.price}</span>
						<span className="discounted-price">
							${product.discounted_price}
						</span>
					</>
				) : (
					<span className="price">${product.price}</span>
				)}
			</div>
			<div className="rating">
				⭐ {product.average_rating} ({product.review_count} reviews)
			</div>
			<button onClick={handleAddToCart}>Add to Cart</button>
		</div>
	);
};

export default ProductCard;
```

---

## 📖 API Documentation

-   **Swagger UI**: `http://localhost:8000/api/docs/`
-   **ReDoc**: `http://localhost:8000/api/redoc/`
-   **OpenAPI Schema**: `http://localhost:8000/api/schema/`

---

## 🚀 Getting Started Commands

```bash
# Start the Django development server
cd banckend
python manage.py runserver

# Create sample data
python manage.py create_sample_data

# Run tests
python manage.py test

# Create superuser
python manage.py createsuperuser
```

---

## 🔧 Environment Variables for Frontend

Create a `.env` file in your React project:

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_WEBSOCKET_URL=ws://localhost:8000/ws
```

---

## 📝 Notes for Frontend Developer

1. **Authentication**: JWT tokens expire in 60 minutes. Implement auto-refresh logic.
2. **Rate Limiting**: Auth endpoints are rate-limited. Show appropriate messages.
3. **Permissions**: Different user roles have different capabilities. Check user.role.
4. **Image Uploads**: Currently using URLs. Implement file upload if needed.
5. **Real-time**: WebSocket support can be added for real-time features.
6. **Pagination**: All list endpoints support pagination. Use `page` parameter.
7. **Search**: Products support full-text search in name and description.
8. **Filtering**: Multiple filters can be combined for products.
9. **🆕 Chatbot**: AI Mentor provides startup guidance with FAQ matching and session tracking.

**Happy coding! 🎉 The backend is ready with AI mentor support!**
