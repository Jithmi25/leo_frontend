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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

export default function RoleManagementScreen() {
    const [selectedMember, setSelectedMember] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [newRole, setNewRole] = useState('');
    const [startDate, setStartDate] = useState('');
    const [remark, setRemark] = useState('');
    const [passcode, setPasscode] = useState(['', '', '', '']);

    const handlePasscodeChange = (value: string, index: number) => {
        const newPasscode = [...passcode];
        newPasscode[index] = value;
        setPasscode(newPasscode);
    };

    const handleCancel = () => {
        router.back();
    };

    const handleAssignRole = () => {
        console.log('Assigning role:', {
            selectedMember,
            currentRole,
            newRole,
            startDate,
            remark,
            passcode: passcode.join(''),
        });
         router.push('/Webmaster/WMConfirmationR');
        // TODO: Implement role assignment logic
    };

    const handleDatePicker = () => {
        console.log('Open date picker');
        // TODO: Implement date picker
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
                        {/* Select Member */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Select Member</Text>
                            <TextInput
                                style={styles.input}
                                value={selectedMember}
                                onChangeText={setSelectedMember}
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* Current Role */}
                        <View style={styles.inputGroup}>
                            <TouchableOpacity style={styles.dropdownField}>
                                <Text style={styles.inputLabel}>Current Role</Text>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.darkText} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={currentRole}
                                onChangeText={setCurrentRole}
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* New Role */}
                        <View style={styles.inputGroup}>
                            <TouchableOpacity style={styles.dropdownField}>
                                <Text style={styles.inputLabel}>New Role</Text>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.darkText} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={newRole}
                                onChangeText={setNewRole}
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* Start Date */}
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
                                placeholder=""
                                placeholderTextColor={COLORS.greyText}
                            />
                        </View>

                        {/* Admin Passcode */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Admin passcode</Text>
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
                            <TouchableOpacity style={styles.assignButton} onPress={handleAssignRole}>
                                <Text style={styles.assignButtonText}>Assign Role</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
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
        fontWeight: '500',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    optionalText: {
        fontStyle: 'italic',
        color: COLORS.greyText,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
        paddingVertical: 8,
        fontSize: 16,
        color: COLORS.darkText,
    },
    dropdownField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkText,
    },
    dateInput: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        color: COLORS.darkText,
    },
    calendarIcon: {
        padding: 4,
    },
    passcodeContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    passcodeInput: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingVertical: 20,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: COLORS.darkText,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
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
    assignButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
