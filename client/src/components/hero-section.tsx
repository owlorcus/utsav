import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection = ({ 
  title = "Celebrate India's Rich Cultural Events",
  subtitle = "Find, create, and manage all types of events from traditional celebrations to modern gatherings."
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden" style={{ height: "500px" }}>
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-[#FF9933] hover:bg-opacity-90 text-white"
              asChild
            >
              <Link href="/events">Find Events</Link>
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="bg-white hover:bg-opacity-90 text-[#333333]"
              asChild
            >
              <Link href="/create">Host an Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
