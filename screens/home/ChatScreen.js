import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  };

  appendMessage(message) {
    const messages = this.state.messages;
    messages.append(message);
    this.setState({ messages: messages });
  };

  render() {
    const messages = this.state.messages.map((message, key) =>
      <Text>From: {message.senderUserId}, Message: {message.textMessage}</Text>
    );

    return (
      <Fragment>
        <ScrollView>
          {messages}
        </ScrollView>
        <View style={GlobalStyles.chatInputContainer}>
          <TextInput multiline={true} numberOfLines={4} placeholder="Message" style={GlobalStyles.chatInput} />
          <Button title="Send" />
        </View>
      </Fragment>
    );
  }
}

export default ChatScreen
