import HeroSection from "@/components/hero-section";
import SearchSection from "@/components/search-section";
import CategoriesSection from "@/components/categories-section";
import FeaturedEvents from "@/components/featured-events";
import UpcomingEvents from "@/components/upcoming-events";
import CreateEventCTA from "@/components/create-event-cta";
import Testimonials from "@/components/testimonials";
import MobileAppSection from "@/components/mobile-app-section";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Utsav Events - Indian Event Management Platform</title>
        <meta name="description" content="Find, create, and manage all types of Indian events from traditional celebrations to modern gatherings." />
      </Helmet>
      
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedEvents />
      <UpcomingEvents />
      <CreateEventCTA />
      <Testimonials />
      <MobileAppSection />
    </>
  );
};

export default Home;
