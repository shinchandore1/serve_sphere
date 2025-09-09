import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-volunteers.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Volunteers helping communities around the world"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your
          <span className="block bg-gradient-impact bg-clip-text text-transparent">
            Impact Partner
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
          Discover NGOs making real change in your community and beyond. 
          Connect, donate, volunteer, and amplify your impact.
        </p>
        
        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-strong max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                What cause do you care about?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Education, Environment, Health, Poverty..."
                  className="pl-10 h-12 text-base border-border/50 focus:border-primary"
                />
              </div>
            </div>
            
            <div className="w-full md:w-64">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Select>
                  <SelectTrigger className="pl-10 h-12 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Anywhere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Area</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button size="lg" className="h-12 px-8 bg-gradient-hero border-0 hover:shadow-medium transition-all duration-300 hover:scale-105">
              Find NGOs
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">2,500+</div>
            <div className="text-sm opacity-80">Verified NGOs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">50M+</div>
            <div className="text-sm opacity-80">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">180</div>
            <div className="text-sm opacity-80">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
            <div className="text-sm opacity-80">Transparent</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;