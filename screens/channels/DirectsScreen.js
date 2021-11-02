import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import API from '../../api/API';
import { ListItem } from 'react-native-elements';

class DirectsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  };

  _onSelectUser(user) {
    API.createDirect(user.id).then(success => {
      if (success) {
        this.props.navigation.navigate('Home', { directUserId: user.id, directUserFullName: user.fullName, channelId: null, channelName: null });
      }
    });
  }

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      API.getDirectsForCurrentUser().then(directUsers => {
        let filteredUsers = users.filter(user => {
          return !directUsers.find(directUser => directUser.id == user.id)
        });
        this.setState({ users: filteredUsers });
      });
    });
  }

  render() {
    const selectedStyle = {};
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <ListItem
          title="Add Directs"
          bottomDivider
        />
        {this.state.users.map((user, key) =>
          <ListItem
            key={'add-user-menu-' + key}
            onPress={() => this._onSelectUser(user)}
            title={user.fullName}
            // leftAvatar={{ icon: { name: 'user', type: 'font-awesome' }, containerStyle: { marginRight: 1 } }}
            chevron
            bottomDivider
          />)}
      </SafeAreaView>
    );
  }
}

export default DirectsScreen