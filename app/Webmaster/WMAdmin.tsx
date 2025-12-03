import React from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import ProfileCard from '@/components/AdminFeatureCard/ProfileCard';
import PostToFeedCard from '@/components/AdminFeatureCard/PostToFeedCard';
import LeaderRoleManagementCard from '@/components/AdminFeatureCard/LeaderRoleManagementCard';
import EventsCard from '@/components/AdminFeatureCard/EventsCard';
import CreatePollCard from '@/components/AdminFeatureCard/CreatePollCard';
import YouWereTaggedCard from '@/components/AdminFeatureCard/YouWereTaggedCard';
import LeaderboardCard from '@/components/AdminFeatureCard/LeaderBoardCard';
import ClubAnalysisChart from '@/components/Analysis/ClubAnalysisChart';
import PollAnalysisChart from '@/components/Analysis/PollAnalysisChart';
import PostImpressionChart from '@/components/Analysis/PostImpressionChart';
import PreviousPostCard from '@/components/Analysis/PreviousPostChart';


const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldAccent: '#D4A34E',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
  searchBg: '#1C1C1C',
  headerBg: '#FFFFFF',
  gradientStart: '#1C1C1C',
  gradientEnd: '#8B7355',
};

const logoImage = require('../../assets/images/logo.png');

const mockProfile = {
  name: 'Leo Amaala',
  surname: 'Fernando',
  profilePic: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  district: 'Leo District 306 D1',
  position: 'Webmaster',
  username: 'Ami',
};

const mockPostFeedStats = {
  title: 'LEO\'S VS EVERYBODY',
  status: 'Active Engagement',
  imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  likePercentage: 70,
  commentPercentage: 50,
};

const mockEventStats = {
  receivedCount: 135,
};

const mockPollStats = {
  title: 'Recent Poll Question',
  status: 'Active Voting',
  imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
  agreePercentage: 90,
  disagreePercentage: 10,
};

const mockTagNotifications = {
  postsCount: 11,
  messagesCount: 9,
};

const mockClubEngagementData = [
  { club: 1, lastWeek: 5, thisWeek: 4 },
  { club: 3, lastWeek: 7, thisWeek: 9 },
  { club: 5, lastWeek: 9, thisWeek: 10 },
  { club: 7, lastWeek: 7, thisWeek: 11 },
  { club: 9, lastWeek: 6, thisWeek: 10 },
  { club: 11, lastWeek: 5, thisWeek: 8 },
];

const mockPostImpressionData = [
  { title: 'Post 1', impressions: 1200 },
  { title: 'Post 2', impressions: 800 },
  { title: 'Post 3', impressions: 2500 },
  { title: 'Post 4', impressions: 1500 },
];

export default function AdminOverviewScreen() {

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={logoImage} 
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.appNameContainer}>
              <Text style={styles.appName}>LeoConnect</Text>
              <Text style={styles.appCountry}>SRI LANKA</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profileButton} activeOpacity={0.8} 
          onPress={() => router.push('/Profile/OwnProfile')} >
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              }}
              style={styles.profileImage}
              resizeMode="cover"
              
            />
          </TouchableOpacity>
        </View>


        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Overview</Text>
          <View style={styles.placeholder} />
        </View> */}

        <ProfileCard
          name={mockProfile.name}
          surname={mockProfile.surname}
          profilePic={mockProfile.profilePic}
          district={mockProfile.district}
          position={mockProfile.position}
          username={mockProfile.username}
        />

        <View style={styles.grid}>
          <View style={styles.gridItem}>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => router.push('/Webmaster/PostCreation')} 
  >
    <PostToFeedCard
      title={mockPostFeedStats.title}
      status={mockPostFeedStats.status}
      imageUrl={mockPostFeedStats.imageUrl}
      likePercentage={mockPostFeedStats.likePercentage}
      commentPercentage={mockPostFeedStats.commentPercentage}
    />
  </TouchableOpacity>
</View>

          <View style={styles.gridItem}>
            <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => router.push('/Webmaster/RoleManagement')} 
  >
            <LeaderRoleManagementCard />
            </TouchableOpacity>
          </View>



          <View style={styles.gridItem}>
            <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => router.push('/Webmaster/EventRegistration')} 
  >
            <EventsCard receivedCount={mockEventStats.receivedCount} />
            </TouchableOpacity>
          </View>

          <View style={styles.gridItem}>
            <CreatePollCard
              title={mockPollStats.title}
              status={mockPollStats.status}
              imageUrl={mockPollStats.imageUrl}
              agreePercentage={mockPollStats.agreePercentage}
              disagreePercentage={mockPollStats.disagreePercentage}
            />
          </View>

          <View style={styles.gridItem}>
            <YouWereTaggedCard
              postsCount={mockTagNotifications.postsCount}
              messagesCount={mockTagNotifications.messagesCount}
            />
          </View>

          <View style={styles.gridItem}>
            <LeaderboardCard />
          </View>
        </View>

        <ClubAnalysisChart data={mockClubEngagementData} />

        <PollAnalysisChart
          agreePercentage={68}
          disagreePercentage={32}
        />

        <PostImpressionChart data={mockPostImpressionData} />

        <PreviousPostCard
          title={mockPostFeedStats.title}
          status={mockPostFeedStats.status}
          imageUrl={mockPostFeedStats.imageUrl}
          likePercentage={mockPostFeedStats.likePercentage}
          commentPercentage={mockPostFeedStats.commentPercentage}
          onPrevious={() => console.log('Previous')}
          onNext={() => console.log('Next')}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  appNameContainer: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  appCountry: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.goldAccent,
    letterSpacing: 1,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.goldAccent,
  },




  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  gridItem: {
    width: '48%',
  },
  bottomPadding: {
    height: 80,
  },
});
