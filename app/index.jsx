import { ScrollView, StyleSheet, View } from 'react-native';
import HeroSection from '../components/HeroSection';
import colors from '../constant/colors';

const Home = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeroSection />

      <View style={styles.cardsContainer}>
        {/* Add your card components here */}
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

  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 1,
    // Use margin on children for spacing instead of `gap`
    // Example: Add marginBottom: 20 inside card components
  },
});

export default Home;
