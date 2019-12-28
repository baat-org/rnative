import React from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'

class MembersScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back"
        />
      </SafeAreaView>
    );
  }

}

export default MembersScreen
