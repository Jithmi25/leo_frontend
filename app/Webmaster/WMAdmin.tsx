// import React, { useState } from 'react';
// import { router } from 'expo-router';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     StatusBar,
//     SafeAreaView,
//     Image,
//     ScrollView,
//     Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

// const COLORS = {
//     black: '#000000',
//     white: '#FFFFFF',
//     goldMid: '#FFC72C',
//     goldDark: '#B8860B',
//     brownDark: '#3D3A2E',
//     darkText: '#000000',
//     greyText: '#666666',
//     lightGrey: '#F5F5F5',
//     borderGrey: '#E0E0E0',
//     chartBlue: '#4A90E2',
//     chartGrey: '#D0D0D0',
// };

// const PROFILE_AVATAR = 'https://placehold.co/80x80/4A5568/FFF?text=AF';
// const screenWidth = Dimensions.get('window').width;

// export default function WMAdminScreen() {
//     const [chartView, setChartView] = useState('this_week');

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Admin Overview</Text>
//             </View>

//             <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//                 {/* Profile Card */}
//                 <LinearGradient
//                     colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.profileCard}
//                 >
//                     <View style={styles.profileInfo}>
//                         <Text style={styles.profileName}>Leo Amaala{'\n'}Fernando</Text>
//                         <Text style={styles.profileRole}>Webmaster</Text>
//                         <Text style={styles.profileDistrict}>Leo District 306 D1</Text>
//                     </View>
//                     <View style={styles.profileAvatarContainer}>
//                         <Image source={{ uri: PROFILE_AVATAR }} style={styles.profileAvatar} />
//                         <TouchableOpacity style={styles.editButton}>
//                             <Text style={styles.editButtonText}>Edit</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </LinearGradient>

//                 {/* Quick Actions Grid */}
//                 <View style={styles.quickActionsGrid}>
//                     <TouchableOpacity style={styles.actionCard}>
//                         <View style={styles.actionHeader}>
//                             <Text style={styles.actionTitle}>Post to Feed</Text>
//                             <Ionicons name="arrow-forward" size={20} color={COLORS.goldMid} />
//                         </View>
//                         <View style={styles.postPreview}>
//                             <Text style={styles.previewLabel}>Previous Post</Text>
//                             <View style={styles.leoBadge}>
//                                 <Text style={styles.leoBadgeText}>LEO'S</Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.actionCard}>
//                         <Text style={styles.actionTitle}>Leader Role{'\n'}Management</Text>
//                         <Image
//                             source={{ uri: 'https://placehold.co/60x60/4A5568/FFF?text=LDR' }}
//                             style={styles.actionIcon}
//                         />
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.actionCard}>
//                         <View style={styles.actionHeader}>
//                             <Text style={styles.actionTitle}>Events &{'\n'}RSVP</Text>
//                             <Ionicons name="arrow-forward" size={20} color={COLORS.goldMid} />
//                         </View>
//                         <View style={styles.eventPreview}>
//                             <Text style={styles.previewLabel}>Recent Event</Text>
//                             <Text style={styles.eventName}>Webinar</Text>
//                             <Text style={styles.eventDetail}>Presentation</Text>
//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.actionCardDark}>
//                         <Text style={styles.actionTitleWhite}>Create a New Poll</Text>
//                         <View style={styles.pollPreview}>
//                             <Text style={styles.previewLabelWhite}>Previous Poll</Text>
//                             <Text style={styles.pollQuestion}>Are we ready</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Activity Log */}
//                 <TouchableOpacity style={styles.activityCard}>
//                     <View style={styles.activityContent}>
//                         <View>
//                             <Text style={styles.activityTitle}>You were Logged in</Text>
//                             <Text style={styles.activityTime}>3 minutes ago</Text>
//                             <Text style={styles.activityLocation}>8 storehouse in Dehiwala</Text>
//                         </View>
//                         <Ionicons name="arrow-forward" size={24} color={COLORS.goldMid} />
//                     </View>
//                 </TouchableOpacity>

//                 {/* Leaderboard & Achievements */}
//                 <TouchableOpacity style={styles.leaderboardCard}>
//                     <Ionicons name="trophy" size={40} color={COLORS.goldMid} />
//                     <Text style={styles.leaderboardText}>Leaderboard &{'\n'}Achievements</Text>
//                 </TouchableOpacity>

//                 {/* Club Analysis */}
//                 <View style={styles.analysisSection}>
//                     <View style={styles.analysisSectionHeader}>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                         <Text style={styles.sectionTitle}>Club Analysis</Text>
//                         <Text style={styles.weekSelector}>This Week</Text>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.chartContainer}>
//                         {/* Placeholder for line chart */}
//                         <View style={styles.lineChart}>
//                             <Text style={styles.chartPlaceholder}>📈 Activity Chart</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Poll Analysis */}
//                 <View style={styles.analysisSection}>
//                     <View style={styles.analysisSectionHeader}>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                         <Text style={styles.sectionTitle}>Poll Analysis</Text>
//                         <Text style={styles.weekSelector}>This Week</Text>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.chartContainer}>
//                         {/* Placeholder for donut chart */}
//                         <View style={styles.donutChart}>
//                             <View style={styles.donutOuter}>
//                                 <View style={styles.donutInner} />
//                             </View>
//                             <View style={styles.chartLegend}>
//                                 <View style={styles.legendItem}>
//                                     <View style={[styles.legendDot, { backgroundColor: COLORS.goldMid }]} />
//                                     <Text style={styles.legendText}>Survey said</Text>
//                                 </View>
//                                 <View style={styles.legendItem}>
//                                     <View style={[styles.legendDot, { backgroundColor: COLORS.chartGrey }]} />
//                                     <Text style={styles.legendText}>Pending yet</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Post Impression Overview */}
//                 <View style={styles.analysisSection}>
//                     <View style={styles.analysisSectionHeader}>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                         <Text style={styles.sectionTitle}>Post Impression Overview</Text>
//                         <Text style={styles.weekSelector}>This Week</Text>
//                         <TouchableOpacity>
//                             <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.chartContainer}>
//                         {/* Placeholder for bar chart */}
//                         <View style={styles.barChart}>
//                             <View style={styles.bars}>
//                                 <View style={[styles.bar, { height: 40, backgroundColor: COLORS.chartGrey }]} />
//                                 <View style={[styles.bar, { height: 80, backgroundColor: COLORS.goldMid }]} />
//                                 <View style={[styles.bar, { height: 100, backgroundColor: COLORS.black }]} />
//                                 <View style={[styles.bar, { height: 60, backgroundColor: COLORS.chartGrey }]} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Post Navigation */}
//                 <View style={styles.postNavigation}>
//                     <TouchableOpacity style={styles.navButton}>
//                         <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
//                         <View style={styles.navButtonContent}>
//                             <Text style={styles.navButtonLabel}>Previous{'\n'}Post</Text>
//                             <View style={styles.navPostPreview}>
//                                 <View style={styles.leoBadgeSmall}>
//                                     <Text style={styles.leoBadgeTextSmall}>LEO'S</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.navButton}>
//                         <View style={styles.navButtonContent}>
//                             <Text style={[styles.navButtonLabel, { textAlign: 'right' }]}>
//                                 Next{'\n'}Post
//                             </Text>
//                         </View>
//                         <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{ height: 40 }} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         gap: 12,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: COLORS.darkText,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     profileCard: {
//         margin: 16,
//         borderRadius: 16,
//         padding: 20,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     profileInfo: {
//         flex: 1,
//     },
//     profileName: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: COLORS.white,
//         marginBottom: 8,
//     },
//     profileRole: {
//         fontSize: 14,
//         color: COLORS.white,
//         marginBottom: 4,
//     },
//     profileDistrict: {
//         fontSize: 12,
//         color: COLORS.lightGrey,
//     },
//     profileAvatarContainer: {
//         alignItems: 'center',
//     },
//     profileAvatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         marginBottom: 8,
//     },
//     editButton: {
//         backgroundColor: COLORS.goldMid,
//         paddingHorizontal: 16,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     editButtonText: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: COLORS.darkText,
//     },
//     quickActionsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         paddingHorizontal: 16,
//         gap: 12,
//     },
//     actionCard: {
//         width: (screenWidth - 44) / 2,
//         backgroundColor: COLORS.white,
//         borderRadius: 12,
//         padding: 16,
//         borderWidth: 1,
//         borderColor: COLORS.borderGrey,
//         minHeight: 120,
//     },
//     actionCardDark: {
//         width: (screenWidth - 44) / 2,
//         backgroundColor: COLORS.black,
//         borderRadius: 12,
//         padding: 16,
//         minHeight: 120,
//     },
//     actionHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: 8,
//     },
//     actionTitle: {
//         fontSize: 13,
//         fontWeight: '600',
//         color: COLORS.darkText,
//         flex: 1,
//     },
//     actionTitleWhite: {
//         fontSize: 13,
//         fontWeight: '600',
//         color: COLORS.white,
//         marginBottom: 8,
//     },
//     actionIcon: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginTop: 8,
//     },
//     postPreview: {
//         marginTop: 8,
//     },
//     previewLabel: {
//         fontSize: 10,
//         color: COLORS.greyText,
//         marginBottom: 4,
//     },
//     previewLabelWhite: {
//         fontSize: 10,
//         color: COLORS.lightGrey,
//         marginBottom: 4,
//     },
//     leoBadge: {
//         backgroundColor: COLORS.goldMid,
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 6,
//         alignSelf: 'flex-start',
//     },
//     leoBadgeText: {
//         fontSize: 11,
//         fontWeight: '700',
//         color: COLORS.black,
//     },
//     eventPreview: {
//         marginTop: 8,
//     },
//     eventName: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: COLORS.darkText,
//     },
//     eventDetail: {
//         fontSize: 11,
//         color: COLORS.greyText,
//     },
//     pollPreview: {
//         marginTop: 8,
//     },
//     pollQuestion: {
//         fontSize: 11,
//         color: COLORS.white,
//     },
//     activityCard: {
//         margin: 16,
//         marginTop: 8,
//         backgroundColor: COLORS.black,
//         borderRadius: 12,
//         padding: 16,
//     },
//     activityContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     activityTitle: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: COLORS.white,
//         marginBottom: 4,
//     },
//     activityTime: {
//         fontSize: 12,
//         color: COLORS.lightGrey,
//         marginBottom: 2,
//     },
//     activityLocation: {
//         fontSize: 11,
//         color: COLORS.greyText,
//     },
//     leaderboardCard: {
//         margin: 16,
//         marginTop: 8,
//         backgroundColor: COLORS.lightGrey,
//         borderRadius: 12,
//         padding: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 16,
//     },
//     leaderboardText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: COLORS.darkText,
//     },
//     analysisSection: {
//         marginHorizontal: 16,
//         marginBottom: 20,
//     },
//     analysisSectionHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 12,
//         gap: 8,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: COLORS.darkText,
//         flex: 1,
//     },
//     weekSelector: {
//         fontSize: 13,
//         color: COLORS.greyText,
//     },
//     chartContainer: {
//         backgroundColor: COLORS.white,
//         borderRadius: 12,
//         padding: 16,
//         borderWidth: 1,
//         borderColor: COLORS.borderGrey,
//     },
//     lineChart: {
//         height: 150,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     chartPlaceholder: {
//         fontSize: 24,
//         color: COLORS.greyText,
//     },
//     donutChart: {
//         alignItems: 'center',
//     },
//     donutOuter: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         backgroundColor: COLORS.goldMid,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     donutInner: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: COLORS.white,
//     },
//     chartLegend: {
//         flexDirection: 'row',
//         gap: 20,
//     },
//     legendItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6,
//     },
//     legendDot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//     },
//     legendText: {
//         fontSize: 12,
//         color: COLORS.greyText,
//     },
//     barChart: {
//         height: 120,
//         justifyContent: 'flex-end',
//     },
//     bars: {
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         justifyContent: 'space-around',
//         height: 100,
//     },
//     bar: {
//         width: 40,
//         borderRadius: 4,
//     },
//     postNavigation: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         gap: 12,
//     },
//     navButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.black,
//         borderRadius: 12,
//         padding: 12,
//         gap: 8,
//     },
//     navButtonContent: {
//         flex: 1,
//     },
//     navButtonLabel: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: COLORS.white,
//         marginBottom: 8,
//     },
//     navPostPreview: {
//         flexDirection: 'row',
//     },
//     leoBadgeSmall: {
//         backgroundColor: COLORS.goldMid,
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 4,
//     },
//     leoBadgeTextSmall: {
//         fontSize: 9,
//         fontWeight: '700',
//         color: COLORS.black,
//     },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
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

interface AdminProfile {
  name: string;
  surname: string;
  profile_pic: string;
  district: string;
  position: string;
  username: string;
}

interface PostFeedStats {
  title: string;
  status: string;
  image_url: string;
  like_percentage: number;
  comment_percentage: number;
}

interface EventStats {
  received_registrations: number;
}

interface PollStats {
  title: string;
  status: string;
  image_url: string;
  agree_percentage: number;
  disagree_percentage: number;
}

interface TagNotifications {
  posts_count: number;
  messages_count: number;
}

export default function AdminOverviewScreen() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [postFeedStats, setPostFeedStats] = useState<PostFeedStats | null>(null);
  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [pollStats, setPollStats] = useState<PollStats | null>(null);
  const [tagNotifications, setTagNotifications] = useState<TagNotifications | null>(null);
  const [clubEngagementData, setClubEngagementData] = useState<any[]>([]);
  const [pollAnalysisData, setPollAnalysisData] = useState({ agree: 68, disagree: 32 });
  const [postImpressionData, setPostImpressionData] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch profile data
      const { data: profileData } = await supabase
        .from('admin_profiles')
        .select('*')
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch post feed stats
      const { data: postData } = await supabase
        .from('post_feed_stats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (postData) {
        setPostFeedStats(postData);
      }

      // Fetch event stats
      const { data: eventData } = await supabase
        .from('event_stats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (eventData) {
        setEventStats(eventData);
      }

      // Fetch poll stats
      const { data: pollData } = await supabase
        .from('poll_stats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (pollData) {
        setPollStats(pollData);
      }

      // Fetch tag notifications
      const { data: tagData } = await supabase
        .from('tag_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (tagData) {
        setTagNotifications(tagData);
      }

      // Fetch club engagement data
      const { data: clubData } = await supabase
        .from('club_engagement')
        .select('*')
        .order('club_number', { ascending: true });

      if (clubData) {
        const formattedClubData = processClubEngagementData(clubData);
        setClubEngagementData(formattedClubData);
      }

      // Fetch poll analysis
      const { data: pollAnalysis } = await supabase
        .from('poll_analysis')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (pollAnalysis) {
        setPollAnalysisData({
          agree: pollAnalysis.agree_percentage,
          disagree: pollAnalysis.disagree_percentage,
        });
      }

      // Fetch post impressions
      const { data: impressionData } = await supabase
        .from('post_impressions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (impressionData) {
        const formatted = impressionData.map(item => ({
          title: item.post_title,
          impressions: item.impression_count,
        }));
        setPostImpressionData(formatted);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const processClubEngagementData = (data: any[]) => {
    const clubs = [...new Set(data.map(item => item.club_number))];
    return clubs.map(club => {
      const lastWeek = data.find(
        item => item.club_number === club && item.week_type === 'last'
      );
      const thisWeek = data.find(
        item => item.club_number === club && item.week_type === 'this'
      );
      return {
        club,
        lastWeek: lastWeek?.engagement_value || 0,
        thisWeek: thisWeek?.engagement_value || 0,
      };
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Overview</Text>
          <View style={styles.placeholder} />
        </View>

        {profile && (
          <ProfileCard
            name={profile.name}
            surname={profile.surname}
            profilePic={profile.profile_pic}
            district={profile.district}
            position={profile.position}
            username={profile.username}
          />
        )}

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            {postFeedStats && (
              <PostToFeedCard
                title={postFeedStats.title}
                status={postFeedStats.status}
                imageUrl={postFeedStats.image_url}
                likePercentage={postFeedStats.like_percentage}
                commentPercentage={postFeedStats.comment_percentage}
              />
            )}
          </View>

          <View style={styles.gridItem}>
            <LeaderRoleManagementCard />
          </View>

          <View style={styles.gridItem}>
            {eventStats && (
              <EventsCard receivedCount={eventStats.received_registrations} />
            )}
          </View>

          <View style={styles.gridItem}>
            {pollStats && (
              <CreatePollCard
                title={pollStats.title}
                status={pollStats.status}
                imageUrl={pollStats.image_url}
                agreePercentage={pollStats.agree_percentage}
                disagreePercentage={pollStats.disagree_percentage}
              />
            )}
          </View>

          <View style={styles.gridItem}>
            {tagNotifications && (
              <YouWereTaggedCard
                postsCount={tagNotifications.posts_count}
                messagesCount={tagNotifications.messages_count}
              />
            )}
          </View>

          <View style={styles.gridItem}>
            <LeaderboardCard />
          </View>
        </View>

        {clubEngagementData.length > 0 && (
          <ClubAnalysisChart data={clubEngagementData} />
        )}

        <PollAnalysisChart
          agreePercentage={pollAnalysisData.agree}
          disagreePercentage={pollAnalysisData.disagree}
        />

        {postImpressionData.length > 0 && (
          <PostImpressionChart data={postImpressionData} />
        )}

        {postFeedStats && (
          <PreviousPostCard
            title={postFeedStats.title}
            status={postFeedStats.status}
            imageUrl={postFeedStats.image_url}
            likePercentage={postFeedStats.like_percentage}
            commentPercentage={postFeedStats.comment_percentage}
            onPrevious={() => console.log('Previous')}
            onNext={() => console.log('Next')}
          />
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
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
