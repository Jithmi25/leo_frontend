import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkBlue: '#003B73',
    lightBlue: '#0074D9',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';
const DISTRICT_LOGO = 'https://placehold.co/80x80/1E90FF/FFF?text=D01';

interface Leader {
    id: string;
    name: string;
    role: string;
    avatarUri: string;
}

interface Club {
    id: string;
    name: string;
}

interface Poll {
    id: string;
    question: string;
    agreeCount: number;
    disagreeCount: number;
}

interface Post {
    id: string;
    author: string;
    role: string;
    avatarUri: string;
    content: string;
    imageUri: string;
    likes: number;
    comments: number;
}

const LEADERS_DATA: Leader[] = [
    { id: '1', name: 'Leo Sashika Santhika', role: 'District President', avatarUri: 'https://placehold.co/60x60/4A90E2/FFF?text=SS' },
    { id: '2', name: 'Leo Lion Suwan Wilamiya', role: 'Vice President', avatarUri: 'https://placehold.co/60x60/4A90E2/FFF?text=SW' },
    { id: '3', name: 'Leo Vinuk Thamudopo', role: 'Secretary', avatarUri: 'https://placehold.co/60x60/4A90E2/FFF?text=VT' },
];

const CLUBS_DATA: Club[] = [
    { id: '1', name: 'Leo Club of Colombo Faculty of Science' },
    { id: '2', name: 'Leo Club of Colombo St Irish Lions' },
    { id: '3', name: 'Leo Club of Kelaniya Defence University' },
];

const POLLS_DATA: Poll[] = [
    { id: '1', question: 'Should we organize the National Blood Donation Campaign twice a year instead of once?', agreeCount: 12, disagreeCount: 3 },
    { id: '2', question: 'Do you support making "Green Horizon 2025" an annual national tree planting project?', agreeCount: 8, disagreeCount: 1 },
];

const POSTS_DATA: Post[] = [
    {
        id: '1',
        author: 'Leo Amaala Fernando',
        role: 'Club President, Leo District 306 D1',
        avatarUri: 'https://placehold.co/40x40/A088C3/FFF?text=AF',
        content: "Get ready to rumble 🔥\n\nLEO'S VS EVERYBODY goes down this Saturday, August 24th at HCCL@10:30, with pocket, bar music, and the best food in town",
        imageUri: 'https://placehold.co/200x200/1a1a1a/FFD700?text=LEO\'S+VS+EVERYBODY',
        likes: 24,
        comments: 5,
    },
    {
        id: '2',
        author: 'Leo Amaala Fernando',
        role: 'Club President, Leo District 306 D1',
        avatarUri: 'https://placehold.co/40x40/A088C3/FFF?text=AF',
        content: "🎊 Join Us for the 9th Installation!\n\nCelebrate 9 years of service and fellowship with the Leo Club of RHH!",
        imageUri: 'https://placehold.co/200x200/1a1a1a/FFD700?text=9TH+INSTALLATION',
        likes: 18,
        comments: 3,
    },
];

export default function CommunityScreen() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

    const years = ['2023 - 2024', '2022 - 2023', '2021 - 2022', '2020 - 2021', '2019 - 2020'];

    const renderLeader = (leader: Leader) => (
        <View style={styles.leaderCard} key={leader.id}>
            <Image source={{ uri: leader.avatarUri }} style={styles.leaderAvatar} />
            <Text style={styles.leaderName} numberOfLines={1}>{leader.name}</Text>
            <Text style={styles.leaderRole} numberOfLines={1}>{leader.role}</Text>
        </View>
    );

    const renderClub = (club: Club) => (
        <View style={styles.clubCard} key={club.id}>
            <Text style={styles.clubName} numberOfLines={2}>{club.name}</Text>
        </View>
    );

    const renderPoll = (poll: Poll) => (
        <View style={styles.pollCard} key={poll.id}>
            <Text style={styles.pollQuestion}>{poll.question}</Text>
            <View style={styles.pollOptions}>
                <View style={styles.pollOption}>
                    <View style={styles.pollRadio}>
                        <View style={styles.pollRadioInner} />
                    </View>
                    <Text style={styles.pollOptionText}>Agree</Text>
                    <View style={styles.pollAvatars}>
                        {[...Array(Math.min(3, poll.agreeCount))].map((_, i) => (
                            <View key={i} style={[styles.pollAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                        ))}
                    </View>
                </View>
                <View style={styles.pollOption}>
                    <View style={styles.pollRadio} />
                    <Text style={styles.pollOptionText}>Disagree</Text>
                    <View style={styles.pollAvatars}>
                        {[...Array(Math.min(3, poll.disagreeCount))].map((_, i) => (
                            <View key={i} style={[styles.pollAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );

    const renderPost = (post: Post) => (
        <View style={styles.postCard} key={post.id}>
            <View style={styles.postHeader}>
                <Image source={{ uri: post.avatarUri }} style={styles.postAvatar} />
                <View style={styles.postAuthorInfo}>
                    <Text style={styles.postAuthor}>{post.author}</Text>
                    <Text style={styles.postRole}>{post.role}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="share-outline" size={20} color={COLORS.darkText} />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: post.imageUri }} style={styles.postImage} />
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="heart-outline" size={20} color={COLORS.darkText} />
                    <Text style={styles.postActionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="chatbubble-outline" size={20} color={COLORS.darkText} />
                    <Text style={styles.postActionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="share-outline" size={20} color={COLORS.darkText} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.darkText} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Community</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="people-outline" size={24} color={COLORS.darkText} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{ uri: AVATAR_URL }} style={styles.headerAvatar} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* District Card */}
                <LinearGradient
                    colors={['#001F3F', '#003B73', '#0074D9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.districtCard}
                >
                    <View style={styles.districtInfo}>
                        <Text style={styles.districtTitle}>Leo District{'\n'}306 D01</Text>
                        <Text style={styles.districtTagline}>FIND A WAY OR MAKE A WAY</Text>
                        <Text style={styles.districtDescription} numberOfLines={3}>
                            Empowering youth to serve their communities with compassion and leadership excellence.
                        </Text>
                    </View>
                    <Image source={{ uri: DISTRICT_LOGO }} style={styles.districtLogo} />
                </LinearGradient>

                {/* Leadership Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>District 306 D01 Leadership</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {LEADERS_DATA.map(renderLeader)}
                    </ScrollView>
                </View>

                {/* Clubs Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Leo Clubs in The District</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {CLUBS_DATA.map(renderClub)}
                    </ScrollView>
                </View>

                {/* Past Leaders Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Past Leaders</Text>
                    <TouchableOpacity
                        style={styles.yearDropdown}
                        onPress={() => setYearDropdownOpen(!yearDropdownOpen)}
                    >
                        <Text style={styles.yearDropdownText}>
                            {selectedYear || 'Select The Year'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={COLORS.greyText} />
                    </TouchableOpacity>
                    {yearDropdownOpen && (
                        <View style={styles.yearDropdownMenu}>
                            {years.map((year) => (
                                <TouchableOpacity
                                    key={year}
                                    style={styles.yearOption}
                                    onPress={() => {
                                        setSelectedYear(year);
                                        setYearDropdownOpen(false);
                                    }}
                                >
                                    <Text style={styles.yearOptionText}>{year}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Polls Section */}
                <View style={styles.section}>
                    <View style={styles.pollsHeader}>
                        <Text style={styles.sectionTitle}>Ongoing Polls</Text>
                    </View>
                    {POLLS_DATA.map(renderPoll)}
                </View>

                {/* Posts/Feed */}
                <View style={styles.section}>
                    {POSTS_DATA.map(renderPost)}
                </View>

                <View style={{ height: 40 }} />
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
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 12,
    },
    headerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    scrollView: {
        flex: 1,
    },
    districtCard: {
        margin: 16,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    districtInfo: {
        flex: 1,
    },
    districtTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.white,
        marginBottom: 8,
    },
    districtTagline: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    districtDescription: {
        fontSize: 12,
        color: COLORS.white,
        opacity: 0.9,
        lineHeight: 16,
    },
    districtLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 12,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 12,
    },
    horizontalScroll: {
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    leaderCard: {
        width: 100,
        backgroundColor: COLORS.darkBlue,
        borderRadius: 12,
        padding: 12,
        marginRight: 12,
        alignItems: 'center',
    },
    leaderAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    leaderName: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 4,
    },
    leaderRole: {
        fontSize: 10,
        color: COLORS.white,
        opacity: 0.8,
        textAlign: 'center',
    },
    clubCard: {
        width: 140,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        padding: 16,
        marginRight: 12,
        justifyContent: 'center',
        minHeight: 70,
    },
    clubName: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.darkText,
        textAlign: 'center',
    },
    yearDropdown: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    yearDropdownText: {
        fontSize: 15,
        color: COLORS.greyText,
    },
    yearDropdownMenu: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        overflow: 'hidden',
    },
    yearOption: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    yearOptionText: {
        fontSize: 15,
        color: COLORS.darkText,
    },
    pollsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pollCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        padding: 16,
        marginBottom: 12,
    },
    pollQuestion: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 12,
        lineHeight: 20,
    },
    pollOptions: {
        gap: 8,
    },
    pollOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pollRadio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: COLORS.darkBlue,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pollRadioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.darkBlue,
    },
    pollOptionText: {
        fontSize: 14,
        color: COLORS.darkText,
        marginRight: 8,
    },
    pollAvatars: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    pollAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.lightGrey,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    postCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        padding: 16,
        marginBottom: 16,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    postAuthorInfo: {
        flex: 1,
    },
    postAuthor: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    postRole: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: COLORS.lightGrey,
    },
    postContent: {
        fontSize: 14,
        color: COLORS.darkText,
        lineHeight: 20,
        marginBottom: 12,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderGrey,
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    postActionText: {
        fontSize: 13,
        color: COLORS.greyText,
    },
});
