import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { StyleSheet, View } from 'react-native';
import colors from '../constant/colors';

const HeroTwo = () => {
  const navigation = useNavigation();

  const handleDonatePress = () => {
    navigation.navigate('donate'); // Make sure 'Donate' is the correct route name
  };

  return (
    <View style={styles.container}>
    
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
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

export default HeroTwo;
