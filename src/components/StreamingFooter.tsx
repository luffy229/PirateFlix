
import { motion } from "framer-motion";
import { Github, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const StreamingFooter = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = {
    "Treasure Trove": [
      "New Releases",
      "Popular Movies",
      "Top Rated",
      "Coming Soon",
      "My Watchlist"
    ],
    "Captain's Quarters": [
      "About Us",
      "Careers",
      "Press",
      "Blog",
      "Help Center"
    ],
    "Ship's Log": [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "Content Guidelines",
      "Legal Notices"
    ],
    "Contact": [
      "Support",
      "Partnerships",
      "Advertising",
      "Media Relations",
      "Investor Relations"
    ]
  };

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-pirate text-primary mb-4 animate-glow">
                PirateFlix
              </h3>
              <p className="text-muted-foreground font-rye text-sm leading-relaxed">
                Ahoy! Sail the seven seas of entertainment with the finest collection of cinematic treasures.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>pratik2002pal@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 9064671540</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Goa, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-pirate text-lg text-white mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-rye hover:animate-glow"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="my-8 bg-border/30" />

        {/* Social Links & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          {/* Social Media Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-muted-foreground font-rye text-sm">Follow the Fleet:</span>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-muted/20 hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                  asChild
                >
                  <a href={href} aria-label={label}>
                    <Icon className="w-4 h-4 group-hover:animate-glow" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-muted-foreground font-rye text-sm whitespace-nowrap">
              Join the Crew:
            </span>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-muted/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 min-w-0 w-48"
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 font-pirate shadow-glow hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-border/30" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="font-rye">
              © 2025 PirateFlix. All treasures reserved.
            </p>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <p className="font-rye text-xs">
              Powered by TMDB API - Pratik A Pal
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-primary transition-colors duration-300 font-rye">
              Terms
            </a>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <a href="#" className="hover:text-primary transition-colors duration-300 font-rye">
              Privacy
            </a>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <a href="#" className="hover:text-primary transition-colors duration-300 font-rye">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </footer>
  );
};
