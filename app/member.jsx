import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TextInput, View } from 'react-native';
import MembersCard from '../components/MembersCard';
import colors from '../constant/colors';

const MemberScreen = () => {
  const [members, setMembers] = useState([]);         // fetched members
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);        // loader
  const [error, setError] = useState(null);            // error handling


    console.log(process.env.EXPO_PUBLIC_BASE_URL)
  const getAllMembers = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/admin/getAllDoctors`); // replace with real API
      console.log(response.data.data);
      setMembers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

const filteredMembers = members.filter(
  (m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.contact.includes(searchQuery)  // use contact instead of mobile
);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Members</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or mobile number"
        placeholderTextColor={colors.headingText + '99'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.headingText} />
      ) : error ? (
        <Text style={styles.noResult}>{error}</Text>
      ) : filteredMembers.length === 0 ? (
        <Text style={styles.noResult}>No members found</Text>
      ) : (
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
           <MembersCard
  name={item.name}
  mobile={item.contact}      // correct field name from API is contact
  image={`${process.env.EXPO_PUBLIC_BASE_URL}${item.dpUrl}`}  // combine base URL with dpUrl path
  role={item.role}
  fatherName={item.fatherName}             // If pad exists, else remove
  
   onDownload={() => {
    const url = 'https://www.skjbmd.org/';
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  }}
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
    backgroundColor: colors.appBackground,
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.headingText,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.headingText + 'cc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    color: colors.headingText,
  },
  noResult: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});
