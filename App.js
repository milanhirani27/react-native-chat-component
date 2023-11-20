import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ChatComponent from './src/components/ChatComponent';

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatComponent headerTitle="Chat Room" headerColor="#3498db"/>
    </SafeAreaView>
  );
};

export default App;