import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import colors from '../constant/colors'; // Make sure this exists and has required color values

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
     pan: '', 
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDate, setDobDate] = useState(null);

  const donationAmounts = [2000, 4000, 6000, 8000];

  console.log(process.env.EXPO_PUBLIC_BASE_URL)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      handleInputChange('dob', formattedDate);
    }
  };

  const handleSubmit = async () => {
    let amount = selectedAmount || formData.otherAmount;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter or select a valid donation amount.');
      return;
    }

    if (!formData.name.trim() && !anonymous) {
      Alert.alert('Missing Information', 'Please enter your Name or select "Donate Anonymously".');
      return;
    }

    if (!formData.mobile.trim()) {
      Alert.alert('Missing Information', 'Please enter your Mobile number.');
      return;
    }

    if (formData.mobile.trim().length !== 10 || isNaN(formData.mobile.trim())) {
      Alert.alert('Invalid Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (formData.pan.trim() && !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan.trim())) {
  Alert.alert('Invalid PAN', 'Please enter a valid PAN card number.');
  return;
}


    const rupeeAmount = Number(amount);
    const amountInPaise = rupeeAmount * 100;

    const prefillData = anonymous
      ? { email: formData.email, contact: formData.mobile }
      : { email: formData.email, contact: formData.mobile, name: formData.name };

    const key = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_l0gnUnaG8U4VmM';
    const backendURL = process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:3001';

    const options = {
      description: 'Donation towards cause',
      currency: 'INR',
      key,
      amount: amountInPaise.toString(),
      name: anonymous ? 'Anonymous Donor' : (formData.name || 'Donor'),
      prefill: prefillData,
      theme: { color: colors.button },
    };

    RazorpayCheckout.open(options)
      .then(async data => {
        Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);

        const donationData = {
          ...formData,
          amount: rupeeAmount,
          anonymous,
          paymentId: data.razorpay_payment_id,
        };

        try {
          const response = await axios.post(`${backendURL}/api/expoGo/paymentrzp`, donationData);
          console.log('Server response:', response.data);
        } catch (err) {
          console.error('Failed to send payment data to backend:', err.message);
        }

        setFormData({
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
        setSelectedAmount(null);
        setAnonymous(false);
        setDobDate(null);
      })
      .catch(error => {
        console.error('Razorpay Error:', error);
        Alert.alert('Payment Failed', `Error: ${error.description || error.code || error.message}`);
      });
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
            onPress={() => {
              setSelectedAmount(amount);
              handleInputChange('otherAmount', '');
            }}
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

      {!anonymous && (
        <TextInput
          style={styles.input}
          placeholder="Name *"
          placeholderTextColor={colors.placeholder}
          value={formData.name}
          onChangeText={value => handleInputChange('name', value)}
        />
      )}

      <TouchableOpacity
        style={[styles.input, { justifyContent: 'center' }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: formData.dob ? colors.headingText : colors.placeholder }}>
          {formData.dob || 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dobDate || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile *"
        placeholderTextColor={colors.placeholder}
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={value => handleInputChange('mobile', value)}
      />

      <TextInput
  style={styles.input}
  placeholder="PAN Card (ABCDE1234F)"
  placeholderTextColor={colors.placeholder}
  value={formData.pan}
  onChangeText={value => handleInputChange('pan', value.toUpperCase())}
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
          thumbColor={anonymous ? colors.button : (Platform.OS === 'android' ? '#f4f3f4' : '#fff')}
          value={anonymous}
          onValueChange={value => {
            setAnonymous(value);
            if (value) {
              handleInputChange('name', '');
            }
          }}
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
    color: '#5a4e4e',
    fontWeight: '600',
  },
  selectedAmountText: {
    color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    color: colors.headingText,
  },
  quote: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 15,
    color: colors.subText,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: colors.headingText,
  },
  submitBtn: {
    backgroundColor: colors.button,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DonationForm;