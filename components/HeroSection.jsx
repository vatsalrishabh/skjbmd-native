import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import homebg from '../assets/images/homebg.jpg';
import colors from '../constant/colors';

const { height, width } = Dimensions.get('window');

const MARQUEE_PHRASES = [
  `श्री कृष्ण जन्म भूमि मुक्ति दल "अहिंसा परमो धर्म, धर्म हिंसा तथैव चः"`,
  `श्री कृष्ण जन्म भूमि मुक्ति दल का संकल्प: गौ हत्या पर पूर्ण प्रतिबंध कराना।`,
  `श्री कृषण जन्मभूमि तथा श्री काशी विश्वनाथ सहित सभी सनातन के मंदिरों व प्रतीक चिन्हों को मुक्त कराना।`,
  `सभी मंदिरों को सरकारी नियंत्रण से मुक्त कराकर वैदिक बोर्ड का गठन करवाना।`,
  `भारत को हिंदू राष्ट्र घोषित कराना तथा हिंदू राष्ट्र का नया संविधान बनवाना।`,
  `ग्राम स्तर पर पुजारी नियुक्त करना, मंदिरों का जीर्णोद्धार करना और जहां मंदिर नहीं हैं वहां नए मंदिरों का निर्माण करना।`,
];

const HeroSection = () => {
  const navigation = useNavigation();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeInOutAnimation();
  }, [phraseIndex]);

  const fadeInOutAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPhraseIndex((prev) => (prev + 1) % MARQUEE_PHRASES.length);
    });
  };

  const handleDonatePress = () => {
    navigation.navigate('donate');
  };

  const handleJoinPress = () => {
    Linking.openURL('https://skjbmd.org');
  };

  const handleMemberPress = () => {
    navigation.navigate('member');
  };

  const handleChatPress = () => {
    navigation.navigate('chat');
  };

  return (
    <ImageBackground source={homebg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>
          श्री कृष्ण जन्म भूमि मुक्ति दल{"\n"} में आपका स्वागत है!
        </Text>

        <Text style={styles.subtitle}>
          सनातन के लिए संकल्पित लोगों के साथ जुड़ें।
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={handleJoinPress}>
          <Text style={styles.linkText}>👉 जुड़ने के लिए skjbmd.org पर जाएं</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>
          सनातन के उत्थान में और देवस्थलों को पुनः आक्रांताओ से मुक्त करा स्थापित कराने तथा सनातन के मूल गुरुकुल की स्थापना हेतु आप सभी से सहयोग की अपेक्षा इस गारन्टी के साथ कि आप का किया हुवा दान सनातन के उत्थान में अहम होगा।{'\n\n'}
          जय श्री कृष्ण ✦ हर हर महादेव
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleDonatePress}>
            <Text style={styles.buttonText}>🧧 दान करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleMemberPress}>
            <Text style={styles.buttonText}>📜 सदस्य सूची</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleChatPress}>
            <Text style={styles.buttonText}>💬 चैट करें</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.marqueeContainer}>
        <Animated.Text style={[styles.marqueeText, { opacity: fadeAnim }]}>
          {MARQUEE_PHRASES[phraseIndex]}
        </Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    width: '100%',
    padding: 25,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.cardBackground,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.cardBackground,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 720,
    marginTop: 8,
  },
  linkButton: {
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFD70033',
  },
  linkText: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.button,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#ffffff22',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 8,
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  marqueeContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marqueeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b22222',
    textAlign: 'center',
  },
});

export default HeroSection;
