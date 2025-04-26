import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/create", label: "Create" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#FF9933] font-poppins">Utsav</span>
              <span className="text-xs bg-[#138808] text-white px-2 py-1 rounded ml-2">Events</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  location === link.href 
                    ? "text-[#FF9933]" 
                    : "text-[#333333] hover:text-[#FF9933]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="bg-[#FAFAFA] hover:bg-gray-100 text-[#333333]"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button 
              className="bg-[#FF9933] hover:bg-opacity-90 text-white"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={closeMenu}
                      className={`font-medium transition-colors duration-200 py-2 ${
                        location === link.href 
                          ? "text-[#FF9933]" 
                          : "text-[#333333] hover:text-[#FF9933]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/login" onClick={closeMenu}>Login</Link>
                  </Button>
                  <Button 
                    className="w-full bg-[#FF9933] hover:bg-opacity-90 text-white"
                    asChild
                  >
                    <Link href="/signup" onClick={closeMenu}>Sign Up</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
