import { useState } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";
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
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^[0-9+\- ]{10,15}$/, { 
    message: "Please enter a valid Indian phone number" 
  }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      form.reset();
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Utsav Events</title>
        <meta name="description" content="Get in touch with the Utsav Events team for any inquiries or support" />
      </Helmet>
      
      <HeroSection 
        title="Contact Us"
        subtitle="Have questions or need assistance? We're here to help!"
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333]">Get In Touch</h2>
                <p className="mb-6 text-gray-600">
                  We'd love to hear from you. Whether you're looking to organize an event, 
                  have questions about our platform, or need assistance with a booking, 
                  our team is ready to help.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <i className="ri-map-pin-line text-[#FF9933] text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Our Office</h3>
                      <p className="text-gray-600">123 Event Street, Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="ri-phone-line text-[#FF9933] text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="ri-mail-line text-[#FF9933] text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Email</h3>
                      <p className="text-gray-600">info@utsavevents.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="ri-time-line text-[#FF9933] text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-[#333333]">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 font-poppins text-[#333333]">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <i className="ri-facebook-fill text-[#3b5998]"></i>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <i className="ri-twitter-fill text-[#1da1f2]"></i>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <i className="ri-instagram-fill text-[#e1306c]"></i>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <i className="ri-linkedin-fill text-[#0077b5]"></i>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333]">Send Us a Message</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+91 XXXXX XXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Message subject" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Type your message here..." 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-[#FF9933] hover:bg-opacity-90 text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 font-poppins text-[#333333]">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#333333]">How do I create an event on Utsav?</h3>
                  <p className="text-gray-600">
                    Creating an event is simple! Click on the "Host an Event" button on our homepage or navigate to 
                    the "Create" section in the navigation menu. Fill out the event details form and submit. 
                    Your event will be live on our platform immediately.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#333333]">Can I edit my event after publishing it?</h3>
                  <p className="text-gray-600">
                    Yes, you can edit your event details anytime by logging into your account, navigating to "My Events" 
                    and selecting the event you wish to edit. Make your changes and save to update your event listing.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#333333]">How do I cancel my event booking?</h3>
                  <p className="text-gray-600">
                    To cancel a booking, log into your account, go to "My Bookings" and select the booking you wish to cancel. 
                    Follow the cancellation process. Please note that cancellation policies vary by event and are set by event organizers.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#333333]">Is Utsav available as a mobile app?</h3>
                  <p className="text-gray-600">
                    Yes, Utsav is available as a mobile app for both Android and iOS devices. You can download it from 
                    the Google Play Store or Apple App Store to manage your events on the go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
