import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";
import SearchSection from "@/components/search-section";
import CategoriesSection from "@/components/categories-section";
import EventCard from "@/components/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Event, Category } from "@shared/schema";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Events = () => {
  const [match, params] = useRoute("/events");
  const [location] = useLocation();
  const [searchParams] = useState(() => new URLSearchParams(location.split("?")[1] || ""));
  
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("category") || "";
  const locationParam = searchParams.get("location") || "";
  
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Get categories to find the categoryId from the slug
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const categoryId = categories?.find(cat => cat.slug === categorySlug)?.id;

  // Get events with filtering
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', query, categoryId, locationParam],
    queryFn: async () => {
      let url = '/api/events';
      const params = new URLSearchParams();
      
      if (query) {
        params.append("q", query);
      }
      
      if (categoryId) {
        params.append("categoryId", categoryId.toString());
      }
      
      if (locationParam) {
        params.append("location", locationParam);
      }
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!categories
  });

  // Calculate pagination
  const totalPages = events ? Math.ceil(events.length / eventsPerPage) : 0;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set page title based on filters
  let pageTitle = "Browse Events";
  if (categorySlug) {
    const categoryName = categories?.find(cat => cat.slug === categorySlug)?.name;
    if (categoryName) {
      pageTitle = `${categoryName} Events`;
    }
  }
  if (locationParam) {
    pageTitle += ` in ${locationParam}`;
  }
  if (query) {
    pageTitle += ` | Search: ${query}`;
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Evexa Events</title>
        <meta name="description" content={`Explore and discover ${pageTitle} on Evexa Events Platform`} />
      </Helmet>
      
      <HeroSection 
        title={pageTitle}
        subtitle="Discover events that match your interests and preferences"
      />
      <SearchSection />
      <CategoriesSection />
      
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#333333] font-poppins">
              {isLoading ? (
                <Skeleton className="h-8 w-64" />
              ) : (
                <>
                  {events && events.length > 0 
                    ? `${events.length} Events Found` 
                    : "No Events Found"}
                </>
              )}
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
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
            <>
              {events && events.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentEvents?.map((event) => (
                      <EventCard key={event.id} event={event} variant="featured" />
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) paginate(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, index) => {
                          const pageNumber = index + 1;
                          
                          // Display first page, last page, and pages around current page
                          if (
                            pageNumber === 1 || 
                            pageNumber === totalPages || 
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    paginate(pageNumber);
                                  }}
                                  isActive={pageNumber === currentPage}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                          
                          // Show ellipsis for gaps
                          if (
                            (pageNumber === 2 && currentPage > 3) ||
                            (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          
                          return null;
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) paginate(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-gray-500">Try adjusting your search filters or browse categories</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
