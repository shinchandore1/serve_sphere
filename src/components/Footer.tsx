import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Connected for Impact</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get weekly updates on new NGOs, impact stories, and ways to make a difference in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-11"
            />
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 h-11 px-6">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ServeSphere</span>
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              Connecting compassionate people with verified NGOs to create lasting positive impact worldwide.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Browse NGOs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Search by Cause</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured Organizations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer Opportunities</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">How to Donate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For NGOs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@giveguide.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 123456789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>VIT ,Pune</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2025 GiveGuide. All rights reserved. Making the world better, one connection at a time.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;