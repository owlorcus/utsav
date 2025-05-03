import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Evexa Events</title>
        <meta name="description" content="Learn about Evexa Events - India's premier event management platform" />
      </Helmet>
      
      <HeroSection 
        title="About Evexa Events"
        subtitle="India's premier platform for finding and organizing cultural and modern events"
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333]">Our Story</h2>
              <p className="mb-6">
                Evexa Events was founded in 2023 with a simple mission: to make event discovery and management 
                easier for everyone in India. Our platform brings together event organizers and attendees 
                in a seamless digital experience that celebrates India's rich cultural heritage while embracing 
                modern event trends.
              </p>
              
              <p className="mb-6">
                We understand the unique characteristics of Indian events - from elaborate weddings that span 
                multiple days to corporate functions that blend tradition with professionalism. Our platform is 
                designed with these cultural nuances in mind, offering features specifically tailored to the 
                Indian context.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333] mt-12">Our Mission</h2>
              <p className="mb-6">
                At Evexa Events, our mission is to simplify the event management process while promoting and 
                preserving India's rich cultural traditions. We aim to be the bridge that connects event organizers 
                with their target audiences, providing tools that make event creation, discovery, and attendance 
                a joy rather than a challenge.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center p-6 bg-[#FAFAFA] rounded-lg">
                  <div className="text-[#FF9933] text-3xl mb-4">
                    <i className="ri-heart-line"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cultural Relevance</h3>
                  <p className="text-sm">We celebrate and promote India's diverse cultural events and traditions.</p>
                </div>
                
                <div className="text-center p-6 bg-[#FAFAFA] rounded-lg">
                  <div className="text-[#FF9933] text-3xl mb-4">
                    <i className="ri-global-line"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                  <p className="text-sm">We make event management tools accessible to organizers of all sizes.</p>
                </div>
                
                <div className="text-center p-6 bg-[#FAFAFA] rounded-lg">
                  <div className="text-[#FF9933] text-3xl mb-4">
                    <i className="ri-shield-check-line"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trust & Quality</h3>
                  <p className="text-sm">We ensure high-quality event listings and reliable service for all users.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333]">Our Team</h2>
              <p className="mb-6">
                Evexa Events is powered by a passionate team of event industry experts, technology enthusiasts, 
                and cultural aficionados. With backgrounds spanning event management, software development, and 
                digital marketing, our diverse team brings together the perfect blend of skills needed to create 
                an exceptional platform for the Indian events ecosystem.
              </p>
              
              <p>
                We are headquartered in Mumbai, with team members across major Indian cities including Delhi, 
                Bangalore, and Chennai, ensuring we understand the regional nuances of events across the country.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
