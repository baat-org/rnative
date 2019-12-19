import React from 'react';
import { View, Button } from 'react-native';

class MembersScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Members',
  };
  
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back"
        />
      </View>
    );
  }

}

export default MembersScreen
