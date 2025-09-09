import { useState } from "react";
import { Grid, List, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NgoCard from "./NgoCard";
import SearchFilters from "./SearchFilters";
import cleanWaterImage from "@/assets/clean-water.jpg";
import elderCareImage from "@/assets/elder-care.jpg";
import healthBridgeImage from "@/assets/health-bridge.jpg";

// Mock data - in real app this would come from your backend
const mockNgos = [
  {
    id: "1",
    name: "Clean Water Initiative",
    mission: "Providing access to clean, safe drinking water in rural communities across Africa and Asia. Our sustainable solutions have helped over 2 million people gain access to this basic human right.",
    image: cleanWaterImage,
    location: "Kenya, Tanzania",
    cause: "Water & Sanitation",
    rating: 4.9,
    donorsCount: 15420,
    volunteersCount: 2800,
    featured: true
  },
  {
    id: "2", 
    name: "Education for All",
    mission: "Breaking barriers to education by building schools, training teachers, and providing learning materials to underserved communities worldwide.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600",
    location: "India, Bangladesh",
    cause: "Education",
    rating: 4.8,
    donorsCount: 12300,
    volunteersCount: 5200,
    featured: false
  },
  {
    id: "3",
    name: "Green Earth Project",
    mission: "Combat climate change through reforestation, renewable energy projects, and environmental education programs that empower communities.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    location: "Brazil, Indonesia",
    cause: "Environment",
    rating: 4.7,
    donorsCount: 8900,
    volunteersCount: 3400,
    featured: true
  },
  {
    id: "4",
    name: "Health Bridge Foundation",
    mission: "Delivering essential healthcare services and training local medical professionals in remote and underserved areas around the world.",
    image: healthBridgeImage,
    location: "Nigeria, Cambodia",
    cause: "Healthcare",
    rating: 4.6,
    donorsCount: 6700,
    volunteersCount: 1900,
    featured: false
  },
  {
    id: "5",
    name: "Hunger Relief Network",
    mission: "Fighting hunger through food distribution, nutrition education, and sustainable agriculture programs that strengthen food security.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    location: "Haiti, Guatemala",
    cause: "Hunger & Poverty",
    rating: 4.8,
    donorsCount: 11200,
    volunteersCount: 2600,
    featured: false
  },
  {
    id: "6",
    name: "Elder Care Alliance",
    mission: "Supporting elderly populations with healthcare, social programs, and dignity-focused care in communities where they're most vulnerable.",
    image: elderCareImage,
    location: "Philippines, Vietnam",
    cause: "Elder Care",
    rating: 4.5,
    donorsCount: 4300,
    volunteersCount: 1200,
    featured: false
  }
];

const NgoGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCause, setSelectedCause] = useState("All Causes");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [sizeFilter, setSizeFilter] = useState("All Sizes");

  const filteredAndSortedNgos = mockNgos
    .filter(ngo => {
      const matchesCause = selectedCause === "All Causes" || ngo.cause === selectedCause;
      const matchesLocation = selectedLocation === "All Locations" || ngo.location.includes(selectedLocation);
      const matchesSearch = searchQuery === "" || 
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.mission.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = ratingFilter[0] === 0 || ngo.rating >= ratingFilter[0];
      
      return matchesCause && matchesLocation && matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "donors":
          return b.donorsCount - a.donorsCount;
        case "featured":
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Discover NGOs Making Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore verified organizations working on causes you care about
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-soft border border-border/50">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCause={selectedCause}
            onCauseChange={setSelectedCause}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            onRatingFilter={setRatingFilter}
            onSizeFilter={setSizeFilter}
          />
        </div>

        {/* Results Count and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredAndSortedNgos.length}</span> organizations
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="donors">Most Donors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="w-3 h-3" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* NGO Grid */}
        {filteredAndSortedNgos.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredAndSortedNgos.map(ngo => (
              <NgoCard key={ngo.id} {...ngo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">No NGOs found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedCause("All Causes");
              setSelectedLocation("All Locations");
              setRatingFilter([0]);
              setSizeFilter("All Sizes");
            }}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedNgos.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Organizations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NgoGrid;