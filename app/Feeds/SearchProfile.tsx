import React, { useState, useMemo, useEffect } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TextInput,
    Image,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChevronDown } from 'lucide-react-native';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#8B6914',
    darkText: '#000000',
    greyText: '#999999',
    searchBg: '#1C1C1E',
    borderGrey: '#E5E5E5',
    errorRed: '#CC0000',
};

interface District {
    id: string;
    name: string;
    logoUri: string;
}

interface HomeClub {
    id: string;
    name: string;
    districtId: string; // Links to district
}

interface Member {
    id: string;
    name: string;
    position: string;
    district: string;
    homeClub: string;
    avatarUri: string;
}

// --- HARDCODED DATA (Simulates backend) ---
const DISTRICTS_DATA: District[] = [
    { id: '1', name: 'Leo District 306 D11', logoUri: 'https://placehold.co/60x60/2D5F3F/FFF?text=D11' },
    { id: '2', name: 'Leo District 306 D01', logoUri: 'https://placehold.co/60x60/1E90FF/FFF?text=D01' },
    { id: '3', name: 'Leo District 306 D02', logoUri: 'https://placehold.co/60x60/4682B4/FFF?text=D02' },
    { id: '4', name: 'Leo District 306 D05', logoUri: 'https://placehold.co/60x60/20B2AA/FFF?text=D05' },
    { id: '5', name: 'Leo District 306 D12', logoUri: 'https://placehold.co/60x60/DAA520/000?text=D12' },
    { id: '6', name: 'Leo District 306 D10', logoUri: 'https://placehold.co/60x60/708090/FFF?text=D10' },
    { id: '7', name: 'Leo District 306 D09', logoUri: 'https://placehold.co/60x60/FFD700/000?text=D09' },
    { id: '8', name: 'Leo District 306 A2', logoUri: 'https://placehold.co/60x60/5F9EA0/FFF?text=A2' },
];

const HOME_CLUBS_DATA: HomeClub[] = [
    // Clubs for D01
    { id: '1', name: 'Leo Club of Colombo', districtId: '2' },
    { id: '2', name: 'Leo Club of Moratuwa', districtId: '2' },
    { id: '3', name: 'Leo Club of Dehiwala', districtId: '2' },
    // Clubs for D11
    { id: '4', name: 'Leo Club of Kandy', districtId: '1' },
    { id: '5', name: 'Leo Club of Peradeniya', districtId: '1' },
    // Add more as needed for other districts
];

const MEMBERS_DATA: Member[] = [
    { id: '1', name: 'Leo Amaala Fernando', position: 'Club President', district: 'Leo District 306 D01', homeClub: 'Leo Club of Colombo', avatarUri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    { id: '2', name: 'Leo Kasun Perera', position: 'Secretary', district: 'Leo District 306 D01', homeClub: 'Leo Club of Moratuwa', avatarUri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    { id: '3', name: 'Leo Sarah Johnson', position: 'Vice President', district: 'Leo District 306 D11', homeClub: 'Leo Club of Kandy', avatarUri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    { id: '4', name: 'Leo Michael Anderson', position: 'Member', district: 'Leo District 306 D01', homeClub: 'Leo Club of Dehiwala', avatarUri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    // Add more members as needed
];
// -------------------------------------------------------

const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';

// Mock API Call Function (simulates backend fetch)
const fetchMembers = async (): Promise<Member[]> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return MEMBERS_DATA;
};

export default function MemberSearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Filter states
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedHomeClub, setSelectedHomeClub] = useState<string>('');
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const [showHomeClubDropdown, setShowHomeClubDropdown] = useState(false);

    // Fetch data on mount and refresh
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchMembers();
                setMembers(data);
            } catch (err) {
                console.error("Failed to fetch members:", err);
                setError("Could not load member data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [refreshKey]);

    // Get home clubs for selected district
    const availableHomeClubs = useMemo(() => {
        if (!selectedDistrict) return [];
        return HOME_CLUBS_DATA.filter(club => club.districtId === selectedDistrict);
    }, [selectedDistrict]);

    // Filtered members based on search and filters
    const filteredMembers = useMemo(() => {
        let filtered = members;

        // Filter by search query (name)
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(member =>
                member.name.toLowerCase().includes(lowerCaseQuery)
            );
        }

        // Filter by district
        if (selectedDistrict) {
            const districtName = DISTRICTS_DATA.find(d => d.id === selectedDistrict)?.name;
            filtered = filtered.filter(member => member.district === districtName);
        }

        // Filter by home club
        if (selectedHomeClub) {
            const homeClubName = HOME_CLUBS_DATA.find(c => c.id === selectedHomeClub)?.name;
            filtered = filtered.filter(member => member.homeClub === homeClubName);
        }

        return filtered;
    }, [members, searchQuery, selectedDistrict, selectedHomeClub]);

    const handleProfilePress = () => {
        console.log('Navigate to profile');
    };

    const handleMemberPress = (member: Member) => {
        console.log(`Navigate to member profile: ${member.name}`);
    };

    const renderMemberItem = ({ item }: { item: Member }) => (
        <TouchableOpacity 
  style={styles.memberCard} 
  onPress={() => router.push('/Profile/profile')} // Navigate to profile.tsx in the same folder
>
  <Image source={{ uri: item.avatarUri }} style={styles.memberAvatar} />
  <View style={styles.memberInfo}>
    <Text style={styles.memberName}>{item.name}</Text>
    <Text style={styles.memberPosition}>{item.position}</Text>
    <Text style={styles.memberDetails}>{item.district} • {item.homeClub}</Text>
  </View>
</TouchableOpacity>

    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={styles.statusContainer}>
                    <ActivityIndicator size="large" color={COLORS.goldMid} />
                    <Text style={styles.loadingText}>Loading Members...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.statusContainer}>
                    <Ionicons name="warning-outline" size={32} color={COLORS.errorRed} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton} 
                        onPress={() => setRefreshKey(prev => prev + 1)}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (filteredMembers.length === 0) {
            return (
                <View style={styles.statusContainer}>
                    <Ionicons name="sad-outline" size={32} color={COLORS.greyText} />
                    <Text style={styles.emptyText}>No members found matching your search and filters.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={filteredMembers}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>LeoConnect</Text>
                        <Text style={styles.headerSubtitle}>SRI LANKA</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleProfilePress}>
                    <Image source={{ uri: AVATAR_URL }} style={styles.profileAvatar} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.white} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Members by Name"
                        placeholderTextColor={COLORS.greyText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filtersContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowDistrictDropdown(true)}
                >
                    <Text style={styles.filterText}>
                        {selectedDistrict ? DISTRICTS_DATA.find(d => d.id === selectedDistrict)?.name : 'Select District'}
                    </Text>
                    <ChevronDown size={16} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, !selectedDistrict && styles.filterDisabled]}
                    onPress={() => selectedDistrict && setShowHomeClubDropdown(true)}
                    disabled={!selectedDistrict}
                >
                    <Text style={styles.filterText}>
                        {selectedHomeClub ? HOME_CLUBS_DATA.find(c => c.id === selectedHomeClub)?.name : 'Select Home Club'}
                    </Text>
                    <ChevronDown size={16} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* District Dropdown Modal */}
            <Modal visible={showDistrictDropdown} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowDistrictDropdown(false)}>
                    <View style={styles.dropdownMenu}>
                        {DISTRICTS_DATA.map(district => (
                            <TouchableOpacity
                                key={district.id}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedDistrict(district.id);
                                    setSelectedHomeClub(''); // Reset home club
                                    setShowDistrictDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownText}>{district.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Home Club Dropdown Modal */}
            <Modal visible={showHomeClubDropdown} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowHomeClubDropdown(false)}>
                    <View style={styles.dropdownMenu}>
                        {availableHomeClubs.length > 0 ? (
                            availableHomeClubs.map(club => (
                                <TouchableOpacity
                                    key={club.id}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedHomeClub(club.id);
                                        setShowHomeClubDropdown(false);
                                    }}
                                >
                                    <Text style={styles.dropdownText}>{club.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.dropdownText}>No clubs available</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Members List / Status */}
            {renderContent()}
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
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextContainer: {
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.goldMid,
        letterSpacing: 0.5,
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.searchBg,
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: COLORS.white,
    },
    filtersContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    filterButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    filterDisabled: {
        backgroundColor: COLORS.greyText,
    },
    filterText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownMenu: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingVertical: 10,
        width: '80%',
        maxHeight: 300,
    },
    dropdownItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    dropdownText: {
        fontSize: 16,
        color: COLORS.darkText,
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.greyText,
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.errorRed,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 20,
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 25,
    },
    retryButtonText: {
        color: COLORS.white,
        fontWeight: '700',
    },
    emptyText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.greyText,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexGrow: 1,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        marginBottom: 8,
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    memberPosition: {
        fontSize: 14,
        color: COLORS.greyText,
        marginTop: 2,
    },
    memberDetails: {
    fontSize: 12,
    color: COLORS.greyText,
    marginTop: 2,
},
separator: {
    height: 1,
    backgroundColor: COLORS.borderGrey,
},
});
