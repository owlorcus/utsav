import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CreateEventCTA = () => {
  return (
    <section className="py-16 bg-[#000080] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Host Your Own Event?</h2>
            <p className="text-blue-100 max-w-lg">Create and manage your events with our simple platform. From traditional weddings to corporate gatherings, we've got the tools you need.</p>
          </div>
          <div className="w-full md:w-auto">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-[#FF9933] hover:bg-opacity-90 text-white px-8 py-4 rounded-md shadow-lg font-medium transition-all duration-300"
              asChild
            >
              <Link href="/create">
                Create Event Now <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEventCTA;
