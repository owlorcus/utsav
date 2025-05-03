import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[#FF9933] font-poppins">Evexa</span>
              <span className="text-xs bg-[#138808] text-white px-2 py-1 rounded ml-2">Events</span>
            </div>
            <p className="text-gray-400 mb-4">The ultimate platform for finding, creating, and managing events across India.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/create" className="text-gray-400 hover:text-white transition-colors">Create Event</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/events?category=wedding" className="text-gray-400 hover:text-white transition-colors">Weddings</Link></li>
              <li><Link href="/events?category=corporate" className="text-gray-400 hover:text-white transition-colors">Corporate Events</Link></li>
              <li><Link href="/events?category=cultural" className="text-gray-400 hover:text-white transition-colors">Cultural Festivals</Link></li>
              <li><Link href="/events?category=religious" className="text-gray-400 hover:text-white transition-colors">Religious Celebrations</Link></li>
              <li><Link href="/events?category=social" className="text-gray-400 hover:text-white transition-colors">Social Gatherings</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="ri-map-pin-line text-[#FF9933] mr-2 mt-1"></i>
                <span className="text-gray-400">123 Event Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line text-[#FF9933] mr-2"></i>
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line text-[#FF9933] mr-2"></i>
                <span className="text-gray-400">info@evexaevents.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Evexa Events. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
