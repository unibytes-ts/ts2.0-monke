"""
Management command to create sample data for the marketplace project.
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import random
from decimal import Decimal

from marketplace.models import (
    Category,
    StartupProfile,
    Product,
    ProductReview,
    Order,
    OrderItem,
)

User = get_user_model()


class Command(BaseCommand):
    help = "Create sample data for the marketplace"

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing data before creating new data",
        )

    def handle(self, *args, **options):
        if options["flush"]:
            self.stdout.write("Flushing existing data...")
            self.flush_data()

        self.stdout.write("Creating sample data...")

        # Create sample users
        users = self.create_users()
        self.stdout.write(f"Created {len(users)} users")

        # Create sample categories
        categories = self.create_categories()
        self.stdout.write(f"Created {len(categories)} categories")

        # Create startup profiles
        startup_profiles = self.create_startup_profiles(users)
        self.stdout.write(f"Created {len(startup_profiles)} startup profiles")

        # Create sample products
        products = self.create_products(startup_profiles, categories)
        self.stdout.write(f"Created {len(products)} products")

        # Create sample reviews
        reviews = self.create_reviews(users, products)
        self.stdout.write(f"Created {len(reviews)} reviews")

        # Create sample orders
        orders = self.create_orders(users, products)
        self.stdout.write(f"Created {len(orders)} orders")

        self.stdout.write(self.style.SUCCESS("Successfully created sample data!"))

        # Print summary
        self.print_summary()

    def flush_data(self):
        """Delete existing data."""
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        ProductReview.objects.all().delete()
        Product.objects.all().delete()
        StartupProfile.objects.all().delete()
        Category.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

    def create_users(self):
        """Create sample users with different roles."""
        users = []

        # Create admin user
        admin, created = User.objects.get_or_create(
            email="admin@marketplace.com",
            defaults={
                "username": "admin",
                "first_name": "Admin",
                "last_name": "User",
                "role": "ADMIN",
                "is_verified": True,
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            admin.set_password("admin123")
            admin.save()
        users.append(admin)

        # Create startup users
        startup_data = [
            ("TechFlow", "tech@techflow.com", "Tech", "Flow"),
            ("InnovateLab", "contact@innovatelab.com", "Innovate", "Lab"),
            ("StartupHub", "hello@startuphub.com", "Startup", "Hub"),
            ("CreativeSpace", "team@creativespace.com", "Creative", "Space"),
            ("FutureWorks", "info@futureworks.com", "Future", "Works"),
        ]

        for company, email, first_name, last_name in startup_data:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": "STARTUP",
                    "is_verified": True,
                },
            )
            if created:
                user.set_password("password123")
                user.save()
            users.append(user)

        # Create student users
        student_data = [
            ("student1@university.edu", "John", "Doe"),
            ("student2@university.edu", "Jane", "Smith"),
            ("student3@university.edu", "Mike", "Johnson"),
            ("student4@university.edu", "Sarah", "Wilson"),
            ("student5@university.edu", "Alex", "Brown"),
        ]

        for email, first_name, last_name in student_data:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": "STUDENT",
                    "is_verified": True,
                },
            )
            if created:
                user.set_password("password123")
                user.save()
            users.append(user)

        # Create mentor users
        mentor_data = [
            ("mentor1@company.com", "Robert", "Anderson"),
            ("mentor2@company.com", "Lisa", "Davis"),
        ]

        for email, first_name, last_name in mentor_data:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": "MENTOR",
                    "is_verified": True,
                },
            )
            if created:
                user.set_password("password123")
                user.save()
            users.append(user)

        return users

    def create_categories(self):
        """Create sample product categories."""
        categories_data = [
            ("Technology", "Software, hardware, and tech gadgets"),
            ("Education", "Educational tools and learning resources"),
            ("Health", "Health and wellness products"),
            ("Finance", "Financial tools and services"),
            ("Entertainment", "Games, media, and entertainment"),
            ("Productivity", "Tools to enhance productivity"),
            ("E-commerce", "Online shopping and marketplace solutions"),
            ("Social", "Social networking and communication tools"),
        ]

        categories = []
        for name, description in categories_data:
            category, created = Category.objects.get_or_create(
                name=name, defaults={"description": description}
            )
            categories.append(category)

        return categories

    def create_startup_profiles(self, users):
        """Create startup profiles for startup users."""
        startup_users = [u for u in users if u.role == "STARTUP"]
        startup_data = [
            {
                "company_name": "TechFlow Solutions",
                "website": "https://techflow.com",
                "description": "Innovative software solutions for modern businesses",
                "founded_date": timezone.now().date() - timedelta(days=365),
                "verified": True,
            },
            {
                "company_name": "InnovateLab Inc",
                "website": "https://innovatelab.com",
                "description": "Research and development for cutting-edge technologies",
                "founded_date": timezone.now().date() - timedelta(days=800),
                "verified": True,
            },
            {
                "company_name": "StartupHub",
                "website": "https://startuphub.com",
                "description": "Platform connecting startups with investors",
                "founded_date": timezone.now().date() - timedelta(days=500),
                "verified": False,
            },
            {
                "company_name": "CreativeSpace Studio",
                "website": "https://creativespace.com",
                "description": "Digital creative tools and design solutions",
                "founded_date": timezone.now().date() - timedelta(days=300),
                "verified": True,
            },
            {
                "company_name": "FutureWorks Labs",
                "website": "https://futureworks.com",
                "description": "AI and machine learning solutions",
                "founded_date": timezone.now().date() - timedelta(days=600),
                "verified": True,
            },
        ]

        profiles = []
        for i, user in enumerate(startup_users):
            if i < len(startup_data):
                profile, created = StartupProfile.objects.get_or_create(
                    user=user, defaults=startup_data[i]
                )
                profiles.append(profile)

        return profiles

    def create_products(self, startup_profiles, categories):
        """Create sample products."""
        products_data = [
            # TechFlow Solutions products
            {
                "name": "CloudSync Pro",
                "description": "Advanced cloud synchronization tool for teams",
                "price": Decimal("99.99"),
                "inventory_count": 100,
                "status": "ACTIVE",
                "featured": True,
            },
            {
                "name": "DataFlow Analytics",
                "description": "Real-time data analytics dashboard",
                "price": Decimal("199.99"),
                "inventory_count": 50,
                "status": "ACTIVE",
                "featured": False,
            },
            # InnovateLab products
            {
                "name": "IoT Sensor Kit",
                "description": "Complete IoT development kit with sensors",
                "price": Decimal("299.99"),
                "inventory_count": 25,
                "status": "ACTIVE",
                "featured": True,
            },
            {
                "name": "Smart Home Controller",
                "description": "Central hub for smart home automation",
                "price": Decimal("149.99"),
                "inventory_count": 75,
                "status": "ACTIVE",
                "featured": False,
            },
            # StartupHub products
            {
                "name": "Investor Connect Platform",
                "description": "Platform to connect startups with investors",
                "price": Decimal("499.99"),
                "inventory_count": 10,
                "status": "ACTIVE",
                "featured": False,
            },
            # CreativeSpace products
            {
                "name": "Design Studio Pro",
                "description": "Professional design software suite",
                "price": Decimal("79.99"),
                "inventory_count": 200,
                "status": "ACTIVE",
                "featured": True,
            },
            {
                "name": "Creative Assets Library",
                "description": "Extensive library of design assets",
                "price": Decimal("29.99"),
                "inventory_count": 500,
                "status": "ACTIVE",
                "featured": False,
            },
            # FutureWorks products
            {
                "name": "AI Chatbot Builder",
                "description": "No-code AI chatbot creation platform",
                "price": Decimal("149.99"),
                "inventory_count": 100,
                "status": "ACTIVE",
                "featured": True,
            },
            {
                "name": "ML Model Trainer",
                "description": "Machine learning model training toolkit",
                "price": Decimal("299.99"),
                "inventory_count": 30,
                "status": "ACTIVE",
                "featured": False,
            },
        ]

        products = []
        for i, data in enumerate(products_data):
            startup_profile = startup_profiles[i % len(startup_profiles)]
            category = categories[i % len(categories)]

            product, created = Product.objects.get_or_create(
                name=data["name"],
                startup=startup_profile,
                defaults={
                    **data,
                    "category": category,
                    "image_urls": [
                        f"https://example.com/images/product_{i+1}_1.jpg",
                        f"https://example.com/images/product_{i+1}_2.jpg",
                    ],
                },
            )
            products.append(product)

        return products

    def create_reviews(self, users, products):
        """Create sample product reviews."""
        student_users = [u for u in users if u.role == "STUDENT"]
        reviews = []

        review_data = [
            (
                5,
                "Excellent product!",
                "Really impressed with the quality and features.",
            ),
            (4, "Very good", "Works well, minor issues but overall satisfied."),
            (5, "Outstanding!", "Exceeded my expectations. Highly recommended."),
            (3, "Decent", "Good product but could use some improvements."),
            (4, "Good value", "Worth the money, good features for the price."),
            (5, "Perfect!", "Exactly what I needed. Great user experience."),
            (4, "Solid choice", "Reliable and well-built. Happy with purchase."),
            (3, "Average", "Does the job but nothing special."),
        ]

        for i, product in enumerate(products[: len(review_data)]):
            user = student_users[i % len(student_users)]
            rating, title, comment = review_data[i]

            review, created = ProductReview.objects.get_or_create(
                product=product,
                user=user,
                defaults={
                    "rating": rating,
                    "title": title,
                    "comment": comment,
                    "is_verified_purchase": random.choice([True, False]),
                },
            )
            if created:
                reviews.append(review)

        return reviews

    def create_orders(self, users, products):
        """Create sample orders."""
        student_users = [u for u in users if u.role == "STUDENT"]
        orders = []

        for i, user in enumerate(
            student_users[:3]
        ):  # Create orders for first 3 students
            # Create order
            order = Order.objects.create(
                user=user,
                order_number=f"ORD-{str(i+1).zfill(8)}",
                status=random.choice(["PENDING", "CONFIRMED", "SHIPPED"]),
                shipping_address={
                    "street": f"{123 + i} Main Street",
                    "city": "Anytown",
                    "state": "CA",
                    "postal_code": f"9000{i}",
                    "country": "USA",
                },
                notes=f"Sample order {i+1}",
                total_amount=Decimal("0.00"),  # Will be calculated
            )

            # Add 1-3 random products to the order
            order_products = random.sample(products, random.randint(1, 3))
            total_amount = Decimal("0.00")

            for product in order_products:
                quantity = random.randint(1, 3)
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    unit_price=product.price,
                )
                total_amount += product.price * quantity

            # Update order total
            order.total_amount = total_amount
            order.save()

            orders.append(order)

        return orders

    def print_summary(self):
        """Print a summary of created data."""
        self.stdout.write("\n" + "=" * 50)
        self.stdout.write("SAMPLE DATA SUMMARY")
        self.stdout.write("=" * 50)
        self.stdout.write(f"Users: {User.objects.count()}")
        self.stdout.write(f'  - Admins: {User.objects.filter(role="ADMIN").count()}')
        self.stdout.write(
            f'  - Startups: {User.objects.filter(role="STARTUP").count()}'
        )
        self.stdout.write(
            f'  - Students: {User.objects.filter(role="STUDENT").count()}'
        )
        self.stdout.write(f'  - Mentors: {User.objects.filter(role="MENTOR").count()}')
        self.stdout.write("")
        self.stdout.write(f"Categories: {Category.objects.count()}")
        self.stdout.write(f"Startup Profiles: {StartupProfile.objects.count()}")
        self.stdout.write(
            f"  - Verified: {StartupProfile.objects.filter(verified=True).count()}"
        )
        self.stdout.write(f"Products: {Product.objects.count()}")
        self.stdout.write(
            f'  - Active: {Product.objects.filter(status="ACTIVE").count()}'
        )
        self.stdout.write(
            f"  - Featured: {Product.objects.filter(featured=True).count()}"
        )
        self.stdout.write(f"Reviews: {ProductReview.objects.count()}")
        self.stdout.write(f"Orders: {Order.objects.count()}")
        self.stdout.write("")
        self.stdout.write("Test Credentials:")
        self.stdout.write("  Admin: admin@marketplace.com / admin123")
        self.stdout.write("  Startup: tech@techflow.com / password123")
        self.stdout.write("  Student: student1@university.edu / password123")
        self.stdout.write("  Mentor: mentor1@company.com / password123")
        self.stdout.write("=" * 50)
