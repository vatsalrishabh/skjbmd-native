import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function ReceiptPage() {
  const { rzpPaymentId } = useLocalSearchParams();
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rzpPaymentId) {
      fetchReceipt(rzpPaymentId);
    }
  }, [rzpPaymentId]);

const fetchReceipt = async (paymentId) => {
  try {
    const url = paymentId
      ? `${process.env.EXPO_PUBLIC_BASE_URL}api/donations/donationReceipt/${paymentId}`
      : `${process.env.EXPO_PUBLIC_BASE_URL}api/donations/donationReceipt`;

    const response = await axios.get(url);
    setReceiptData(response.data.payment);
  } catch (error) {
    console.error('Failed to fetch receipt:', error);
  } finally {
    setLoading(false);
  }
};



  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>रसीद लोड हो रही है...</Text>
      </View>
    );
  }

  if (!receiptData) {
    return (
      <View style={styles.center}>
        <Text>रसीद नहीं मिली।</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>भुगतान रसीद</Text>
      <Text>भुगतान आईडी: {receiptData.id}</Text>
      <Text>राशि: ₹{receiptData.amount / 100}</Text>
      <Text>स्थिति: {receiptData.status}</Text>
      <Text>ईमेल: {receiptData.email}</Text>
      <Text>संपर्क: {receiptData.contact}</Text>
      <Text>दिनांक: {new Date(receiptData.created_at * 1000).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
