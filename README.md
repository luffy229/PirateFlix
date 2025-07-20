
# 🏴‍☠️ PirateFlix - Movie Streaming Platform

A modern, pirate-themed movie streaming platform built with React, featuring smooth animations, responsive design, and an immersive user experience.

## 🚢 Live Demo

[Try PirateFlix Live](https://pirate-flix.vercel.app/)

> If the demo is not working in your region, use a VPN.  
> For Chrome, you can use the [VPN Extension](https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=en).

## ✨ Features

### 🎬 Movie Discovery
- **Hero Carousel**: Rotating showcase of popular movies with smooth transitions
- **Movie Categories**: Curated collections including New Releases, Captain's Choice, and more
- **Interactive Previews**: Hover effects with movie details and ratings
- **Responsive Grid**: Optimized layout for all device sizes

### 🎨 Design & Animations
- **Pirate Theme**: Custom pirate fonts and maritime color scheme
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Lenis Scrolling**: Buttery smooth scroll experience
- **Skeleton Loading**: Beautiful loading states with themed placeholders
- **Glowing Effects**: CSS animations for enhanced visual appeal

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices with touch-friendly navigation
- **Hamburger Menu**: Collapsible navigation for tablets and mobile
- **Adaptive Layouts**: Content adjusts seamlessly across screen sizes
- **Touch Gestures**: Swipe navigation for movie carousels

### 🛠️ Technical Features
- **TMDB Integration**: Real movie data from The Movie Database API
- **Caching System**: Efficient API response caching for better performance
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first styling with custom design system

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for smooth transitions
- **Smooth Scrolling**: Lenis for enhanced scroll experience
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React icon library
- **API**: The Movie Database (TMDB) API

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── HeroSection.tsx # Main hero carousel
│   ├── MovieRow.tsx    # Horizontal movie listings
│   ├── MovieCard.tsx   # Individual movie cards
│   └── StreamingNavbar.tsx # Navigation component
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   └── Streaming.tsx   # Main streaming interface
├── lib/                # Utilities and configurations
│   ├── tmdb.ts         # TMDB API integration
│   └── utils.ts        # Helper functions
└── hooks/              # Custom React hooks
    └── useLenis.ts     # Smooth scrolling hook
```

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- TMDB API key (free registration at themoviedb.org)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd piratestream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Check the API Configuration Below
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## 🎨 Customization

### Theming
The application uses a custom design system with CSS variables defined in `src/index.css`:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --accent: 43 96% 56%;
  /* ... more theme variables */
}
```

### Fonts
Custom pirate-themed fonts are loaded from Google Fonts:
- **Pirate One**: For headings and titles
- **Rye**: For body text and descriptions

### Animations
Animations are configured in `tailwind.config.ts` with custom keyframes and transitions.

## 🔧 API Configuration

The application uses TMDB API for movie data. The current setup includes:

- **Caching**: 5-minute cache for API responses
- **Error Handling**: Graceful error handling with fallbacks
- **Image Optimization**: Multiple image sizes for different use cases

To use your own API key:
1. Register at [TMDB](https://www.themoviedb.org/documentation/api)
2. Create a `.env` file in the root of your project:
   ```bash
   touch .env
   ```
3. Add your TMDB API key to the `.env` file:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_BASE_URL= https://api.themoviedb.org/3
   VITE_IMAGE_BASE_URL= https://image.tmdb.org/t/p
   ```
4. Update `src/lib/tmdb.ts` to use the environment variable:
   ```ts
   // src/lib/tmdb.ts
   const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
   const BASE_URL = import.meta.env.VITE_BASE_URL;
   const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
   ```
5. Restart your development server after making changes to `.env`.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (hamburger menu, stacked layout)
- **Tablet**: 768px - 1024px (hamburger menu, grid layout)
- **Desktop**: > 1024px (full navigation, optimized spacing)

## 🚀 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **API Caching**: Reduces redundant API calls
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Images**: Multiple image sizes from TMDB
- **Skeleton Loading**: Improves perceived performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB**: For providing the movie database API
- **Shadcn/ui**: For the beautiful component library
- **Framer Motion**: For smooth animations
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the icon library

---

⚓ Built with passion for the high seas of entertainment! 🏴‍☠️

*Ready to set sail on your streaming adventure?*
