import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import colors from '../../constant/colors';
import HeroSection from '../../components/HeroSection';

const Home = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeroSection />

      <View style={styles.cardsContainer}>
        {/* You can add card components or other sections here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    // fontFamily is not universally supported, usually set in Text styles
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30, // gap is not supported in RN, use margin instead on children
    marginTop: 40,
  },
});

export default Home;
