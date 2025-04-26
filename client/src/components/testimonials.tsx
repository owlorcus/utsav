import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@shared/schema";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="text-[#FF9933]">
            {Array(5).fill(0).map((_, i) => (
              <i key={i} className={i < testimonial.rating ? "ri-star-fill" : "ri-star-line"}></i>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{testimonial.content}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-[#333333]">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials']
  });

  return (
    <section className="py-12 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 text-center font-poppins">What People Say About Us</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <Card key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-24 w-full mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
