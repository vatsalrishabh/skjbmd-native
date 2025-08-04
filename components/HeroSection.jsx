import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
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
  `श्री कृष्ण जन्मभूमि तथा श्री काशी विश्वनाथ सहित सभी सनातन के मंदिरों व प्रतीक चिन्हों को मुक्त कराना।`,
  `सभी मंदिरों को सरकारी नियंत्रण से मुक्त कराकर वैदिक बोर्ड का गठन करवाना।`,
  `भारत को हिंदू राष्ट्र घोषित कराना तथा हिंदू राष्ट्र का नया संविधान बनवाना।`,
  `ग्राम स्तर पर पुजारी नियुक्त करना, मंदिरों का जीर्णोद्धार करना और जहां मंदिर नहीं हैं वहां नए मंदिरों का निर्माण करना।`,
];

const HeroSection = () => {
  const navigation = useNavigation();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeInOutAnimation();
    startScaleAnimation();
    startLogoAnimation();
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

  const startScaleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startLogoAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleButtonPress = (action) => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    switch (action) {
      case 'donate':
        Alert.alert(
          'दान करें',
          'सनातन के उत्थान में योगदान करने के लिए तैयार हैं?',
          [
            { text: 'बाद में', style: 'cancel' },
            { text: 'हाँ, दान करें', onPress: () => navigation.navigate('donate') }
          ]
        );
        break;
      case 'member':
        Alert.alert(
          'सदस्य सूची',
          'हमारे सदस्यों को देखना चाहते हैं?',
          [
            { text: 'बाद में', style: 'cancel' },
            { text: 'हाँ, देखें', onPress: () => navigation.navigate('member') }
          ]
        );
        break;
      case 'chat':
        Alert.alert(
          'चैट करें',
          'समुदाय चैट में शामिल होना चाहते हैं?',
          [
            { text: 'बाद में', style: 'cancel' },
            { text: 'हाँ, जुड़ें', onPress: () => navigation.navigate('chat') }
          ]
        );
        break;
      case 'join':
        Alert.alert(
          'जुड़ें',
          'skjbmd.org पर जाना चाहते हैं?',
          [
            { text: 'बाद में', style: 'cancel' },
            { text: 'हाँ, जाएं', onPress: () => Linking.openURL('https://skjbmd.org') }
          ]
        );
        break;
    }
  };

  const spin = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground source={homebg} style={styles.background} resizeMode="cover">
      <Animated.View style={[styles.overlay, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.headerSection}>
          <Animated.View style={[styles.logoContainer, { transform: [{ rotate: spin }] }]}>
            <Ionicons name="shield-checkmark" size={40} color="#FFD700" />
          </Animated.View>
          <Text style={styles.title}>
            श्री कृष्ण जन्म भूमि मुक्ति दल{"\n"} में आपका स्वागत है!
          </Text>
        </View>

        <Text style={styles.subtitle}>
          सनातन के लिए संकल्पित लोगों के साथ जुड़ें।
        </Text>

        <TouchableOpacity 
          style={[styles.linkButton, isPressed && styles.linkButtonPressed]} 
          onPress={() => handleButtonPress('join')}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          activeOpacity={0.8}
        >
          <Ionicons name="globe" size={16} color="#FFD700" style={{ marginRight: 8 }} />
          <Text style={styles.linkText}>जुड़ने के लिए skjbmd.org पर जाएं</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          सनातन के उत्थान में और देवस्थलों को पुनः आक्रांताओ से मुक्त करा स्थापित कराने तथा सनातन के मूल गुरुकुल की स्थापना हेतु आप सभी से सहयोग की अपेक्षा इस गारन्टी के साथ कि आप का किया हुवा दान सनातन के उत्थान में अहम होगा।
        </Text>

        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => handleButtonPress('donate')}
              activeOpacity={0.8}
            >
              <Ionicons name="heart" size={20} color={colors.cardBackground} style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>🧧 दान करें</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.secondaryButtonsRow}>
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => handleButtonPress('member')}
              activeOpacity={0.8}
            >
              <Ionicons name="people" size={16} color={colors.cardBackground} style={{ marginRight: 6 }} />
              <Text style={styles.buttonText}>📜 सदस्य सूची</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => handleButtonPress('chat')}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubbles" size={16} color={colors.cardBackground} style={{ marginRight: 6 }} />
              <Text style={styles.buttonText}>💬 चैट करें</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mantraContainer}>
          <Text style={styles.mantraText}>
            जय श्री कृष्ण ✦ हर हर महादेव
          </Text>
        </View>
      </Animated.View>

      <View style={styles.marqueeContainer}>
        <Ionicons name="megaphone" size={16} color="#b22222" style={{ marginRight: 8 }} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: '100%',
    padding: 25,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  title: {
    fontSize: 28,
    color: colors.cardBackground,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.cardBackground,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 720,
    marginTop: 8,
    fontWeight: '600',
  },
  linkButton: {
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFD70033',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  linkButtonPressed: {
    backgroundColor: '#FFD70066',
    transform: [{ scale: 0.98 }],
  },
  linkText: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: colors.cardBackground,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 20,
    opacity: 0.9,
  },
  buttonContainer: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.button,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#ffffff22',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mantraContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  mantraText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  marqueeContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  marqueeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b22222',
    textAlign: 'center',
    flex: 1,
  },
});

export default HeroSection;
