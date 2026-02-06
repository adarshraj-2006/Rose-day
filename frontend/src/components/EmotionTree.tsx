import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HeartCrack, Users, Home, Sparkles, Bookmark } from 'lucide-react';
import { categories } from '@/data/mockData';
import { Message, CategoryId } from '@/types/emotions';
import { AvatarIcon } from '@/components/AvatarIcon';
import AddMessageModal from '@/components/AddMessageModal';
import MessageDetailModal from '@/components/MessageDetailModal';

const categoryIcons: Record<CategoryId, typeof Heart> = {
  love: Heart,
  heartbreak: HeartCrack,
  friendship: Users,
  family: Home,
  'self-love': Sparkles,
};

interface EmotionTreeProps {
  username: string;
}

const EmotionTree = ({ username }: EmotionTreeProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`);
      if (response.ok) {
        const data = await response.json();
        const mappedMessages: Message[] = data.map((msg: any) => ({
          id: msg._id,
          category: msg.category,
          avatar: msg.avatar,
          displayName: msg.sender,
          content: msg.content,
          createdAt: new Date(msg.timestamp)
        }));
        setMessages(mappedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Polling every 5 sec
    return () => clearInterval(interval);
  }, []);

  const getMessagePositions = (catId: CategoryId, cx: number, cy: number) => {
    const catMessages = messages.filter((m) => m.category === catId);
    const radius = 9;
    return catMessages.map((msg, i) => {
      const angle = (Math.PI * 2 * i) / Math.max(catMessages.length, 1) - Math.PI / 2;
      return {
        ...msg,
        x: Math.max(3, Math.min(97, cx + Math.cos(angle) * radius)),
        y: Math.max(3, Math.min(97, cy + Math.sin(angle) * radius)),
      };
    });
  };

  const handleAddMessage = async (msg: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });

      if (response.ok) {
        const newMsg = await response.json();
        // Optimistic update or just fetch
        fetchMessages();
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Failed to post message:', error);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: '4/3' }}>
      {/* SVG Tree */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30, 35%, 42%)" />
            <stop offset="100%" stopColor="hsl(25, 45%, 22%)" />
          </linearGradient>
          <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(30, 35%, 38%)" />
            <stop offset="100%" stopColor="hsl(30, 25%, 50%)" />
          </linearGradient>
          <filter id="treeShadow">
            <feDropShadow dx="0" dy="0.3" stdDeviation="0.4" floodColor="hsl(25, 40%, 15%)" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Trunk */}
        <path
          d="M48,96 Q48,82 48.5,70 Q49,62 50,50 Q51,62 51.5,70 Q52,82 52,96 Z"
          fill="url(#trunkGrad)"
          filter="url(#treeShadow)"
        />

        {/* Decorative twigs */}
        <path d="M50,63 Q46,60 43,58" stroke="hsl(30, 30%, 44%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        <path d="M50,57 Q54,54 57,52" stroke="hsl(30, 30%, 44%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        <path d="M50,53 Q47,51 44,49" stroke="hsl(30, 30%, 44%)" strokeWidth="0.35" fill="none" strokeLinecap="round" />

        {/* Main branches */}
        {categories.map((cat, i) => (
          <motion.path
            key={cat.id}
            d={cat.branchPath}
            stroke="url(#branchGrad)"
            strokeWidth={1.3 - i * 0.05}
            strokeLinecap="round"
            fill="none"
            filter="url(#treeShadow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
          />
        ))}

        {/* Vine lines to message nodes */}
        {categories.map((cat) => {
          const positions = getMessagePositions(cat.id, cat.x, cat.y);
          return positions.map((pos, i) => (
            <motion.line
              key={`${cat.id}-vine-${i}`}
              x1={cat.x}
              y1={cat.y}
              x2={pos.x}
              y2={pos.y}
              stroke="hsl(30, 25%, 52%)"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 0.6, delay: 1.8 + i * 0.08 }}
            />
          ));
        })}
      </svg>

      {/* Category Nodes */}
      {categories.map((cat, i) => {
        const Icon = categoryIcons[cat.id];
        const count = messages.filter((m) => m.category === cat.id).length;
        return (
          <motion.button
            key={cat.id}
            className="absolute z-10 flex flex-col items-center gap-0.5 group"
            style={{ left: `${cat.x}%`, top: `${cat.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.6 + i * 0.15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setSelectedCategory(cat.id);
              setShowAddModal(true);
            }}
          >
            <motion.div
              className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
              style={{
                backgroundColor: `${cat.color}18`,
                borderColor: cat.color,
              }}
              animate={{
                boxShadow: [
                  `0 0 8px ${cat.glowColor}30`,
                  `0 0 22px ${cat.glowColor}55`,
                  `0 0 8px ${cat.glowColor}30`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={20} style={{ color: cat.color }} className="md:hidden" />
              <Icon size={24} style={{ color: cat.color }} className="hidden md:block" />
            </motion.div>
            <span
              className="text-[10px] md:text-xs font-display font-semibold whitespace-nowrap"
              style={{ color: cat.color }}
            >
              {cat.name}
            </span>
            <span className="text-[9px] text-muted-foreground">{count} notes</span>
          </motion.button>
        );
      })}

      {/* Message Nodes */}
      {categories.map((cat) =>
        getMessagePositions(cat.id, cat.x, cat.y).map((msg, i) => (
          <motion.button
            key={msg.id}
            className="absolute z-10 group"
            style={{ left: `${msg.x}%`, top: `${msg.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 2.2 + i * 0.08 }}
            whileHover={{ scale: 1.35, zIndex: 50 }}
            onClick={() => setSelectedMessage(msg)}
          >
            <motion.div
              className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center backdrop-blur-sm border"
              style={{
                backgroundColor: `${cat.color}12`,
                borderColor: `${cat.color}35`,
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            >
              <AvatarIcon type={msg.avatar} size={14} className="md:hidden" />
              <AvatarIcon type={msg.avatar} size={16} className="hidden md:block" />
            </motion.div>

            {/* Hover tooltip */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-card/95 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] whitespace-nowrap border border-border" style={{ boxShadow: 'var(--shadow-romantic)' }}>
                {msg.displayName}
              </div>
            </div>

            {/* Save icon on hover */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-70 transition-opacity duration-200">
              <Bookmark size={10} className="text-muted-foreground" />
            </div>
          </motion.button>
        ))
      )}

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && selectedCategory && (
          <AddMessageModal
            category={selectedCategory}
            username={username}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddMessage}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedMessage && (
          <MessageDetailModal
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmotionTree;
