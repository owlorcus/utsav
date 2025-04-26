import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

const SearchSection = () => {
  const [_, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [eventLocation, setEventLocation] = useState("all");

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const locations = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "pune", label: "Pune" }
  ];

  const handleSearch = () => {
    let searchUrl = "/events?";
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.append("q", searchQuery);
    }
    
    if (category && category !== "all") {
      params.append("category", category);
    }
    
    if (eventLocation && eventLocation !== "all") {
      params.append("location", eventLocation);
    }
    
    setLocation(`/events?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="py-8 bg-white shadow-md relative -mt-8 rounded-t-3xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search events, locations, or keywords" 
                className="w-full pl-12 pr-4 py-6 rounded-md border border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <i className="ri-search-line absolute left-4 top-3.5 text-gray-400 text-xl"></i>
            </div>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Any Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Category</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={eventLocation} onValueChange={setEventLocation}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Any Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Location</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleSearch}
              className="bg-[#138808] hover:bg-opacity-90 text-white p-3 rounded-md shadow-sm hidden md:flex"
            >
              <i className="ri-equalizer-line text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
