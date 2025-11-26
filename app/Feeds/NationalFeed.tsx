import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Search, Plus, Home, ShoppingBag, Award, Bell, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router'; // Add this import for navigation
import PostCard from '@/components/Feed/PostCard';
import BottomNav from '@/components/BottomNav';
import CommentsSheet from '@/components/Feed/CommentsSheet';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldAccent: '#D4A34E',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
  searchBg: '#1C1C1C',
  headerBg: '#FFFFFF',
  gradientStart: '#1C1C1C',
  gradientEnd: '#8B7355',
};

// --- FIX: Define the required type for the active tab state ---
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';
// ---------------------------------------------------------------

interface Post {
  postId: string;
  userName: string;
  userPosition: string;
  userAvatarUri?: string;
  postTitle?: string;
  postContent?: string;
  postMediaUri?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface Style {
  container: ViewStyle;
  safeArea: ViewStyle;
  header: ViewStyle;
  logoContainer: ViewStyle;
  logo: ImageStyle;
  appNameContainer: ViewStyle;
  appName: TextStyle;
  appCountry: TextStyle;
  profileButton: ViewStyle;
  profileImage: ImageStyle;
  clubsContainer: ViewStyle;
  clubsRow: ViewStyle;
  addButton: ViewStyle;
  clubBadge: ImageStyle;
  searchContainer: ViewStyle;
  searchBar: ViewStyle;
  searchIcon: ViewStyle;
  searchInput: TextStyle;
  feedContainer: ViewStyle;
  bottomNav: ViewStyle;
  navItem: ViewStyle;
  navItemActive: ViewStyle;
  navIcon: ViewStyle;
  navLabel: TextStyle;
  navLabelActive: TextStyle;
}

const logoImage = require('../../assets/images/logo.png');

const NationalFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- FIX: Change the state type from string to TabName ---
  const [activeTab, setActiveTab] = useState<TabName>('home');
  // ---------------------------------------------------------
  
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>('');

  useEffect(() => {
    const mockPosts: Post[] = [
      {
        postId: '1',
        userName: 'Leo Amaala Fernando',
        userPosition: 'Club President, Leo District 306 D1',
        userAvatarUri:
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        postTitle: "Leo's vs Everybody - Top Local Deejays Every Week",
        postContent: '',
        postMediaUri:
          'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: 1689,
        comments: 250,
        shares: 150,
      },
      {
        postId: '2',
        userName: 'Kasun Perera',
        userPosition: 'Secretary, Leo Club of Colombo',
        userAvatarUri:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        postTitle: 'Community Service Initiative 2024',
        postContent:
          'Join us for our upcoming community service project this weekend!',
        postMediaUri:
          'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: 523,
        comments: 89,
        shares: 45,
      },
    ];

    setPosts(mockPosts);
  }, []);

  const handleCommentPress = (postId: string) => {
    setSelectedPostId(postId);
    setCommentsVisible(true);
  };

  const handleSharePress = (postId: string) => {
    console.log(`Share post ${postId}`);
  };

  const handleBookmarkPress = (postId: string) => {
    console.log(`Bookmark post ${postId}`);
  };

  // Removed renderNavItem as it's no longer needed (BottomNav handles it)

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={logoImage} 
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.appNameContainer}>
              <Text style={styles.appName}>LeoConnect</Text>
              <Text style={styles.appCountry}>SRI LANKA</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profileButton} activeOpacity={0.8} 
          onPress={() => router.push('/Profile/OwnProfile')} >
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              }}
              style={styles.profileImage}
              resizeMode="cover"
              
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#1C1C1C', '#3D2817'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.clubsContainer}
        >
          <View style={styles.clubsRow}>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => router.push('/Feed')}>
              <Plus color={COLORS.white} size={24} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/Community/Community')}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
                }}
                style={styles.clubBadge}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8}onPress={() => router.push('/Community/HomeCommunity')} >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
                }}
                style={styles.clubBadge}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.searchContainer}>
  <TouchableOpacity 
    style={styles.searchBar} 
    onPress={() => router.push('./SearchProfile')} // Navigate to SearchProfile.tsx in the same folder
  >
    <View style={styles.searchIcon}>
      <Search color={COLORS.greyText} size={18} />
    </View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      placeholderTextColor={COLORS.greyText}
      value={searchQuery}
      onChangeText={setSearchQuery}
      editable={false} // Disable editing to make it purely navigational
    />
  </TouchableOpacity>
</View>


        <ScrollView
          style={styles.feedContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              postId={post.postId}
              userName={post.userName}
              userPosition={post.userPosition}
              userAvatarUri={post.userAvatarUri}
              postTitle={post.postTitle}
              postContent={post.postContent}
              postMediaUri={post.postMediaUri}
              initialLikes={post.likes}
              initialComments={post.comments}
              initialShares={post.shares}
              onCommentPress={() => handleCommentPress(post.postId)}
              onSharePress={() => handleSharePress(post.postId)}
              onBookmarkPress={handleBookmarkPress}
            />
          ))}
        </ScrollView>

        <CommentsSheet
          visible={commentsVisible}
          onClose={() => setCommentsVisible(false)}
          postId={selectedPostId}
          totalComments={
            posts.find((p) => p.postId === selectedPostId)?.comments || 0
          }
        />

        <BottomNav
          activeTab={activeTab}
          onTabPress={(path: string, tab: TabName) => { // Explicit types added
            setActiveTab(tab);
            router.push(path as any); // Changed from replace to push for better navigation
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Style>({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  appNameContainer: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  appCountry: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.goldAccent,
    letterSpacing: 1,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.goldAccent,
  },

  clubsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.gradientStart,
  },
  clubsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
  },
  clubBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.goldAccent,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchBg,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '400',
  },

  feedContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  
  bottomNav: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
  navItem: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
  navItemActive: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
  navIcon: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
  navLabel: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
  navLabelActive: {
    // These styles are commented out because they are now defined in BottomNav.tsx
  },
} as const);

export default NationalFeed;