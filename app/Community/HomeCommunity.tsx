import React, { useState, useRef } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  StatusBar
} from 'react-native';
import { ArrowLeft, Users, ChevronLeft, ChevronRight } from 'lucide-react-native';
import CommunityCard from '@/components/Homeclub/CommunityCard'; // Updated import path
import LeadershipCard from '@/components/Homeclub/LeadershipCard'; // Updated import path
import ClubCard from '@/components/Homeclub/ClubCard'; // Updated import path
import PollCard from '@/components/Homeclub/PollCard'; // Updated import path
import CommunityFeedPostCard from '@/components/Homeclub/CommunityFeedPostCard'; // Updated import path

export default function HomeCommunity() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const leadershipScrollRef = useRef<ScrollView | null>(null);
  const clubsScrollRef = useRef<ScrollView | null>(null);

  const years = [
    '2024 - 2025',
    '2023 - 2024',
    '2022 - 2023',
    '2021 - 2022',
    '2020 - 2021',
    '2019 - 2020',
    '2018 - 2019',
    '2017 - 2018',
    '2016 - 2017',
    '2015 - 2016',
  ];

  const districtData = {
    districtName: '306 D01',
    tagline: 'FIND A WAY OR MAKE A WAY',
    description:
      'Leo District 306 D1 is the Leo District that expands from Colombo City such areas as Port City, Kollupitiya, Wellawatte, Bambalapitiya and the West of Galle Road, Dehiwala, Mt. Lavinia, Moratuwa. Covering different portions of Kalutara, Panadura, Beruwala, Bentota, Balapitiya, Ambalangoda and other nearby divisions.',
    logoUrl:
      'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradientFrom: '#FFD700', // Kept for compatibility, but simplified components use fixed yellow-black
    gradientTo: '#000000',
  };

  const leadershipData = [
    {
      id: '1',
      name: 'Leo Yashika Nethmini',
      position: 'President',
      imageUrl:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '2',
      name: 'Leo Lion Sajani Wijesuriya',
      position: 'Immediate Past District President',
      imageUrl:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '3',
      name: 'Leo Vinuk Thismalpola',
      position: 'District Vice President',
      imageUrl:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '4',
      name: 'Leo Sarah Johnson',
      position: 'District Secretary',
      imageUrl:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
  ];

  const clubsData = [
    {
      id: '1',
      clubName: 'Leo Club of Colombo University Faculty of Science',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '2',
      clubName: 'Leo Club of Colombo Six New Stars',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '3',
      clubName: 'Leo Club of Kothalawala Defense University',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
    {
      id: '4',
      clubName: 'Leo Club of Moratuwa University',
      gradientFrom: '#FFD700',
      gradientTo: '#000000',
    },
  ];

  const pollsData = [
    {
      id: '1',
      question:
        'Should we organize the National Blood Donation Campaign twice a year instead of once?',
      options: [
        { text: 'Agree', votes: 1500, voters: ['user1', 'user2', 'user3'] },
        { text: 'Disagree', votes: 500, voters: ['user4'] },
      ],
    },
    {
      id: '2',
      question:
        'Do you support making "Green Horizon 2025" an annual national tree planting project?',
      options: [
        { text: 'Yes', votes: 2000, voters: ['user1', 'user2', 'user3', 'user4'] },
        { text: 'No', votes: 300, voters: ['user5'] },
      ],
    },
  ];

  const feedPosts = [
    {
      id: '1',
      authorName: 'Leo Amaala Fernando',
      authorPosition: 'Club President, Leo District 306 D1.',
      authorImage:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      postImage:
        'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Get ready to rumble!',
      content:
        "LEO'S VS EVERYBODY goes down this Saturday, August 15th, at @ClubFlava. Drinks, hookah, live music, and the best local DJs.",
      likes: 1500,
      comments: 800,
      shares: 600,
    },
    {
      id: '2',
      authorName: 'Leo Amaala Fernando',
      authorPosition: 'Club President, Leo District 306 D1.',
      authorImage:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      postImage:
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Join Us for the 9th Installation!',
      content: 'Celebrate 9 years of service and fellowship with the Leo Club of SLIIT.',
      likes: 1500,
      comments: 500,
      shares: 600,
    },
  ];

  const pastLeaders = selectedYear
    ? [
        {
          name: 'Leo Michael Anderson',
          position: 'District President',
          year: selectedYear,
        },
        {
          name: 'Leo Emily Roberts',
          position: 'District Vice President',
          year: selectedYear,
        },
        {
          name: 'Leo David Martinez',
          position: 'District Secretary',
          year: selectedYear,
        },
      ]
    : [];

  const scroll = (
    ref: React.RefObject<ScrollView | null>,
    direction: 'left' | 'right'
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollTo({
        x: direction === 'left' ? -scrollAmount : scrollAmount,
        animated: true,
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.8} 
                              onPress={() => router.push('/Community/Chat')}>
            <Users size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View style={styles.profileImage} />
        </View>
      </View>

      <View style={styles.content}>
        <CommunityCard {...districtData} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our District Leadership</Text>
          <View style={styles.scrollContainer}>
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scroll(leadershipScrollRef, 'left')}
            >
              <ChevronLeft size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <ScrollView
              ref={leadershipScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              {leadershipData.map((leader) => (
                <LeadershipCard key={leader.id} {...leader} />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scroll(leadershipScrollRef, 'right')}
            >
              <ChevronRight size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leo Clubs in The District</Text>
          <View style={styles.scrollContainer}>
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scroll(clubsScrollRef, 'left')}
            >
              <ChevronLeft size={24} color="#1A1A1A" />
            </TouchableOpacity>

            <ScrollView
              ref={clubsScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              {clubsData.map((club) => (
                <ClubCard key={club.id} {...club} />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => scroll(clubsScrollRef, 'right')}
            >
              <ChevronRight size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Past Leaders</Text>
          <TouchableOpacity
            style={styles.yearDropdownButton}
            onPress={() => setShowYearDropdown(!showYearDropdown)}
          >
            <Text style={styles.yearDropdownText}>
              {selectedYear || 'Select The Year'}
            </Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <Modal
            visible={showYearDropdown}
            transparent
            animationType="fade"
            onRequestClose={() => setShowYearDropdown(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setShowYearDropdown(false)}
            >
              <View style={styles.yearDropdownMenu}>
                <FlatList
                  data={years}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.yearOption}
                      onPress={() => {
                        setSelectedYear(item);
                        setShowYearDropdown(false);
                      }}
                    >
                      <Text style={styles.yearOptionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          {selectedYear && pastLeaders.length > 0 && (
            <View style={styles.pastLeadersContainer}>
              {pastLeaders.map((leader, index) => (
                <View key={index} style={styles.leaderCard}>
                  <Text style={styles.leaderName}>{leader.name}</Text>
                  <Text style={styles.leaderPosition}>{leader.position}</Text>
                  <Text style={styles.leaderYear}>{leader.year}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <PollCard polls={pollsData} />

        <View style={styles.feedContainer}>
          {feedPosts.map((post) => (
            <CommunityFeedPostCard key={post.id} post={post} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight || 0
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginLeft: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0052CC',
    borderWidth: 2,
    borderColor: '#0052CC',
  },
  content: {
    paddingVertical: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginHorizontal: 12,
    marginBottom: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollButton: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  yearDropdownButton: {
    backgroundColor: '#999999',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearDropdownText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  yearDropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 60,
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: '#0052CC',
    maxHeight: 250,
  },
  yearOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  yearOptionText: {
    color: '#1A1A1A',
    fontSize: 14,
  },
  pastLeadersContainer: {
    marginHorizontal: 12,
    marginTop: 16,
    gap: 12,
  },
  leaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  leaderPosition: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  leaderYear: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
  },
  feedContainer: {
    marginTop: 16,
  },
});

