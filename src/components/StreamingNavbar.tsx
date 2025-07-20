'use client';

import { useState, useEffect } from "react";
import {
  Search, Bell, User, Menu, X, Skull, Anchor,
  Trophy, Github, Twitter, Send, Coins
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const StreamingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "HomePage", href: "#", icon: Skull },
    { label: "Premium", href: "#", icon: Anchor },
    { label: "Live", href: "#", icon: Search },
    { label: "Categories", href: "#", icon: User }
  ];

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-primary/20",
        scrolled ? "bg-black shadow-glow" : "bg-black"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        {/* Logo & Desktop Nav */}
        <motion.div 
          className="flex items-center gap-4 md:gap-8"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-2xl md:text-4xl font-pirate font-bold text-primary tracking-[.2em] drop-shadow-neon">
              PirateFlix
            </div>
          </div>

          {/* Desktop Navigation - Hidden on tablet and mobile */}
          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-2 text-white/80 hover:text-primary font-rye uppercase tracking-wider transition-all duration-300 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-4 h-4 group-hover:text-primary group-hover:drop-shadow-neon transition" />
                <span className="group-hover:text-primary drop-shadow-neon">{item.label}</span>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side Icons */}
        <motion.div 
          className="flex items-center gap-2 md:gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search - Desktop only */}
          <div className="relative hidden xl:block">
            {isSearchOpen ? (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <Input
                  type="text"
                  placeholder="Search treasures..."
                  className="w-52 bg-background/70 border-primary/30 text-white placeholder:text-muted-foreground font-rye"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:bg-primary/20"
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Desktop Icons - Hidden on tablet and mobile */}
          <div className="hidden xl:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <Trophy className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <Send className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Coins Count */}
            <div className="flex items-center gap-1 px-2">
              <Coins className="w-4 h-4 text-primary drop-shadow-neon" />
              <span className="text-primary font-pirate text-sm">89</span>
            </div>

            <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-white hover:text-primary hover:drop-shadow-neon">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile/Tablet Menu Button - Shows on tablet and mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden text-white hover:bg-primary/20 mr-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Mobile/Tablet Menu */}
      <motion.div
        className="xl:hidden bg-black border-t border-primary/20 overflow-hidden"
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-white hover:text-primary font-rye text-lg transition-all drop-shadow-neon"
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -20, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </motion.a>
          ))}

          <div className="pt-4 border-t border-primary/20 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Search className="w-4 h-4 mr-3" />
              Search Treasures
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Github className="w-4 h-4 mr-3" />
              GitHub
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Trophy className="w-4 h-4 mr-3" />
              Achievements
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Send className="w-4 h-4 mr-3" />
              Telegram
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Twitter className="w-4 h-4 mr-3" />
              Twitter
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-primary font-rye">
              <User className="w-4 h-4 mr-3" />
              Profile
            </Button>
            <div className="flex items-center justify-start gap-3 px-3 py-2 text-white font-rye">
              <Coins className="w-4 h-4 text-primary drop-shadow-neon" />
              <span className="text-primary">89 Coins</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
