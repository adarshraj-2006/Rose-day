import { useState } from 'react';
import { motion } from 'framer-motion';
import EmotionTree from '@/components/EmotionTree';
import FloatingPetals from '@/components/FloatingPetals';
import { toast } from 'sonner';

const Index = () => {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('rose_day_username'));
  const [tempName, setTempName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      // Remove trailing slash if present to avoid //api/users
      const cleanApiUrl = apiUrl.replace(/\/$/, '');

      const response = await fetch(`${cleanApiUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: tempName }),
      });

      if (response.ok) {
        localStorage.setItem('rose_day_username', tempName);
        setUsername(tempName);
        toast.success(`Welcome to the garden, ${tempName}!`);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to join garden');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Connection error. Please try again or continue as Guest.');
    } finally {
      setIsLoading(false);
    }
  };

  const showLogin = !username;

  return (
    <div className="min-h-screen overflow-hidden relative romantic-bg">
      <FloatingPetals />

      <motion.header
        className="text-center pt-6 md:pt-10 pb-1 relative z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-display text-3xl md:text-5xl lg:text-6xl text-primary font-bold"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tree of Emotions
        </motion.h1>
        <motion.p
          className="font-body text-muted-foreground mt-1.5 text-xs md:text-sm max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {username ? (
            <>Welcome, <span className="text-primary font-semibold">{username}</span>! Leave your feelings on the branches 🌹</>
          ) : (
            <>View the garden of emotions. Join to plant your own 🌹</>
          )}
        </motion.p>
      </motion.header>

      <main className="relative z-10 px-2 md:px-4 py-2 md:py-6">
        <EmotionTree username={username || 'Guest'} />
      </main>

      {!username && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-2xl"
          >
            <p className="text-[10px] text-white/70 mb-2 text-center">Want to plant a rose? Enter your name:</p>
            <form onSubmit={handleLogin} className="flex gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Name..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white rounded-lg px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                {isLoading ? '...' : 'Join'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <motion.footer
        className="mt-auto text-center pb-6 md:pb-8 relative z-10 px-4 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <p className="text-[11px] text-muted-foreground">
          Click any branch to plant your anonymous message 💌
        </p>
        <div className="text-[10px] text-muted-foreground/60 font-medium">
          Developed by{' '}
          <a
            href="https://www.linkedin.com/in/adarsh-raj123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors hover:underline underline-offset-2"
          >
            Adarsh Raj
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
