import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import colors from '../constant/colors'; // Assuming your theme colors are here

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    otherAmount: '',
  });

  const donationAmounts = [2000, 4000, 6000, 8000];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const amount = selectedAmount || formData.otherAmount;
    console.log({ ...formData, amount, anonymous });
    // send to backend API
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Text style={styles.subtitle}>दान की राशि चुनें</Text>

      <View style={styles.amountRow}>
        {donationAmounts.map(amount => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              selectedAmount === amount && styles.selectedAmount,
            ]}
            onPress={() => setSelectedAmount(amount)}
          >
            <Text
              style={[
                styles.amountText,
                selectedAmount === amount && styles.selectedAmountText,
              ]}
            >
              ₹ {amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="₹ Other Amount"
        placeholderTextColor={colors.placeholder}
        keyboardType="numeric"
        value={formData.otherAmount}
        onChangeText={value => {
          setSelectedAmount(null);
          handleInputChange('otherAmount', value);
        }}
      />

      <Text style={styles.quote}>
        "दानं हि परमं धर्मं यद् दत्तं तत् पुनर् भवेत्।" {"\n"}➝ दान ही परम धर्म है,
        जो दिया जाता है वह कई गुना होकर पुनः प्राप्त होता है।
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name *"
        placeholderTextColor={colors.placeholder}
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="mm/dd/yyyy"
        placeholderTextColor={colors.placeholder}
        value={formData.dob}
        onChangeText={value => handleInputChange('dob', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile *"
        placeholderTextColor={colors.placeholder}
        keyboardType="numeric"
        value={formData.mobile}
        onChangeText={value => handleInputChange('mobile', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor={colors.placeholder}
        value={formData.address}
        onChangeText={value => handleInputChange('address', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        placeholderTextColor={colors.placeholder}
        keyboardType="numeric"
        value={formData.pincode}
        onChangeText={value => handleInputChange('pincode', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor={colors.placeholder}
        value={formData.city}
        onChangeText={value => handleInputChange('city', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor={colors.placeholder}
        value={formData.state}
        onChangeText={value => handleInputChange('state', value)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Donate Anonymously</Text>
        <Switch
          trackColor={{ false: '#ccc', true: colors.button }}
          thumbColor={anonymous ? colors.button : '#fff'}
          value={anonymous}
          onValueChange={setAnonymous}
        />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Donate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: colors.cardBackground,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: colors.headingText,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: colors.headingText,
  },
  amountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  amountButton: {
    backgroundColor: '#f5f0ea',
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  selectedAmount: {
    backgroundColor: colors.button,
  },
  amountText: {
    color: '#5a4e3c',
    fontWeight: 'bold',
  },
  selectedAmountText: {
    color: colors.cardBackground,
  },
  input: {
    borderColor: '#d9cab8',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fffaf0',
    color: colors.headingText,
  },
  quote: {
    fontStyle: 'italic',
    color: '#7a6650',
    marginVertical: 10,
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: colors.headingText,
  },
  submitBtn: {
    backgroundColor: colors.button,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: colors.cardBackground,
    fontWeight: 'bold',
  },
});

export default DonationForm;
