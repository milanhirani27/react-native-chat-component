import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ChatComponent from './src/components/ChatComponent';

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatComponent />
    </SafeAreaView>
  );
};

export default App;