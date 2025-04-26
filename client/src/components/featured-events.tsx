import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import EventCard from "@/components/event-card";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedEvents = () => {
  const { data: featuredEvents, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/featured']
  });

  return (
    <section className="py-12 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#333333] font-poppins">Featured Events</h2>
          <Link href="/events" className="text-[#FF9933] hover:underline font-medium">
            View All <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents?.map((event) => (
              <EventCard key={event.id} event={event} variant="featured" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
