import React from 'react';
// ✅ Correct for React Native
import { CheckSquare, Lock, Crown, Bell } from 'lucide-react-native';

// Define the structure for a single notification item
export interface NotificationItem {
  id: string; // Document ID
  type: 'success' | 'info' | 'badge' | 'reminder';
  title: string;
  content: string;
  timestamp: Date; // Firestore Timestamp converted to Date
  isRead: boolean;
}

// Define the icon, color, and emoji based on the notification type
const getNotificationMetadata = (type: NotificationItem['type']) => {
  switch (type) {
    case 'success':
      return { Icon: CheckSquare, iconColor: '#10B981', emoji: '✅' }; // Emerald 500
    case 'info':
      return { Icon: Lock, iconColor: '#F59E0B', emoji: '🔒' }; // Amber 500
    case 'badge':
      return { Icon: Crown, iconColor: '#FBBF24', emoji: '🏆' }; // Amber 400
    case 'reminder':
      return { Icon: Bell, iconColor: '#6B7280', emoji: '🔔' }; // Gray 500
    default:
      return { Icon: Bell, iconColor: '#6B7280', emoji: 'ℹ️' };
  }
};

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: (id: string) => void;
}

/**
 * Renders a single, styled notification card with the LeoConnect theme.
 * Features: Yellow outline, shadow effect, title, content, and an icon/emoji.
 */
const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
  const { id, title, content, type, isRead, timestamp } = notification;
  const { emoji } = getNotificationMetadata(type);
  
  // Styling constants for consistency with your LeoConnect theme
  const ACCENT_YELLOW = '#FFC72C';
  const PRIMARY_TEXT = '#1F2937'; // Gray 800
  const SECONDARY_TEXT = '#4B5563'; // Gray 600
  
  // Format the timestamp to a friendly string (e.g., "1 hour ago")
  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
  };

  return (
    <button
      onClick={() => onPress(id)}
      className="w-full text-left focus:outline-none transition-transform duration-200 active:scale-[0.99] group"
    >
      <div 
        className={`
          bg-white 
          rounded-xl 
          p-4 
          mx-auto 
          my-3 
          shadow-md
          ${isRead ? 'opacity-80' : 'shadow-lg'}
        `}
        style={{
          // Mimicking the yellow outline (border-2) and subtle shadow effect
          border: `2px solid ${ACCENT_YELLOW}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 199, 44, 0.5)', 
          maxWidth: '450px',
        }}
      >
        <div className="flex justify-between items-center mb-1">
          {/* Notification Header: Emoji and Title */}
          <div className="flex items-center flex-1 min-w-0">
            <span className="text-xl mr-2">{emoji}</span>
            <h3 className="text-base font-bold truncate" style={{ color: PRIMARY_TEXT }}>
              {title}
            </h3>
          </div>
          
          {/* Unread Indicator */}
          {!isRead && (
            <div className="w-2 h-2 rounded-full bg-red-500 ml-2 animate-pulse" title="Unread"></div>
          )}
        </div>
        
        {/* Content and Timestamp */}
        <p className="text-sm mt-1 leading-snug" style={{ color: SECONDARY_TEXT }}>
          {content}
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: SECONDARY_TEXT }}>
            {formatTimeAgo(timestamp)}
        </p>
      </div>
    </button>
  );
};

export default NotificationCard;