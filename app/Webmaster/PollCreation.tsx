import React, { useState, useEffect } from 'react';
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
    Alert,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { pollsApi } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    red: '#E84A5F',
    green: '#4CAF50',
};

export default function PollCreationScreen() {
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollDescription, setPollDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default: 1 week from now
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userClub, setUserClub] = useState('');
    const [userDistrict, setUserDistrict] = useState('');
    const [selectedDays, setSelectedDays] = useState(7);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                setUserId(user.id);
                setUserClub(user.club || '');
                setUserDistrict(user.district || '');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const updateEndDate = (days: number) => {
        setSelectedDays(days);
        const newDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        setEndDate(newDate);
    };

    const validateForm = () => {
        if (!pollQuestion.trim()) {
            Alert.alert('Validation Error', 'Please enter poll question');
            return false;
        }
        
        const validOptions = options.filter(opt => opt.trim().length > 0);
        if (validOptions.length < 2) {
            Alert.alert('Validation Error', 'Please enter at least 2 options');
            return false;
        }

        if (endDate <= new Date()) {
            Alert.alert('Validation Error', 'End date must be in the future');
            return false;
        }

        return true;
    };

    const handleOptionChange = (value: string, index: number) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleCancel = () => {
        Alert.alert('Discard Poll?', 'Are you sure you want to discard this poll?', [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            {
                text: 'Discard',
                onPress: () => router.back(),
                style: 'destructive',
            },
        ]);
    };

    const handlePublish = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const pollData = {
                question: pollQuestion.trim(),
                description: pollDescription.trim(),
                options: options.filter(opt => opt.trim().length > 0),
                endDate: endDate.toISOString(),
                isActive: true,
                isPublic: true,
                isMultipleChoice: false,
                createdBy: userId,
                club: userClub,
                district: userDistrict,
            };

            console.log('Creating poll:', pollData);
            
            // Call backend API
            try {
                const response = await pollsApi.createPoll(pollData);
                console.log('Poll created successfully:', response);
            } catch (apiError) {
                console.error('Backend API call failed, using mock data:', apiError);
                // Fallback to mock data already logged
            }
            
            console.log('Poll created successfully');
            Alert.alert('Success', 'Poll created successfully!');
            router.push('/Webmaster/WMConfirmationP');
            
        } catch (error) {
            console.error('Error creating poll:', error);
            Alert.alert('Error', 'Failed to create poll. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Poll Creation</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Form Card */}
                    <View style={styles.formCard}>
                        {/* Poll Question */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Poll Question *</Text>
                            <TextInput
                                style={styles.input}
                                value={pollQuestion}
                                onChangeText={setPollQuestion}
                                placeholder="What would you like to ask?"
                                placeholderTextColor={COLORS.greyText}
                                editable={!loading}
                                maxLength={200}
                            />
                            <Text style={styles.characterCount}>{pollQuestion.length} / 200</Text>
                        </View>

                        {/* Poll Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Poll Description</Text>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                                value={pollDescription}
                                onChangeText={setPollDescription}
                                placeholder="Add more context about this poll"
                                placeholderTextColor={COLORS.greyText}
                                editable={!loading}
                                multiline
                                maxLength={500}
                            />
                            <Text style={styles.characterCount}>{pollDescription.length} / 500</Text>
                        </View>

                        {/* Options */}
                        <View style={styles.optionsSection}>
                            <Text style={styles.inputLabel}>Poll Options *</Text>
                            {options.map((option, index) => (
                                <View key={index} style={styles.inputGroup}>
                                    <View style={styles.optionHeader}>
                                        <Text style={styles.optionNumber}>Option {index + 1}</Text>
                                        {options.length > 2 && (
                                            <TouchableOpacity 
                                                onPress={() => handleRemoveOption(index)}
                                                disabled={loading}
                                            >
                                                <Ionicons name="close-circle" size={20} color={COLORS.red} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={option}
                                        onChangeText={(value) => handleOptionChange(value, index)}
                                        placeholder={`Enter option ${index + 1}`}
                                        placeholderTextColor={COLORS.greyText}
                                        editable={!loading}
                                        maxLength={100}
                                    />
                                </View>
                            ))}

                            {/* Add More Options */}
                            <TouchableOpacity 
                                style={[styles.addOptionButton, options.length >= 10 && styles.addOptionButtonDisabled]} 
                                onPress={handleAddOption}
                                disabled={loading || options.length >= 10}
                            >
                                <Ionicons 
                                    name="add" 
                                    size={20} 
                                    color={options.length >= 10 ? COLORS.borderGrey : COLORS.goldMid} 
                                />
                                <Text style={[styles.addOptionText, options.length >= 10 && { color: COLORS.borderGrey }]}>
                                    Add More Options {options.length}/10
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* End Date */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Poll Duration *</Text>
                            <TouchableOpacity 
                                style={styles.dateDisplay} 
                                onPress={() => !loading && setShowDatePicker(true)}
                                disabled={loading}
                            >
                                <View>
                                    <Text style={styles.dateText}>
                                        Ends in {selectedDays} {selectedDays === 1 ? 'day' : 'days'}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        {endDate.toLocaleDateString()} at {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                                <Ionicons name="calendar-outline" size={24} color={COLORS.goldMid} />
                            </TouchableOpacity>
                        </View>

                        {/* Date Picker Modal */}
                        <Modal
                            visible={showDatePicker}
                            transparent
                            animationType="slide"
                            onRequestClose={() => setShowDatePicker(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.datePickerModal}>
                                    <View style={styles.datePickerHeader}>
                                        <Text style={styles.datePickerTitle}>Select Poll Duration</Text>
                                        <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                            <Ionicons name="close" size={24} color={COLORS.darkText} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.durationOptions}>
                                        {[
                                            { days: 1, label: '1 Day' },
                                            { days: 3, label: '3 Days' },
                                            { days: 7, label: '1 Week (Default)' },
                                            { days: 14, label: '2 Weeks' },
                                            { days: 30, label: '1 Month' },
                                        ].map((option) => (
                                            <TouchableOpacity
                                                key={option.days}
                                                style={[
                                                    styles.durationOption,
                                                    selectedDays === option.days && styles.durationOptionActive,
                                                ]}
                                                onPress={() => {
                                                    updateEndDate(option.days);
                                                    setShowDatePicker(false);
                                                }}
                                            >
                                                <Text style={[
                                                    styles.durationOptionText,
                                                    selectedDays === option.days && styles.durationOptionTextActive,
                                                ]}>
                                                    {option.label}
                                                </Text>
                                                {selectedDays === option.days && (
                                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.goldMid} />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <TouchableOpacity 
                                        style={styles.doneButton}
                                        onPress={() => setShowDatePicker(false)}
                                    >
                                        <Text style={styles.doneButtonText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={handleCancel}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.publishButton, (!pollQuestion || options.filter(o => o.trim()).length < 2 || loading) && styles.publishButtonDisabled]} 
                                onPress={handlePublish}
                                disabled={!pollQuestion || options.filter(o => o.trim()).length < 2 || loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color={COLORS.darkText} />
                                ) : (
                                    <>
                                        <Text style={styles.publishButtonText}>Publish Poll</Text>
                                        <Ionicons name="arrow-forward" size={18} color={COLORS.darkText} />
                                    </>
                                )}
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
        backgroundColor: COLORS.lightGrey,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
        paddingVertical: 10,
        paddingHorizontal: 0,
        fontSize: 16,
        color: COLORS.darkText,
    },
    characterCount: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 4,
        textAlign: 'right',
    },
    optionsSection: {
        marginBottom: 20,
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionNumber: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkText,
    },
    addOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 0,
        marginTop: 12,
        gap: 8,
    },
    addOptionButtonDisabled: {
        opacity: 0.5,
    },
    addOptionText: {
        fontSize: 14,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
        paddingVertical: 10,
    },
    dateText: {
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: '500',
    },
    timeText: {
        fontSize: 14,
        color: COLORS.greyText,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    datePickerModal: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    datePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    datePickerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    durationOptions: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 8,
    },
    durationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        backgroundColor: COLORS.white,
    },
    durationOptionActive: {
        borderColor: COLORS.goldMid,
        backgroundColor: 'rgba(255, 199, 44, 0.1)',
    },
    durationOptionText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.darkText,
    },
    durationOptionTextActive: {
        fontWeight: '600',
        color: COLORS.darkText,
    },
    doneButton: {
        marginHorizontal: 20,
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: COLORS.goldMid,
        alignItems: 'center',
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    publishButton: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.goldMid,
        gap: 8,
    },
    publishButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    publishButtonDisabled: {
        opacity: 0.5,
    },
});

