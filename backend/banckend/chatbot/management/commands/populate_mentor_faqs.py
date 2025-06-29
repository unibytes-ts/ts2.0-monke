"""
Management command to populate the chatbot with startup mentor FAQ data.
"""

from django.core.management.base import BaseCommand
from chatbot.models import FAQEntry


class Command(BaseCommand):
    help = "Populate the chatbot with startup mentor FAQ data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear existing FAQ entries before adding new ones",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            FAQEntry.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing FAQ entries"))

        startup_faqs = [
            # Startup Basics
            {
                "question": "How do I get started with my startup idea?",
                "answer": "Great question! Start by validating your idea - talk to potential customers, research the market, and identify the problem you're solving. Then create a simple business plan outlining your solution, target market, and revenue model. Consider building an MVP (Minimum Viable Product) to test your concept with real users.",
                "keywords": "startup,idea,getting started,begin,how to start,new business",
                "category": "startup_basics",
                "priority": 5,
            },
            {
                "question": "How do I validate my startup idea?",
                "answer": "Validation is crucial! Here's how: 1) Talk to 50+ potential customers about their problems, 2) Research your competition, 3) Create a landing page and measure interest, 4) Build an MVP and get real user feedback, 5) Look for patterns in customer responses. Remember: customer feedback is gold!",
                "keywords": "validate,validation,idea,market research,customers,feedback",
                "category": "startup_basics",
                "priority": 5,
            },
            {
                "question": "What makes a good business model?",
                "answer": "A strong business model clearly defines: 1) Your value proposition (what problem you solve), 2) Target customers, 3) Revenue streams (how you make money), 4) Cost structure, 5) Key partnerships, 6) Distribution channels. Focus on solving a real problem people will pay for!",
                "keywords": "business model,revenue,value proposition,monetization",
                "category": "startup_basics",
                "priority": 4,
            },
            # Funding
            {
                "question": "How do I raise seed funding?",
                "answer": "Seed funding typically comes from: 1) Personal savings (bootstrapping), 2) Friends & family, 3) Angel investors, 4) Seed VCs, 5) Accelerators/incubators. You'll need a compelling pitch deck, traction data, and a clear plan for using the funds. Start networking early and focus on investors who understand your industry.",
                "keywords": "funding,seed,investment,angel,vc,money,capital",
                "category": "funding",
                "priority": 5,
            },
            {
                "question": "What do investors look for in startups?",
                "answer": "Investors evaluate: 1) Strong founding team with relevant experience, 2) Large addressable market, 3) Clear competitive advantage, 4) Traction and growth metrics, 5) Scalable business model, 6) Clear path to profitability. They invest in people first, then ideas. Show them you can execute!",
                "keywords": "investors,investment,what investors want,pitch,traction",
                "category": "funding",
                "priority": 4,
            },
            {
                "question": "How much equity should I give to investors?",
                "answer": "Equity depends on stage and amount raised. Seed rounds: 10-25%, Series A: 15-30%. Key factors: company valuation, amount raised, investor value-add, market conditions. Remember: it's better to own a smaller piece of a successful company than 100% of nothing. Get legal advice!",
                "keywords": "equity,shares,ownership,dilution,valuation",
                "category": "funding",
                "priority": 3,
            },
            # Team Building
            {
                "question": "How do I find a co-founder?",
                "answer": "Look for co-founders in: 1) Your network (colleagues, classmates), 2) Startup events and meetups, 3) Online communities (AngelList, FounderGroups), 4) Accelerators, 5) Industry conferences. Choose someone with complementary skills, shared vision, and strong work ethic. Take time to know them well before committing!",
                "keywords": "co-founder,cofounder,partner,team,founding team",
                "category": "team_building",
                "priority": 4,
            },
            {
                "question": "What skills should my startup team have?",
                "answer": "Essential early-stage skills: 1) Technical (product development), 2) Business development (sales, partnerships), 3) Marketing/Growth, 4) Operations, 5) Financial management. You don't need experts in everything initially, but cover the core functions. Hire for attitude and aptitude, not just experience.",
                "keywords": "team,skills,hiring,roles,talents,expertise",
                "category": "team_building",
                "priority": 3,
            },
            # Product Development
            {
                "question": "How do I build an MVP?",
                "answer": "MVP (Minimum Viable Product) should: 1) Solve one core problem well, 2) Have minimal features that deliver value, 3) Be built quickly and cheaply, 4) Allow for user feedback collection. Use no-code tools, wireframes, or simple prototypes. Remember: MVP is about learning, not perfection!",
                "keywords": "mvp,minimum viable product,prototype,product development",
                "category": "product_development",
                "priority": 4,
            },
            {
                "question": "How do I get user feedback for my product?",
                "answer": "Collect feedback through: 1) User interviews and surveys, 2) Analytics and usage data, 3) Beta testing programs, 4) Customer support conversations, 5) Social media monitoring, 6) In-app feedback tools. Ask specific questions and focus on user behavior, not just opinions. Iterate based on patterns!",
                "keywords": "feedback,user testing,product feedback,customer input",
                "category": "product_development",
                "priority": 3,
            },
            # Platform Usage
            {
                "question": "How do I use this marketplace platform?",
                "answer": "Welcome to our marketplace! As a student: browse products, place orders, write reviews. As a startup: create your profile, list products, manage orders. Use the search and filters to find what you need. Check our API docs for technical integration. Need help? Contact our support team!",
                "keywords": "platform,marketplace,how to use,help,guide,tutorial",
                "category": "platform",
                "priority": 4,
            },
            {
                "question": "How do I register and set up my profile?",
                "answer": 'Easy! Click "Sign Up", choose your role (Student/Startup/Mentor), fill in your details, and verify your email. Students can create profiles and browse products. Startups can create company profiles and list products. Update your profile regularly to build trust with other users.',
                "keywords": "register,registration,signup,profile,account",
                "category": "platform",
                "priority": 5,
            },
        ]

        created_count = 0
        for faq_data in startup_faqs:
            faq, created = FAQEntry.objects.get_or_create(
                question=faq_data["question"], defaults=faq_data
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created {created_count} FAQ entries. "
                f"Total FAQs in database: {FAQEntry.objects.count()}"
            )
        )

        # Show summary by category
        categories = FAQEntry.objects.values_list("category", flat=True).distinct()
        self.stdout.write("\nFAQ Summary by Category:")
        for category in categories:
            count = FAQEntry.objects.filter(category=category).count()
            self.stdout.write(f"  {category}: {count} FAQs")
