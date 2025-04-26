import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertEventSchema } from "@shared/schema";
import { Category } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import HeroSection from "@/components/hero-section";

const createEventSchema = insertEventSchema.extend({
  startDateStr: z.string().min(1, { message: "Start date is required" }),
  endDateStr: z.string().optional(),
}).omit({
  startDate: true,
  endDate: true,
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

const CreateEvent = () => {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  // Form setup
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      location: "",
      address: "",
      startDateStr: "",
      endDateStr: "",
      startTime: "",
      endTime: "",
      isFeatured: false,
      categoryId: 0,
      organizerId: 1, // In a real app, this would be the logged-in user's ID
      capacity: 100,
      price: 0
    },
  });

  // Event creation mutation
  const createEventMutation = useMutation({
    mutationFn: async (formData: CreateEventFormValues) => {
      // Format dates for the API
      const { startDateStr, endDateStr, ...restData } = formData;
      
      const apiData = {
        ...restData,
        startDate: new Date(startDateStr).toISOString(),
        endDate: endDateStr ? new Date(endDateStr).toISOString() : undefined,
        categoryId: Number(formData.categoryId),
        capacity: Number(formData.capacity),
        price: Number(formData.price)
      };
      
      return apiRequest("POST", "/api/events", apiData);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      toast({
        title: "Event created!",
        description: "Your event has been created successfully.",
      });
      setLocation(`/events/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to create event",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: CreateEventFormValues) => {
    createEventMutation.mutate(data);
  };

  // Handle image preview
  const handleImageUrlChange = (url: string) => {
    setPreviewImage(url);
    form.setValue("image", url);
  };

  // Locations list
  const locations = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", 
    "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", 
    "Visakhapatnam", "Vadodara", "Ghaziabad", "Ludhiana", "Agra"
  ];

  return (
    <>
      <Helmet>
        <title>Create New Event | Utsav Events</title>
        <meta name="description" content="Create and host your own event on Utsav Event Management Platform" />
      </Helmet>
      
      <HeroSection 
        title="Create Your Event"
        subtitle="Fill out the form below to create and publish your event on our platform"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 font-poppins">Event Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about your event" 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem 
                                  key={category.id} 
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Event Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Event Image</h3>
                    
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Image URL*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter image URL" 
                              {...field} 
                              onChange={(e) => handleImageUrlChange(e.target.value)}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a direct URL to an image for your event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {previewImage && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Preview:</p>
                        <div className="relative h-40 w-full overflow-hidden rounded-md">
                          <img 
                            src={previewImage} 
                            alt="Event preview" 
                            className="h-full w-full object-cover"
                            onError={() => setPreviewImage(null)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Location & Date */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Location & Date</h3>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/Location*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complete Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDateStr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date*</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endDateStr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                                value={field.value || ''} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Additional Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                placeholder="Maximum attendees" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₹)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                placeholder="Enter price (0 for free)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Feature this event</FormLabel>
                            <FormDescription>
                              Featured events appear on the homepage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#FF9933] hover:bg-opacity-90 text-white"
                      disabled={createEventMutation.isPending}
                    >
                      {createEventMutation.isPending ? "Creating..." : "Create Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
