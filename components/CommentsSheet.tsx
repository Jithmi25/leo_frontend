import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Send } from 'lucide-react-native';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldAccent: '#D4A34E',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
  borderGrey: '#E0E0E0',
};

interface Comment {
  commentId: string;
  userName: string;
  userAvatarUri: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentsSheetProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  totalComments: number;
}

interface Style {
  modalContainer: ViewStyle;
  sheetContainer: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  closeButton: ViewStyle;
  commentsList: ViewStyle;
  commentsContent: ViewStyle;
  commentItem: ViewStyle;
  commentAvatar: ImageStyle;
  commentContent: ViewStyle;
  commentHeader: ViewStyle;
  commentUserName: TextStyle;
  commentTimestamp: TextStyle;
  commentText: TextStyle;
  inputContainer: ViewStyle;
  inputWrapper: ViewStyle;
  commentInput: TextStyle & { maxHeight?: number };
  sendButton: ViewStyle;
  divider: ViewStyle;
  emptyState: ViewStyle;
  emptyText: TextStyle;
}

const CommentsSheet: React.FC<CommentsSheetProps> = ({
  visible,
  onClose,
  postId,
  totalComments,
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      commentId: '1',
      userName: 'Kasun Perera',
      userAvatarUri:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Great event! Looking forward to attending.',
      timestamp: '2 hours ago',
      likes: 12,
    },
    {
      commentId: '2',
      userName: 'Amara Silva',
      userAvatarUri:
        'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'This looks amazing! Thanks for organizing.',
      timestamp: '4 hours ago',
      likes: 8,
    },
    {
      commentId: '3',
      userName: 'Roshan Kumar',
      userAvatarUri:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Count me in! 🎉',
      timestamp: '6 hours ago',
      likes: 5,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        commentId: Date.now().toString(),
        userName: 'You',
        userAvatarUri:
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        content: newComment,
        timestamp: 'now',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
      console.log(`Comment added to post ${postId}`);
    }
  };

  const handleLikeComment = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Comments ({totalComments})</Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={styles.closeButton}
            >
              <X color={COLORS.black} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <ScrollView
            style={styles.commentsList}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.commentsContent}
          >
            {comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.commentId} style={styles.commentItem}>
                  <Image
                    source={{ uri: comment.userAvatarUri }}
                    style={styles.commentAvatar}
                    resizeMode="cover"
                  />

                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUserName}>
                        {comment.userName}
                      </Text>
                      <Text style={styles.commentTimestamp}>
                        {comment.timestamp}
                      </Text>
                    </View>
                    <Text style={styles.commentText}>{comment.content}</Text>

                    <TouchableOpacity
                      onPress={() => handleLikeComment(comment.commentId)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: likedComments.has(comment.commentId)
                            ? COLORS.goldAccent
                            : COLORS.greyText,
                          fontWeight: '500',
                          marginTop: 6,
                        }}
                      >
                        ❤ {comment.likes + (likedComments.has(comment.commentId) ? 1 : 0)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No comments yet</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.divider} />

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={COLORS.greyText}
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity
                onPress={handleAddComment}
                activeOpacity={0.7}
                style={styles.sendButton}
              >
                <Send
                  color={
                    newComment.trim() ? COLORS.goldAccent : COLORS.lightGrey
                  }
                  size={20}
                  fill={
                    newComment.trim() ? COLORS.goldAccent : COLORS.lightGrey
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create<Style>({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    minHeight: '50%',
    paddingTop: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  closeButton: {
    padding: 4,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.borderGrey,
  },

  commentsList: {
    flex: 1,
  },
  commentsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  commentTimestamp: {
    fontSize: 12,
    color: COLORS.greyText,
  },
  commentText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
  },

  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    paddingVertical: 8,
  } as TextStyle & { maxHeight?: number },
  sendButton: {
    padding: 4,
  },

  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.greyText,
  },
} as const);

export default CommentsSheet;
