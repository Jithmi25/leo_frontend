import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Image,
    // ... other imports
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the expected structure of parameters received from the router
// NOTE: All values from useLocalSearchParams are strings or string arrays.
interface PreviewRouteParams {
    title: string;
    content: string;
    category: string;
    imageUri: string; 
    visibility: string;
    isScheduled: string; 
    scheduleTime: string; // The ISO string can still be treated as a string here
    tags: string; 
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
// ... COLORS and visibilityMap definitions remain the same

// Helper to map visibility key to readable text and icon
const visibilityMap: { [key: string]: { title: string; icon: any } } = {
    Nation: { title: 'Nation members', icon: 'globe' },
    District: { title: 'District Members Only', icon: 'people' },
    Club: { title: 'Home Club Members Only', icon: 'lock-closed' },
};


export default function PostPreviewScreen() {
    // 1. Retrieve data: useLocalSearchParams() returns UnknownOutputParams.
    // The safest way is to cast the return value to the string record type we expect.
    const params = useLocalSearchParams() as Record<keyof PreviewRouteParams, string | string[] | undefined>;

    // 2. Process and validate string parameters into usable types
    // We cast to `string` (or use the nullish coalescing operator `?? ''`) 
    // when accessing properties to satisfy the inner object structure.
    const post = {
        // Essential fields (assuming they are never undefined based on your logic)
        title: (params.title as string) ?? '',
        content: (params.content as string) ?? '',
        category: (params.category as string) ?? '',
        visibilityKey: (params.visibility as string) ?? 'Nation',
        
        // Conditional / Optional fields
        imageUri: params.imageUri === 'null' ? null : (params.imageUri as string) ?? null,
        location: (params.location as string) ?? '',
        
        // Type conversion fields
        isScheduled: (params.isScheduled as string) === 'true', 
        scheduleTime: (params.scheduleTime as string) || null,
        
        // Array conversion
        tags: (params.tags as string) ? (params.tags as string).split(',').filter(tag => tag.length > 0) : [],
    };
    
    // ... rest of the logic remains the same
    
    // Use the visibility key to get display information
    const visibilityInfo = visibilityMap[post.visibilityKey] || visibilityMap.Nation;
    
    // Determine the date for display
    let dateToDisplay: Date | null = null;
    if (post.isScheduled && post.scheduleTime) {
        dateToDisplay = new Date(post.scheduleTime);
    }

    const handleGoBack = () => { router.back(); };
    const handleEdit = () => { router.back(); }; 
    const handlePublish = () => {
        console.log("Publishing post from preview...");
        router.replace('/Webmaster/WMConfirmation');
    };

    return (
        <SafeAreaView style={previewStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={previewStyles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.darkText} />
                </TouchableOpacity>
                <Text style={previewStyles.headerTitle}>Post Preview</Text>
                <TouchableOpacity onPress={handleEdit}>
                    <Text style={previewStyles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={previewStyles.scrollView} contentContainerStyle={previewStyles.content}>
                
                {/* --- POST CARD START (Mimicking a social media post) --- */}
                <View style={previewStyles.postCard}>
                    
                    {/* Post Header (User/Time/Visibility) */}
                    <View style={previewStyles.postHeader}>
                        <Image 
                            source={{ uri: 'https://placehold.co/40x40/007AFF/FFF?text=WM' }} // Dummy Profile Picture
                            style={previewStyles.profilePic} 
                        />
                        <View style={previewStyles.postHeaderDetails}>
                            <Text style={previewStyles.authorName}>Webmaster Account</Text>
                            <View style={previewStyles.postMetaRow}>
                                {/* Scheduling Status */}
                                {post.isScheduled && dateToDisplay ? (
                                    <Text style={previewStyles.postTime}>
                                        Scheduled for {dateToDisplay.toLocaleDateString()} at {dateToDisplay.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                ) : (
                                    <Text style={previewStyles.postTime}>Posting Now</Text>
                                )}
                                <Text style={previewStyles.separator}>•</Text>
                                {/* Visibility Icon */}
                                <Ionicons name={visibilityInfo.icon} size={14} color={COLORS.greyText} />
                                <Text style={previewStyles.postVisibility}>{visibilityInfo.title}</Text>
                            </View>
                        </View>
                    </View>
                    
                    {/* Post Content */}
                    <View style={previewStyles.postBody}>
                        <Text style={previewStyles.postCategory}>{post.category}</Text>
                        <Text style={previewStyles.postTitle}>{post.title}</Text>
                        <Text style={previewStyles.postContent}>{post.content}</Text>
                        
                        {/* Tags & Location */}
                        {(post.tags.length > 0 || post.location) && (
                            <View style={previewStyles.tagsLocationContainer}>
                                {post.location && (
                                    <View style={previewStyles.metaChip}>
                                        <Ionicons name="location-outline" size={14} color={COLORS.greyText} />
                                        <Text style={previewStyles.metaChipText}>{post.location}</Text>
                                    </View>
                                )}
                                {post.tags.length > 0 && post.tags.map((tag, index) => (
                                    <Text key={index} style={previewStyles.tagText}>
                                        #{tag.toLowerCase().replace(/[^a-z0-9]/g, '')}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Image */}
                    {post.imageUri && (
                        <Image source={{ uri: post.imageUri }} style={previewStyles.postImage} resizeMode="cover" />
                    )}

                    {/* Footer (Engagement Placeholder) */}
                    <View style={previewStyles.postFooter}>
                        <View style={previewStyles.engagementRow}>
                            <Ionicons name="heart-outline" size={24} color={COLORS.greyText} />
                            <Text style={previewStyles.engagementText}>Like</Text>
                        </View>
                        <View style={previewStyles.engagementRow}>
                            <Ionicons name="chatbubble-outline" size={24} color={COLORS.greyText} />
                            <Text style={previewStyles.engagementText}>Comment</Text>
                        </View>
                        <View style={previewStyles.engagementRow}>
                            <Ionicons name="share-social-outline" size={24} color={COLORS.greyText} />
                            <Text style={previewStyles.engagementText}>Share</Text>
                        </View>
                    </View>

                </View>
                {/* --- POST CARD END --- */}

                <View style={{ height: 30 }} />
                
            </ScrollView>

            {/* Sticky Action Footer */}
            <View style={previewStyles.actionFooter}>
                <TouchableOpacity style={previewStyles.editButtonLarge} onPress={handleEdit}>
                    <Ionicons name="create-outline" size={20} color={COLORS.darkText} />
                    <Text style={previewStyles.editButtonText}>Go Back to Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={previewStyles.publishButton} 
                    onPress={handlePublish}
                >
                    <Text style={previewStyles.publishButtonText}>
                        {post.isScheduled ? 'Confirm Schedule' : 'Publish Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// ... previewStyles (Stylesheets) remain the same
const previewStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightGrey , paddingTop: StatusBar.currentHeight || 0 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.borderGrey },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.darkText },
    editButton: { fontSize: 15, fontWeight: '600', color: COLORS.goldMid },
    scrollView: { flex: 1 },
    content: { paddingTop: 10, paddingHorizontal: 16 },
    postCard: { backgroundColor: COLORS.white, borderRadius: 12, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    postHeaderDetails: { flex: 1 },
    authorName: { fontSize: 15, fontWeight: '700', color: COLORS.darkText },
    postMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    postTime: { fontSize: 12, color: COLORS.greyText, marginRight: 4 },
    postVisibility: { fontSize: 12, color: COLORS.greyText, marginLeft: 4 },
    separator: { color: COLORS.greyText, fontSize: 12, marginHorizontal: 3 },
    postBody: { paddingHorizontal: 15, paddingBottom: 15 },
    postCategory: { fontSize: 13, fontWeight: '600', color: COLORS.goldMid, marginBottom: 4 },
    postTitle: { fontSize: 18, fontWeight: '800', color: COLORS.darkText, marginBottom: 8 },
    postContent: { fontSize: 15, lineHeight: 22, color: COLORS.darkText },
    tagsLocationContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, alignItems: 'center' },
    metaChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGrey, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, marginRight: 8, marginBottom: 5 },
    metaChipText: { fontSize: 13, color: COLORS.darkText, marginLeft: 4 },
    tagText: { fontSize: 13, color: COLORS.primaryBlue, marginRight: 8, marginBottom: 5, fontWeight: '500' },
    postImage: { width: '100%', height: 250, marginTop: 10 },
    postFooter: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: COLORS.borderGrey, paddingVertical: 12 },
    engagementRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
    engagementText: { fontSize: 13, fontWeight: '600', color: COLORS.greyText, marginLeft: 5 },
    actionFooter: { flexDirection: 'row', padding: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.borderGrey, gap: 12 },
    editButtonLarge: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightGrey, borderRadius: 12, paddingVertical: 14, gap: 8, borderWidth: 1, borderColor: COLORS.borderGrey },
    editButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.darkText },
    publishButton: { flex: 1.5, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.goldMid, borderRadius: 12, paddingVertical: 14 },
    publishButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.darkText },
});