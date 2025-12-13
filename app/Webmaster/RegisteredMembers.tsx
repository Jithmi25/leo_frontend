import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usersApi, eventsApi } from '@/services/api';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    red: '#E84A5F',
};

const PROFILE_AVATAR = 'https://placehold.co/40x40/FFC72C/000?text=Profile';

interface Member {
    id: string;
    name: string;
    district: string;
    club: string;
    avatarUri: string;
    registeredAt: string;
}

export default function RegisteredMembersScreen() {
    const { eventId } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState<Member[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [eventTitle, setEventTitle] = useState('Digital Literacy Workshop');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 20;

    useEffect(() => {
        fetchEventDetails();
        fetchMembers();
    }, [eventId]);

    useEffect(() => {
        filterMembers();
    }, [searchQuery, members]);

    const fetchEventDetails = async () => {
        try {
            if (eventId) {
                // Call backend API
                try {
                    const event = await eventsApi.getEvent(eventId as string);
                    setEventTitle(event.title);
                } catch (apiError) {
                    console.error('Failed to fetch event details, using default:', apiError);
                    // Fallback to default
                    setEventTitle('Digital Literacy Workshop');
                }
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    const fetchMembers = async (pageNum = 1, isRefresh = false) => {
        try {
            if (!isRefresh) setLoading(true);
            
            // Call backend API
            let mockResponse;
            try {
                const response = await eventsApi.getEventRegistrations(eventId as string, {
                    page: pageNum,
                    limit,
                });
                mockResponse = response;
            } catch (apiError) {
                console.error('Failed to fetch registrations, using mock data:', apiError);
                // For now, use mock data with pagination
                await new Promise(resolve => setTimeout(resolve, 1000));
                mockResponse = {
                    registrations: Array.from({ length: 10 }, (_, i) => ({
                    id: `${pageNum * 10 + i}`,
                    user: {
                        id: `${pageNum * 10 + i}`,
                        fullName: 'Leo Amaala Fernando',
                        displayName: 'Amaala',
                        profilePhoto: 'https://placehold.co/40x40/4A5568/FFF?text=AF',
                        district: `306 D0${(i % 3) + 1}`,
                        club: `Leo Club ${['Colombo Evergreen', 'Ananda College', 'Dehiwala East'][i % 3]}`,
                    },
                    registeredAt: new Date(Date.now() - i * 3600000).toISOString(),
                })),
                total: 50,
                page: pageNum,
                pages: 5,
                };
            }

            if (isRefresh || pageNum === 1) {
                setMembers(mockResponse.registrations.map(reg => ({
                    id: reg.user.id,
                    name: reg.user.fullName,
                    district: reg.user.district,
                    club: reg.user.club,
                    avatarUri: reg.user.profilePhoto,
                    registeredAt: reg.registeredAt,
                })));
            } else {
                setMembers(prev => [
                    ...prev,
                    ...mockResponse.registrations.map(reg => ({
                        id: reg.user.id,
                        name: reg.user.fullName,
                        district: reg.user.district,
                        club: reg.user.club,
                        avatarUri: reg.user.profilePhoto,
                        registeredAt: reg.registeredAt,
                    }))
                ]);
            }

            setHasMore(pageNum < mockResponse.pages);
            setPage(pageNum);
            
        } catch (error) {
            console.error('Error fetching members:', error);
            Alert.alert('Error', 'Failed to load registered members');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterMembers = () => {
        if (!searchQuery.trim()) {
            setFilteredMembers(members);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = members.filter(member =>
            member.name.toLowerCase().includes(query) ||
            (member.district && member.district.toLowerCase().includes(query)) ||
            (member.club && member.club.toLowerCase().includes(query))
        );
        setFilteredMembers(filtered);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchMembers(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchMembers(page + 1);
        }
    };

    const handleViewMember = (memberId: string) => {
        console.log('View member details:', memberId);
        router.push(`/Webmaster/MemberDetail/${memberId}`);
    };

    const renderMemberItem = ({ item }: { item: Member }) => (
        <View style={styles.memberRow}>
            <Image source={{ uri: item.avatarUri }} style={styles.memberAvatar} />
            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                {item.district && <Text style={styles.memberDetail}>District: {item.district}</Text>}
                {item.club && <Text style={styles.memberDetail}>Club: {item.club}</Text>}
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewMember(item.id)}
            >
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => {
        if (!loading || !hasMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={COLORS.goldMid} />
            </View>
        );
    };

    if (loading && members.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.goldMid} />
                    <Text style={styles.loadingText}>Loading registered members...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={2}>
                    {eventTitle}
                </Text>
                <TouchableOpacity>
                    <Image source={{ uri: PROFILE_AVATAR }} style={styles.profileAvatar} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.white} />
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholder="Search by name, district, or club"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Members Count */}
            <View style={styles.countContainer}>
                <Text style={styles.countText}>
                    {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} registered
                </Text>
            </View>

            {/* Members List */}
            <FlatList
                data={filteredMembers}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.goldMid]}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="people-outline" size={48} color={COLORS.greyText} />
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No members found' : 'No registered members yet'}
                        </Text>
                    </View>
                }
            />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginHorizontal: 12,
        textAlign: 'center',
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.goldMid,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.white,
    },
    countContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.lightGrey,
    },
    countText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    memberInfo: {
        flex: 1,
        marginLeft: 12,
    },
    memberName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    memberDetail: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 2,
    },
    viewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.goldMid,
        backgroundColor: COLORS.white,
    },
    viewButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.goldMid,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.borderGrey,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.greyText,
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.greyText,
        textAlign: 'center',
    },
});




