import React, { useState, useMemo } from 'react';
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
    Modal,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChevronDown, CheckCircle } from 'lucide-react-native'; 

// --- MOCK DATA & INTERFACES ---
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
    name: string;
    clubId: string;
    currentRole: string;
}

interface Role {
    id: string;
    name: string;
    level: string;
}

// 🔑 UPDATED: Districts and Clubs with user-requested names
const mockDistricts: District[] = [
    { id: 'd_colombo', name: 'Colombo' },
    { id: 'd_gampaha', name: 'Gampaha' },
    { id: 'd_kandy', name: 'Kandy' },
];

const mockClubs: Club[] = [
    { id: 'c_ucsc', districtId: 'd_colombo', name: 'University of Colombo' },
    { id: 'c_kdu', districtId: 'd_colombo', name: 'KDU' },
    { id: 'c_negombo', districtId: 'd_gampaha', name: 'Negombo City' },
    { id: 'c_ragama', districtId: 'd_gampaha', name: 'Ragama' },
    { id: 'c_peradeniya', districtId: 'd_kandy', name: 'University of Peradeniya' },
];

const mockMembers: Member[] = [
    { id: 'm1', name: 'Amal Perera', clubId: 'c_ucsc', currentRole: 'Normal Member' },
    { id: 'm2', name: 'Nimali Silva', clubId: 'c_ucsc', currentRole: 'District Secretary' },
    { id: 'm3', name: 'Ravi Fernando', clubId: 'c_kdu', currentRole: 'Normal Member' },
    { id: 'm4', name: 'Sanjula Jayasekara', clubId: 'c_negombo', currentRole: 'National President' },
    { id: 'm5', name: 'Kamal Wijesinghe', clubId: 'c_negombo', currentRole: 'Club President' },
    { id: 'm6', name: 'Priya Senaratne', clubId: 'c_peradeniya', currentRole: 'Normal Member' },
];

const mockRoles: Role[] = [
    { id: 'r1', name: 'Normal Member', level: 'Club' },
    { id: 'r2', name: 'Club President', level: 'Club' },
    { id: 'r3', name: 'District Secretary', level: 'District' },
    { id: 'r4', name: 'National Treasurer', level: 'National' },
];

// --- CONSTANTS ---
const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    success: '#4CAF50',
};

type SelectionType = 'member' | 'newRole' | 'district' | 'club';

// --- MAIN COMPONENT ---
export default function RoleManagementScreen() {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [newRole, setNewRole] = useState<Role | null>(null);
    const [startDate, setStartDate] = useState('');
    const [remark, setRemark] = useState('');
    const [passcode, setPasscode] = useState(['', '', '', '']);

    // State for Member Filtering
    const [filterDistrict, setFilterDistrict] = useState<District | null>(null);
    const [filterClub, setFilterClub] = useState<Club | null>(null);

    // Modal State
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSelectionType, setCurrentSelectionType] = useState<SelectionType | null>(null);

    // --- CASCADING FILTER LOGIC ---

    // 1. Available clubs update when district changes
    const availableClubs = useMemo(() => {
        if (!filterDistrict) return mockClubs;
        return mockClubs.filter(c => c.districtId === filterDistrict.id);
    }, [filterDistrict]);
    
    // 2. Filter members based on selected District and Club
    const filteredMembers = useMemo(() => {
        let members = mockMembers;
        if (filterClub) {
            members = members.filter(m => m.clubId === filterClub.id);
        } else if (filterDistrict) {
            const clubIdsInDistrict = mockClubs
                .filter(c => c.districtId === filterDistrict.id)
                .map(c => c.id);
            members = members.filter(m => clubIdsInDistrict.includes(m.clubId));
        }
        return members;
    }, [filterDistrict, filterClub]);

    // --- HANDLERS ---

    const handleOpenModal = (type: SelectionType) => {
        setCurrentSelectionType(type);
        setIsModalVisible(true);
    };

    const handleSelectFilter = (item: District | Club | null) => {
        if (currentSelectionType === 'district') {
            setFilterDistrict(item as District | null);
            setFilterClub(null); // Reset club when district changes
        } else if (currentSelectionType === 'club') {
            setFilterClub(item as Club | null);
        }
        setIsModalVisible(true); 
    };

    const handleSelectMember = (member: Member) => {
        setSelectedMember(member);
        // Clear filters after selection to prepare for next search
        setFilterDistrict(null); 
        setFilterClub(null);
        setIsModalVisible(false);
    };

    const handleSelectNewRole = (role: Role) => {
        setNewRole(role);
        setIsModalVisible(false);
    };

    const handlePasscodeChange = (value: string, index: number) => {
        const newPasscode = [...passcode];
        newPasscode[index] = value;
        setPasscode(newPasscode);
    };

    const handleCancel = () => {
        router.back();
    };

    const handleAssignRole = () => {
        if (!selectedMember || !newRole || passcode.join('').length !== 4) {
            Alert.alert('Missing Information', 'Please select a member, a new role, and enter the 4-digit passcode.');
            return;

        }

        console.log('Attempting role assignment...');
        router.replace('/SuperAdmin/WMConfirmationR');
    };

    const handleDatePicker = () => {
        Alert.alert('Date Picker', 'Implement native date picker module here.');
    };
    
    // --- MODAL RENDERING ---

    const renderSelectionModal = (): React.ReactElement | null => { 
        const type = currentSelectionType;
        let title = '';
        let data: (Role | Member)[] = [];
        let renderItem: (item: any) => React.JSX.Element;

        if (type === 'member') {
            title = 'Select Member (Filtered)';
            data = filteredMembers;
            renderItem = (member: Member) => (
                <TouchableOpacity
                    key={member.id}
                    style={modalStyles.listItem}
                    onPress={() => handleSelectMember(member)}
                >
                    <View>
                        <Text style={modalStyles.itemName}>{member.name}</Text>
                        <Text style={modalStyles.itemDetail}>
                            Club: {mockClubs.find(c => c.id === member.clubId)?.name || 'N/A'} | Current: {member.currentRole}
                        </Text>
                    </View>
                    {selectedMember?.id === member.id ? (
                        <CheckCircle size={24} color={COLORS.success} />
                    ) : (
                        <Ionicons name="chevron-forward" size={24} color={COLORS.greyText} />
                    )}
                </TouchableOpacity>
            );
        } else if (type === 'newRole') {
            title = 'Select New Role';
            data = mockRoles;
            renderItem = (role: Role) => (
                <TouchableOpacity
                    key={role.id}
                    style={modalStyles.listItem}
                    onPress={() => handleSelectNewRole(role)}
                >
                    <View>
                        <Text style={modalStyles.itemName}>{role.name}</Text>
                        <Text style={modalStyles.itemDetail}>Level: {role.level}</Text>
                    </View>
                    {newRole?.id === role.id ? (
                        <CheckCircle size={24} color={COLORS.success} />
                    ) : (
                        <Ionicons name="chevron-forward" size={24} color={COLORS.greyText} />
                    )}
                </TouchableOpacity>
            );
        } else {
            return null; 
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible && (type === 'member' || type === 'newRole')}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalTitle}>{title}</Text>
                        
                        {/* --- FILTER UI (Only for Member Selection) --- */}
                        {type === 'member' && (
                            <View style={modalStyles.filterContainer}>
                                {/* District Filter Button */}
                                <TouchableOpacity 
                                    style={modalStyles.filterButton} 
                                    onPress={() => setCurrentSelectionType('district')}>
                                    <Text style={modalStyles.filterText}>{filterDistrict ? filterDistrict.name : 'Filter by District'}</Text>
                                    <ChevronDown size={18} color={COLORS.darkText} />
                                </TouchableOpacity>

                                {/* Club Filter Button */}
                                <TouchableOpacity 
                                    style={[modalStyles.filterButton, !filterDistrict && modalStyles.filterButtonDisabled]}
                                    onPress={() => filterDistrict && setCurrentSelectionType('club')}
                                    disabled={!filterDistrict}>
                                    <Text style={[modalStyles.filterText, !filterDistrict && modalStyles.filterTextDisabled]}>
                                        {filterClub ? filterClub.name : (filterDistrict ? 'Filter by Club' : 'Select District First')}
                                    </Text>
                                    <ChevronDown size={18} color={filterDistrict ? COLORS.darkText : COLORS.greyText} />
                                </TouchableOpacity>
                            </View>
                        )}
                        
                        {/* --- LISTS --- */}
                        <ScrollView style={modalStyles.listContainer}>
                            {data.map(item => renderItem(item))}
                            {data.length === 0 && <Text style={modalStyles.noResultsText}>No results found.</Text>}
                        </ScrollView>
                        
                        <TouchableOpacity 
                            style={modalStyles.closeButton} 
                            onPress={() => setIsModalVisible(false)}>
                            <Text style={modalStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- NESTED MODALS for FILTERS --- */}
                {renderFilterPickerModal()}
            </Modal>
        );
    };

    const renderFilterPickerModal = (): React.ReactElement | null => {
        const isDistrict = currentSelectionType === 'district';
        const isClub = currentSelectionType === 'club';

        if (!isDistrict && !isClub) return null;

        const data = isDistrict ? mockDistricts : availableClubs;
        const title = isDistrict ? 'Select District' : (filterDistrict ? `Select Club in ${filterDistrict.name}` : 'Select Club');

        const handleSelectAndClose = (item: District | Club | null) => {
            handleSelectFilter(item); // Update filter state
            setCurrentSelectionType('member'); // Go back to member list view
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible && (isDistrict || isClub)}
                onRequestClose={() => setCurrentSelectionType('member')} 
            >
                <View style={modalStyles.centeredView}>
                    <View style={[modalStyles.modalView, modalStyles.filterPickerView]}>
                        <Text style={modalStyles.modalTitle}>{title}</Text>

                        <ScrollView style={modalStyles.listContainer}>
                            {/* Option to clear filter */}
                            <TouchableOpacity 
                                style={modalStyles.clearFilterButton} 
                                onPress={() => handleSelectAndClose(null)}>
                                <Text style={modalStyles.clearFilterText}>[Clear Selection]</Text>
                            </TouchableOpacity>

                            {data.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={modalStyles.listItem}
                                    onPress={() => handleSelectAndClose(item)}
                                >
                                    <Text style={modalStyles.itemName}>{item.name}</Text>
                                    {(isDistrict && filterDistrict?.id === item.id) || (isClub && filterClub?.id === item.id) ? (
                                        <CheckCircle size={24} color={COLORS.success} />
                                    ) : (
                                        <Ionicons name="chevron-forward" size={24} color={COLORS.greyText} />
                                    )}
                                </TouchableOpacity>
                            ))}
                            {data.length === 0 && <Text style={modalStyles.noResultsText}>No Clubs found in this District.</Text>}
                        </ScrollView>

                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setCurrentSelectionType('member')}>
                            <Text style={modalStyles.closeButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Role Management</Text>
            </View>
            
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Form Card */}
                    <View style={styles.formCard}>
                        
                        {/* Select Member (Interactive Field) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Select Member</Text>
                            <TouchableOpacity style={styles.inputSelect} onPress={() => handleOpenModal('member')}>
                                <Text style={selectedMember ? styles.inputSelectText : styles.inputPlaceholder}>
                                    {selectedMember ? selectedMember.name : 'Tap to select a member...'}
                                </Text>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.darkText} />
                            </TouchableOpacity>
                        </View>

                        {/* Current Role (Read-Only/Derived) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Current Role</Text>
                            <View style={styles.inputDisplay}>
                                <Text style={styles.inputDisplayText}>
                                    {selectedMember ? selectedMember.currentRole : 'Select member first'}
                                </Text>
                            </View>
                        </View>

                        {/* New Role (Interactive Field) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>New Role</Text>
                            <TouchableOpacity style={styles.inputSelect} onPress={() => handleOpenModal('newRole')}>
                                <Text style={newRole ? styles.inputSelectText : styles.inputPlaceholder}>
                                    {newRole ? newRole.name : 'Tap to select new role...'}
                                </Text>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.darkText} />
                            </TouchableOpacity>
                        </View>

                        {/* Start Date (DatePicker Integration) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>
                                Start Date<Text style={styles.optionalText}>(optional)</Text>
                            </Text>
                            <View style={styles.dateInputContainer}>
                                <TextInput
                                    style={styles.dateInput}
                                    value={startDate}
                                    onChangeText={setStartDate}
                                    placeholder="DD / MM / YYYY"
                                    placeholderTextColor={COLORS.greyText}
                                />
                                <TouchableOpacity onPress={handleDatePicker} style={styles.calendarIcon}>
                                    <Ionicons name="calendar-outline" size={24} color={COLORS.darkText} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remark */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Remark</Text>
                            <TextInput
                                style={styles.input}
                                value={remark}
                                onChangeText={setRemark}
                                placeholder="Enter reason for role change (optional)"
                                placeholderTextColor={COLORS.greyText}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>

                        {/* Admin Passcode */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Admin Passcode (4-Digit)</Text>
                            <View style={styles.passcodeContainer}>
                                {passcode.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.passcodeInput}
                                        value={digit}
                                        onChangeText={(value) => handlePasscodeChange(value, index)}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        secureTextEntry
                                        placeholder=""
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.assignButton, (!selectedMember || !newRole) && styles.assignButtonDisabled]} 
                                onPress={handleAssignRole}
                                disabled={!selectedMember || !newRole}
                            >
                                <Text style={styles.assignButtonText}>Assign Role</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Render the selection modal (which contains nested filter modals) */}
            {renderSelectionModal()}
        </SafeAreaView>
    );
}

// --- STYLES ---

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
        paddingTop: StatusBar.currentHeight || 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    optionalText: {
        fontStyle: 'italic',
        color: COLORS.greyText,
        fontSize: 13,
    },
    inputSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
        paddingVertical: 12,
        backgroundColor: COLORS.lightGrey,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    inputSelectText: {
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    inputPlaceholder: {
        fontSize: 16,
        color: COLORS.greyText,
        fontWeight: '400',
    },
    inputDisplay: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
    },
    inputDisplayText: {
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        backgroundColor: COLORS.lightGrey,
    },
    dateInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
    },
    calendarIcon: {
        padding: 10,
    },
    passcodeContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    passcodeInput: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingVertical: 16,
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: COLORS.darkText,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 32,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: COLORS.black,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },
    assignButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },
    assignButtonDisabled: {
        backgroundColor: COLORS.borderGrey,
    },
    assignButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
    },
});

// --- MODAL STYLES ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '60%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        width: '100%',
    },
    filterPickerView: {
        height: '80%', 
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.darkText,
        marginBottom: 15,
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
        backgroundColor: COLORS.lightGrey, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    filterButtonDisabled: {
        backgroundColor: '#F0F0F0',
        opacity: 0.6,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    filterTextDisabled: {
        color: COLORS.greyText,
    },
    listContainer: {
        width: '100%',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderGrey,
        paddingTop: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        paddingHorizontal: 5,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    itemDetail: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 2,
    },
    closeButton: {
        backgroundColor: COLORS.black,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        marginTop: 15,
    },
    closeButtonText: {
        color: COLORS.white,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
    },
    noResultsText: {
        textAlign: 'center',
        color: COLORS.greyText,
        marginTop: 20,
    },
    clearFilterButton: {
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    clearFilterText: {
        color: COLORS.goldMid,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
});