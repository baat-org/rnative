import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientUserId: props.recipientUserId,
    }
  };

  render() {
    const recipientUserId = this.props.recipientUserId;

    return (
      <Fragment>
        <ScrollView>
          <Text>Chat screen for {recipientUserId}</Text>
        </ScrollView>
        <TextInput multiline={true} numberOfLines={4} placeholder="Message" />
      </Fragment>
    );
  }
}

export default ChatScreen
