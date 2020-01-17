import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import { ListItem } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { GQL_API_URI } from 'react-native-dotenv';

class SideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientUsers: [],
    }
  };

  componentDidMount() {
    this._loadRecipientUsers().then(recipientUsers => {
      this.setState({ recipientUsers: recipientUsers });
    });
  }


  _loadRecipientUsers = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let recipientUsers = [];

    await fetch(GQL_API_URI,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"query": "{ users ( userToken: \\\"' + userToken + '\\\") { id, email, fullName, avatarUrl } }", "variables": null, "operationName":null}',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.data && responseJson.data.users) {
          recipientUsers = responseJson.data.users;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return recipientUsers;
  };

  render() {
    const recpientPanels = this.state.recipientUsers.map((recipientUser, key) =>
      <ListItem
        key={key}
        onPress={() => this.props.navigation.navigate('Home', { recipientUserId: recipientUser.id, reciepientFullName: recipientUser.fullName })}
        title={recipientUser.fullName}
        bottomDivider
      />
    );
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        {recpientPanels}
      </SafeAreaView>
    );
  }

}

export default SideMenuScreen
