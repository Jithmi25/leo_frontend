import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#8B6914',
    darkText: '#000000',
    greyText: '#999999',
    searchBg: '#1C1C1E',
    borderGrey: '#E5E5E5',
};

interface District {
    id: string;
    name: string;
    logoUri: string;
}

const DISTRICTS_DATA: District[] = [
    { id: '1', name: 'Leo District 306 D11', logoUri: 'https://placehold.co/60x60/2D5F3F/FFF?text=D11' },
    { id: '2', name: 'Leo District 306 D01', logoUri: 'https://placehold.co/60x60/1E90FF/FFF?text=D01' },
    { id: '3', name: 'Leo District 306 D02', logoUri: 'https://placehold.co/60x60/4682B4/FFF?text=D02' },
    { id: '4', name: 'Leo District 306 D05', logoUri: 'https://placehold.co/60x60/20B2AA/FFF?text=D05' },
    { id: '5', name: 'Leo District 306 D12', logoUri: 'https://placehold.co/60x60/DAA520/000?text=D12' },
    { id: '6', name: 'Leo District 306 D11', logoUri: 'https://placehold.co/60x60/708090/FFF?text=D11' },
    { id: '7', name: 'Leo District 306 D09', logoUri: 'https://placehold.co/60x60/FFD700/000?text=D09' },
];

const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';

export default function FeedScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleViewDistrict = (districtName: string) => {
        console.log(`View district: ${districtName}`);
    };

    const handleProfilePress = () => {
        console.log('Navigate to profile');
    };

    const renderDistrictItem = ({ item }: { item: District }) => (
        <View style={styles.districtCard}>
            <View style={styles.districtLeft}>
                <Image source={{ uri: item.logoUri }} style={styles.districtLogo} />
                <Text style={styles.districtName}>{item.name}</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDistrict(item.name)}
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
                        placeholder="Enter District Name"
                        placeholderTextColor={COLORS.greyText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Districts List */}
            <FlatList
                data={DISTRICTS_DATA}
                renderItem={renderDistrictItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        marginBottom: 20,
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
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    districtCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    districtLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    districtLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    districtName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        flex: 1,
    },
    viewButton: {
        backgroundColor: COLORS.goldDark,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
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
