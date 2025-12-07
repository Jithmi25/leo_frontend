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

// Define the structure of the data we pass to the preview screen
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

// --- DUMMY TIME PICKER (Placeholder component) ---
interface DummyTimePickerProps {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DummyTimePicker: React.FC<DummyTimePickerProps> = ({ date }) => {
    // In a real app, this would be a date picker UI
    return (
        <View style={enhancedStyles.schedulePickerContainer}>
            <Text style={enhancedStyles.schedulePickerText}>
                {date.toLocaleString()}
            </Text>
        </View>
    );
};
// --- END DUMMY TIME PICKER ---


export default function PostCreationScreen() {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Additional Options State
    const [isScheduling, setIsScheduling] = useState(false);
    const [isAddingTags, setIsAddingTags] = useState(false);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [tags, setTags] = useState<string[]>(['']); 
    const [location, setLocation] = useState('');
    const [visibility, setVisibility] = useState('Nation');

    const categories = ['Announcement', 'Event', 'Achievement', 'News', 'Community'];
    
    // Visibility data for dynamic rendering
    const visibilityOptions = [
        { key: 'Nation', icon: 'globe-outline', title: 'Nation members', subtext: 'Everyone can see this post and share to national feed' },
        { key: 'District', icon: 'people-outline', title: 'District Members Only', subtext: 'Only district members can see and share to district community' },
        { key: 'Club', icon: 'lock-closed-outline', title: 'Home Club Members Only', subtext: 'Cannot see or share outside from the home club community' },
    ];


    // --- HANDLER FUNCTIONS FOR ADDITIONAL OPTIONS ---
    const handleTagChange = (text: string, index: number) => {
        const newTags = [...tags];
        // Ensure the tag starts with '#' and remove any illegal characters (optional cleanup)
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
    // ------------------------------------------------

    const handleImagePicker = () => {
        console.log('Open image picker');
        setSelectedImage('https://placehold.co/400x200/4CAF50/FFF?text=Selected+Image');
    };

    const handlePost = () => {
        console.log('Creating post...');
        router.replace('/Webmaster/WMConfirmation');
    };

    const handleSaveDraft = () => {
        console.log('Saving draft');
    };

    // --- UPDATED PREVIEW FUNCTION ---
    const handlePreview = () => {
        // Prepare data for passing via router params
        const finalTags = tags
            .map(tag => tag.replace(/#/g, '').trim()) // Remove '#' and trim whitespace
            .filter(tag => tag.length > 0); // Remove empty tags
        
        const postData: PostDataParams = {
            title: postTitle,
            content: postContent,
            category: selectedCategory,
            imageUri: selectedImage,
            visibility: visibility,
            
            isScheduled: isScheduling,
            // Pass date as ISO string for reliable transfer
            scheduleTime: isScheduling ? scheduleDate.toISOString() : null, 
            tags: finalTags,
            location: location,
        };

        // Navigate to the preview route
        router.push({
            pathname: '/Webmaster/PostPreview', 
            // Expo-router requires params to be a simple key-value object of strings,
            // so we stringify complex types (like the Date or Array of strings)
            params: {
                ...postData,
                isScheduled: String(postData.isScheduled),
                tags: postData.tags.join(','), // Join array into a single string
                imageUri: postData.imageUri || 'null', // handle null/undefined
            },
        } as any); // Use 'as any' here to bypass the strict type checking on stringified params
    };
    // --------------------------------

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
                            maxLength={1000}
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
                            {visibilityOptions.map((option) => (
                                <TouchableOpacity 
                                    key={option.key} 
                                    style={[
                                        styles.visibilityOption,
                                        visibility === option.key && enhancedStyles.visibilityOptionActive,
                                    ]}
                                    onPress={() => setVisibility(option.key)}
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

                    {/* Additional Options (Enhanced) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Additional Options</Text>
                        <View style={styles.additionalOptions}>
                            {/* Schedule Post */}
                            <TouchableOpacity 
                                style={styles.optionButton}
                                onPress={() => setIsScheduling(!isScheduling)}
                            >
                                <Ionicons name="calendar-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Schedule Post</Text>
                                {isScheduling ? 
                                    <Ionicons name="chevron-up" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} /> :
                                    <Ionicons name="chevron-down" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} />
                                }
                            </TouchableOpacity>
                            
                            {isScheduling && (
                                <View style={enhancedStyles.expandedInputArea}>
                                    <Text style={enhancedStyles.expandedLabel}>Select Schedule Date & Time:</Text>
                                    <DummyTimePicker date={scheduleDate} setDate={setScheduleDate} />
                                </View>
                            )}

                            {/* Add Tags */}
                            <TouchableOpacity 
                                style={styles.optionButton}
                                onPress={() => setIsAddingTags(!isAddingTags)}
                            >
                                <Ionicons name="pricetag-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Add Tags</Text>
                                {isAddingTags ? 
                                    <Ionicons name="chevron-up" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} /> :
                                    <Ionicons name="chevron-down" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} />
                                }
                            </TouchableOpacity>

                            {isAddingTags && (
                                <View style={enhancedStyles.expandedInputArea}>
                                    {tags.map((tag, index) => (
                                        <View key={index} style={enhancedStyles.tagInputRow}>
                                            <Text style={enhancedStyles.tagPrefix}>#</Text>
                                            <TextInput
                                                style={enhancedStyles.tagInputField}
                                                placeholder="Enter tag (e.g., event, news)"
                                                placeholderTextColor={COLORS.greyText}
                                                // Display without '#' for better editing experience
                                                value={tag.startsWith('#') ? tag.substring(1) : tag}
                                                onChangeText={(text) => handleTagChange(text, index)}
                                                autoCapitalize="none"
                                            />
                                            {tags.length > 1 && (
                                                <TouchableOpacity onPress={() => handleRemoveTag(index)} style={enhancedStyles.tagRemoveButton}>
                                                    <Ionicons name="remove-circle" size={20} color={COLORS.red} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    ))}
                                    <TouchableOpacity 
                                        onPress={handleAddTag} 
                                        style={enhancedStyles.addTagButton}
                                    >
                                        <Ionicons name="add-circle-outline" size={20} color={COLORS.primaryBlue} />
                                        <Text style={enhancedStyles.addTagButtonText}>Add Another Tag</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            

                            {/* Add Location */}
                            <TouchableOpacity 
                                style={styles.optionButton}
                                onPress={() => setIsAddingLocation(!isAddingLocation)}
                            >
                                <Ionicons name="location-outline" size={20} color={COLORS.darkText} />
                                <Text style={styles.optionButtonText}>Add Location</Text>
                                {isAddingLocation ? 
                                    <Ionicons name="chevron-up" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} /> :
                                    <Ionicons name="chevron-down" size={20} color={COLORS.greyText} style={enhancedStyles.optionToggleIcon} />
                                }
                            </TouchableOpacity>

                            {isAddingLocation && (
                                <View style={enhancedStyles.expandedInputArea}>
                                    <TextInput
                                        style={enhancedStyles.locationInput}
                                        placeholder="Type location, venue, or address"
                                        placeholderTextColor={COLORS.greyText}
                                        value={location}
                                        onChangeText={setLocation}
                                    />
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
                            <Ionicons name="eye-outline" size={20} color={COLORS.darkText} />
                            <Text style={styles.previewButtonText}>Preview Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.postButton} onPress={handlePost} disabled={!postTitle || !postContent || !selectedCategory}>
                            <Text style={styles.postButtonText}>{isScheduling ? 'Schedule Post' : 'Post to Feed'}</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.darkText} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Existing Styles (kept outside the component)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.borderGrey },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.darkText },
    draftButton: { fontSize: 15, fontWeight: '600', color: COLORS.goldMid },
    scrollView: { flex: 1 },
    content: { padding: 16 },
    imageUploadArea: { height: 200, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: COLORS.borderGrey, marginBottom: 20, overflow: 'hidden' },
    uploadPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightGrey },
    uploadText: { fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginTop: 12 },
    uploadSubtext: { fontSize: 13, color: COLORS.greyText, marginTop: 4 },
    uploadedImage: { width: '100%', height: '100%' },
    removeImageButton: { position: 'absolute', top: 24, right: 24, backgroundColor: COLORS.white, borderRadius: 12, padding: 4, zIndex: 10 },
    inputGroup: { marginBottom: 24 },
    inputLabel: { fontSize: 15, fontWeight: '600', color: COLORS.darkText, marginBottom: 8 },
    titleInput: { backgroundColor: COLORS.lightGrey, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: COLORS.darkText, fontWeight: '600' },
    contentInput: { backgroundColor: COLORS.lightGrey, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: COLORS.darkText, minHeight: 150, },
    characterCount: { fontSize: 12, color: COLORS.greyText, textAlign: 'right', marginTop: 4 },
    categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.lightGrey, borderWidth: 1, borderColor: COLORS.borderGrey },
    categoryChipActive: { backgroundColor: COLORS.goldMid, borderColor: COLORS.goldMid },
    categoryText: { fontSize: 13, fontWeight: '600', color: COLORS.greyText },
    categoryTextActive: { color: COLORS.darkText },
    visibilityOptions: { gap: 12 },
    visibilityOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGrey, borderRadius: 12, padding: 14, gap: 12 },
    visibilityTextContainer: { flex: 1 },
    visibilityTitle: { fontSize: 15, fontWeight: '600', color: COLORS.darkText, marginBottom: 2 },
    visibilitySubtext: { fontSize: 12, color: COLORS.greyText },
    additionalOptions: { gap: 10 },
    optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGrey, borderRadius: 12, padding: 14, gap: 12 },
    optionButtonText: { fontSize: 15, fontWeight: '500', color: COLORS.darkText },
    actionButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
    previewButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightGrey, borderRadius: 12, paddingVertical: 16, gap: 8, borderWidth: 2, borderColor: COLORS.borderGrey },
    previewButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.darkText },
    postButton: { flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.goldMid, borderRadius: 12, paddingVertical: 16, gap: 8 },
    postButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.darkText },
});

// New/Enhanced Styles
const enhancedStyles = StyleSheet.create({
    optionToggleIcon: {
        position: 'absolute',
        right: 14,
    },
    expandedInputArea: {
        backgroundColor: COLORS.lightGrey,
        padding: 14,
        paddingTop: 0,
        borderRadius: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    expandedLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.greyText,
        marginBottom: 8,
        marginTop: 10,
    },
    tagInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    tagPrefix: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.primaryBlue,
        marginRight: 4,
    },
    tagInputField: {
        flex: 1,
        height: 40,
        fontSize: 15,
        color: COLORS.darkText,
    },
    tagRemoveButton: {
        marginLeft: 8,
        padding: 4,
    },
    addTagButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        gap: 6,
    },
    addTagButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primaryBlue,
    },
    locationInput: {
        height: 40,
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 15,
        color: COLORS.darkText,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    schedulePickerContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    schedulePickerText: {
        fontSize: 15,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    visibilityOptionActive: {
        borderWidth: 2,
        borderColor: COLORS.goldMid,
    }
});