"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MarqueeTicker from "./components/MarqueeTicker";
import MenuGrid from "./components/MenuGrid";
import TestimonialCarousel from "./components/TestimonialCarousel";
import { 
  Sparkles, 
  ArrowRight, 
  Utensils, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Mail 
} from "lucide-react";
import Link from "next/link";

const Facebook = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Instagram = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Intersection Observer for scroll-reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(
      ".reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up"
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Split scroll into Phase 1 (zoom/text fade in: 0% to 30%) and Phase 2 (shrink/parallax: 30% to 100%)
  const zoomProgress = Math.min(scrollProgress / 0.3, 1);
  const shrinkProgress = scrollProgress > 0.3 ? (scrollProgress - 0.3) / 0.7 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-cream selection:bg-primary selection:text-white font-sans text-charcoal overflow-x-clip">
      {/* Sticky Navigation Wrapper (fades in on scroll) */}
      <div 
        className="sticky top-0 z-50 transition-opacity duration-100 ease-out"
        style={{ 
          opacity: zoomProgress,
          pointerEvents: zoomProgress > 0.1 ? "auto" : "none"
        }}
      >
        <Header />
      </div>

      {/* Hero Scroll Track Container */}
      <section 
        ref={containerRef}
        id="home"
        className="relative w-full h-[170vh] bg-charcoal"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          {/* Background Solid Color Fade */}
          <div className="absolute inset-0 bg-charcoal z-0" />
          <div 
            className="absolute inset-0 bg-cream z-0 pointer-events-none transition-opacity duration-100 ease-out" 
            style={{ opacity: shrinkProgress }}
          />

          {/* Scaling Card Wrapper */}
          <div 
            className="relative w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center will-change-transform transition-all duration-100 ease-out"
            style={{
              transform: `scale(${1 - shrinkProgress * 0.12})`,
              borderRadius: `${shrinkProgress * 48}px`,
            }}
          >
            {/* Background Video with Dark & Warm Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                src="/videos/hero_bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${1 + zoomProgress * 0.25 - shrinkProgress * 0.15}) translateY(${shrinkProgress * 60}px) translateZ(0)`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85" />
            </div>

            {/* Content Container (Fades in during Phase 1, floats up during Phase 2) */}
            <div 
              className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center z-10 transition-all duration-100 ease-out"
              style={{
                opacity: zoomProgress,
                transform: `translateY(${-shrinkProgress * 50}px) translateZ(0)`,
                pointerEvents: zoomProgress > 0.1 ? "auto" : "none"
              }}
            >
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-cream text-xs uppercase tracking-widest font-black mb-8 animate-bounce">
                <Sparkles className="h-3.5 w-3.5 text-cream" />
                <span>Gourmet Dine-In & Delivery</span>
              </div>

              {/* Main Headline */}
              <div className="relative mb-8 max-w-4xl">
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white font-black leading-none tracking-tight uppercase">
                  Mood Made <br />
                  <span className="text-primary relative inline-block">
                    By Cafe Ah-Roma
                    {/* Vintage Badge / Sticker */}
                    <span className="absolute -top-6 -right-16 rotate-12 bg-white text-primary text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-md shadow-lg border border-primary/10 hidden sm:inline-block animate-wiggle">
                      New Taste!
                    </span>
                  </span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-12 font-sans font-light leading-relaxed">
                Make your mood & moment extra special with gourmet food at your table, prepared by master chefs for you & your loved ones.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#menu"
                  className="bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-xs px-8 py-4.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md shadow-primary/20"
                >
                  <span>Order Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#reservation"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold uppercase tracking-widest text-xs px-8 py-4.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm"
                >
                  Reserve Table
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quote / Introduction Section */}
      <section id="about" className="py-24 bg-cream-dark relative overflow-hidden border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Chef Circular Photo */}
            <div className="lg:col-span-3 flex justify-center reveal-fade-left">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/images/chef_left.png"
                    alt="Chef Prepping Food"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Centered Large Quote */}
            <div className="lg:col-span-6 text-center px-4 reveal-scale-up">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-black leading-tight uppercase tracking-tight mb-8">
                "The people said Cafe Ah-Roma deserves damn great taste, and cleaner processes. World class standards."
              </h2>
              <Link
                href="#story"
                className="inline-flex items-center gap-2 text-primary hover:text-red-800 transition-colors font-bold uppercase tracking-widest text-xs border-b-2 border-primary/20 hover:border-primary pb-1"
              >
                <span>Read Our Story</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Right Chef Circular Photo */}
            <div className="lg:col-span-3 flex justify-center reveal-fade-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/images/chef_right.png"
                    alt="Chef Plating Dessert"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Upper Scrolling Marquee */}
      <MarqueeTicker />

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 reveal-fade-up">
            <span className="text-xs uppercase tracking-widest font-black text-primary mb-3 block">Ah-Roma Specialties</span>
            <h2 className="font-serif text-4xl sm:text-6xl text-charcoal font-black uppercase">
              Our Menu
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          {/* Interactive Menu Grid */}
          <div className="reveal-scale-up">
            <MenuGrid />
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              href="#full-menu"
              className="inline-flex items-center gap-2 bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-xs px-10 py-4.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md shadow-primary/20"
            >
              <span>View All Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Mid-Hero Section */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video with Low Opacity & Warm Overlay */}
        <div className="absolute inset-0">
          <video
            src="/videos/hero_bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10 reveal-fade-up">
          <h2 className="font-serif text-4xl sm:text-6xl text-white font-black uppercase tracking-tight mb-6 leading-tight">
            Perfect Food For <br className="hidden sm:inline" />
            Any Occasion
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10 font-sans font-light leading-relaxed">
            From intimate date nights and lively family reunions to elegant corporate dinners, we craft memories with gourmet culinary spreads.
          </p>
          <Link
            href="#reservation"
            className="bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-xs px-8 py-4.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-md shadow-primary/20"
          >
            <span>Book A Table</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Brand Workflow: How Cafe Ah-Roma Made Food */}
      <section className="py-24 bg-cream-dark border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-fade-up">
            <span className="text-xs uppercase tracking-widest font-black text-primary mb-3 block">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-black uppercase">
              How Cafe Ah-Roma Makes Food
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-charcoal/5 hover:shadow-md transition-shadow reveal-fade-up hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Utensils className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-4 font-bold uppercase">
                Fresh & Organic
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans font-light">
                We partner with local organic farms to source only the freshest produce, certified free-range meats, and sustainable seafood.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              className="bg-white rounded-3xl p-8 text-center shadow-sm border border-charcoal/5 hover:shadow-md transition-shadow reveal-fade-up hover-lift"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-4 font-bold uppercase">
                Expertly Crafted
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans font-light">
                Our culinary team treats cooking as fine art, blending traditional Italian secret recipes with modern culinary styling.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              className="bg-white rounded-3xl p-8 text-center shadow-sm border border-charcoal/5 hover:shadow-md transition-shadow reveal-fade-up hover-lift"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-4 font-bold uppercase">
                Hygienic Processes
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed font-sans font-light">
                We maintain clinical hygiene standards inside our kitchen and storage, following top global sanitation safety protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Scrolling Marquee - Reversed */}
      <MarqueeTicker reverse={true} />

      {/* Testimonials Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-fade-up">
            <span className="text-xs uppercase tracking-widest font-black text-primary mb-3 block">Our Guest Experience</span>
            <h2 className="font-serif text-4xl sm:text-6xl text-charcoal font-black uppercase">
              Good Folks That Already Truly Love Cafe Ah-Roma
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          {/* Testimonial Cards */}
          <div className="reveal-scale-up">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="locations" className="py-12 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Location 1: Gallarate */}
            <div className="relative rounded-3xl overflow-hidden h-[450px] group shadow-lg reveal-fade-left">
              <img
                src="/images/location_1.png"
                alt="Cafe Ah-Roma Gallarate"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-start text-white">
                <span className="inline-flex items-center gap-1 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <MapPin className="h-3 w-3" />
                  Gallarate Store
                </span>
                <h3 className="font-serif text-3xl font-bold uppercase mb-2">We Are In Gallarate</h3>
                <p className="text-sm text-white/80 font-sans font-light mb-1">Piazza della Libertà, 12, Gallarate VA, Italy</p>
                <div className="flex items-center gap-1.5 text-xs text-white/70 font-sans font-bold uppercase tracking-wide mb-6">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Mon-Sun: 08:00 AM - 11:00 PM</span>
                </div>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors"
                >
                  <span>View Location</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Location 2: Legnano */}
            <div className="relative rounded-3xl overflow-hidden h-[450px] group shadow-lg reveal-fade-right">
              <img
                src="/images/location_2.png"
                alt="Cafe Ah-Roma Legnano"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-start text-white">
                <span className="inline-flex items-center gap-1 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <MapPin className="h-3 w-3" />
                  Legnano Store
                </span>
                <h3 className="font-serif text-3xl font-bold uppercase mb-2">We Are In Legnano</h3>
                <p className="text-sm text-white/80 font-sans font-light mb-1">Corso Italia, 45, Legnano MI, Italy</p>
                <div className="flex items-center gap-1.5 text-xs text-white/70 font-sans font-bold uppercase tracking-wide mb-6">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Mon-Sun: 08:00 AM - 11:00 PM</span>
                </div>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors"
                >
                  <span>View Location</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instagram Feed Grid */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-fade-up">
            <span className="text-xs uppercase tracking-widest font-black text-primary mb-2 block">Visual Moments</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-black uppercase mb-3">
              Follow @CafeAhRoma
            </h2>
            <p className="text-sm text-charcoal/60 font-sans">Share your happy moments with us using #cafeahroma</p>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          {/* Grid of 5 Images */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="relative group rounded-2xl overflow-hidden aspect-square shadow-sm border border-charcoal/5 reveal-scale-up"
                style={{ transitionDelay: `${num * 100}ms` }}
              >
                <img
                  src={`/images/insta_${num}.png`}
                  alt={`Instagram Post ${num}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay with Instagram Icon */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Reservation Block */}
      <section id="reservation" className="py-24 bg-cream-dark border-t border-charcoal/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-charcoal/5 reveal-scale-up">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-black uppercase mb-3">Book A Table</h2>
            <p className="text-xs text-charcoal/60 font-sans uppercase tracking-wider font-bold">Secure your gourmet dining slot in seconds</p>
          </div>
          <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-cream rounded-xl border border-charcoal/10 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-primary font-medium"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 bg-cream rounded-xl border border-charcoal/10 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-primary font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-cream rounded-xl border border-charcoal/10 text-charcoal text-sm focus:outline-none focus:border-primary font-medium"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">Time Slot</label>
                <select className="w-full px-4 py-3 bg-cream rounded-xl border border-charcoal/10 text-charcoal text-sm focus:outline-none focus:border-primary font-medium">
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>06:00 PM</option>
                  <option>08:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">Guests Count</label>
                <select className="w-full px-4 py-3 bg-cream rounded-xl border border-charcoal/10 text-charcoal text-sm focus:outline-none focus:border-primary font-medium">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-red-800 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-md shadow-primary/20 transform hover:-translate-y-0.5"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </section>

      {/* Premium Multi-Column Red Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            {/* Brand Info */}
            <div className="md:col-span-4 flex flex-col items-start reveal-fade-up">
              <h3 className="font-serif text-3xl font-black tracking-widest uppercase mb-6">Cafe Ah-Roma</h3>
              <p className="text-sm text-white/80 font-sans font-light leading-relaxed mb-8 max-w-sm">
                Delicious food, exceptional coffees, and cozy ambiance. Make your day extra special with our world-class standard dining.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Twitter className="h-4.5 w-4.5" />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 reveal-fade-up" style={{ transitionDelay: "100ms" }}>
              <h4 className="text-xs uppercase tracking-widest font-black text-cream-dark mb-6">Menu</h4>
              <ul className="space-y-4 text-sm font-semibold tracking-wide text-white/85">
                <li><Link href="#menu" className="hover:text-cream transition-colors">All Specials</Link></li>
                <li><Link href="#menu" className="hover:text-cream transition-colors">Starters</Link></li>
                <li><Link href="#menu" className="hover:text-cream transition-colors">Salads</Link></li>
                <li><Link href="#menu" className="hover:text-cream transition-colors">Pizzas</Link></li>
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div className="md:col-span-2 reveal-fade-up" style={{ transitionDelay: "200ms" }}>
              <h4 className="text-xs uppercase tracking-widest font-black text-cream-dark mb-6">Useful Links</h4>
              <ul className="space-y-4 text-sm font-semibold tracking-wide text-white/85">
                <li><Link href="#about" className="hover:text-cream transition-colors">About Us</Link></li>
                <li><Link href="#locations" className="hover:text-cream transition-colors">Locations</Link></li>
                <li><Link href="#reservation" className="hover:text-cream transition-colors">Book a Table</Link></li>
                <li><Link href="#story" className="hover:text-cream transition-colors">Our Story</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-4 reveal-fade-up" style={{ transitionDelay: "300ms" }}>
              <h4 className="text-xs uppercase tracking-widest font-black text-cream-dark mb-6">Newsletter</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Subscribe to get gourmet recipe updates and special event discount announcements.
              </p>
              <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/15 text-white placeholder-white/50 text-xs px-4 py-3 rounded-l-xl focus:outline-none focus:bg-white/25 flex-grow border-0"
                />
                <button
                  type="submit"
                  className="bg-white text-primary hover:bg-cream-dark transition-colors px-4 py-3 rounded-r-xl"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-semibold tracking-wide gap-4">
            <p>© 2026 Cafe Ah-Roma. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
