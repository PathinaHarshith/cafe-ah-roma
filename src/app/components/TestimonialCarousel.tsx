"use client";

import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marco Rossi",
    role: "Local Foodie",
    avatar: "/images/avatar_1.png",
    quote: "Cafe Ah-Roma has completely redefined brunch for me. The Avocado sourdough and the espresso are absolute perfection!",
    stars: 5,
  },
  {
    id: 2,
    name: "Sophia Lorenz",
    role: "Culinary Blogger",
    avatar: "/images/avatar_2.png",
    quote: "Their Seafood Lasagne deserves world-class recognition. The flavors are extremely rich, and the service is incredibly friendly.",
    stars: 5,
  },
  {
    id: 3,
    name: "Alex Valli",
    role: "Coffee Aficionado",
    avatar: "/images/avatar_3.png",
    quote: "Clean, hygienic, and authentic Italian food with a contemporary twist. The atmosphere is warm and exceptionally inviting.",
    stars: 5,
  },
  {
    id: 4,
    name: "Elena Bianchi",
    role: "Regular Customer",
    avatar: "/images/avatar_4.png",
    quote: "The steak is seared to perfection every single time. A fantastic place to bring family and celebrate special moments.",
    stars: 5,
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-charcoal/5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center gap-0.5 text-primary mb-4">
                {[...Array(testi.stars)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-charcoal/80 leading-relaxed italic mb-6 font-sans font-light">
                "{testi.quote}"
              </p>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pt-4 border-t border-charcoal/5">
              <img
                src={testi.avatar}
                alt={testi.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-charcoal">
                  {testi.name}
                </h4>
                <p className="text-xs text-charcoal/50 font-sans">{testi.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
