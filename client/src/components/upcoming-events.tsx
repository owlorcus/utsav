import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import EventCard from "@/components/event-card";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const UpcomingEvents = () => {
  const { data: upcomingEvents, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/upcoming'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${queryKey[0]}?limit=4`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#333333] font-poppins">Upcoming Events</h2>
          <Link href="/events" className="text-[#FF9933] hover:underline font-medium">
            View All <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-[#FAFAFA] rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2 mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {upcomingEvents?.map((event) => (
              <EventCard key={event.id} event={event} variant="upcoming" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
