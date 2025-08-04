import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constant/colors';

const MembersCard = ({ name, mobile, image, role, fatherName, onDownload }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${mobile}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subText}>Father's Name: {fatherName}</Text>
          <Text style={styles.subText}>Role: {role}</Text>
          <Text style={styles.subText}>Mobile: {mobile}</Text>
        </View>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.iconBtn} onPress={handleCall}>
          <FontAwesome name="phone" size={20} color={colors.cardBackground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onDownload}>
          <AntDesign name="download" size={20} color={colors.cardBackground} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MembersCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: colors.headingText,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.headingText,
  },
  subText: {
    fontSize: 14,
    color: '#6e4a37',
    marginTop: 2,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  iconBtn: {
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
});
