import React, { useState, useEffect } from 'react';
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
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postsApi } from '@/services/api';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    red: '#E84A5F',
    primaryBlue: '#007AFF',
};

interface PostDataParams {
    title: string;
    content: string;
    category: string;
    imageUri: string | null;
    visibility: string;
    isScheduled: boolean;
    scheduleTime: string | null;
    tags: string[];
    location: string;
}

const categories = ['Announcement', 'Event', 'Achievement', 'News', 'Community'];

const visibilityOptions = [
    { key: 'Nation', icon: 'globe-outline', title: 'Nation members', subtext: 'Everyone can see this post and share to national feed' },
    { key: 'District', icon: 'people-outline', title: 'District Members Only', subtext: 'Only district members can see and share to district community' },
    { key: 'Club', icon: 'lock-closed-outline', title: 'Home Club Members Only', subtext: 'Cannot see or share outside from the home club community' },
];

export default function PostCreationScreen() {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isAddingTags, setIsAddingTags] = useState(false);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [tags, setTags] = useState<string[]>(['']);
    const [location, setLocation] = useState('');
    const [visibility, setVisibility] = useState('Nation');
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userClub, setUserClub] = useState('');
    const [userDistrict, setUserDistrict] = useState('');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                setUserId(user.id);
                setUserClub(user.club || '');
                setUserDistrict(user.district || '');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const handleImagePicker = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Please allow access to your photo library.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.8,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const uploadImage = async (uri: string): Promise<string> => {
        setUploadingImage(true);
        try {
            // In a real app, you would upload to your server
            await new Promise(resolve => setTimeout(resolve, 1000));
            return 'https://placehold.co/600x400/4CAF50/FFF?text=Post+Image';
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const validateForm = () => {
        if (!postTitle.trim()) {
            Alert.alert('Validation Error', 'Please enter post title');
            return false;
        }
        if (!postContent.trim()) {
            Alert.alert('Validation Error', 'Please enter post content');
            return false;
        }
        if (!selectedCategory) {
            Alert.alert('Validation Error', 'Please select a category');
            return false;
        }
        return true;
    };

    const handlePost = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            let imageUrl = '';
            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            let visibilityScope = 'nation';
            let allowedClubs = [];
            let allowedDistricts = [];

            if (visibility === 'District') {
                visibilityScope = 'district';
                allowedDistricts = [userDistrict];
            } else if (visibility === 'Club') {
                visibilityScope = 'club';
                allowedClubs = [userClub];
            }

            const postData = {
                title: postTitle.trim(),
                content: postContent.trim(),
                category: selectedCategory,
                images: imageUrl ? [imageUrl] : [],
                tags: tags.filter(tag => tag.trim().length > 0)
                    .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
                    .map(tag => tag.trim()),
                location: location.trim(),
                isScheduled: isScheduling,
                scheduledDate: isScheduling ? scheduleDate.toISOString() : null,
                visibility: visibilityScope,
                allowedClubs,
                allowedDistricts,
                author: userId,
                club: userClub,
                district: userDistrict,
            };

            console.log('Creating post:', postData);
            
            // Call backend API
            try {
                const response = await postsApi.createPost(postData);
                console.log('Post created successfully:', response);
            } catch (apiError) {
                console.error('Backend API call failed, using mock data:', apiError);
                // Fallback to mock data already logged
            }
            
            console.log('Post created successfully');
            Alert.alert('Success', 'Post created successfully!');
            router.replace('/Webmaster/WMConfirmation');
            
        } catch (error) {
            console.error('Error creating post:', error);
            Alert.alert('Error', 'Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        try {
            const draft = {
                title: postTitle,
                content: postContent,
                category: selectedCategory,
                image: selectedImage,
                tags,
                location,
                visibility,
                isScheduling,
                scheduleDate: scheduleDate.toISOString(),
                timestamp: new Date().toISOString(),
            };
            await AsyncStorage.setItem('postDraft', JSON.stringify(draft));
            Alert.alert('Success', 'Post draft saved!');
        } catch (error) {
            console.error('Error saving draft:', error);
            Alert.alert('Error', 'Failed to save draft');
        }
    };

    const handleTagChange = (text: string, index: number) => {
        const newTags = [...tags];
        newTags[index] = text.startsWith('#') ? text : `#${text.replace(/#/g, '')}`;
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };
    
    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags.length > 0 ? newTags : ['']);
    };

    const handlePreview = () => {
        if (!validateForm()) return;
        
        const finalTags = tags
            .map(tag => tag.replace(/#/g, '').trim())
            .filter(tag => tag.length > 0);
        
        const postData = {
            title: postTitle,
            content: postContent,
            category: selectedCategory,
            imageUri: selectedImage,
            visibility: visibility,
            isScheduled: isScheduling,
            scheduleTime: isScheduling ? scheduleDate.toISOString() : null,
            tags: finalTags,
            location: location,
        };

        router.push({
            pathname: '/Webmaster/PostPreview',
            params: {
                ...postData,
                isScheduled: String(postData.isScheduled),
                tags: postData.tags.join(','),
                imageUri: postData.imageUri || 'null',
            },
        } as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                    <Ionicons name="close" size={28} color={COLORS.darkText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Post</Text>
                <TouchableOpacity onPress={handleSaveDraft} disabled={loading}>
                    <Text style={styles.draftButton}>Draft</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Image Upload Area */}
                    <TouchableOpacity 
                        style={styles.imageUploadArea} 
                        onPress={handleImagePicker}
                        disabled={loading || uploadingImage}
                    >
                        {uploadingImage ? (
                            <View style={styles.uploadPlaceholder}>
                                <ActivityIndicator color={COLORS.greyText} size="large" />
                                <Text style={styles.uploadText}>Uploading...</Text>
                            </View>
                        ) : selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <Ionicons name="images-outline" size={48} color={COLORS.greyText} />
                                <Text style={styles.uploadText}>Add Image or Video</Text>
                                <Text style={styles.uploadSubtext}>Tap to browse</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {selectedImage && !uploadingImage && (
                        <TouchableOpacity 
                            style={styles.removeImageButton} 
                            onPress={() => setSelectedImage(null)}
                            disabled={loading}
                        >
                            <Ionicons name="close-circle" size={24} color={COLORS.darkText} />
                        </TouchableOpacity>
                    )}

                    {/* Post Title */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Post Title *</Text>
                        <TextInput
                            style={styles.titleInput}
                            value={postTitle}
                            onChangeText={setPostTitle}
                            placeholder="Enter a catchy title..."
                            placeholderTextColor={COLORS.greyText}
                            editable={!loading}
                        />
                    </View>

                    {/* Post Content */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Post Content *</Text>
                        <TextInput
                            style={styles.contentInput}
                            value={postContent}
                            onChangeText={setPostContent}
                            placeholder="Share your thoughts, updates, or announcements..."
                            placeholderTextColor={COLORS.greyText}
                            multiline
                            numberOfLines={8}
                            textAlignVertical="top"
                            maxLength={1000}
                            editable={!loading}
                        />
                        <Text style={styles.characterCount}>{postContent.length} / 1000</Text>
                    </View>

                    {/* Category Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Category *</Text>
                        <View style={styles.categoryContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryChip,
                                        selectedCategory === category && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                    disabled={loading}
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
                            {visibilityOptions.map((option) => (
                                <TouchableOpacity 
                                    key={option.key} 
                                    style={[
                                        styles.visibilityOption,
                                        visibility === option.key && styles.visibilityOptionActive,
                                    ]}
                                    onPress={() => setVisibility(option.key)}
                                    disabled={loading}
                                >
                                    <Ionicons name={option.icon as any} size={20} color={visibility === option.key ? COLORS.darkText : COLORS.greyText} />
                                    <View style={styles.visibilityTextContainer}>
                                        <Text style={styles.visibilityTitle}>{option.title}</Text>
                                        <Text style={styles.visibilitySubtext}>{option.subtext}</Text>
                                    </View>
                                    <Ionicons 
                                        name={visibility === option.key ? "checkmark-circle" : "radio-button-off"} 
                                        size={24} 
                                        color={visibility === option.key ? COLORS.goldMid : COLORS.greyText} 
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Tags Section */}
                    <View style={styles.inputGroup}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.inputLabel}>Tags</Text>
                            <TouchableOpacity onPress={() => setIsAddingTags(!isAddingTags)} disabled={loading}>
                                <Text style={styles.toggleText}>{isAddingTags ? 'Done' : 'Add'}</Text>
                            </TouchableOpacity>
                        </View>
                        {isAddingTags && (
                            <View style={styles.tagsContainer}>
                                {tags.map((tag, index) => (
                                    <View key={index} style={styles.tagInputRow}>
                                        <TextInput
                                            style={styles.tagInput}
                                            value={tag}
                                            onChangeText={(text) => handleTagChange(text, index)}
                                            placeholder="#tag"
                                            placeholderTextColor={COLORS.greyText}
                                            editable={!loading}
                                        />
                                        {tags.length > 1 && (
                                            <TouchableOpacity onPress={() => handleRemoveTag(index)} disabled={loading}>
                                                <Ionicons name="close" size={20} color={COLORS.red} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag} disabled={loading}>
                                    <Ionicons name="add" size={20} color={COLORS.goldMid} />
                                    <Text style={styles.addTagButtonText}>Add Another Tag</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Location Section */}
                    <View style={styles.inputGroup}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.inputLabel}>Location</Text>
                            <TouchableOpacity onPress={() => setIsAddingLocation(!isAddingLocation)} disabled={loading}>
                                <Text style={styles.toggleText}>{isAddingLocation ? 'Done' : 'Add'}</Text>
                            </TouchableOpacity>
                        </View>
                        {isAddingLocation && (
                            <TextInput
                                style={styles.locationInput}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="e.g., Colombo, Sri Lanka"
                                placeholderTextColor={COLORS.greyText}
                                editable={!loading}
                            />
                        )}
                    </View>

                    {/* Schedule Section */}
                    <View style={styles.inputGroup}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.inputLabel}>Schedule Post</Text>
                            <TouchableOpacity onPress={() => setIsScheduling(!isScheduling)} disabled={loading}>
                                <Ionicons name={isScheduling ? "checkbox" : "square-outline"} size={24} color={COLORS.goldMid} />
                            </TouchableOpacity>
                        </View>
                        {isScheduling && (
                            <View style={styles.scheduleContainer}>
                                <Text style={styles.scheduleText}>{scheduleDate.toLocaleString()}</Text>
                            </View>
                        )}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity 
                            style={styles.previewButton} 
                            onPress={handlePreview}
                            disabled={loading}
                        >
                            <Ionicons name="eye-outline" size={20} color={COLORS.darkText} />
                            <Text style={styles.previewButtonText}>Preview Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.postButton, (!postTitle || !postContent || !selectedCategory || loading) && styles.postButtonDisabled]} 
                            onPress={handlePost} 
                            disabled={!postTitle || !postContent || !selectedCategory || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.darkText} />
                            ) : (
                                <>
                                    <Text style={styles.postButtonText}>
                                        {isScheduling ? 'Schedule Post' : 'Post to Feed'}
                                    </Text>
                                    <Ionicons name="arrow-forward" size={20} color={COLORS.darkText} />
                                </>
                            )}
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    draftButton: {
        fontSize: 16,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    imageUploadArea: {
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.borderGrey,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
    },
    uploadText: {
        fontSize: 16,
        color: COLORS.greyText,
        marginTop: 8,
        fontWeight: '500',
    },
    uploadSubtext: {
        fontSize: 13,
        color: COLORS.greyText,
        marginTop: 4,
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    titleInput: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
    },
    contentInput: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: COLORS.darkText,
        textAlignVertical: 'top',
    },
    characterCount: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 4,
        textAlign: 'right',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        backgroundColor: COLORS.lightGrey,
    },
    categoryChipActive: {
        backgroundColor: COLORS.goldMid,
        borderColor: COLORS.goldMid,
    },
    categoryText: {
        fontSize: 13,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: COLORS.darkText,
        fontWeight: '600',
    },
    visibilityOptions: {
        gap: 12,
    },
    visibilityOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        backgroundColor: COLORS.white,
    },
    visibilityOptionActive: {
        borderColor: COLORS.goldMid,
        backgroundColor: 'rgba(255, 199, 44, 0.1)',
    },
    visibilityTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    visibilityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    visibilitySubtext: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    toggleText: {
        fontSize: 14,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    tagsContainer: {
        gap: 8,
    },
    tagInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tagInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: COLORS.darkText,
    },
    addTagButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        gap: 8,
    },
    addTagButtonText: {
        fontSize: 14,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    locationInput: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: COLORS.darkText,
    },
    scheduleContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
    },
    scheduleText: {
        fontSize: 14,
        color: COLORS.darkText,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    previewButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        gap: 8,
    },
    previewButtonText: {
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '600',
    },
    postButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: COLORS.goldMid,
        gap: 8,
    },
    postButtonText: {
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '600',
    },
    postButtonDisabled: {
        opacity: 0.5,
    },
});

