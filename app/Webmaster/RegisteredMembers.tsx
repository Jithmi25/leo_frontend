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
    FlatList,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    brownDark: '#4A3D2A',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

const PROFILE_AVATAR = 'https://placehold.co/40x40/A088C3/FFF?text=U';
const MEMBER_AVATAR = 'https://placehold.co/40x40/4A5568/FFF?text=AF';

interface Member {
    id: string;
    name: string;
    district?: string;
    avatarUri: string;
}

// Placeholder data - will be fetched from backend
const MEMBERS_DATA: Member[] = [
    { id: '1', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '2', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '3', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '4', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '5', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '6', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '7', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '8', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '9', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '10', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
    { id: '11', name: 'Leo Amaala Fernando', avatarUri: MEMBER_AVATAR },
];

export default function RegisteredMembersScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState(MEMBERS_DATA);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // TODO: Implement search/filter logic with backend API
        console.log('Searching for:', query);
    };

    const handleViewMember = (memberId: string) => {
        console.log('View member details:', memberId);
        // TODO: Navigate to member detail screen or show modal
    };

    const renderMemberItem = ({ item }: { item: Member }) => (
        <View style={styles.memberRow}>
            <Image source={{ uri: item.avatarUri }} style={styles.memberAvatar} />
            <Text style={styles.memberName}>{item.name}</Text>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewMember(item.id)}
            >
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Digital Literacy Workshop</Text>
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
                        placeholder="Enter District Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    />
                </View>
            </View>

            {/* Members List */}
            <FlatList
                data={members}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        flex: 1,
        marginLeft: 12,
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.black,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 14,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.white,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 12,
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    memberName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.darkText,
    },
    viewButton: {
        backgroundColor: COLORS.brownDark,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 16,
    },
    viewButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.borderGrey,
    },
});
