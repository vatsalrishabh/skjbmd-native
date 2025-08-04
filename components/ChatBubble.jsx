import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, sender = 'other' }) => {
  const isUser = sender === 'user';

  return (
    <View style={[styles.bubbleContainer, isUser ? styles.alignRight : styles.alignLeft]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#4E73DF',
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ChatBubble;
