import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import { ListItem } from 'react-native-elements';
import API from '../../api/API';

class SideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  };

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      this.setState({ users: users });
    });
  }

  render() {
    const recpientPanels = this.state.users.map((user, key) =>
      <ListItem
        key={key}
        onPress={() => this.props.navigation.navigate('Home', { userId: user.id, fullName: user.fullName })}
        title={user.fullName}
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
