import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCause: string;
  onCauseChange: (cause: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onRatingFilter?: (rating: number[]) => void;
  onSizeFilter?: (size: string) => void;
}

const causes = ["All Causes", "Water & Sanitation", "Education", "Environment", "Healthcare", "Hunger & Poverty", "Elder Care"];
const locations = ["All Locations", "Africa", "Asia", "South America", "North America", "Europe"];
const sizes = ["All Sizes", "Small (1-50 members)", "Medium (51-200 members)", "Large (200+ members)"];

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedCause,
  onCauseChange,
  selectedLocation,
  onLocationChange,
  onRatingFilter,
  onSizeFilter
}: SearchFiltersProps) => {
  const [ratingRange, setRatingRange] = useState([0]);
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleAdvancedFilterApply = () => {
    const filters = [];
    if (ratingRange[0] > 0) filters.push(`Rating: ${ratingRange[0]}+`);
    if (selectedSize !== "All Sizes") filters.push(`Size: ${selectedSize}`);
    setActiveFilters(filters);
    
    onRatingFilter?.(ratingRange);
    onSizeFilter?.(selectedSize);
  };

  const clearFilter = (filter: string) => {
    const newFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(newFilters);
    
    if (filter.startsWith("Rating:")) {
      setRatingRange([0]);
      onRatingFilter?.([0]);
    }
    if (filter.startsWith("Size:")) {
      setSelectedSize("All Sizes");
      onSizeFilter?.("All Sizes");
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setRatingRange([0]);
    setSelectedSize("All Sizes");
    onSearchChange("");
    onCauseChange("All Causes");
    onLocationChange("All Locations");
    onRatingFilter?.([0]);
    onSizeFilter?.("All Sizes");
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search NGOs by name, mission, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium text-foreground mb-2 block">Cause</Label>
          <Select value={selectedCause} onValueChange={onCauseChange}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {causes.map(cause => (
                <SelectItem key={cause} value={cause}>{cause}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-0">
          <Label className="text-sm font-medium text-foreground mb-2 block">Location</Label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Advanced Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-10 gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Minimum Rating: {ratingRange[0]}
                </Label>
                <Slider
                  value={ratingRange}
                  onValueChange={setRatingRange}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Organization Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAdvancedFilterApply} className="w-full">
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {(activeFilters.length > 0 || selectedCause !== "All Causes" || selectedLocation !== "All Locations" || searchQuery) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
          
          {selectedCause !== "All Causes" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCause}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onCauseChange("All Causes")}
              />
            </Badge>
          )}
          
          {selectedLocation !== "All Locations" && (
            <Badge variant="secondary" className="gap-1">
              {selectedLocation}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onLocationChange("All Locations")}
              />
            </Badge>
          )}
          
          {activeFilters.map(filter => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => clearFilter(filter)}
              />
            </Badge>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;