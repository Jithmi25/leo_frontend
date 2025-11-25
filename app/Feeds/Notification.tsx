import React, { useState, useCallback } from 'react';
import { ArrowLeft, Menu, Bell, Home, User, Check, Info, Award, Clock } from 'lucide-react-native';

// --- TYPE DEFINITIONS ---
const ACCENT_COLOR = 'bg-yellow-500';
const ACCENT_TEXT = 'text-yellow-500';
const PRIMARY_TEXT = 'text-gray-800';
const SECONDARY_TEXT = 'text-gray-500';

// Define a TypeScript type for the notification type strings
type NotificationType = 'success' | 'info' | 'badge' | 'reminder';

// Define the interface for a Notification Item
interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  description?: string;
  timestamp: Date;
  isRead: boolean;
}

// --- UTILITY FUNCTIONS ---

/**
 * Metadata for icons/emojis
 */
const getNotificationMetadata = (type: NotificationType) => {
  switch (type) {
    case 'success': return { icon: Check, color: 'text-green-600', title: 'Success' };
    case 'info': return { icon: Info, color: 'text-blue-600', title: 'Information' };
    case 'badge': return { icon: Award, color: 'text-yellow-600', title: 'Achievement' };
    case 'reminder': return { icon: Clock, color: 'text-red-600', title: 'Reminder' };
    default: return { icon: Info, color: 'text-gray-600', title: 'Notification' };
  }
};

/**
 * Formats a Date object into a time ago string.
 */
const formatTimeAgo = (date: Date) => {
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

// --- COMPONENTS ---

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
  // Robust check: Ensure notification is valid
  if (!notification || !notification.id) {
    console.warn("⚠️ NotificationCard received invalid or incomplete notification:", notification);
    return null;
  }

  const { id, title, content, type, isRead, timestamp } = notification;
  const { icon: Icon, color } = getNotificationMetadata(type);
  const timeAgo = formatTimeAgo(new Date(timestamp));

  // The card style depends on the read status
  const cardClasses = `
    transition-all duration-300 ease-in-out
    p-4 md:p-6 mb-4 rounded-xl border-b-2
    shadow-lg cursor-pointer
    hover:shadow-xl hover:scale-[1.01]
    ${isRead ? 'bg-white opacity-70 border-gray-100' : 'bg-white opacity-100 border-yellow-500 shadow-yellow-100/50'}
  `;

  return (
    <div
      className={cardClasses}
      onClick={() => onPress(id)}
    >
      <div className="flex justify-between items-start">
        {/* Left Side: Icon and Title */}
        <div className="flex items-center min-w-0 flex-1">
          <Icon className={`w-6 h-6 mr-3 ${color}`} />

          <p className={`text-base font-semibold truncate ${PRIMARY_TEXT}`}>
            {title}
          </p>
        </div>

        {/* Right Side: Unread Dot and Time */}
        <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
          {!isRead && (
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          )}
          <p className={`text-xs ${SECONDARY_TEXT}`}>
            {timeAgo}
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <p className={`mt-2 text-sm ${SECONDARY_TEXT}`}>
        {content}
      </p>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT (NotificationScreen) ---

const App = () => {
  // Mock data for testing
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'success',
      title: 'Transfer Complete!',
      content: 'Your recent payment of $450 to Jane Doe has been processed.',
      description: 'Transaction confirmation.',
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
      isRead: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Subscription Renewal Alert',
      content: 'Your premium membership is due for renewal tomorrow.',
      description: 'Membership reminder.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
    },
    {
      id: '3',
      type: 'badge',
      title: 'New Level Unlocked!',
      content: 'You reached Level 5! Claim your badge and reward now.',
      description: 'Gaming achievement.',
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
      isRead: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Security Update Required',
      content: 'We noticed a login from a new device. Please verify your account security.',
      description: 'Security information.',
      timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
      isRead: true,
    },
  ]);

  const handleNotificationPress = useCallback((id: string) => {
    console.log('Pressed notification with id:', id);
    // Mark as read and update state
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // --- Layout Components ---

  const TopNavBar = () => (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-10 flex items-center justify-between px-4 sm:px-6 md:max-w-xl md:mx-auto">
      <button className="p-2 rounded-full hover:bg-gray-100 transition">
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
      <span className="relative">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        {unreadCount > 0 && (
            <div className={`absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white`}>
                {unreadCount}
            </div>
        )}
      </span>
    </div>
  );

  const BottomMenuBar = () => (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-10 flex items-center justify-around md:max-w-xl md:mx-auto">
      <NavItem icon={Home} label="Home" active={false} />
      <NavItem icon={Bell} label="Alerts" active={true} count={unreadCount} />
      <NavItem icon={User} label="Profile" active={false} />
    </div>
  );

  const NavItem = ({ icon: Icon, label, active, count = 0 }: { icon: React.FC<any>, label: string, active: boolean, count?: number }) => (
    <div className={`flex flex-col items-center p-2 transition-colors ${active ? ACCENT_TEXT : SECONDARY_TEXT} cursor-pointer`}>
      <div className="relative">
        <Icon className="w-6 h-6" />
        {count > 0 && (
            <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 rounded-full bg-red-600 border-2 border-white"></div>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );


  return (
    // Outer container to simulate the screen on web
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      
      {/* Mobile Frame Container */}
      <div className="w-full md:max-w-xl md:h-[90vh] md:my-6 md:rounded-3xl md:shadow-2xl bg-gray-100 flex flex-col relative overflow-hidden">
        
        {/* Top Navigation Bar */}
        <TopNavBar />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pt-20 pb-20 p-4 space-y-3">
          {notifications
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Sort by newest first
            .map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={handleNotificationPress}
              />
            ))}
            
            {notifications.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No new notifications.</p>
            )}
        </div>

        {/* Bottom Menu Bar */}
        <BottomMenuBar />
      </div>
    </div>
  );
};

export default App;