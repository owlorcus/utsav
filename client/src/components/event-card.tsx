import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";
import { Event, Category } from "@shared/schema";

interface EventCardProps {
  event: Event;
  variant?: 'featured' | 'upcoming';
}

const EventCard = ({ event, variant = 'featured' }: EventCardProps) => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const category = categories?.find(cat => cat.id === event.categoryId);
  
  if (variant === 'upcoming') {
    return (
      <Card className="event-card bg-[#FAFAFA] rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-md">
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-40 object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between mb-2">
            {category && (
              <Badge variant="outline" className="bg-[#138808] bg-opacity-10 text-[#138808] hover:bg-[#138808] hover:text-white">
                {category.name}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-bold mb-1 text-[#333333] font-poppins line-clamp-1">{event.title}</h3>
          <div className="flex items-center mb-1">
            <i className="ri-map-pin-line text-gray-500 mr-1"></i>
            <span className="text-xs text-gray-500">{event.location}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-calendar-line text-[#FF9933] mr-1"></i>
            <span className="text-xs text-gray-500">{formatDate(event.startDate)}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="event-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {event.isFeatured && (
          <div className="absolute top-4 right-4 bg-[#FF9933] text-white text-xs font-bold px-2 py-1 rounded">Featured</div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between mb-2">
          {category && (
            <Badge variant="outline" className="bg-[#138808] bg-opacity-10 text-[#138808] hover:bg-[#138808] hover:text-white">
              {category.name}
            </Badge>
          )}
          <span className="text-sm text-gray-500">
            <i className="ri-map-pin-line"></i> {event.location}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-[#333333] font-poppins line-clamp-1">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i className="ri-calendar-line text-[#FF9933] mr-1"></i>
            <span className="text-sm text-gray-500">{formatDate(event.startDate)}</span>
          </div>
          <Button 
            variant="link" 
            className="text-[#000080] font-medium text-sm p-0 h-auto"
            asChild
          >
            <Link href={`/events/${event.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
