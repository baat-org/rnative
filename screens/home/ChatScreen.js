import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, View, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native';

class ChatScreen extends React.Component {
  signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: this.props.navigation.getParam('user'), style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this.signOut() }}
        />
        <ScrollView><Text>Chat Content goes here</Text></ScrollView>
        <View>
          <TextInput multiline={true} numberOfLines={4} placeholder="Message" />
          <Text>Bottom</Text>
        </View>
      </View>
    );
  }
}

export default ChatScreen
