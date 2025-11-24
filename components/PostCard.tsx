import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldAccent: '#FFC72C',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
  redHeart: '#FF3366',
};

interface PostCardProps {
  postId: string;
  userName: string;
  userPosition: string;
  userAvatarUri?: string;
  postTitle?: string;
  postContent?: string;
  postMediaUri?: string;
  initialLikes: number;
  initialComments: number;
  initialShares: number;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onBookmarkPress?: (postId: string) => void;
}

interface Style {
  cardContainer: ViewStyle;
  header: ViewStyle;
  userInfo: ViewStyle;
  avatar: ImageStyle;
  names: ViewStyle;
  userNameText: TextStyle;
  userPositionText: TextStyle;
  bookmarkButton: ViewStyle;
  postTitleText: TextStyle;
  postContentText: TextStyle;
  mediaContainer: ViewStyle;
  postMedia: ImageStyle;
  footer: ViewStyle;
  actionButton: ViewStyle;
  actionRow: ViewStyle;
  actionCount: TextStyle;
}

const PostCard: React.FC<PostCardProps> = ({
  postId,
  userName,
  userPosition,
  userAvatarUri,
  postTitle,
  postContent,
  postMediaUri,
  initialLikes,
  initialComments,
  initialShares,
  onCommentPress,
  onSharePress,
  onBookmarkPress,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const defaultAvatar = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1';
  const defaultMedia = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800';

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
    console.log(
      `Post ${postId} liked status changed to ${!isLiked}. New count: ${
        isLiked ? likes - 1 : likes + 1
      }`
    );
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userAvatarUri || defaultAvatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.names}>
            <Text style={styles.userNameText} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.userPositionText} numberOfLines={2}>
              {userPosition}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => {
            setIsBookmarked((prev) => !prev);
            onBookmarkPress && onBookmarkPress(postId);
          }}
          activeOpacity={0.7}
        >
          <Bookmark
            color={isBookmarked ? COLORS.goldAccent : COLORS.greyText}
            size={20}
            fill={isBookmarked ? COLORS.goldAccent : 'none'}
          />
        </TouchableOpacity>
      </View>

      {postTitle && <Text style={styles.postTitleText}>{postTitle}</Text>}
      {postContent && <Text style={styles.postContentText}>{postContent}</Text>}

      {postMediaUri && (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: postMediaUri || defaultMedia }}
            style={styles.postMedia}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <View style={styles.actionRow}>
            <Heart
              color={isLiked ? COLORS.redHeart : COLORS.greyText}
              size={20}
              fill={isLiked ? COLORS.redHeart : 'none'}
            />
            <Text
              style={[
                styles.actionCount,
                { color: isLiked ? COLORS.redHeart : COLORS.greyText },
              ]}
            >
              {formatCount(likes)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCommentPress || (() => console.log('Comment pressed'))}
          activeOpacity={0.7}
        >
          <View style={styles.actionRow}>
            <MessageCircle color={COLORS.greyText} size={20} />
            <Text style={styles.actionCount}>
              {formatCount(initialComments)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSharePress || (() => console.log('Share pressed'))}
          activeOpacity={0.7}
        >
          <View style={styles.actionRow}>
            <Share2 color={COLORS.greyText} size={20} />
            <Text style={styles.actionCount}>{formatCount(initialShares)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 14,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: COLORS.lightGrey,
  },
  names: {
    flex: 1,
    paddingTop: 2,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 2,
  },
  userPositionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.greyText,
    lineHeight: 16,
  },
  bookmarkButton: {
    padding: 4,
    marginTop: 4,
  },

  postTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 22,
  },
  postContentText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
    marginBottom: 12,
  },

  mediaContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postMedia: {
    width: '100%',
    aspectRatio: 1.2,
    minHeight: 200,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    gap: 24,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.greyText,
  },
} as const);

export default PostCard;
