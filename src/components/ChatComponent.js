// ChatComponent.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Animated, Easing, TextInput, Alert, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';

const ChatComponent = ({ headerTitle, headerColor }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const flatListRef = useRef(null);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: Date.now(), text: inputText, time: getCurrentTime() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      setIsSendButtonDisabled(true);

      // Fade in animation for the new message
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      // Scroll to the bottom when new messages are added
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handlePressClose = () => {
    Alert.alert(
      'Exit Chat',
      'Are you sure you want to exit the chat?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Handle close action, clear messages, etc.
            setMessages([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderMessageItem = ({ item, index }) => {
    const isCurrentUser = index % 2 === 0;

    return (
      <Animated.View style={[styles.messageContainer, { justifyContent: isCurrentUser ? 'flex-start' : 'flex-end' }]}>
        <View style={[styles.messageBubble, { backgroundColor: isCurrentUser ? '#ecf0f1' : '#3498db' }]}>
          <Text style={[styles.messageText, { color: isCurrentUser ? '#333' : 'white' }]}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </Animated.View>
    );
  };

  const handleInputChange = (text) => {
    setInputText(text);
    setIsSendButtonDisabled(text.trim() === '');
  };

  useEffect(() => {
    // Reset fadeIn value on component mount
    fadeIn.setValue(0);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);


  useEffect(() => {
    // Subscribe to keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current.scrollToEnd({ animated: true });
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      flatListRef.current.scrollToEnd({ animated: true });
    });

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={[styles.header, { backgroundColor: headerColor || '#3498db', elevation: 4 }]}>
          <Text style={styles.headerTitle}>{headerTitle || 'Chat Title'}</Text>
          <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        {/* List View */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessageItem}
        />
        {/* Input Section */}
        <View behavior="padding" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={handleInputChange}
            placeholderTextColor="#888"
            disabled={isSendButtonDisabled}
          />
          <TouchableOpacity onPress={sendMessage} style={[styles.sendButton, { backgroundColor: isSendButtonDisabled ? '#ccc' : '#3498db' }]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageBubble: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '70%', // Adjust the maximum width as needed
  },
  messageTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default ChatComponent;