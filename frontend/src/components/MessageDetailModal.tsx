import { motion } from 'framer-motion';
import { X, Bookmark, Heart } from 'lucide-react';
import { Message } from '@/types/emotions';
import { AvatarIcon } from '@/components/AvatarIcon';

interface MessageDetailModalProps {
  message: Message;
  onClose: () => void;
}

const MessageDetailModal = ({ message, onClose }: MessageDetailModalProps) => {
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
      />
      <motion.div
        className="relative bg-card rounded-2xl p-8 w-full max-w-sm border border-border text-center"
        style={{ boxShadow: 'var(--shadow-romantic)' }}
        initial={{ scale: 0.5, opacity: 0, rotateY: -12 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotateY: 12 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <motion.div
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AvatarIcon type={message.avatar} size={30} />
        </motion.div>

        <h3 className="font-display text-lg text-foreground mb-0.5">{message.displayName}</h3>
        <p className="text-xs text-muted-foreground mb-5 capitalize">
          {message.category.replace('-', ' ')} branch
        </p>

        <blockquote className="text-foreground/90 font-body italic leading-relaxed mb-6 text-sm">
          &ldquo;{message.content}&rdquo;
        </blockquote>

        <div className="flex justify-center gap-5">
          <motion.button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} />
            <span>Feel</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark size={16} />
            <span>Save</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessageDetailModal;
