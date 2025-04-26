import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Category } from "@shared/schema";

const CategoriesSection = () => {
  const [_, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    setLocation(`/events?category=${slug}`);
  };

  if (isLoading) {
    return (
      <section className="py-8 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 font-poppins">Browse by Category</h2>
          <div className="flex flex-wrap gap-3 pb-4 overflow-x-auto">
            {Array(7).fill(0).map((_, index) => (
              <div 
                key={index}
                className="category-pill flex-shrink-0 bg-white text-[#333333] px-5 py-2 rounded-full shadow-sm border border-gray-100 font-medium h-10 w-32 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#333333] mb-6 font-poppins">Browse by Category</h2>
        <div className="flex flex-wrap gap-3 pb-4 overflow-x-auto">
          {categories?.map((category) => (
            <a 
              key={category.id}
              href={`/events?category=${category.slug}`}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.slug);
              }}
              className={`category-pill flex-shrink-0 ${
                activeCategory === category.slug 
                  ? "bg-[#FF9933] text-white" 
                  : "bg-white hover:bg-[#FF9933] hover:text-white text-[#333333]"
              } px-5 py-2 rounded-full shadow-sm border border-gray-100 font-medium transition-all duration-300`}
            >
              <i className={`${category.icon} mr-2`}></i>
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
