import React from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'

class SideMenuScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', {user: 'User 1'})}
          title="User 1"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Chat', {user: 'User 2'})}
          title="User 2"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Chat', {user: 'User 3'})}
          title="User 3"
        />
      </SafeAreaView>
    );
  }

}

export default SideMenuScreen
