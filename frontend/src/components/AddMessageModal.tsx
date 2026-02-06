import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AvatarType, CategoryId, Message } from '@/types/emotions';
import { AvatarIcon } from '@/components/AvatarIcon';

const avatarOptions: { type: AvatarType; label: string }[] = [
  { type: 'rose', label: 'Rose' },
  { type: 'moon', label: 'Moon' },
  { type: 'phoenix', label: 'Phoenix' },
  { type: 'heart', label: 'Heart' },
  { type: 'shadow', label: 'Shadow' },
  { type: 'angel', label: 'Angel' },
];

interface AddMessageModalProps {
  category: CategoryId;
  username: string;
  onClose: () => void;
  onSubmit: (msg: any) => void;
}

const AddMessageModal = ({ category, username, onClose, onSubmit }: AddMessageModalProps) => {
  const [avatar, setAvatar] = useState<AvatarType>('heart');
  // const [displayName, setDisplayName] = useState(''); // Removed, using username prop
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // We pass the data needed for the backend
    onSubmit({
      sender: username,
      content: content.trim(),
      category,
      avatar,
      // Frontend needs these for optimistic update if we want, or we just rely on refetch
      displayName: username // Map sender to displayName for frontend
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative bg-card rounded-2xl p-6 w-full max-w-md border border-border"
        style={{ boxShadow: 'var(--shadow-romantic)' }}
        initial={{ scale: 0.75, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.75, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="font-display text-2xl text-foreground mb-1">Leave a Note</h2>
        <p className="text-sm text-muted-foreground mb-5">
          on the <span className="font-semibold capitalize">{category.replace('-', ' ')}</span> branch
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Choose your spirit</label>
            <div className="flex gap-2 flex-wrap">
              {avatarOptions.map((opt) => (
                <motion.button
                  key={opt.type}
                  type="button"
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-colors ${avatar === opt.type
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent bg-secondary/50 hover:bg-secondary'
                    }`}
                  onClick={() => setAvatar(opt.type)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <AvatarIcon type={opt.type} size={22} />
                  <span className="text-[10px] text-muted-foreground">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Display Name is now fixed to username */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Posting as</label>
            <div className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground opacity-70 cursor-not-allowed">
              {username}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Your message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something from your heart..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none h-24"
              maxLength={280}
            />
          </div>

          <p className="text-xs text-muted-foreground italic">🔒 Your message is anonymous. No data is collected.</p>

          <motion.button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-display font-semibold text-sm disabled:opacity-40"
            disabled={!content.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Plant Your Note 🌹
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddMessageModal;
