import { Button } from "@/components/ui/button";

const MobileAppSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-[#333333] font-poppins">Get Our Mobile App</h2>
            <p className="text-gray-600 mb-6 max-w-lg">Manage your events on the go with our mobile app. Available for both Android and iOS devices.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                className="flex items-center bg-black text-white border-none px-5 py-6 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <i className="ri-apple-fill text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center bg-black text-white border-none px-5 py-6 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <i className="ri-google-play-fill text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Mobile App" 
              className="max-w-xs rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
