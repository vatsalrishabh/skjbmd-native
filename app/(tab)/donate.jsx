import React from 'react';
import { SafeAreaView } from 'react-native';
import DonationForm from '../../components/DonationForm';

const Donate = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DonationForm />
    </SafeAreaView>
  );
};

export default Donate;
