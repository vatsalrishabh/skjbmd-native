import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GoogleLogin = ({
  open,
  title = 'Login Required',
  onLogin,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const backendURL = process.env.EXPO_PUBLIC_BASE_URL 

  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name.trim());
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async () => {
    if (!isValidName(name)) {
      Alert.alert('Invalid Name', 'Name should contain only letters and spaces.');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be exactly 10 digits.');
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/download/smartPhoneChat `, {
        name,
        phone,
      });

      if (response.status === 200) {
        setFieldsDisabled(true);
        setShowOtpInput(true);
        Alert.alert('OTP Sent', 'A 6-digit OTP has been sent to your phone.');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sending OTP.');
    }
  };

  const handleConfirmOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      Alert.alert('Invalid OTP', 'OTP must be a 6-digit number.');
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/download/verifyOtpSmartphoneChat`, {
        name,
        mobile: phone,
        otp,
      });

      if (response.status === 200) {
        const jwt = response.data.jwt;
        // Save to local storage (if AsyncStorage is used in React Native)
        // await AsyncStorage.setItem('token', jwt);
        onLogin({ name, phone, jwt });

        // Reset form
        setName('');
        setPhone('');
        setOtp('');
        setShowOtpInput(false);
        setFieldsDisabled(false);
      } else {
        Alert.alert('Invalid OTP', 'Verification failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP.');
    }
  };

  if (!open) return null;

  return (
    <Modal transparent visible={open} animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
              editable={!fieldsDisabled}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!fieldsDisabled}
              maxLength={10}
            />

            {!showOtpInput && (
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}

            {showOtpInput && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#aaa"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
                />
                <TouchableOpacity style={styles.submitBtn} onPress={handleConfirmOtp}>
                  <Text style={styles.submitText}>Confirm OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  box: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#870209',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#222',
  },
  submitBtn: {
    backgroundColor: '#fe6601',
    paddingVertical: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#870209',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default GoogleLogin;
