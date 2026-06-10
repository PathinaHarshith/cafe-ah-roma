"use client";

import { useState, useEffect } from "react";
import { Star, Clock, ArrowRight } from "lucide-react";

interface Dish {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  time: string;
  rating: number;
}

const dishes: Dish[] = [
  {
    id: 1,
    title: "Curry Noodles",
    category: "Starters",
    price: "€15.00",
    image: "/images/menu_1.png",
    description: "Steaming aromatic noodles served in coconut curry broth with prawns and fresh greens.",
    time: "15 min",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Seafood Lasagne",
    category: "Pizza", // maps to a main dish tab
    price: "€18.50",
    image: "/images/menu_2.png",
    description: "Layered fresh pasta baked with cod, salmon, shrimp, mozzarella, and creamy bechamel.",
    time: "25 min",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Brunch Eggy Veg",
    category: "Salad",
    price: "€12.90",
    image: "/images/menu_3.png",
    description: "Toasted sourdough loaded with fresh avocado slices, cherry tomatoes, and soft egg.",
    time: "10 min",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Creamy Pasta",
    category: "Pizza",
    price: "€16.50",
    image: "/images/menu_4.png",
    description: "Artisanal fettuccine pasta in rich parmigiano cream sauce topped with succulent shrimp.",
    time: "20 min",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Shrimp Bites",
    category: "Starters",
    price: "€14.00",
    image: "/images/menu_5.png",
    description: "Crispy panko fried shrimp skewers served with homemade sweet chili dressing.",
    time: "12 min",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Steak & Veggies",
    category: "Beer", // steak goes well with beer/mains
    price: "€24.90",
    image: "/images/menu_6.png",
    description: "Pan-seared premium ribeye steak served with butter-roasted asparagus and baby garlic potatoes.",
    time: "30 min",
    rating: 5.0,
  },
];

const categories = ["All", "Starters", "Salad", "Tea", "Pizza", "Beer"];

export default function MenuGrid() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredDishes =
    activeTab === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeTab);

  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll(".parallax-food-img");
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // Don't calculate if offscreen
        if (rect.bottom < 0 || rect.top > viewHeight) return;

        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewHeight / 2;
        const offset = (elementCenter - viewportCenter) * 0.08;
        const clampedOffset = Math.max(-25, Math.min(25, offset));
        (img as HTMLElement).style.transform = `scale(1.15) translateY(${clampedOffset}px) translateZ(0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredDishes]);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === category
                ? "bg-primary text-white shadow-md transform scale-105"
                : "bg-white text-charcoal border border-charcoal/10 hover:border-primary/50 hover:bg-cream-dark"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredDishes.map((dish, index) => (
          <div
            key={dish.id}
            className="menu-card"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-2 border border-charcoal/5"
            >
              {/* Image Wrap */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="parallax-food-img w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{ transform: "scale(1.15) translateY(0) translateZ(0)" }}
                />
                {/* Price Tag Overlay */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-black text-primary shadow-sm font-sans tracking-wide">
                  {dish.price}
                </div>
              </div>

            {/* Content Wrap */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3 text-xs text-charcoal/50 font-bold uppercase tracking-widest">
                <span>{dish.category}</span>
                <div className="flex items-center gap-1.5 text-yellow-500 font-sans">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-charcoal font-black">{dish.rating.toFixed(1)}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2 font-bold group-hover:text-primary transition-colors duration-200">
                {dish.title}
              </h3>
              
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6 flex-grow font-sans font-light">
                {dish.description}
              </p>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-charcoal/60 text-xs font-bold uppercase tracking-wide">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{dish.time}</span>
                </div>

                <button className="flex items-center gap-2 text-primary hover:text-red-800 transition-colors duration-200 font-bold text-xs uppercase tracking-widest group/btn">
                  <span>Order Now</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                </button>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
