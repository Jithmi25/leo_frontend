import BottomNav from '@/components/BottomNav';
import CommentsSheet from '@/components/Feed/CommentsSheet';
import PostCard from '@/components/Feed/PostCard';
import api from '@/services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

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

type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';

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
  isLiked?: boolean; // Add this for tracking user's like status
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
}

const logoImage = require('../../assets/images/logo.png');
const MOCK_POSTS: Post[] = [
  {
    postId: '1',
    userName: 'Leo Amaala Fernando',
    userPosition: 'Club President, Leo District 306 D1',
    userAvatarUri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    postTitle: "Leo's vs Everybody - Top Local Deejays Every Week",
    postContent: '',
    postMediaUri: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1689,
    comments: 250,
    shares: 150,
    isLiked: false,
  },
  {
    postId: '2',
    userName: 'Kasun Perera',
    userPosition: 'Secretary, Leo Club of Colombo',
    userAvatarUri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    postTitle: 'Community Service Initiative 2024',
    postContent: 'Join us for our upcoming community service project this weekend!',
    postMediaUri: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 523,
    comments: 89,
    shares: 45,
    isLiked: true,
  },
];

const NationalFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS); // start with mocks so feed isn't empty while loading
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>('');

  useEffect(() => {
    fetchPostsFromBackend();
  }, []);

  // Function to fetch posts from backend
  const fetchPostsFromBackend = async () => {
    try {
      const response = await api.get('/posts');
      const postsData = response.data?.posts || response.data || [];

      const transformedPosts = postsData.map((post: any) => ({
        postId: post._id,
        userName: post.author?.fullName || 'Unknown User',
        userPosition: `${post.author?.role || 'Member'}, ${post.club || 'Unknown Club'}`,
        userAvatarUri: post.author?.profilePhoto,
        postTitle: post.title,
        postContent: post.content,
        postMediaUri: post.images?.[0],
        likes: post.likes?.length || 0,
        comments: post.comments?.length || 0,
        shares: post.shares || 0,
        isLiked: post.likes?.includes('current-user-id') || false,
      }));
      // If backend returns no posts, keep showing mocks instead of an empty feed
      setPosts(transformedPosts.length ? transformedPosts : MOCK_POSTS);
    } catch (error) {
      console.error('Failed to fetch posts, using mock data:', error);
      setPosts(MOCK_POSTS);
    }
  };

  // Handle like/unlike - Connected to Backend
  const handleLikePress = async (postId: string, isLiking: boolean) => {
    try {
      console.log(`${isLiking ? 'Liking' : 'Unliking'} post ${postId}`);
      
      // Optimistic update - update UI immediately
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.postId === postId 
            ? { 
                ...post, 
                likes: isLiking ? post.likes + 1 : Math.max(0, post.likes - 1),
                isLiked: isLiking
              }
            : post
        )
      );
      
      await api.post(`/posts/${postId}/like`);
      console.log('Like updated successfully');
    } catch (error) {
      console.error('Network error when liking post:', error);
      
      // Rollback on network error
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.postId === postId 
            ? { 
                ...post, 
                likes: isLiking ? Math.max(0, post.likes - 1) : post.likes + 1,
                isLiked: !isLiking
              }
            : post
        )
      );
      
      Alert.alert('Network Error', 'Please check your connection and try again.');
    }
  };

  // Handle comment press
  const handleCommentPress = (postId: string) => {
    setSelectedPostId(postId);
    setCommentsVisible(true);
  };

  // Handle share - Connected to Backend
  const handleSharePress = async (postId: string, shareOption: string) => {
    try {
      console.log(`Sharing post ${postId} to ${shareOption}`);
      
      // Optimistic update
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.postId === postId 
            ? { ...post, shares: post.shares + 1 }
            : post
        )
      );
      
      await api.post(`/posts/${postId}/share`, {
        shareType: shareOption === 'Home Community' ? 'home' : 'district',
        message: '',
      });

      Alert.alert('Success', `Post shared to ${shareOption}!`);
    } catch (error) {
      console.error('Share error:', error);
      // Rollback on network error
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.postId === postId 
            ? { ...post, shares: Math.max(0, post.shares - 1) }
            : post
        )
      );
      Alert.alert('Network Error', 'Please check your connection and try again.');
    }
  };

  // Handle bookmark
  const handleBookmarkPress = (postId: string) => {
    console.log(`Bookmark post ${postId}`);
    Alert.alert('Bookmark', 'Bookmark feature coming soon!');
  };

  // Submit comment to backend
  const handleSubmitComment = async (postId: string, commentText: string) => {
    try {
      console.log(`Submitting comment to post ${postId}: ${commentText}`);
      
      const response = await api.post(`/posts/${postId}/comment`, {
        text: commentText,
      });

      const data = response.data;
      console.log('Comment successful:', data);
      
      // Update local posts count
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.postId === postId 
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
      
      // Return success with comment data
      return { 
        success: true, 
        comment: {
          ...data.comment,
          commentId: data.comment?._id || Date.now().toString(),
          userName: data.comment?.user?.fullName || 'You',
          userAvatarUri: data.comment?.user?.profilePhoto || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
          content: data.comment?.text,
          timestamp: 'now',
          likes: 0,
        }
      };
    } catch (error) {
      console.error('Failed to submit comment:', error);
      return { 
        success: false, 
        error: 'Network error. Please check your connection.' 
      };
    }
  };

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
            onPress={() => router.push('./SearchProfile')}
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
              editable={false}
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
              initialIsLiked={post.isLiked || false} // Pass like status
              onCommentPress={() => handleCommentPress(post.postId)}
              onSharePress={(shareOption) => handleSharePress(post.postId, shareOption)}
              onBookmarkPress={handleBookmarkPress}
              onLikePress={(isLiking) => handleLikePress(post.postId, isLiking)}
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
          onSubmitComment={handleSubmitComment}
        />

        <BottomNav
          activeTab={activeTab}
          onTabPress={(path: string, tab: TabName) => {
            setActiveTab(tab);
            router.push(path as any);
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
    paddingTop: StatusBar.currentHeight || 0
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
} as const);

export default NationalFeed;


