import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';

interface FeedPost {
  id: string;
  authorName: string;
  authorPosition: string;
  authorImage: string;
  postImage: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

interface CommunityFeedPostCardProps {
  post: FeedPost;
}

export default function CommunityFeedPostCard({
  post,
}: CommunityFeedPostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: post.authorImage }}
            style={styles.authorImage}
          />
          <View>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <Text style={styles.authorPosition}>{post.authorPosition}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Bookmark
            size={20}
            color={isBookmarked ? '#FFB800' : '#999999'}
            fill={isBookmarked ? '#FFB800' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: post.postImage }}
            style={styles.postImage}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.textSection}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content} numberOfLines={3}>
            {post.content}
          </Text>

          <View style={styles.engagementBar}>
            <TouchableOpacity
              style={styles.engagementButton}
              onPress={handleLike}
            >
              <Heart
                size={18}
                color={isLiked ? '#EE5A5A' : '#666666'}
                fill={isLiked ? '#EE5A5A' : 'none'}
              />
              <Text
                style={[
                  styles.engagementText,
                  isLiked && styles.engagementTextActive,
                ]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.engagementButton}>
              <MessageCircle size={18} color="#666666" />
              <Text style={styles.engagementText}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.engagementButton}>
              <Share2 size={18} color="#666666" />
              <Text style={styles.engagementText}>{post.shares}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  authorPosition: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  imageSection: {
    width: '30%',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  textSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  content: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 18,
    marginBottom: 12,
    flex: 1,
  },
  engagementBar: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  engagementText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
  },
  engagementTextActive: {
    color: '#EE5A5A',
  },
});
