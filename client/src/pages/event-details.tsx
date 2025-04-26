import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Event, Category } from "@shared/schema";
import { formatDate } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

const bookingSchema = z.object({
  tickets: z.coerce.number().min(1, "Please select at least 1 ticket").max(10, "Maximum 10 tickets allowed"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const EventDetails = () => {
  const [match, params] = useRoute("/events/:id");
  const [_, setLocation] = useLocation();
  const eventId = params?.id ? parseInt(params.id) : 0;
  const { toast } = useToast();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Get event details
  const { data: event, isLoading: isEventLoading } = useQuery<Event>({
    queryKey: [`/api/events/${eventId}`],
    enabled: !!eventId,
  });

  // Get categories to display category name
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const category = categories?.find(cat => cat.id === event?.categoryId);

  // Booking form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tickets: 1,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const totalAmount = (event?.price || 0) * data.tickets;
      
      return apiRequest("POST", "/api/bookings", {
        userId: 1, // In a real app, this would be the logged-in user's ID
        eventId,
        tickets: data.tickets,
        totalAmount,
        status: "pending"
      });
    },
    onSuccess: () => {
      toast({
        title: "Booking successful!",
        description: "Your event booking has been confirmed.",
        variant: "default",
      });
      setIsBookingDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    bookingMutation.mutate(data);
  };

  // Redirect if event doesn't exist
  useEffect(() => {
    if (!isEventLoading && !event) {
      setLocation("/events");
      toast({
        title: "Event not found",
        description: "The event you're looking for doesn't exist.",
        variant: "destructive",
      });
    }
  }, [isEventLoading, event, setLocation, toast]);

  if (isEventLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-96 w-full rounded-lg mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-72 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <>
      <Helmet>
        <title>{event.title} | Utsav Events</title>
        <meta name="description" content={event.description} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-cover bg-center rounded-lg overflow-hidden h-96 mb-8 relative" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              {category && (
                <Badge className="bg-[#138808] mb-4">
                  {category.name}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold font-poppins">{event.title}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <i className="ri-calendar-line mr-1"></i>
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-map-pin-line mr-1"></i>
                  <span>{event.location}</span>
                </div>
                {event.price === 0 ? (
                  <div className="flex items-center">
                    <i className="ri-price-tag-3-line mr-1"></i>
                    <span>Free</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <i className="ri-price-tag-3-line mr-1"></i>
                    <span>₹{event.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 font-poppins">About This Event</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{event.description}</p>
              
              <h2 className="text-xl font-bold mb-4 font-poppins">Location Details</h2>
              <div className="bg-[#FAFAFA] p-4 rounded-md mb-6">
                <div className="flex items-start mb-2">
                  <i className="ri-map-pin-line text-[#FF9933] mr-2 mt-1"></i>
                  <div>
                    <div className="font-semibold">{event.location}</div>
                    <div className="text-gray-600">{event.address}</div>
                  </div>
                </div>
                {event.startTime && (
                  <div className="flex items-start">
                    <i className="ri-time-line text-[#FF9933] mr-2 mt-1"></i>
                    <div>
                      <div className="font-semibold">Event Time</div>
                      <div className="text-gray-600">
                        {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 font-poppins">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">{formatDate(event.startDate)}</span>
                    </div>
                    
                    {event.startTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-semibold">
                          {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{event.location}</span>
                    </div>
                    
                    {event.capacity && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-semibold">{event.capacity} people</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold">
                        {event.price === 0 ? 'Free' : `₹${event.price}`}
                      </span>
                    </div>
                    
                    <div className="pt-4">
                      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-[#FF9933] hover:bg-opacity-90 text-white">
                            Book Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book Event Tickets</DialogTitle>
                            <DialogDescription>
                              Enter the number of tickets you want to book for "{event.title}".
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <FormField
                                control={form.control}
                                name="tickets"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number of Tickets</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="Enter number of tickets" 
                                        min={1} 
                                        max={10} 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="flex justify-between font-semibold">
                                <span>Total Price:</span>
                                <span>₹{(event.price || 0) * form.watch("tickets")}</span>
                              </div>
                              
                              <Button 
                                type="submit" 
                                className="w-full bg-[#FF9933]"
                                disabled={bookingMutation.isPending}
                              >
                                {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
                              </Button>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => window.history.back()}
                      >
                        Back to Events
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3 font-poppins">Share This Event</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <i className="ri-facebook-fill text-[#3b5998]"></i>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <i className="ri-twitter-fill text-[#1da1f2]"></i>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <i className="ri-whatsapp-fill text-[#25d366]"></i>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <i className="ri-mail-fill text-[#ea4335]"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
