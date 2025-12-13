import { Share2 } from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldAccent: '#FFC72C',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
};

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  onShareOption: (option: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose, onShareOption }) => {
  const handleShareOption = (option: string) => {
    onClose();
    Alert.alert('Shared Successfully', `Post shared to ${option}!`);
    onShareOption(option);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share Post</Text>
          <TouchableOpacity
            style={[styles.modalButton, { borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }]}
            onPress={() => handleShareOption('Home Community')}
          >
            <View style={styles.modalButtonRow}>
              <Share2 color={COLORS.goldAccent} size={20} style={styles.modalIcon} />
              <Text style={styles.modalButtonText}>Share to Home Community</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey }]}
            onPress={() => handleShareOption('District Community')}
          >
            <View style={styles.modalButtonRow}>
              <Share2 color={COLORS.goldAccent} size={20} style={styles.modalIcon} />
              <Text style={styles.modalButtonText}>Share to District Community</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={[styles.modalButtonText, { color: COLORS.greyText }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.goldAccent,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalIcon: {
    marginRight: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.goldAccent,
  },
});

export default ShareModal;