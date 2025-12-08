import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Users, CheckCircle } from 'lucide-react-native';

// --- INTERFACES (Crucial for fixing the 'never' errors) ---
interface District {
    id: string;
    name: string;
}

interface Club {
    id: string;
    districtId: string;
    name: string;
}

interface Member {
    id: string;
    clubId: string;
    name: string;
    email: string;
    isLeader: boolean;
    expiryDate: Date;
}

// --- MOCK DATA (Apply interfaces) ---
const mockDistricts: District[] = [
    { id: 'd1', name: 'District 306A1' },
    { id: 'd2', name: 'District 306B2' },
];

const mockClubs: Club[] = [
    { id: 'c1', districtId: 'd1', name: 'Leo Club Colombo' },
    { id: 'c2', districtId: 'd1', name: 'Leo Club Kandy' },
    { id: 'c3', districtId: 'd2', name: 'Leo Club Galle' },
];

const mockMembers: Member[] = [
    { id: 'm1', clubId: 'c1', name: 'Amal Perera', email: 'amal.p@club.lk', isLeader: false, expiryDate: new Date(2025, 11, 31) },
    { id: 'm2', clubId: 'c1', name: 'Nimali Silva', email: 'nimali.s@club.lk', isLeader: true, expiryDate: new Date(2024, 5, 1) }, // Switched to true to test the logic
    { id: 'm3', clubId: 'c2', name: 'Ravi Fernando', email: 'ravi.f@club.lk', isLeader: false, expiryDate: new Date(2026, 0, 15) },
];


// --- MAIN COMPONENT ---

export default function LeaderRoleManagementCard() {
    const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
    // Apply interface types to state variables
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    // Filter members based on selected District and Club
    const filteredMembers = useMemo(() => {
        let members = mockMembers;
        if (selectedClub) {
            members = members.filter(m => m.clubId === selectedClub.id);
        } else if (selectedDistrict) {
            const clubIdsInDistrict = mockClubs.filter(c => c.districtId === selectedDistrict.id).map(c => c.id);
            members = members.filter(m => clubIdsInDistrict.includes(m.clubId));
        }
        return members;
    }, [selectedDistrict, selectedClub]);

    // Available clubs update when district changes
    const availableClubs = useMemo(() => {
        if (!selectedDistrict) return mockClubs;
        return mockClubs.filter(c => c.districtId === selectedDistrict.id);
    }, [selectedDistrict]);

    // --- HANDLERS ---

    // Specify the type for the member parameter
    const handleSelectMember = (member: Member) => {
        setSelectedMember(member);
        setIsSelectionModalVisible(false);
    };

    const handlePublish = () => {
        if (!selectedMember) {
            Alert.alert('Selection Required', 'Please select a member before assigning the role.');
            return;
        }

        // Now TypeScript knows selectedMember has an expiryDate property
        const today = new Date();
        const isExpired = selectedMember.expiryDate < today;

        // The image shows an error around L71 (expiryDate) and L67 (isLeader).
        // Since selectedMember is typed as Member | null, the check above (if (!selectedMember))
        // guarantees it's a Member object below.
        
        if (selectedMember.isLeader && !isExpired) {
            // Confirmation dialog for demotion/expiry check
            Alert.alert(
                'Confirm Role Change',
                `"${selectedMember.name}" is currently a Leader and their role has NOT expired (Expires: ${selectedMember.expiryDate.toLocaleDateString()}).\n\nDo you want to change them back to a Normal Member?`,
                [
                    { text: 'Keep as Leader', style: 'cancel', onPress: () => finalizePublish(true) },
                    { text: 'Change to Normal Member', style: 'destructive', onPress: () => finalizePublish(false) },
                ],
                { cancelable: true }
            );
        } else {
            // Direct publishing (either not a leader or role is expired)
            finalizePublish(selectedMember.isLeader);
        }
    };

    // Specify the type for the keepLeader parameter
    const finalizePublish = (keepLeader: boolean) => {
        const action = keepLeader ? 'Role Kept' : 'Role Updated to Normal Member';
        Alert.alert('Success', `Role assignment finalized for ${selectedMember?.name}. Action: ${action}`);
        // API call goes here
    };

    // --- MODAL PICKER MOCK (for filter functionality) ---
    const handleDistrictSelection = (district: District) => {
        setSelectedDistrict(district);
        setSelectedClub(null); // Reset club when district changes
    };

    const handleClubSelection = (club: Club) => {
        setSelectedClub(club);
    };

    const renderSelectionModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isSelectionModalVisible}
            onRequestClose={() => setIsSelectionModalVisible(false)}>
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalTitle}>Select Member for Role</Text>
                    
                    {/* Filter Dropdowns (Using mock data for selection) */}
                    <View style={modalStyles.filterContainer}>
                        {/* District Filter (Simulated Dropdown) */}
                        <TouchableOpacity style={modalStyles.filterButton}>
                            <Text style={modalStyles.filterText}>{selectedDistrict ? selectedDistrict.name : 'Select District'}</Text>
                            <ChevronDown size={18} color={styles.roleText.color} />
                        </TouchableOpacity>

                        {/* Club Filter (Dependent on District, Simulated Dropdown) */}
                        <TouchableOpacity style={modalStyles.filterButton} disabled={!selectedDistrict}>
                            <Text style={modalStyles.filterText}>{selectedClub ? selectedClub.name : (selectedDistrict ? 'Select Home Club' : 'Select District First')}</Text>
                            <ChevronDown size={18} color={selectedDistrict ? styles.roleText.color : styles.greyText.color} />
                        </TouchableOpacity>
                    </View>

                    {/* Member List */}
                    <ScrollView style={modalStyles.memberList}>
                        {/* Displaying mock selectors for District/Club logic (Replace with your actual dropdown component) */}
                         <View style={modalStyles.mockSelectors}>
                            <Text style={modalStyles.mockSelectorTitle}>--- District Selectors ---</Text>
                            {mockDistricts.map(d => (
                                <TouchableOpacity key={d.id} onPress={() => handleDistrictSelection(d)}>
                                    <Text style={[modalStyles.mockSelectorItem, selectedDistrict?.id === d.id && { fontWeight: '700' }]}>{d.name}</Text>
                                </TouchableOpacity>
                            ))}
                            <Text style={modalStyles.mockSelectorTitle}>--- Club Selectors (District: {selectedDistrict?.name || 'All'}) ---</Text>
                            {availableClubs.map(c => (
                                <TouchableOpacity key={c.id} onPress={() => handleClubSelection(c)}>
                                    <Text style={[modalStyles.mockSelectorItem, selectedClub?.id === c.id && { fontWeight: '700' }]}>{c.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        <Text style={modalStyles.memberListHeader}>Filtered Members ({filteredMembers.length})</Text>

                        {filteredMembers.length > 0 ? (
                            filteredMembers.map(member => (
                                <TouchableOpacity
                                    key={member.id}
                                    style={modalStyles.memberItem}
                                    onPress={() => handleSelectMember(member)}>
                                    <View>
                                        {/* Error L135 (id) and L139 (name) fixed by Member interface */}
                                        <Text style={modalStyles.memberName}>{member.name}</Text>
                                        <Text style={modalStyles.memberEmail}>{member.email}</Text>
                                    </View>
                                    {member.id === selectedMember?.id && (
                                        <CheckCircle size={20} color={'#4CAF50'} />
                                    )}
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={modalStyles.noResultsText}>No members found for this selection.</Text>
                        )}
                    </ScrollView>

                    <TouchableOpacity
                        style={modalStyles.closeButton}
                        onPress={() => setIsSelectionModalVisible(false)}>
                        <Text style={modalStyles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['#FFD700', '#FFA500', '#FF8C00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}>
                <View style={styles.innerCard}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.leaderText}>Leader </Text>
                        <Text style={styles.roleText}>Role</Text>
                    </View>
                    <Text style={styles.managementText}>Management</Text>

                    <TouchableOpacity 
                        style={styles.profileContainer} 
                        onPress={() => setIsSelectionModalVisible(true)}>
                        <View style={styles.profileImageWrapper}>
                            {selectedMember ? (
                                <Image
                                    source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1' }}
                                    style={styles.profileImage}
                                />
                            ) : (
                                <Users color="#FFD700" size={40} />
                            )}
                        </View>
                        {/* Error L109 (name) fixed by Member interface */}
                        <Text style={styles.selectionText}>
                            {selectedMember ? selectedMember.name : 'Select Member'}
                        </Text>
                        <Text style={styles.selectionStatus}>
                            {selectedMember ? (selectedMember.isLeader ? 'CURRENT LEADER' : 'NORMAL MEMBER') : 'Tap to Search'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            
            {/* Action Button */}
            <TouchableOpacity 
                style={styles.publishButton} 
                onPress={handlePublish} 
                disabled={!selectedMember}>
                <Text style={styles.publishButtonText}>
                    {selectedMember ? 'Assign/Manage Role' : 'Select Member to Assign'}
                </Text>
            </TouchableOpacity>

            {/* Modal for selection */}
            {renderSelectionModal()}
        </View>
    );
}

// --- STYLES ---

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        margin: 8,
        backgroundColor: '#FFFFFF',
    },
    gradientBorder: {
        padding: 2,
        borderRadius: 16,
    },
    innerCard: {
        backgroundColor: '#000000',
        borderRadius: 14,
        paddingVertical: 24, 
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leaderText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    roleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFD700',
    },
    managementText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFD700',
        marginBottom: 16,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    selectionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 8,
    },
    selectionStatus: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFFFFF80',
        marginTop: 2,
    },
    publishButton: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 1,
        borderTopColor: '#FFD700',
    },
    publishButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFD700',
    },
    // Used the correct greyText variable from the previous context for modal styles
    // (This fixes the 'greyText does not exist on type 'never' error in the style definition)
    greyText: {
        color: '#666666', 
    }
});

// --- MODAL STYLES ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000000', // Using black
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
        gap: 10,
    },
    filterButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFD7001A', // Light gold background
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    memberList: {
        width: '100%',
        maxHeight: '70%',
        marginBottom: 20,
    },
    memberListHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 5,
    },
    memberItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    memberEmail: {
        fontSize: 12,
        color: '#666666',
    },
    noResultsText: {
        textAlign: 'center',
        color: '#666666',
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 10,
        width: '100%',
    },
    closeButtonText: {
        color: '#FFD700',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
    },
    mockSelectors: {
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    mockSelectorTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
        marginTop: 5,
    },
    mockSelectorItem: {
        fontSize: 14,
        paddingVertical: 4,
        color: '#000000',
    }
});