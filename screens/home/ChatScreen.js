import React from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'

class ChatScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <Button
          onPress={() => this.props.navigation.navigate('Members')}
          title="Members"
        />
      </SafeAreaView>
    );
  }
}

export default ChatScreen
