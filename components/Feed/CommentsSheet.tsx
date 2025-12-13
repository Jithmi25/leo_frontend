import { Send, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
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
  onSubmitComment?: (postId: string, commentText: string) => Promise<{ success: boolean; comment?: any; error?: string }>;
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
  loadingContainer: ViewStyle;
}

const CommentsSheet: React.FC<CommentsSheetProps> = ({
  visible,
  onClose,
  postId,
  totalComments,
  onSubmitComment,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Fetch comments from backend when sheet opens
  useEffect(() => {
    if (visible && postId) {
      fetchCommentsFromBackend();
    }
  }, [visible, postId]);

  const fetchCommentsFromBackend = async () => {
    try {
      setIsLoadingComments(true);
      // You would fetch comments from backend here
      // Example: const response = await fetch(`/api/posts/${postId}/comments`);
      // const data = await response.json();
      // setComments(data.comments);
      
      // For now, we'll keep the mock data
      setTimeout(() => {
        setIsLoadingComments(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setIsLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (onSubmitComment) {
        // Call backend API
        const result = await onSubmitComment(postId, newComment);
        
        if (result.success && result.comment) {
          // Add the new comment from backend
          const newCommentData: Comment = {
            commentId: result.comment.commentId || result.comment._id || Date.now().toString(),
            userName: result.comment.userName || result.comment.user?.fullName || 'You',
            userAvatarUri: result.comment.userAvatarUri || result.comment.user?.profilePhoto || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
            content: result.comment.content || result.comment.text,
            timestamp: 'now',
            likes: result.comment.likes || 0,
          };
          
          setComments([newCommentData, ...comments]);
          setNewComment('');
        } else {
          // If backend fails, show error and fallback to local
          Alert.alert('Error', result.error || 'Failed to post comment. Saving locally.');
          addLocalComment();
        }
      } else {
        // If no backend function provided, use local
        addLocalComment();
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      Alert.alert('Error', 'Network error. Saving comment locally.');
      addLocalComment();
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLocalComment = () => {
    const comment: Comment = {
      commentId: Date.now().toString(),
      userName: 'You',
      userAvatarUri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: newComment,
      timestamp: 'now',
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
    
    // Here you would call backend to like comment
    console.log(`Liked comment ${commentId}`);
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
            {isLoadingComments ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.goldAccent} />
                <Text style={{ marginTop: 10, color: COLORS.greyText }}>Loading comments...</Text>
              </View>
            ) : comments.length > 0 ? (
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
                <Text style={[styles.emptyText, { fontSize: 12, marginTop: 5 }]}>
                  Be the first to comment!
                </Text>
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
                maxLength={500}
                editable={!isSubmitting}
              />
              <TouchableOpacity
                onPress={handleAddComment}
                activeOpacity={0.7}
                style={styles.sendButton}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color={COLORS.goldAccent} />
                ) : (
                  <Send
                    color={
                      newComment.trim() ? COLORS.goldAccent : COLORS.lightGrey
                    }
                    size={20}
                    fill={
                      newComment.trim() ? COLORS.goldAccent : COLORS.lightGrey
                    }
                  />
                )}
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
    maxHeight: 100,
  } as TextStyle & { maxHeight?: number },
  sendButton: {
    padding: 4,
    minWidth: 32,
    alignItems: 'center',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
} as const);

export default CommentsSheet;