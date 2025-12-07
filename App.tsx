import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Widget from './components/Widget';
import Assistant from './components/Assistant';
import AddLinkModal from './components/AddLinkModal';
import SettingsModal, { ThemeSettings } from './components/SettingsModal';
import { CATEGORIES as DEFAULT_CATEGORIES } from './constants';
import { WidgetCategory, LinkItem } from './types';
import { syncWithOsintSource } from './services/geminiService';

// Default Styles
const DEFAULT_THEME: ThemeSettings = {
  primary: '#ff00ff',
  secondary: '#00ffff',
  highlight: '#ccff00',
};

// Dark Mode / Stealth Mode Palette
const STEALTH_THEME: ThemeSettings = {
  primary: '#4d94ff',    // Subdued Blue
  secondary: '#0059b3',  // Darker Blue
  highlight: '#80bfff',  // Light Blue/Grey
};

const App: React.FC = () => {
  // --- Data State ---
  const [categories, setCategories] = useState<WidgetCategory[]>(() => {
    const saved = localStorage.getItem('osint_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // --- UI State ---
  const [filter, setFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- Preferences State (Layout, Filtering, Theme) ---
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('osint_selected_categories');
    return saved ? JSON.parse(saved) : [];
  });

  const [layout, setLayout] = useState<'masonry' | 'list'>(() => {
    return (localStorage.getItem('osint_layout') as 'masonry' | 'list') || 'masonry';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('osint_dark_mode') === 'true';
  });

  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('osint_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  // --- Persistence & Side Effects ---

  useEffect(() => {
    localStorage.setItem('osint_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('osint_selected_categories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem('osint_layout', layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('osint_dark_mode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('osint_theme', JSON.stringify(theme));
  }, [theme]);

  // Apply CSS Variables for Theming
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = darkMode ? STEALTH_THEME : theme;

    root.style.setProperty('--color-punk-pink', currentTheme.primary);
    root.style.setProperty('--color-punk-cyan', currentTheme.secondary);
    root.style.setProperty('--color-punk-lime', currentTheme.highlight);

    if (darkMode) {
      root.style.setProperty('--bg-color', '#000000');
      root.style.setProperty('--color-punk-dark', '#050505');
      root.style.setProperty('--color-punk-darker', '#000000');
      root.style.setProperty('--color-punk-card', '#0a0a0a');
    } else {
      root.style.setProperty('--bg-color', '#050505');
      root.style.setProperty('--color-punk-dark', '#111111');
      root.style.setProperty('--color-punk-darker', '#0a0a0a');
      root.style.setProperty('--color-punk-card', '#1a1a1a');
    }
  }, [theme, darkMode]);

  // --- Filtering Logic ---
  
  const toggleCategory = (id: string) => {
    if (id === 'ALL') {
      setSelectedCategories([]); // Clearing specific selections implies "Show All"
      return;
    }

    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredCategories = useMemo(() => {
    let cats = categories;

    // 1. Filter by Category Selection (Multi-select)
    if (selectedCategories.length > 0) {
      cats = cats.filter(c => selectedCategories.includes(c.id));
    }

    // 2. Filter by Search Text
    if (!filter) return cats;
    
    const lowerFilter = filter.toLowerCase();

    return cats.map(cat => ({
      ...cat,
      links: cat.links.filter(link => 
        link.name.toLowerCase().includes(lowerFilter) || 
        (link.description && link.description.toLowerCase().includes(lowerFilter))
      )
    })).filter(cat => cat.links.length > 0);
  }, [filter, categories, selectedCategories]);

  // --- Handlers ---

  const handleAddLink = (categoryId: string, newLink: LinkItem, newCategoryTitle?: string) => {
    setCategories(prev => {
      if (categoryId === 'new' && newCategoryTitle) {
        const newCat: WidgetCategory = {
          id: newCategoryTitle.toLowerCase().replace(/\s+/g, '_'),
          title: newCategoryTitle,
          icon: '✨',
          color: 'cyan', 
          links: [{ ...newLink, isNew: true }]
        };
        return [newCat, ...prev];
      }
      return prev.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, links: [...cat.links, { ...newLink, isNew: true }] };
        }
        return cat;
      });
    });
    setIsAddModalOpen(false);
  };

  const handleSync = async () => {
    if (!window.confirm("This will overwrite your current layout with the latest data from the source website. Custom links may be lost. Continue?")) {
      return;
    }
    setIsSyncing(true);
    try {
      const newCategories = await syncWithOsintSource();
      if (newCategories && newCategories.length > 0) {
        setCategories(newCategories);
        alert(`SYNC COMPLETE! // ${newCategories.length} MODULES LOADED`);
      } else {
        alert("SYNC FAILED // NO DATA RETRIEVED");
      }
    } catch (e) {
      console.error(e);
      alert("SYNC ERROR // CONNECTION INTERRUPTED");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm("Reset all visual settings to default?")) {
      setTheme(DEFAULT_THEME);
      setDarkMode(false);
      setLayout('masonry');
    }
  };

  return (
    <div className={`min-h-screen pb-20 relative transition-colors duration-300 ${darkMode ? 'selection:bg-blue-500' : 'selection:bg-punk-pink'}`}>
      <Header 
        onSearch={setFilter} 
        onAddLink={() => setIsAddModalOpen(true)}
        onSync={handleSync}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSyncing={isSyncing}
      />

      <main className="max-w-[1600px] mx-auto px-4">
        {/* Sync Overlay */}
        {isSyncing && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <div className="text-center">
               <div className="text-6xl mb-4 animate-bounce">📡</div>
               <h2 className="text-3xl font-header text-punk-lime mb-2">HACKING_MAINFRAME</h2>
               <p className="font-retro text-punk-cyan text-xl animate-pulse">DOWNLOADING RESOURCES...</p>
             </div>
           </div>
        )}

        {/* Multi-Select Category Bar */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 custom-scrollbar sticky top-0 z-20 bg-[var(--bg-color)]/90 backdrop-blur-sm pt-2">
           <button
             onClick={() => toggleCategory('ALL')}
             className={`
               whitespace-nowrap px-4 py-1 font-retro text-lg border-2 transition-all
               ${selectedCategories.length === 0 
                 ? 'bg-punk-pink text-black border-punk-pink shadow-retro-sm scale-105' 
                 : 'bg-punk-dark text-gray-400 border-gray-700 hover:border-punk-pink hover:text-white'}
             `}
           >
             ALL_SYSTEMS
           </button>
           {categories.map((cat) => {
             const isActive = selectedCategories.includes(cat.id);
             return (
               <button
                 key={cat.id}
                 onClick={() => toggleCategory(cat.id)}
                 className={`
                   whitespace-nowrap px-4 py-1 font-retro text-lg border-2 transition-all flex items-center gap-2
                   ${isActive 
                      ? 'bg-punk-cyan text-black border-punk-cyan shadow-retro-sm scale-105' 
                      : 'bg-punk-dark text-gray-400 border-gray-700 hover:border-punk-cyan hover:text-white'}
                 `}
               >
                 <span>{cat.icon}</span>
                 {cat.title}
                 {isActive && <span className="text-[10px]">x</span>}
               </button>
             );
           })}
        </div>

        {/* Layout Engine */}
        {layout === 'masonry' ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="break-inside-avoid">
                <Widget category={category} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
             {filteredCategories.map((category) => (
               <Widget key={category.id} category={category} />
             ))}
          </div>
        )}

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="font-header text-2xl text-punk-pink mb-4">NO_RESULTS_FOUND</h2>
            <p className="font-retro text-gray-500">Adjust filters or ask the AI Assistant.</p>
          </div>
        )}
      </main>
      
      <footer className="mt-20 border-t border-gray-800 py-8 text-center font-tech text-gray-600">
        <p>OSINT4ALL CLONE // BUILT WITH REACT + TAILWIND + GEMINI</p>
        <p className="text-xs mt-2">NOT AFFILIATED WITH START.ME OR THE ORIGINAL CREATOR</p>
      </footer>

      <Assistant />

      {isAddModalOpen && (
        <AddLinkModal 
          categories={categories} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddLink} 
        />
      )}

      {isSettingsOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsOpen(false)}
          layout={layout}
          onLayoutChange={setLayout}
          theme={theme}
          onThemeChange={(k, v) => setTheme(prev => ({ ...prev, [k]: v }))}
          darkMode={darkMode}
          onDarkModeToggle={setDarkMode}
          onReset={handleResetSettings}
        />
      )}
    </div>
  );
};

export default App;