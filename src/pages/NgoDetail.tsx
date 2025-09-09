import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Heart, Users, Star, Share2, ExternalLink, Mail, Phone, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data - in real app this would come from your backend
const mockNgoData = {
  "1": {
    id: "1",
    name: "Clean Water Initiative",
    mission: "Providing access to clean, safe drinking water in rural communities across Africa and Asia. Our sustainable solutions have helped over 2 million people gain access to this basic human right.",
    description: "Founded in 2010, Clean Water Initiative has been at the forefront of solving the global water crisis. We work directly with local communities to install sustainable water systems, train local technicians, and ensure long-term maintenance. Our approach focuses on community ownership and environmental sustainability.",
    image: "https://images.unsplash.com/photo-1594736797933-d0402ba7dc5e?w=800",
    location: "Kenya, Tanzania",
    cause: "Water & Sanitation",
    rating: 4.9,
    donorsCount: 15420,
    volunteersCount: 2800,
    featured: true,
    website: "https://cleanwaterinitiative.org",
    email: "contact@cleanwaterinitiative.org",
    phone: "+254 123 456 789",
    founded: "2010",
    projects: [
      {
        title: "Well Installation Project",
        description: "Installing 50 new wells across rural Kenya",
        progress: 75,
        target: "$50,000",
        raised: "$37,500"
      },
      {
        title: "Water Purification Systems",
        description: "Providing water purification systems to 20 schools",
        progress: 45,
        target: "$25,000",
        raised: "$11,250"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1594736797933-d0402ba7dc5e?w=400",
      "https://images.unsplash.com/photo-1541344181165-b3d14d7d38b8?w=400",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400"
    ]
  },
  // Add more mock data for other NGOs...
};

const NgoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");

  const ngo = mockNgoData[id as keyof typeof mockNgoData];

  if (!ngo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">NGO Not Found</h1>
          <p className="text-muted-foreground mb-8">The organization you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ngo.name,
        text: ngo.mission,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src={ngo.image} 
            alt={ngo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate("/")}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Button>
              
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-white/90 text-secondary">
                      {ngo.cause}
                    </Badge>
                    {ngo.featured && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2">{ngo.name}</h1>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span>{ngo.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={handleShare} variant="secondary" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="bg-gradient-hero">
                    <Heart className="w-4 h-4 mr-2" />
                    Support Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About {ngo.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {ngo.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Founded</h4>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{ngo.founded}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Focus Area</h4>
                            <Badge variant="outline">{ngo.cause}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="mt-6">
                    <div className="space-y-6">
                      {ngo.projects.map((project, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-foreground">{project.title}</h3>
                              <span className="text-sm text-muted-foreground">{project.progress}%</span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div 
                                className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Raised: {project.raised}</span>
                              <span className="font-medium text-foreground">Target: {project.target}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {ngo.gallery.map((image, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${ngo.name} gallery ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <Star className="w-5 h-5 fill-current text-accent" />
                        <span className="text-2xl font-bold text-foreground">{ngo.rating}</span>
                        <span className="text-muted-foreground">/ 5.0</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Heart className="w-4 h-4 text-accent" />
                            <span className="text-lg font-bold text-foreground">
                              {ngo.donorsCount.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">Donors</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-lg font-bold text-foreground">
                              {ngo.volunteersCount.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">Volunteers</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a 
                      href={ngo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground hover:text-primary">Website</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                    </a>
                    
                    <a 
                      href={`mailto:${ngo.email}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground hover:text-primary">Email</span>
                    </a>
                    
                    <a 
                      href={`tel:${ngo.phone}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground hover:text-primary">Phone</span>
                    </a>
                  </CardContent>
                </Card>

                {/* Action Card */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <Button className="w-full bg-gradient-hero">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Volunteer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NgoDetail;