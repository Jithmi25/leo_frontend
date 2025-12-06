import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Users, Trophy, ShoppingBag } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SuperAdminHomeScreen() {
  const handleNavigate = (screen: string) => {
    console.log('Navigate to:', screen);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Super Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage your platform</Text>
        </View>

        <View style={styles.content}>
          {/* Role Management */}
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shortcutGradient}>
            <TouchableOpacity
              style={styles.shortcutCard}
              onPress={() => handleNavigate('role-management')}>
              <View style={styles.iconContainer}>
                <Users color="#000000" size={40} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={styles.shortcutTitle}>Role Management</Text>
                <Text style={styles.shortcutDescription}>
                  Manage user roles and permissions
                </Text>
              </View>
              <ChevronRight color="#000000" size={24} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Leaderboard */}
          <LinearGradient
            colors={['#6B7FFF', '#4A5568']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shortcutGradient}>
            <TouchableOpacity
              style={styles.shortcutCard}
              onPress={() => handleNavigate('leaderboard')}>
              <View style={styles.iconContainer}>
                <Trophy color="#FFFFFF" size={40} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={[styles.shortcutTitle, { color: '#FFFFFF' }]}>
                  Leaderboard
                </Text>
                <Text style={[styles.shortcutDescription, { color: '#E0E0E0' }]}>
                  View achievements and rankings
                </Text>
              </View>
              <ChevronRight color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Marketplace */}
          <LinearGradient
            colors={['#FF6B6B', '#FF8787']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shortcutGradient}>
            <TouchableOpacity
              style={styles.shortcutCard}
              onPress={() => handleNavigate('marketplace')}>
              <View style={styles.iconContainer}>
                <ShoppingBag color="#FFFFFF" size={40} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={[styles.shortcutTitle, { color: '#FFFFFF' }]}>
                  Marketplace
                </Text>
                <Text style={[styles.shortcutDescription, { color: '#E0E0E0' }]}>
                  View and manage product listings
                </Text>
              </View>
              <ChevronRight color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Stats Overview */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Active Users</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Total Products</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Pending Events</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>89</Text>
                <Text style={styles.statLabel}>Registrations</Text>
              </View>
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
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  shortcutGradient: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  shortcutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutContent: {
    flex: 1,
  },
  shortcutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  shortcutDescription: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  statsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    textAlign: 'center',
  },
});
