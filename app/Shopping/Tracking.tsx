import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle2, Circle, Package, Truck, Home } from 'lucide-react-native';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C',
  goldDark: '#B8860B',
  darkText: '#000000',
  greyText: '#999999',
  lightGrey: '#F5F5F5',
  borderGrey: '#E0E0E0',
  success: '#4CAF50',
};

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  icon: 'package' | 'truck' | 'home';
}

const TRACKING_DATA: Record<string, TrackingStep[]> = {
  '1': [
    {
      id: '1',
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Nov 25, 2024',
      time: '10:30 AM',
      completed: true,
      icon: 'package',
    },
    {
      id: '2',
      title: 'Order Packed',
      description: 'Your items have been packed',
      date: 'Nov 25, 2024',
      time: '2:15 PM',
      completed: true,
      icon: 'package',
    },
    {
      id: '3',
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      date: 'Nov 27, 2024',
      time: '8:00 AM',
      completed: true,
      icon: 'truck',
    },
    {
      id: '4',
      title: 'Delivered',
      description: 'Expected delivery today',
      date: 'Nov 27, 2024',
      time: 'Est. 5:00 PM',
      completed: false,
      icon: 'home',
    },
  ],
  '2': [
    {
      id: '1',
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Nov 20, 2024',
      time: '11:20 AM',
      completed: true,
      icon: 'package',
    },
    {
      id: '2',
      title: 'Order Packed',
      description: 'Your items have been packed',
      date: 'Nov 20, 2024',
      time: '3:45 PM',
      completed: true,
      icon: 'package',
    },
    {
      id: '3',
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      date: 'Nov 22, 2024',
      time: '9:15 AM',
      completed: true,
      icon: 'truck',
    },
    {
      id: '4',
      title: 'Delivered',
      description: 'Package delivered successfully',
      date: 'Nov 22, 2024',
      time: '4:30 PM',
      completed: true,
      icon: 'home',
    },
  ],
  '3': [
    {
      id: '1',
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Nov 15, 2024',
      time: '9:45 AM',
      completed: true,
      icon: 'package',
    },
    {
      id: '2',
      title: 'Order Packed',
      description: 'Preparing your items',
      date: 'Est. Nov 28, 2024',
      time: 'Pending',
      completed: false,
      icon: 'package',
    },
    {
      id: '3',
      title: 'Out for Delivery',
      description: 'Waiting for shipment',
      date: 'Est. Nov 29, 2024',
      time: 'Pending',
      completed: false,
      icon: 'truck',
    },
    {
      id: '4',
      title: 'Delivered',
      description: 'Estimated delivery',
      date: 'Est. Nov 30, 2024',
      time: 'Pending',
      completed: false,
      icon: 'home',
    },
  ],
};

export default function TrackStatusScreen() {
  const params = useLocalSearchParams();
  const orderId = params.orderId as string || '1';
  const trackingSteps = TRACKING_DATA[orderId] || TRACKING_DATA['1'];

  const getIcon = (iconType: string, completed: boolean) => {
    const color = completed ? COLORS.success : COLORS.greyText;
    const size = 24;

    switch (iconType) {
      case 'package':
        return <Package size={size} color={color} />;
      case 'truck':
        return <Truck size={size} color={color} />;
      case 'home':
        return <Home size={size} color={color} />;
      default:
        return <Circle size={size} color={color} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.orderInfoCard}>
          <Text style={styles.orderNumber}>Order #LN202400{orderId}</Text>
          <Text style={styles.estimatedDelivery}>
            Estimated Delivery: {trackingSteps[trackingSteps.length - 1].date}
          </Text>
        </View>

        <View style={styles.trackingContainer}>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={styles.trackingStep}>
              <View style={styles.timelineContainer}>
                <View
                  style={[
                    styles.iconCircle,
                    step.completed && styles.iconCircleCompleted,
                  ]}
                >
                  {getIcon(step.icon, step.completed)}
                </View>
                {index < trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.completed && styles.timelineLineCompleted,
                    ]}
                  />
                )}
              </View>

              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.completed && styles.stepTitleCompleted,
                    ]}
                  >
                    {step.title}
                  </Text>
                  {step.completed && (
                    <CheckCircle2 size={20} color={COLORS.success} />
                  )}
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
                <View style={styles.stepDateTime}>
                  <Text style={styles.stepDate}>{step.date}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportDescription}>
            Contact our support team for any questions about your order
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGrey,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  orderInfoCard: {
    backgroundColor: COLORS.lightGrey,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 8,
  },
  estimatedDelivery: {
    fontSize: 14,
    color: COLORS.greyText,
  },
  trackingContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.borderGrey,
  },
  iconCircleCompleted: {
    backgroundColor: '#E8F5E9',
    borderColor: COLORS.success,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.borderGrey,
    marginTop: 4,
    marginBottom: 4,
  },
  timelineLineCompleted: {
    backgroundColor: COLORS.success,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.greyText,
  },
  stepTitleCompleted: {
    color: COLORS.darkText,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.greyText,
    marginBottom: 8,
  },
  stepDateTime: {
    flexDirection: 'row',
    gap: 12,
  },
  stepDate: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkText,
  },
  stepTime: {
    fontSize: 13,
    color: COLORS.greyText,
  },
  supportCard: {
    backgroundColor: COLORS.lightGrey,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 14,
    color: COLORS.greyText,
    textAlign: 'center',
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: COLORS.goldMid,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkText,
  },
});
