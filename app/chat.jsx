import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GoogleLogin from '../components/GoogleLogin';

const colors = {
  button: '#fe6601',
  headingText: '#870209',
  appBackground: '#ead6a6',
  cardBackground: '#fffaf0',
  footerBackground: '#101828',
  placeholder: '#870209',
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello there!' },
    { id: '2', text: 'Hi! How are you?' },
    // ... more messages ...
    { id: '18', text: 'hello' },
  ]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: String(Date.now()), text: inputText.trim() },
    ]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <GoogleLogin
        open={!loggedIn}
        title="Please Log In"
        onClose={() => setLoggedIn(true)}
      >
        <Text>You must be logged in to chat.</Text>
      </GoogleLogin>

      {loggedIn && (
        <>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.placeholder}
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  chatContainer: {
    padding: 10,
    backgroundColor: colors.cardBackground,
    flexGrow: 1,
  },
  messageBubble: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: colors.headingText,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.footerBackground,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    color: colors.headingText,
  },
  sendBtn: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.button,
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
