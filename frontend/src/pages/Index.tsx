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

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl max-w-md w-full"
          >
            <h1 className="font-display text-2xl text-primary text-center mb-6">Enter Your Name</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="How should we call you?"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUsername('Guest')}
                  className="flex-1 bg-white/5 text-foreground rounded-xl py-3 text-sm hover:bg-white/10 transition-colors"
                >
                  Just Looking
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-2 bg-primary text-white rounded-xl py-3 px-6 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '...' : 'Enter Garden'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <motion.footer
        className="text-center pb-4 text-[11px] text-muted-foreground relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Click any branch to plant your anonymous message 💌
      </motion.footer>
    </div>
  );
};

export default Index;
