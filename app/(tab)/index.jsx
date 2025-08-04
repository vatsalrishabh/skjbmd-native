import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeroSection from '../../components/HeroSection';
import colors from '../../constant/colors';

const { width } = Dimensions.get('window');

const FeatureCard = ({ icon, title, description, onPress, color = colors.button, badge }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
      {badge && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.placeholder} />
  </TouchableOpacity>
);

const QuickAction = ({ icon, title, onPress, color = colors.button }) => (
  <TouchableOpacity style={[styles.quickAction, { backgroundColor: color + '15' }]} onPress={onPress}>
    <Ionicons name={icon} size={28} color={color} />
    <Text style={[styles.quickActionText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleFeaturePress = (feature) => {
    switch (feature) {
      case 'donate':
        Alert.alert('दान', 'दान करने के लिए तैयार हैं?', [
          { text: 'नहीं', style: 'cancel' },
          { text: 'हाँ', onPress: () => console.log('Navigate to donate') }
        ]);
        break;
      case 'members':
        Alert.alert('सदस्य सूची', 'सदस्य सूची देखने के लिए तैयार हैं?', [
          { text: 'नहीं', style: 'cancel' },
          { text: 'हाँ', onPress: () => console.log('Navigate to members') }
        ]);
        break;
      case 'chat':
        Alert.alert('चैट', 'समुदाय चैट में शामिल होने के लिए तैयार हैं?', [
          { text: 'नहीं', style: 'cancel' },
          { text: 'हाँ', onPress: () => console.log('Navigate to chat') }
        ]);
        break;
      default:
        Alert.alert('सूचना', `${feature} सुविधा जल्द ही उपलब्ध होगी!`);
    }
  };

  const handleQuickAction = (action) => {
    Alert.alert('त्वरित कार्य', `${action} कार्य शुरू किया गया!`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeroSection />

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>त्वरित कार्य</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="notifications"
            title="सूचनाएं"
            onPress={() => handleQuickAction('notifications')}
            color="#e74c3c"
          />
          <QuickAction
            icon="calendar"
            title="कार्यक्रम"
            onPress={() => handleQuickAction('events')}
            color="#3498db"
          />
          <QuickAction
            icon="book"
            title="शिक्षा"
            onPress={() => handleQuickAction('education')}
            color="#2ecc71"
          />
          <QuickAction
            icon="settings"
            title="सेटिंग्स"
            onPress={() => handleQuickAction('settings')}
            color="#f39c12"
          />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>हमारे कार्यक्रम</Text>
        
        <FeatureCard
          icon="heart"
          title="दान करें"
          description="सनातन के उत्थान में योगदान करें"
          onPress={() => handleFeaturePress('donate')}
          color="#e74c3c"
          badge="नया"
        />
        
        <FeatureCard
          icon="people"
          title="सदस्य सूची"
          description="हमारे सदस्यों को देखें"
          onPress={() => handleFeaturePress('members')}
          color="#3498db"
          badge="लोकप्रिय"
        />
        
        <FeatureCard
          icon="chatbubbles"
          title="चैट करें"
          description="समुदाय से जुड़ें"
          onPress={() => handleFeaturePress('chat')}
          color="#2ecc71"
        />
        
        <FeatureCard
          icon="calendar"
          title="कार्यक्रम"
          description="आगामी कार्यक्रम देखें"
          onPress={() => handleFeaturePress('events')}
          color="#f39c12"
        />
        
        <FeatureCard
          icon="library"
          title="शिक्षा"
          description="सनातन शिक्षा सामग्री"
          onPress={() => handleFeaturePress('education')}
          color="#9b59b6"
        />
        
        <FeatureCard
          icon="settings"
          title="सेटिंग्स"
          description="अपनी प्राथमिकताएं"
          onPress={() => handleFeaturePress('settings')}
          color="#34495e"
        />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>हमारी उपलब्धियां</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={32} color="#e74c3c" />
            <Text style={styles.statNumber}>1,250+</Text>
            <Text style={styles.statLabel}>सदस्य</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="heart" size={32} color="#2ecc71" />
            <Text style={styles.statNumber}>₹5.2L+</Text>
            <Text style={styles.statLabel}>दान</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="location" size={32} color="#3498db" />
            <Text style={styles.statNumber}>25+</Text>
            <Text style={styles.statLabel}>शहर</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          जय श्री कृष्ण ✦ हर हर महादेव
        </Text>
        <Text style={styles.footerSubtext}>
          सनातन के उत्थान के लिए समर्पित
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  quickActionsContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  cardsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headingText,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  quickAction: {
    width: (width - 60) / 4,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.headingText,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.placeholder,
    lineHeight: 20,
  },
  statsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.headingText,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.placeholder,
    marginTop: 4,
  },
  footer: {
    backgroundColor: colors.footerBackground,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: colors.cardBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerSubtext: {
    color: colors.cardBackground,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
});

export default Home;
