import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Upload } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PhotoCard from '@/components/Events/PhotoCard';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 2;

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  darkText: '#EAEAEA',
  greyText: '#A0A0A0',
};

interface GalleryPhoto {
  id: string;
  image_url: string;
  user_name: string;
  user_avatar: string;
  created_at: string;
}

const samplePhotos: GalleryPhoto[] = [
  {
    id: '1',
    image_url: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
    user_name: 'Anna Smith',
    user_avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    created_at: '2025-01-01',
  },
  {
    id: '2',
    image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    user_name: 'John Doe',
    user_avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    created_at: '2025-01-03',
  },
  {
    id: '3',
    image_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    user_name: 'Emily Carter',
    user_avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    created_at: '2025-01-05',
  },
  {
    id: '4',
    image_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    user_name: 'Michael Lee',
    user_avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    created_at: '2025-01-07',
  },
];

export default function Gallery() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryPhoto[]>(samplePhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const renderPhotoItem = ({ item }: { item: GalleryPhoto }) => (
    <TouchableOpacity style={styles.photoItem} onPress={() => setSelectedPhoto(item)}>
      <Image source={{ uri: item.image_url }} style={styles.photoImage} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.black, '#2C2B29', COLORS.goldAccent]} locations={[0.0, 0.35, 0.6]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={COLORS.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Image Gallery</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => router.push('/Events/UploadPhoto')}>
            <Upload color={COLORS.white} size={20} />
            <Text style={styles.uploadButtonText}>Upload Photos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteCard}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <FlatList data={photos} renderItem={renderPhotoItem} keyExtractor={(item) => item.id} numColumns={2} columnWrapperStyle={styles.row} scrollEnabled={false} contentContainerStyle={styles.gridContainer} />
        </View>
      </ScrollView>
      {selectedPhoto && <PhotoCard id={selectedPhoto.id} imageUrl={selectedPhoto.image_url} userName={selectedPhoto.user_name} userAvatar={selectedPhoto.user_avatar} visible={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: StatusBar.currentHeight || 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white },
  uploadSection: { paddingHorizontal: 16, paddingVertical: 12 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.goldAccent, paddingVertical: 14, borderRadius: 12, gap: 8 },
  uploadButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  whiteCard: { flex: 1, marginTop: 16, backgroundColor: COLORS.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 16, paddingVertical: 20, paddingBottom: 200 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.black, marginBottom: 16 },
  gridContainer: { paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  photoItem: { width: imageSize, height: imageSize, borderRadius: 12, overflow: 'hidden' },
  photoImage: { width: '100%', height: '100%' },
});
