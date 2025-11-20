import React, { useEffect, useRef, useState, useCallback } from 'react';
import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

interface OnboardingData {
  id: string;
  text: string;
  image: ImageSourcePropType | { uri: string };
}

const SLIDES: OnboardingData[] = [
  {
    id: '1',
    text: 'Connect, collaborate, and make an impact with LeoConnect Sri Lanka.',
    image: require('../assets/team_illustration.png'),
  },
  {
    id: '2',
    text: 'Follow clubs, districts, and projects across Sri Lanka.',
    image: require('../assets/map_illustration.png'),
  },
  {
    id: '3',
    text: 'Join safely with verified Google sign-in for all Leo members.',
    image: require('../assets/login_illustration.png'),
  },
];

const getDeviceHeight = () => Dimensions.get('window').height;

const OnboardingItem = ({ item, width }: { item: OnboardingData; width: number }) => {
  return (
    <View style={[styles.slide, { width }]}>
      <Image 
        source={item.image} 
        style={[styles.image, { width: width * 0.8, height: getDeviceHeight() * 0.4 }]} 
        resizeMode="contain" 
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
};

/**
 * OnboardingScreening
 */
export default function OnboardingScreening() {
  const window = useWindowDimensions();
  const [layoutWidth, setLayoutWidth] = useState<number>(Math.round(window.width));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ready, setReady] = useState(false);
  const slidesRef = useRef<FlatList<any> | null>(null);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setCurrentIndex(idx);
    }
  }).current;

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setLayoutWidth(Math.round(window.width));
  }, [window.width]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / layoutWidth);
    setCurrentIndex(newIndex);
  };

  const scrollTo = useCallback((index: number) => {
    console.log('scrollTo called with index:', index);  // DEBUG: Remove after testing
    if (!slidesRef.current) {
      console.log('FlatList ref is null');  // DEBUG: Remove after testing
      setCurrentIndex(index);
      return;
    }

    setCurrentIndex(index);

    try {
      slidesRef.current.scrollToIndex({ index, animated: true, viewPosition: 0 });
      console.log('scrollToIndex attempted for index:', index);  // DEBUG: Remove after testing
    } catch (err) {
      console.log('scrollToIndex failed, trying scrollToOffset:', err);  // DEBUG: Remove after testing
      const offset = index * layoutWidth;
      try {
        slidesRef.current.scrollToOffset({ offset, animated: true });
      } catch (e) {
        console.log('scrollToOffset also failed:', e);  // DEBUG: Remove after testing
        // ignore
      }
      setTimeout(() => {
        try {
          slidesRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });
        } catch {}
      }, 200);
    }
  }, [layoutWidth]);

  const onScrollToIndexFailed = (info: { index: number }) => {
    console.log('onScrollToIndexFailed for index:', info.index);  // DEBUG: Remove after testing
    setTimeout(() => {
      const offset = info.index * layoutWidth;
      slidesRef.current?.scrollToOffset({ offset, animated: true });
    }, 200);
  };

  const goNext = () => {
    const next = Math.min(currentIndex + 1, SLIDES.length - 1);
    scrollTo(next);
  };
  const goSkip = () => {
    scrollTo(SLIDES.length - 1);
  };

  return (
    <SafeAreaView 
      style={styles.container} 
      onLayout={(e) => setLayoutWidth(Math.round(e.nativeEvent.layout.width))}
    >
      <View style={styles.header} />

      

      {ready && (
        <FlatList
          ref={(r) => { slidesRef.current = r; }}
          data={SLIDES}
          renderItem={({ item }) => <OnboardingItem item={item} width={layoutWidth} />}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          getItemLayout={(_, index) => ({
            length: layoutWidth,
            offset: layoutWidth * index,
            index,
          })}
          initialScrollIndex={0}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollToIndexFailed={onScrollToIndexFailed}
          initialNumToRender={SLIDES.length} 
          windowSize={SLIDES.length + 2} 
          scrollEventThrottle={16}
        />
      )}

      {/* Paginator + controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.paginator}>
          {SLIDES.map((_, i) => {
            const isActive = i === currentIndex;
            return (
              <TouchableOpacity 
                key={i.toString()} 
                onPress={() => scrollTo(i)} 
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
                style={{ padding: 10 }}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isActive ? '#FBBF24' : '#FFFFFF',
                      borderColor: isActive ? '#FBBF24' : '#E5E7EB',
                      width: isActive ? 20 : 10,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.buttonsRow}>
          {currentIndex < SLIDES.length - 1 ? (
            <>
              <TouchableOpacity onPress={goSkip} style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goNext} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            // <TouchableOpacity onPress={() => { /* TODO: navigate to main app / auth */ }} style={styles.primaryButton}>
            //   <Text style={styles.primaryButtonText}>Get Started</Text>
            // </TouchableOpacity>

<TouchableOpacity 
  onPress={() => router.replace('../signup')} 
  style={styles.primaryButton}
>
  <Text style={styles.primaryButtonText}>Get Started</Text>
</TouchableOpacity>





          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // 💡 FIXED: Removed alignItems and justifyContent to prevent centering issues with horizontal FlatList
  },
  header: {
    height: 50,
    width: '100%',
  },
  slide: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
  },
  image: {
    marginBottom: 40,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    lineHeight: 28,
    fontWeight: '500',
  },
  controlsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  paginator: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonTextWrap: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: '#FBBF24',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 16,
  },
});
