import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
    }
  };

  render() {
    const userId = this.props.userId;

    return (
      <Fragment>
        <ScrollView>
          <Text>Chat screen for {userId}</Text>
        </ScrollView>
        <TextInput multiline={true} numberOfLines={4} placeholder="Message" />
      </Fragment>
    );
  }
}

export default ChatScreen
