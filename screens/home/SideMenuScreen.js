import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import { ListItem } from 'react-native-elements';

class SideMenuScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <ListItem
          key={1}
          onPress={() => this.props.navigation.navigate('Chat', { user: 'User 1' })}
          title="User 1"
          bottomDivider
        />
        <ListItem
          key={2}
          onPress={() => this.props.navigation.navigate('Chat', { user: 'User 2' })}
          title="User 2"
          bottomDivider
        />
        <ListItem
          key={3}
          onPress={() => this.props.navigation.navigate('Chat', { user: 'User 3' })}
          title="User 3"
          bottomDivider
        />
      </SafeAreaView>
    );
  }

}

export default SideMenuScreen
