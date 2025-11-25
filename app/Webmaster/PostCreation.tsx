import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

export default function PostCreationScreen() {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const categories = ['Announcement', 'Event', 'Achievement', 'News', 'Community'];

    const handleImagePicker = () => {
        console.log('Open image picker');
        // TODO: Implement image picker
        setSelectedImage('https://placehold.co/400x200/4CAF50/FFF?text=Selected+Image');
    };

    const handlePost = () => {
        console.log('Creating post:', { postTitle, postContent, selectedCategory });
        // TODO: Implement post creation logic
    };

    const handleSaveDraft = () => {
        console.log('Saving draft');
        // TODO: Implement save draft logic
    };

    const handlePreview = () => {
        console.log('Preview post');
        // TODO: Show preview modal
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color={COLORS.darkText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Post</Text>
                <TouchableOpacity onPress={handleSaveDraft}>
                    <Text style={styles.draftButton}>Draft</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Image Upload Area */}
                    <TouchableOpacity style={styles.imageUploadArea} onPress={handleImagePicker}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <Ionicons name="images-outline" size={48} color={COLORS.greyText} />
                                <Text style={styles.uploadText}>Add Image or Video</Text>
                                <Text style={styles.uploadSubtext}>Tap to browse</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {selectedImage && (
                        <TouchableOpacity style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
                            <Ionicons name="close-circle" size={24} color={COLORS.darkText} />
                        </TouchableOpacity>
                    )}

                    {/* Post Title */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Post Title</Text>
                        <TextInput
                            style={styles.titleInput}
                            value={postTitle}
                            onChangeText={setPostTitle}
                            placeholder="Enter a catchy title..."
                            placeholderTextColor={COLORS.greyText}
                        />
                    </View>

                    {/* Post Content */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Post Content</Text>
                        <TextInput
                            style={styles.contentInput}
                            value={postContent}
                            onChangeText={setPostContent}
                            placeholder="Share your thoughts, updates, or announcements..."
                            placeholderTextColor={COLORS.greyText}
                            multiline
                            numberOfLines={8}
                            textAlignVertical="top"
                        />
                        <Text style={styles.characterCount}>{postContent.length} / 1000</Text>
                    </View>

                    {/* Category Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Category</Text>
                        <View style={styles.categoryContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryChip,
                                        selectedCategory === category && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            selectedCategory === category && styles.categoryTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Visibility Settings */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Visibility</Text>
                        <View style={styles.visibilityOptions}>
                            <TouchableOpacity style={styles.visibilityOption}>
                                <Ionicons name="globe-outline" size={20} color={COLORS.darkText} />
                                <View style={styles.visibilityTextContainer}>
                                    <Text style={styles.visibilityTitle}>Public</Text>
                                    <Text style={styles.visibilitySubtext}>Everyone can see this post</Text>
                                </View>
                                <Ionicons name="checkmark-circle" size={24} color={COLORS.goldMid} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.visibilityOption}>
                                <Ionicons name="people-outline" size={20} color={COLORS.darkText} />
                                <View style={styles.visibilityTextContainer}>
                                    <Text style={styles.visibilityTitle}>Members Only</Text>
                                    <Text style={styles.visibilitySubtext}>Only Leo members can see</Text>
                                </View>
                                <Ionicons name="radio-button-off" size={24} color={COLORS.greyText} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.visibilityOption}>
                                <Ionicons name="lock-closed-outline" size={20} color={COLORS.darkText} />
                                <View style={styles.visibilityTextContainer}>
                                    <Text style={styles.visibilityTitle}>Private</Text>
                                    <Text style={styles.visibilitySubtext}>Only selected members</Text>
                                </View>
                                <Ionicons name="radio-button-off" size={24} color={COLORS.greyText} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Additional Options */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Additional Options</Text>
                        <View style={styles.additionalOptions}>
                            <TouchableOpacity style={styles.optionButton}>
                                <Ionicons name="calendar-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Schedule Post</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionButton}>
                                <Ionicons name="pricetag-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Add Tags</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionButton}>
                                <Ionicons name="location-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Add Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
                            <Ionicons name="eye-outline" size={20} color={COLORS.darkText} />
                            <Text style={styles.previewButtonText}>Preview</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                            <Text style={styles.postButtonText}>Post to Feed</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.darkText} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    draftButton: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.goldMid,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    imageUploadArea: {
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLORS.borderGrey,
        marginBottom: 20,
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginTop: 12,
    },
    uploadSubtext: {
        fontSize: 13,
        color: COLORS.greyText,
        marginTop: 4,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
    },
    removeImageButton: {
        position: 'absolute',
        top: 24,
        right: 24,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 4,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    titleInput: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '600',
    },
    contentInput: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.darkText,
        minHeight: 150,
    },
    characterCount: {
        fontSize: 12,
        color: COLORS.greyText,
        textAlign: 'right',
        marginTop: 4,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.lightGrey,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    categoryChipActive: {
        backgroundColor: COLORS.goldMid,
        borderColor: COLORS.goldMid,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.greyText,
    },
    categoryTextActive: {
        color: COLORS.darkText,
    },
    visibilityOptions: {
        gap: 12,
    },
    visibilityOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        padding: 14,
        gap: 12,
    },
    visibilityTextContainer: {
        flex: 1,
    },
    visibilityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 2,
    },
    visibilitySubtext: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    additionalOptions: {
        gap: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        padding: 14,
        gap: 12,
    },
    optionButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.darkText,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    previewButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingVertical: 16,
        gap: 8,
        borderWidth: 2,
        borderColor: COLORS.borderGrey,
    },
    previewButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    postButton: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.goldMid,
        borderRadius: 12,
        paddingVertical: 16,
        gap: 8,
    },
    postButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
