/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ArrowRight, 
  X, 
  Menu, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Compass, 
  ChevronRight, 
  Check, 
  SlidersHorizontal,
  Info,
  Globe,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Seating' | 'Tables' | 'Vessels' | 'Lighting' | 'Textiles';
  price: number;
  image: string;
  gallery: string[];
  description: string;
  origin: string;
  materials: string[];
  dimensions: string;
  artisan: string;
  tag?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Rico Lounge Sofa & Bouclé Tactility',
    brand: 'Ferm Living',
    category: 'Seating',
    price: 3450,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Curves and volume embrace a classic architecture in a welcoming form that invites intimacy and deep relaxation. Upholstered in rich off-white bouclé.',
    origin: 'Handcrafted in Denmark & Northern Italy',
    materials: ['New Zealand Wool Bouclé', 'FSC-certified Beechwood Frame', 'High-Resilience Cold Foam'],
    dimensions: 'W: 210 x H: 79 x D: 81 cm (Seat Height: 41 cm)',
    artisan: 'Master Upholsterers of Aarhus',
    tag: 'Iconic Masterpiece'
  },
  {
    id: 'p2',
    name: 'Travertine Monolith Coffee Table',
    brand: 'Tiptoe Paris',
    category: 'Tables',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A celebration of geological time. Each Roman travertine slab is hand-honed to a velvety matte finish, balanced by brushed raw steel architecture.',
    origin: 'Quarried in Tivoli, Italy; Assembled in Paris',
    materials: ['Natural Roman Travertine', 'Powder-coated Recycled Steel'],
    dimensions: 'L: 120 x W: 60 x H: 38 cm',
    artisan: 'Studio Tiptoe & Stone Masons of Lazio',
    tag: 'Limited Edition'
  },
  {
    id: 'p3',
    name: 'Kizu Portable Marble Lamp',
    brand: 'Madam Stoltz',
    category: 'Lighting',
    price: 480,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sculptural elegance defying gravity. The organic intersection of marble spheres casts a warm, dimmable, golden aura across meditative interiors.',
    origin: 'Valencia, Spain',
    materials: ['Breccia Damascata Marble', 'Brushed Brass Dimmer Switch'],
    dimensions: 'Dia: 25 x H: 35 cm',
    artisan: 'Atelier de Lumière',
    tag: 'Award Winner'
  },
  {
    id: 'p4',
    name: 'Kasai Raw Ceramic Amphora',
    brand: 'Bazar Bizar',
    category: 'Vessels',
    price: 620,
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1f6145a8c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1612196808214-b8e1f6145a8c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Unglazed terracotta fired in wood kilns, leaving unpredictable carbon marks and tactile earthen textures that ground any architectural composition.',
    origin: 'Java, Indonesia',
    materials: ['Porous Terracotta', 'Natural Beeswax Polish'],
    dimensions: 'Dia: 42 x H: 65 cm',
    artisan: 'Pak Darsono Ceramic Guild',
    tag: 'One-of-a-kind'
  },
  {
    id: 'p5',
    name: 'Nomad Heavy Cashmere & Wool Throw',
    brand: 'J-Line',
    category: 'Textiles',
    price: 590,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Woven on historic wooden looms in Biella, blending Mongolian cashmere and organic virgin wool for peerless warmth and fluid drape.',
    origin: 'Biella, Northern Italy',
    materials: ['70% Mongolian Cashmere', '30% Organic Merino Wool'],
    dimensions: '200 x 140 cm',
    artisan: 'Lanificio Storico',
    tag: 'Signature'
  },
  {
    id: 'p6',
    name: 'Ansei Hand-Folded Washi Pendant',
    brand: 'Nordal',
    category: 'Lighting',
    price: 950,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crafted from mulberry bark paper. Diffuses light into a soft, poetic ambiance reminiscent of Kyoto temple gardens at dusk.',
    origin: 'Kyoto, Japan',
    materials: ['Kozo Mulberry Washi Paper', 'Hinoki Cypress Ribs', 'Brass Hardware'],
    dimensions: 'Dia: 75 x H: 50 cm',
    artisan: 'Master Tanaka Paper Studio',
    tag: 'Master Artisan'
  },
  {
    id: 'p7',
    name: 'Brutalist Solid Oak Dining Bench',
    brand: 'Wikholm Form',
    category: 'Seating',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Carved from single-origin salvaged French oak. Displays natural knots and grain patterns sealed with organic hardwax oils.',
    origin: 'Burgundy, France',
    materials: ['Salvaged Centennial French Oak', 'Natural Hardwax Oil'],
    dimensions: 'L: 180 x W: 40 x H: 45 cm',
    artisan: 'Cabinetmakers of Dijon',
    tag: 'Sustainable Luxury'
  },
  {
    id: 'p8',
    name: 'Siena Hand-Knotted Wool Rug',
    brand: 'Ferm Living',
    category: 'Textiles',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-pile New Zealand wool with varied knot densities, creating subtle topographic shadows and exceptional underfoot plushness.',
    origin: 'Bhadadoor, India (Fair Trade Guild)',
    materials: ['100% Undyed New Zealand Wool', 'Cotton Warp'],
    dimensions: '300 x 200 cm',
    artisan: 'Weaving Guild of Rajasthan',
    tag: 'Curator Choice'
  }
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [notification, setNotification] = useState<string | null>(null);

  // Cinematic intro timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerNotification(`Added "${product.name}" to your acquisition bag.`);
    setIsCartOpen(true);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      triggerNotification(
        wishlist.includes(productId) 
          ? `Removed from your private curation.` 
          : `Saved "${prod.name}" to your private curation.`
      );
    }
  };

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };

  const formatPrice = (price: number) => {
    const converted = Math.round(price * currencyRates[currency]);
    return `${currencySymbols[currency]}${converted.toLocaleString()}`;
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesBrand && matchesSearch;
  });

  const brands = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];
  const categories = ['All', 'Seating', 'Tables', 'Vessels', 'Lighting', 'Textiles'];

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1D1B18] font-sans selection:bg-[#D4C5A9] selection:text-[#1D1B18] relative overflow-x-hidden">

      {/* CINEMATIC INTRO CURTAIN */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#121110] text-[#F8F6F0] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="space-y-6 max-w-xl"
            >
              <div className="inline-block tracking-[0.3em] uppercase text-xs text-[#D4C5A9] font-medium border-b border-[#D4C5A9]/30 pb-2">
                Haute Interior Curation
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide">
                This Is From
              </h1>
              <p className="text-sm md:text-base text-[#D4C5A9]/80 font-light italic max-w-md mx-auto">
                "Shaping honest products and calm environments that help you balance life's contrasts."
              </p>
              <div className="pt-4 flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D4C5A9] animate-ping"></span>
                <span className="text-xs uppercase tracking-widest text-[#D4C5A9]/60">Entering sanctuary</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION TOAST */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#1D1B18] text-[#F8F6F0] px-6 py-4 rounded-none shadow-2xl border border-[#D4C5A9]/40 flex items-center space-x-3 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-[#D4C5A9]" />
            <span className="text-sm font-light tracking-wide">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1D1B18] text-[#F8F6F0] py-2.5 px-4 text-xs tracking-widest uppercase flex items-center justify-between border-b border-[#3A3733]">
        <div className="hidden md:flex items-center space-x-6 text-[11px] opacity-80">
          <span>Complimentary White-Glove Global Delivery on Orders Over $2,500</span>
          <span>•</span>
          <span>Architect & Interior Designer Trade Program Available</span>
        </div>
        <div className="flex items-center space-x-4 mx-auto md:mx-0">
          <span>If you are a professional, please <button onClick={() => setIsBespokeModalOpen(true)} className="underline text-[#D4C5A9] hover:text-white transition-colors">register here</button> for trade pricing</span>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          {(['USD', 'EUR', 'GBP'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-2 py-0.5 text-[10px] tracking-wider transition-all ${currency === c ? 'bg-[#D4C5A9] text-[#1D1B18] font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E6E2D8] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="#" className="font-serif text-2xl md:text-3xl font-normal tracking-wider text-[#1D1B18]">
              THIS IS FROM
            </a>
            <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-widest uppercase font-light text-[#1D1B18]/80">
              <a href="#curation" className="hover:text-[#1D1B18] transition-colors pb-1 border-b border-transparent hover:border-[#1D1B18]">Curation</a>
              <a href="#philosophy" className="hover:text-[#1D1B18] transition-colors pb-1 border-b border-transparent hover:border-[#1D1B18]">Philosophy</a>
              <a href="#bespoke" className="hover:text-[#1D1B18] transition-colors pb-1 border-b border-transparent hover:border-[#1D1B18]">Bespoke Spaces</a>
              <a href="#journal" className="hover:text-[#1D1B18] transition-colors pb-1 border-b border-transparent hover:border-[#1D1B18]">Journal</a>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search honest objects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-[#EFECE3] border border-[#DCD6C8] px-4 py-2 pl-10 text-xs tracking-wide w-56 md:w-64 focus:outline-none focus:border-[#1D1B18] transition-all rounded-none placeholder:text-neutral-500"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>

            <button 
              onClick={() => triggerNotification(`${wishlist.length} items in your private curation sanctuary.`)}
              className="relative p-2 hover:text-[#D4C5A9] transition-colors"
              title="Private Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1D1B18] text-[#F8F6F0] text-[10px] flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-[#1D1B18] text-[#F8F6F0] px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-[#33302B] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Acquisition Bag</span>
              <span className="bg-[#D4C5A9] text-[#1D1B18] px-1.5 py-0.5 text-[10px] font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH PARALLAX VIBE */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1D1B18] text-[#F8F6F0]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85" 
            alt="Luxury Interior Sanctuary" 
            className="w-full h-full object-cover opacity-55 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B18] via-[#1D1B18]/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <span className="inline-block text-xs uppercase tracking-[0.4em] text-[#D4C5A9] border border-[#D4C5A9]/40 px-4 py-1.5 backdrop-blur-sm">
              Authentic Design & Calm Environments
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-light tracking-wide leading-tight text-[#FDFCF7]">
              Where Things Come From
            </h1>
            <p className="text-base md:text-xl text-[#E6E2D8] font-light max-w-2xl mx-auto leading-relaxed">
              Driven by a love for authentic design and responsible choices, we connect individual objects into cohesive, meditative environments that balance life's contrasts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <a 
              href="#curation" 
              className="w-full sm:w-auto bg-[#F8F6F0] text-[#1D1B18] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#D4C5A9] transition-all flex items-center justify-center space-x-3 shadow-2xl"
            >
              <span>Explore Curation ($10k+ Tier)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setIsBespokeModalOpen(true)}
              className="w-full sm:w-auto border border-[#F8F6F0]/40 text-[#F8F6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center space-x-2"
            >
              <Compass className="w-4 h-4 text-[#D4C5A9]" />
              <span>Request Bespoke Space Project</span>
            </button>
          </motion.div>

          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10 text-center">
            <div>
              <div className="font-serif text-2xl md:text-3xl text-[#D4C5A9]">100%</div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">Authentic Heritage</div>
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl text-[#D4C5A9]">Handmade</div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">Master Artisan Guilds</div>
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl text-[#D4C5A9]">Zero</div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">Synthetic Compromise</div>
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl text-[#D4C5A9]">Global</div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">White-Glove Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & PSYCHOLOGY SECTION */}
      <section id="philosophy" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A5B] font-semibold">The Philosophy of Calm</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#1D1B18] leading-tight">
              Honest products for spaces that breathe.
            </h2>
            <p className="text-lg text-neutral-700 font-light leading-relaxed">
              By curating design-led pieces that balance function, beauty, and authenticity, we connect individual objects into cohesive environments. The result is more than a collection. It is a thoughtful expression of where things come from and how they come together.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#E6E2D8]">
              <div>
                <h4 className="font-serif text-xl mb-2 text-[#1D1B18]">Tactile Authenticity</h4>
                <p className="text-sm text-neutral-600 font-light">Every surface tells a story of raw minerals, organic wools, and centuries-old timber.</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-[#1D1B18]">Uncompromising Scale</h4>
                <p className="text-sm text-neutral-600 font-light">Designed for discerning collectors, leading architects, and luxury sanctuaries worldwide.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" 
                alt="Calm Sanctuary Interior" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#F8F6F0]/90 backdrop-blur-md p-6 border border-[#E6E2D8]">
                <span className="text-[10px] tracking-widest uppercase text-[#8C7A5B] block mb-1">Featured Curation</span>
                <p className="font-serif text-xl text-[#1D1B18]">"The dialogue between stone, linen, and filtered light."</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#EFECE3] -z-10 hidden md:block border border-[#DCD6C8]"></div>
          </div>
        </div>
      </section>

      {/* CURATED CATALOG SECTION */}
      <section id="curation" className="py-20 bg-[#F1EEDF]/50 border-t border-b border-[#E6E2D8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E6E2D8] gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A5B] block mb-2">Curated Masterpieces</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light">The Collection</h2>
            </div>

            {/* Brand Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-neutral-500 mr-2 flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Brand:
              </span>
              {brands.map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 text-xs tracking-wider transition-all ${selectedBrand === b ? 'bg-[#1D1B18] text-[#F8F6F0]' : 'bg-[#F8F6F0] text-neutral-700 hover:bg-[#E6E2D8] border border-[#DCD6C8]'}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#1D1B18] text-[#F8F6F0] font-medium shadow-md' : 'bg-transparent text-neutral-600 hover:text-[#1D1B18] border border-[#DCD6C8]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-[#F8F6F0] border border-[#E6E2D8] hover:border-[#1D1B18] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl relative"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EFECE3]">
                    {product.tag && (
                      <span className="absolute top-3 left-3 z-10 bg-[#1D1B18] text-[#F8F6F0] text-[9px] uppercase tracking-widest px-2.5 py-1">
                        {product.tag}
                      </span>
                    )}
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full transition-colors ${isWishlisted ? 'text-red-600' : 'text-neutral-700 hover:text-red-600'}`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-[#F8F6F0] text-[#1D1B18] py-2.5 text-xs tracking-widest uppercase font-medium hover:bg-[#D4C5A9] transition-colors"
                      >
                        Inspect Object
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-widest mb-1">
                        <span>{product.brand}</span>
                        <span>{product.category}</span>
                      </div>
                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="font-serif text-xl font-normal text-[#1D1B18] cursor-pointer hover:text-[#8C7A5B] transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2 font-light">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E6E2D8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Investment</span>
                        <span className="font-serif text-xl font-medium text-[#1D1B18]">{formatPrice(product.price)}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-[#1D1B18] text-[#F8F6F0] px-4 py-2.5 text-xs tracking-widest uppercase hover:bg-[#8C7A5B] transition-all flex items-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 space-y-4">
              <p className="font-serif text-2xl text-neutral-600">No honest objects found matching your search criteria.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSelectedBrand('All'); setSearchQuery(''); }}
                className="inline-block bg-[#1D1B18] text-[#F8F6F0] px-6 py-3 text-xs tracking-widest uppercase"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BESPOKE SPACES / ARCHITECTURAL INQUIRY SECTION */}
      <section id="bespoke" className="py-28 bg-[#1D1B18] text-[#F8F6F0] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85" 
            alt="Bespoke Architecture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4C5A9] border border-[#D4C5A9]/30 px-4 py-1.5">
            Architect & Interior Designer Concierge
          </span>
          <h2 className="text-4xl md:text-7xl font-serif font-light leading-tight">
            Cohesive Environments & Complete Spatial Direction
          </h2>
          <p className="text-base md:text-lg text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Whether outfitting a minimalist penthouse, boutique hospitality retreat, or private residence, our design directors collaborate with top studios to curate custom lighting, monumental seating, and architectural finishes.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setIsBespokeModalOpen(true)}
              className="bg-[#D4C5A9] text-[#1D1B18] px-10 py-5 text-xs tracking-[0.25em] uppercase font-medium hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-3 mx-auto"
            >
              <Compass className="w-4 h-4" />
              <span>Initiate Bespoke Project Inquiry</span>
            </button>
          </div>
        </div>
      </section>

      {/* JOURNAL / EDITORIAL STORIES */}
      <section id="journal" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A5B]">Editorial Perspectives</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light">The Slow Living Journal</h2>
          <p className="text-sm text-neutral-600 font-light">
            Reflections on material honesty, architectural light, and the psychology of calm interior sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'The Tactility of Unfinished Terracotta',
              date: 'November 2026',
              read: '4 min read',
              image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
              excerpt: 'Why raw earthenware and porous surfaces ground the human nervous system in high-stress modern spaces.'
            },
            {
              title: 'Architectural Lighting as Emotional Anchor',
              date: 'October 2026',
              read: '6 min read',
              image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
              excerpt: 'Exploring how handmade Washi paper shades and alabaster globes transform residential geometry at twilight.'
            },
            {
              title: 'Honest Timber: Century-Old Oak Stories',
              date: 'September 2026',
              read: '5 min read',
              image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
              excerpt: 'The journey of salvaged French oak from Burgundy forests to bespoke dining monoliths.'
            }
          ].map((article, idx) => (
            <div key={idx} className="group bg-[#F8F6F0] border border-[#E6E2D8] hover:border-[#1D1B18] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#EFECE3]">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span>{article.read}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#1D1B18] group-hover:text-[#8C7A5B] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <button 
                  onClick={() => triggerNotification(`Opening journal article: "${article.title}"`)}
                  className="text-xs tracking-widest uppercase font-medium text-[#1D1B18] flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1D1B18] text-[#F8F6F0] pt-20 pb-12 border-t border-[#3A3733]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="space-y-6 md:col-span-1">
            <span className="font-serif text-2xl tracking-wider block">THIS IS FROM</span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Crafting honest products and calm environments that help you balance life's contrasts through authentic design and responsible choices.
            </p>
            <div className="flex items-center space-x-4 text-xs text-[#D4C5A9]">
              <Globe className="w-4 h-4" />
              <span>Global Delivery & Showrooms (Paris, Copenhagen, Tokyo)</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4C5A9] font-medium">Curations</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><a href="#curation" className="hover:text-white transition-colors">Seating & Lounges</a></li>
              <li><a href="#curation" className="hover:text-white transition-colors">Monolith Tables</a></li>
              <li><a href="#curation" className="hover:text-white transition-colors">Vessels & Terracotta</a></li>
              <li><a href="#curation" className="hover:text-white transition-colors">Sculptural Lighting</a></li>
              <li><a href="#curation" className="hover:text-white transition-colors">Cashmere & Wool Textiles</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4C5A9] font-medium">Professional</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><button onClick={() => setIsBespokeModalOpen(true)} className="hover:text-white transition-colors text-left">Architect Trade Program</button></li>
              <li><button onClick={() => setIsBespokeModalOpen(true)} className="hover:text-white transition-colors text-left">Bespoke Spatial Design</button></li>
              <li><a href="#journal" className="hover:text-white transition-colors">Press & Publications</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Sustainability Manifesto</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4C5A9] font-medium">Private Sanctuary Newsletter</h4>
            <p className="text-xs text-neutral-400 font-light">Receive private previews of limited master artisan editions.</p>
            <form onSubmit={e => { e.preventDefault(); triggerNotification('Subscribed successfully to the private sanctuary ledger.'); }} className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                required
                className="bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4C5A9]"
              />
              <button type="submit" className="bg-[#D4C5A9] text-[#1D1B18] py-2.5 text-xs tracking-widest uppercase font-medium hover:bg-white transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-light">
          <p>© {new Date().getFullYear()} This Is From. All rights reserved. Crafted for luxury interiors.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Acquisition</a>
            <a href="#" className="hover:text-white transition-colors">White-Glove Logistics</a>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#F8F6F0] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#DCD6C8] shadow-2xl relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white transition-colors rounded-full"
              >
                <X className="w-5 h-5 text-[#1D1B18]" />
              </button>

              <div className="w-full md:w-1/2 bg-[#EFECE3] relative min-h-[350px] md:min-h-full">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                {selectedProduct.tag && (
                  <span className="absolute top-4 left-4 bg-[#1D1B18] text-[#F8F6F0] text-[10px] uppercase tracking-widest px-3 py-1">
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-widest">
                    <span>{selectedProduct.brand}</span>
                    <span>{selectedProduct.category}</span>
                  </div>
                  <h2 className="font-serif text-3xl font-normal text-[#1D1B18]">
                    {selectedProduct.name}
                  </h2>
                  <div className="font-serif text-3xl font-medium text-[#1D1B18]">
                    {formatPrice(selectedProduct.price)}
                  </div>
                  <p className="text-sm text-neutral-700 font-light leading-relaxed pt-2">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#E6E2D8]">
                    <div className="flex items-start space-x-3 text-xs text-neutral-600">
                      <Compass className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1B18] block uppercase tracking-wider text-[10px]">Origin</strong>
                        <span>{selectedProduct.origin}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-xs text-neutral-600">
                      <ShieldCheck className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1B18] block uppercase tracking-wider text-[10px]">Master Artisan</strong>
                        <span>{selectedProduct.artisan}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-xs text-neutral-600">
                      <Info className="w-4 h-4 text-[#8C7A5B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1D1B18] block uppercase tracking-wider text-[10px]">Dimensions & Specifications</strong>
                        <span>{selectedProduct.dimensions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1.5">Honest Materials</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.materials.map((mat, i) => (
                        <span key={i} className="bg-[#EFECE3] border border-[#DCD6C8] text-neutral-700 text-[11px] px-3 py-1">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E6E2D8] flex items-center space-x-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-grow bg-[#1D1B18] text-[#F8F6F0] py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#8C7A5B] transition-all flex items-center justify-center space-x-2 shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire Object</span>
                  </button>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-4 border border-[#1D1B18] transition-colors ${wishlist.includes(selectedProduct.id) ? 'bg-[#1D1B18] text-white' : 'hover:bg-neutral-200 text-[#1D1B18]'}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART & CHECKOUT DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-md w-full bg-[#F8F6F0] shadow-2xl border-l border-[#DCD6C8] flex flex-col z-10"
            >
              <div className="p-6 border-b border-[#E6E2D8] flex items-center justify-between bg-[#1D1B18] text-[#F8F6F0]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#D4C5A9]" />
                  <h3 className="font-serif text-xl tracking-wide">Acquisition Sanctuary</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-[#D4C5A9] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto stroke-1" />
                    <p className="font-serif text-xl text-neutral-700">Your acquisition bag is currently empty.</p>
                    <p className="text-xs text-neutral-500 font-light">Explore our curated collection to select honest design objects.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-[#1D1B18] text-[#F8F6F0] px-6 py-3 text-xs tracking-widest uppercase font-medium"
                    >
                      Explore Curation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex space-x-4 bg-white p-4 border border-[#E6E2D8]">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover bg-[#EFECE3]" />
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">{item.product.brand}</span>
                            <h4 className="font-serif text-base font-normal text-[#1D1B18] line-clamp-1">{item.product.name}</h4>
                            <span className="text-xs font-medium text-[#1D1B18]">{formatPrice(item.product.price)}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="text-neutral-500">Qty: {item.quantity}</span>
                            </div>
                            <button 
                              onClick={() => setCart(prev => prev.filter((_, i) => i !== idx))}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E6E2D8] bg-[#EFECE3]/50 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>White-Glove Global Delivery</span>
                      <span className="text-emerald-700 font-medium">Complimentary</span>
                    </div>
                    <div className="flex justify-between font-serif text-xl font-medium text-[#1D1B18] pt-2 border-t border-[#DCD6C8]">
                      <span>Total Investment</span>
                      <span>{formatPrice(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      triggerNotification('Proceeding to secure white-glove acquisition checkout...');
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#1D1B18] text-[#F8F6F0] py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#8C7A5B] transition-all flex items-center justify-center space-x-2 shadow-xl"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest">
                    Secured by Encrypted Concierge Protocol
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BESPOKE PROJECT INQUIRY MODAL */}
      <AnimatePresence>
        {isBespokeModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#F8F6F0] max-w-2xl w-full p-8 md:p-12 border border-[#DCD6C8] shadow-2xl relative"
            >
              <button 
                onClick={() => setIsBespokeModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-[#EFECE3] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#1D1B18]" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A5B] block mb-1">Architect & Designer Concierge</span>
                  <h2 className="font-serif text-3xl font-light text-[#1D1B18]">Bespoke Space Project Inquiry</h2>
                  <p className="text-xs text-neutral-600 font-light mt-1">
                    Complete the details below to connect with our interior architecture and trade curation division.
                  </p>
                </div>

                <form onSubmit={e => {
                  e.preventDefault();
                  setIsBespokeModalOpen(false);
                  triggerNotification('Bespoke project dossier submitted successfully. A design director will contact you within 24 hours.');
                }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-600 mb-1">Full Name / Studio Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Atelier Vesper Architects" 
                        className="w-full bg-[#EFECE3] border border-[#DCD6C8] px-4 py-3 text-xs focus:outline-none focus:border-[#1D1B18]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-600 mb-1">Professional Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="concierge@ateliervesper.com" 
                        className="w-full bg-[#EFECE3] border border-[#DCD6C8] px-4 py-3 text-xs focus:outline-none focus:border-[#1D1B18]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-600 mb-1">Project Scale / Type</label>
                      <select className="w-full bg-[#EFECE3] border border-[#DCD6C8] px-4 py-3 text-xs focus:outline-none focus:border-[#1D1B18]">
                        <option>Private Residence Penthouse ($50k+)</option>
                        <option>Boutique Hotel & Hospitality Fit-Out</option>
                        <option>Architectural Studio Showroom</option>
                        <option>Single Room Calm Sanctuary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-600 mb-1">Estimated Budget Range</label>
                      <select className="w-full bg-[#EFECE3] border border-[#DCD6C8] px-4 py-3 text-xs focus:outline-none focus:border-[#1D1B18]">
                        <option>$10,000 - $25,000</option>
                        <option>$25,000 - $75,000</option>
                        <option>$75,000 - $200,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-neutral-600 mb-1">Project Vision & Spatial Notes</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Describe the aesthetic, desired materials (e.g. travertine, bouclé, raw oak), and timeline..."
                      className="w-full bg-[#EFECE3] border border-[#DCD6C8] p-4 text-xs focus:outline-none focus:border-[#1D1B18]"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1D1B18] text-[#F8F6F0] py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#8C7A5B] transition-all shadow-xl"
                  >
                    Submit Project Dossier for Review
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
