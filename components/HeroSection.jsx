import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import colors from '../constant/colors';

const HeroSection = () => {
  const navigation = useNavigation();

  const handleDonatePress = () => {
    navigation.navigate('donate'); // Make sure 'Donate' is the correct route name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>श्री कृष्ण जन्मभूमि मुक्ति दल</Text>
      <Text style={styles.subtitle}>
        भगवान श्रीकृष्ण की वास्तविक जन्मस्थली को उसके प्राचीन स्वरूप में पुनः स्थापित करने का सामजिक और धार्मिक अभियान
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleDonatePress}
      >
        <Text style={styles.buttonText}>दान करें</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headingText,
    paddingVertical: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 35,
    marginBottom: 15,
    color: colors.cardBackground,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    maxWidth: 700,
    color: colors.cardBackground,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.button,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HeroSection;
