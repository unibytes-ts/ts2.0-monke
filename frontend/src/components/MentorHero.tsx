import React from "react";
import { Button } from "@/components/ui/button";

const mentorCards = [
  {
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Amulya",
    caption: "Amulya helps you get into IV league",
    style: "left-0 top-0 -rotate-12"
  },
  {
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sanjay",
    caption: "Sanjay guides you through competitive exam",
    style: "left-8 top-40 rotate-6"
  },
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Karan",
    caption: "Karan guides you in your preparation for competition",
    style: "right-0 top-0 rotate-12"
  },
  {
    img: "https://randomuser.me/api/portraits/men/43.jpg",
    name: "Riya",
    caption: "Riya helps you secure a spot at prestigious Ivy League.",
    style: "right-8 top-40 -rotate-6"
  }
];

const MentorHero = () => {
  return (
    <section className="relative w-full min-h-[540px] flex flex-col items-center justify-center px-2 sm:px-6 md:px-10 pt-10 pb-10 md:pt-16 md:pb-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0.5\' y=\'0.5\' width=\'39\' height=\'39\' rx=\'7.5\' fill=\'white\' stroke=\'%23E5E7EB\'/%3E%3C/svg%3E')] bg-repeat opacity-60 z-0" />

      {/* Floating mentor/mentee cards */}
      {mentorCards.map((card, idx) => (
        <div
          key={idx}
          className={`hidden md:flex flex-col items-center shadow-lg bg-white rounded-xl border border-gray-200 p-4 w-36 absolute ${card.style} z-10`}
        >
          <img
            src={card.img}
            alt={card.name}
            className="rounded-xl w-20 h-20 object-cover mb-2 border-4 border-white"
          />
          <span className="text-xs text-gray-900 text-center font-medium leading-tight mt-1">{card.caption}</span>
        </div>
      ))}

      {/* Centered content */}
      <div className="relative z-20 flex flex-col items-center max-w-2xl mx-auto text-center px-2">
        <div className="flex gap-4 mb-6 justify-center items-center">
          <Button variant="secondary" size="sm" className="rounded-full text-base font-normal px-4 py-1">For Mentee</Button>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
          Connect with a Mentor<br />who will guide you!
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Learn from People, who’ve been there, done that
        </p>
        <Button 
          variant="primary" 
          className="mt-4"
          onClick={() => {
            const mentorsSection = document.getElementById('mentors-list');
            if (mentorsSection) {
              mentorsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Book a Mentor
        </Button>
      </div>
    </section>
  );
};

export default MentorHero;
