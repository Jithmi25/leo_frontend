import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    greenBubble: '#C8E6C9',
    purpleBubble: '#E1BEE7',
    blueBubble: '#BBDEFB',
    pinkBubble: '#F8BBD0',
};

const PROFILE_AVATAR = 'https://placehold.co/40x40/A088C3/FFF?text=U';

interface Message {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
    avatarUri: string;
    bubbleColor: string;
    isCurrentUser?: boolean;
}

const MESSAGES_DATA: Message[] = [
    {
        id: '1',
        sender: 'Leo Nirmal Perera',
        text: "Welcome our new members..\nlet's make them feel at home!",
        timestamp: '26/10/2025',
        avatarUri: 'https://placehold.co/40x40/FFD700/000?text=NP',
        bubbleColor: COLORS.greenBubble,
    },
    {
        id: '2',
        sender: 'Leo Asini Hewage',
        text: 'Hi everyone,\nWelcome to the LeoConnect community!',
        timestamp: '26/10/2025',
        avatarUri: 'https://placehold.co/40x40/9C27B0/FFF?text=AH',
        bubbleColor: COLORS.purpleBubble,
    },
    {
        id: '3',
        sender: 'Leo Nathali Ashmika',
        text: 'Wow, great job on the cleanup project yesterday.',
        timestamp: '05/11/2025',
        avatarUri: 'https://placehold.co/40x40/2196F3/FFF?text=NA',
        bubbleColor: COLORS.blueBubble,
    },
    {
        id: '4',
        sender: 'You',
        text: "Don't forget!\nOur next meeting is tomorrow at 7 PM!",
        timestamp: '05/11/2025',
        avatarUri: PROFILE_AVATAR,
        bubbleColor: COLORS.pinkBubble,
        isCurrentUser: true,
    },
    {
        id: '5',
        sender: 'Leo Kavindu Lakshan',
        text: 'Reminder:\nDeadline for project submissions is tonight.',
        timestamp: 'Today',
        avatarUri: 'https://placehold.co/40x40/4CAF50/FFF?text=KL',
        bubbleColor: COLORS.greenBubble,
    },
];

export default function ChatScreen() {
    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        if (messageText.trim()) {
            console.log('Sending message:', messageText);
            setMessageText('');
            // TODO: Implement send message logic
        }
    };

    const handleAttachment = () => {
        console.log('Open attachment picker');
        // TODO: Implement attachment picker
    };

    const handleVoiceRecord = () => {
        console.log('Start voice recording');
        // TODO: Implement voice recording
    };

    const renderMessage = (message: Message, index: number, messages: Message[]) => {
        const showDate = index === 0 || messages[index - 1].timestamp !== message.timestamp;

        return (
            <View key={message.id}>
                {showDate && (
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{message.timestamp}</Text>
                    </View>
                )}
                <View
                    style={[
                        styles.messageContainer,
                        message.isCurrentUser && styles.messageContainerRight,
                    ]}
                >
                    {!message.isCurrentUser && (
                        <Image source={{ uri: message.avatarUri }} style={styles.avatar} />
                    )}
                    <View style={styles.messageBubbleContainer}>
                        {!message.isCurrentUser && (
                            <Text style={styles.senderName}>{message.sender}</Text>
                        )}
                        <View
                            style={[
                                styles.messageBubble,
                                { backgroundColor: message.bubbleColor },
                                message.isCurrentUser && styles.messageBubbleRight,
                            ]}
                        >
                            <Text style={styles.messageText}>{message.text}</Text>
                        </View>
                    </View>
                    {message.isCurrentUser && (
                        <Image source={{ uri: message.avatarUri }} style={styles.avatar} />
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Community Chat</Text>
                <TouchableOpacity>
                    <Image source={{ uri: PROFILE_AVATAR }} style={styles.headerAvatar} />
                </TouchableOpacity>
            </View>

            {/* Chat Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    style={styles.messagesScrollView}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Encryption Notice */}
                    <View style={styles.encryptionNotice}>
                        <Text style={styles.encryptionText}>
                            Messages and calls are end-to-end encrypted. Only people in this chat
                            can read, listen to, or share them.{' '}
                            <Text style={styles.learnMoreText}>Click to learn more</Text>
                        </Text>
                    </View>

                    {/* Messages */}
                    {MESSAGES_DATA.map((message, index) =>
                        renderMessage(message, index, MESSAGES_DATA)
                    )}
                </ScrollView>

                {/* Input Bar */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputIconButton} onPress={handleAttachment}>
                        <Ionicons name="add-circle-outline" size={28} color={COLORS.darkText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputIconButton}>
                        <Ionicons name="happy-outline" size={24} color={COLORS.darkText} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Type a message"
                        placeholderTextColor={COLORS.greyText}
                        multiline
                    />
                    {messageText.trim() ? (
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                            <Ionicons name="send" size={24} color={COLORS.goldMid} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.inputIconButton}
                            onPress={handleVoiceRecord}
                        >
                            <Ionicons name="mic-outline" size={24} color={COLORS.darkText} />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: StatusBar.currentHeight || 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    chatContainer: {
        flex: 1,
    },
    messagesScrollView: {
        flex: 1,
    },
    messagesContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    encryptionNotice: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    encryptionText: {
        fontSize: 12,
        color: COLORS.greyText,
        textAlign: 'center',
        lineHeight: 18,
    },
    learnMoreText: {
        color: COLORS.goldMid,
        fontWeight: '500',
    },
    dateContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.greyText,
        fontWeight: '500',
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    messageContainerRight: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 8,
    },
    messageBubbleContainer: {
        flex: 1,
        maxWidth: '70%',
    },
    senderName: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 4,
        marginLeft: 12,
    },
    messageBubble: {
        borderRadius: 16,
        padding: 12,
        paddingHorizontal: 16,
    },
    messageBubbleRight: {
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 15,
        color: COLORS.darkText,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderGrey,
        backgroundColor: COLORS.white,
    },
    inputIconButton: {
        padding: 4,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        color: COLORS.darkText,
        marginHorizontal: 8,
        maxHeight: 100,
    },
    sendButton: {
        padding: 4,
    },
});
