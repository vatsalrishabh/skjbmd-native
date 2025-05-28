import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import MembersCard from '../../components/MembersCard';
import colors from '../../constant/colors'; // your color constants

const members = [
  {
    id: '1',
    name: 'Rita Mehta',
    mobile: '9876543210',
    role: 'Principal',
    image: 'https://source.unsplash.com/100x100/?woman,teacher',
    pad: 'President',
  },
  {
    id: '2',
    name: 'Sneha Joshi',
    mobile: '9123456780',
    role: 'Coordinator',
    image: 'https://source.unsplash.com/100x100/?teacher',
    pad: 'Vice President',
  },
  {
    id: '3',
    name: 'Meena Shah',
    mobile: '9988776655',
    role: 'Faculty',
    image: 'https://source.unsplash.com/100x100/?professor',
    pad: 'Member',
  },
];

const MemberScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.mobile.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Members</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or mobile number"
        placeholderTextColor={colors.headingText + '99'} // slightly transparent heading text
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredMembers.length === 0 ? (
        <Text style={styles.noResult}>No members found</Text>
      ) : (
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MembersCard
              {...item}
              onDownload={() => console.log(`Download triggered for ${item.name}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,  // #ead6a6
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.headingText,  // #870209
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.headingText + 'cc',  // semi-transparent dark red border
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,  // #fffaf0
    color: colors.headingText,  // text color inside input
  },
  noResult: {
    textAlign: 'center',
    color: '#888', // keep this neutral for subtlety
    marginTop: 40,
  },
});
