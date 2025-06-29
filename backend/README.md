# Marketplace API Backend

A production-ready Django REST Framework project with JWT authentication, role-based access control, and marketplace functionality for startups, students, mentors, and products.

## Features

-   **JWT Authentication** with access and refresh tokens
-   **Role-based Access Control** (Student, Startup, Mentor, Admin)
-   **Email Verification** with token-based system
-   **Marketplace Management** with products, categories, and reviews
-   **Order Management** with inventory tracking
-   **Rate Limiting** on authentication endpoints
-   **API Documentation** with Swagger UI and ReDoc
-   **Comprehensive Testing** with 80%+ coverage target
-   **Production-ready Security** settings

## Tech Stack

-   **Django 4.2.7** - Web framework
-   **Django REST Framework 3.14.0** - API framework
-   **djangorestframework-simplejwt 5.3.0** - JWT authentication
-   **django-cors-headers** - CORS handling
-   **django-ratelimit** - Rate limiting
-   **django-filter** - Filtering and search
-   **drf-spectacular** - API documentation
-   **SQLite** - Database (configurable)

## Project Structure

```
banckend/
├── banckend/          # Main project settings
├── core/              # Cross-cutting utilities
│   ├── exceptions.py  # Custom exceptions
│   ├── mixins.py      # Common mixins and pagination
│   ├── permissions.py # Custom permissions
│   └── validators.py  # Password complexity validator
├── users/             # User management and authentication
│   ├── models.py      # User, Profile, EmailVerificationToken
│   ├── serializers.py # User-related serializers
│   ├── views.py       # Authentication and user views
│   └── urls.py        # User endpoints
└── marketplace/       # Marketplace functionality
    ├── models.py      # StartupProfile, Product, Order, etc.
    ├── serializers.py # Marketplace serializers
    ├── views.py       # Marketplace views
    ├── filters.py     # Product filtering
    └── urls.py        # Marketplace endpoints
```

## Quick Start

### 1. Setup Environment

```bash
# Clone the repository
cd /path/to/project

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your settings
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# Security Settings
SECRET_KEY=your-secret-key-here-replace-with-strong-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Database (optional - defaults to SQLite)
DATABASE_URL=sqlite:///db.sqlite3

# JWT Settings
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7
JWT_ROTATE_REFRESH_TOKENS=True
JWT_BLACKLIST_AFTER_ROTATION=True

# Email Settings (for development)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

### 3. Database Setup

```bash
# Run migrations
python banckend/manage_fixed.py migrate

# Create superuser
python banckend/manage_fixed.py createsuperuser

# (Optional) Create sample data
python banckend/manage_fixed.py create_sample_data
```

### 4. Run Server

```bash
# Start development server
python banckend/manage_fixed.py runserver

# API will be available at:
# - http://127.0.0.1:8000/api/
# - API Docs: http://127.0.0.1:8000/api/docs/
# - Admin: http://127.0.0.1:8000/admin/
```

## API Endpoints

### Authentication

-   `POST /api/auth/register/` - User registration
-   `POST /api/auth/login/` - User login (get JWT tokens)
-   `POST /api/auth/token/refresh/` - Refresh access token
-   `GET /api/auth/verify-email/?token=...` - Email verification

### User Management

-   `GET /api/users/me/` - Get current user details
-   `POST /api/users/change_password/` - Change password
-   `GET,POST,PUT,PATCH /api/profiles/` - Profile management

### Marketplace

#### Categories

-   `GET /api/categories/` - List all categories
-   `POST /api/categories/` - Create category (admin only)

#### Startup Profiles

-   `GET /api/startup-profiles/` - List startup profiles
-   `POST /api/startup-profiles/` - Create startup profile (startup users only)
-   `POST /api/startup-profiles/{id}/verify/` - Verify startup (admin only)

#### Products

-   `GET /api/products/` - List products (with filtering and search)
-   `POST /api/products/` - Create product (startup users only)
-   `GET /api/products/{id}/` - Get product details
-   `PUT,PATCH /api/products/{id}/` - Update product (owner only)
-   `DELETE /api/products/{id}/` - Delete product (owner only)
-   `POST /api/products/{id}/add_review/` - Add product review
-   `GET /api/products/{id}/reviews/` - Get product reviews

#### Orders

-   `GET /api/orders/` - List user orders
-   `POST /api/orders/` - Create order
-   `POST /api/orders/{id}/cancel/` - Cancel order

### Filtering and Search

#### Products

-   `?search=query` - Search in name, description, startup name
-   `?category=id` - Filter by category
-   `?min_price=100&max_price=500` - Price range filter
-   `?status=ACTIVE` - Filter by status
-   `?featured=true` - Show only featured products
-   `?in_stock=true` - Show only products with inventory
-   `?ordering=-created_at` - Order by field

## User Roles

### Student (Default)

-   Can browse and search products
-   Can create and manage own profile
-   Can place orders and write reviews

### Startup

-   All Student permissions
-   Can create and manage startup profile
-   Can create and manage products
-   Can view own orders for their products

### Mentor

-   All Student permissions
-   Can access mentor-specific features (future expansion)

### Admin

-   Full access to all resources
-   Can verify startup profiles
-   Can manage categories
-   Can manage all users and orders

## Authentication Flow

1. **Registration**: `POST /api/auth/register/`

    - Create account with email, password, role
    - Email verification token sent (console output in dev)

2. **Email Verification**: `GET /api/auth/verify-email/?token=...`

    - Verify email address with token

3. **Login**: `POST /api/auth/login/`

    - Get access and refresh tokens
    - Include tokens in subsequent requests

4. **API Requests**: Include JWT token in header

    ```
    Authorization: Bearer <access_token>
    ```

5. **Token Refresh**: `POST /api/auth/token/refresh/`
    - Get new access token using refresh token

## Testing

### Run Tests

```bash
# Run all tests
python banckend/manage_fixed.py test

# Run specific app tests
python banckend/manage_fixed.py test users
python banckend/manage_fixed.py test marketplace

# Run with coverage
coverage run --source='.' banckend/manage_fixed.py test
coverage report
coverage html  # Generate HTML report
```

### Test Coverage Areas

-   **Authentication**: Registration, login, email verification
-   **User Management**: Profile creation, password changes
-   **Marketplace**: Product CRUD, order creation, reviews
-   **Permissions**: Role-based access control
-   **API Responses**: Consistent error handling

## Security Features

### Authentication Security

-   JWT tokens with configurable expiration
-   Refresh token rotation and blacklisting
-   Rate limiting on auth endpoints (5 attempts/minute)
-   Strong password validation requirements

### API Security

-   CORS configuration for frontend integration
-   Custom exception handling with consistent responses
-   Permission-based access control
-   Input validation on all endpoints

### Django Security

-   Secure cookie settings for production
-   HSTS and security middleware
-   SQL injection prevention (Django ORM)
-   XSS protection headers

## Production Deployment

### Environment Setup

1. Set `DEBUG=False` in production
2. Configure `ALLOWED_HOSTS` for your domain
3. Set strong `SECRET_KEY`
4. Configure production database (PostgreSQL recommended)
5. Set up proper email backend (SMTP)
6. Configure HTTPS and secure cookies

### Database Migration

```bash
python manage.py migrate
python manage.py collectstatic
```

### Recommended Production Stack

-   **Web Server**: Nginx
-   **WSGI Server**: Gunicorn
-   **Database**: PostgreSQL
-   **Cache**: Redis
-   **Email**: SMTP service (SendGrid, AWS SES)
-   **Media Storage**: AWS S3 or similar

## API Documentation

-   **Swagger UI**: http://localhost:8000/api/docs/
-   **ReDoc**: http://localhost:8000/api/redoc/
-   **OpenAPI Schema**: http://localhost:8000/api/schema/

## Development Commands

```bash
# Create new migration
python manage.py make migrations [app_name]

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run shell
python manage.py shell

# Create sample data
python manage.py create_sample_data

# Run tests
python manage.py test

# Check deployment readiness
python manage.py check --deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure virtual environment is activated and all packages installed
2. **Migration Issues**: Check model definitions and run `makemigrations`
3. **Authentication Issues**: Verify JWT settings and token format
4. **Permission Denied**: Check user roles and permissions configuration

### Debug Mode

Set `DEBUG=True` in `.env` for detailed error messages during development.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:

1. Check the API documentation at `/api/docs/`
2. Review the test files for usage examples
3. Check Django and DRF documentation
4. Create an issue in the repository

---

## 🎯 Demo User Credentials for Testing

For hackathon testing and demonstration purposes, use these pre-created user accounts:

### Admin User

-   **Username**: `admin_demo`
-   **Email**: `admin@demo.com`
-   **Password**: `admin123!`
-   **Role**: Admin
-   **Permissions**: Full access to all resources, can manage users, verify startups

### Student User

-   **Username**: `student_demo`
-   **Email**: `student@demo.com`
-   **Password**: `student123!`
-   **Role**: Student
-   **Permissions**: Browse products, place orders, write reviews

### Startup User

-   **Username**: `startup_demo`
-   **Email**: `startup@demo.com`
-   **Password**: `startup123!`
-   **Role**: Startup
-   **Permissions**: Create products, manage startup profile, view orders

### Mentor User

-   **Username**: `mentor_demo`
-   **Email**: `mentor@demo.com`
-   **Password**: `mentor123!`
-   **Role**: Mentor
-   **Permissions**: Student permissions + mentor-specific features

### Quick Login Test

```bash
# Test login with curl
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "student@demo.com", "password": "student123!"}'

# Expected response includes access and refresh tokens
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 2,
    "username": "student_demo",
    "email": "student@demo.com",
    "role": "STUDENT"
  }
}
```

### Create Demo Users Command

```bash
# Run this command to create all demo users
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()

demo_users = [
    {'username': 'admin_demo', 'email': 'admin@demo.com', 'password': 'admin123!', 'role': 'ADMIN'},
    {'username': 'student_demo', 'email': 'student@demo.com', 'password': 'student123!', 'role': 'STUDENT'},
    {'username': 'startup_demo', 'email': 'startup@demo.com', 'password': 'startup123!', 'role': 'STARTUP'},
    {'username': 'mentor_demo', 'email': 'mentor@demo.com', 'password': 'mentor123!', 'role': 'MENTOR'},
]

for user_data in demo_users:
    user, created = User.objects.get_or_create(
        username=user_data['username'],
        defaults={'email': user_data['email'], 'role': user_data['role'], 'is_active': True}
    )
    user.set_password(user_data['password'])
    user.save()
    print(f'✅ {user.username} - Ready')
"
```

---

## 🤖 AI Mentor Chatbot

The marketplace now includes an AI mentor chatbot to help students with startup guidance:

### Chatbot API Endpoints

-   `POST /api/mentor/chat/` - Chat with AI mentor
-   `GET /api/mentor/history/{session_id}/` - Get chat history
-   `GET /api/mentor/categories/` - Browse FAQ categories
-   `GET /api/mentor/faqs/` - Browse FAQ entries
-   `GET /api/mentor/suggestions/` - Get mentor suggestions

### Quick Chatbot Test

```bash
# Test the chatbot
curl -X POST http://localhost:8000/api/mentor/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I validate my startup idea?", "session_id": "demo-123"}'

# Response includes mentor advice and suggestions
{
  "response": "Validation is crucial! Here's how: 1) Talk to 50+ potential customers...",
  "session_id": "demo-123",
  "response_type": "faq_match",
  "suggestions": ["How do I validate my startup idea?", "What makes a good business model?"],
  "category": "startup_basics"
}
```

### Chatbot Features

-   ✅ **12+ FAQ entries** covering startup basics, funding, team building
-   ✅ **Smart keyword matching** for relevant responses
-   ✅ **Session tracking** with conversation history
-   ✅ **Contextual suggestions** for follow-up questions
-   ✅ **Category-based browsing** of mentor knowledge
-   ✅ **Ready for LLM integration** for future expansion
