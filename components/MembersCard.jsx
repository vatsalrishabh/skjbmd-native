import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../constant/colors';  // import your colors

const MembersCard = ({ name, mobile, image, role, pad, onDownload }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Role: {role}</Text>
        <Text style={styles.subText}>Mobile: {mobile}</Text>
        <Text style={styles.subText}>Pad: {pad}</Text>
      </View>
      <TouchableOpacity style={styles.downloadBtn} onPress={onDownload}>
        <AntDesign name="download" size={20} color={colors.cardBackground} />
      </TouchableOpacity>
    </View>
  );
};

export default MembersCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,  // #fffaf0 off-white beige
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.headingText,  // subtle maroon shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
    color: colors.headingText, // #870209 maroon
  },
  subText: {
    fontSize: 14,
    color: '#6e4a37', // warm brownish tone for subtext
    marginTop: 2,
  },
  downloadBtn: {
    backgroundColor: colors.button,  // your button maroon color #b64000 or similar
    padding: 10,
    borderRadius: 8,
  },
});
