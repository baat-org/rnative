import React from 'react';
import { Text, Button, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'

class ChatScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <Button
          onPress={() => this.props.navigation.toggleDrawer({
            side: 'right',
            animated: true,
            to: 'closed',
          })}
          title="Show Users"
        />
        <View>
          <Text>
            {this.props.navigation.getParam('user')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatScreen
