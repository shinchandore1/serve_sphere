import { MapPin, Heart, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface NgoCardProps {
  id: string;
  name: string;
  mission: string;
  image: string;
  location: string;
  cause: string;
  rating: number;
  donorsCount: number;
  volunteersCount: number;
  featured?: boolean;
}

const NgoCard = ({ 
  id,
  name, 
  mission, 
  image, 
  location, 
  cause, 
  rating, 
  donorsCount, 
  volunteersCount,
  featured = false 
}: NgoCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ngo/${id}`);
  };

  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === 'learn-more') {
      navigate(`/ngo/${id}`);
    }
    // Handle other button actions here
  };
  return (
    <Card 
      onClick={handleCardClick}
      className={`group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 bg-gradient-card border-border/50 ${featured ? 'ring-2 ring-primary/20' : ''}`}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={`${name} work`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-secondary font-medium">
            {cause}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-accent text-accent-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-current text-accent" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {mission}
        </p>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-accent" />
            <span className="font-medium">{donorsCount.toLocaleString()}</span>
            <span className="text-muted-foreground">donors</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">{volunteersCount.toLocaleString()}</span>
            <span className="text-muted-foreground">volunteers</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 hover:bg-primary-soft hover:text-primary border-border/50"
          onClick={(e) => handleButtonClick(e, 'learn-more')}
        >
          Learn More
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-gradient-hero border-0 hover:shadow-medium transition-all duration-300"
          onClick={(e) => handleButtonClick(e, 'support')}
        >
          Support Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NgoCard;