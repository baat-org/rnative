import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import API from '../../api/API';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      messageToSend: '',
    }
  };

  onSend() {
    const { userId, messageToSend } = this.state;
    API.chat(userId, messageToSend, () => { }, () => { });

    this.state.messageToSend = '';

    this.props.onSend({ userId: userId, textMessage: messageToSend });
  };

  render() {
    if (this.props.show) {
      return (
        <Fragment>
          <ScrollView>
            {this.props.messages.map((message, key) =>
              <Text>From: {message.fromUser.fullName}, Message: {message.textMessage}</Text>
            )}
          </ScrollView>
          <View style={GlobalStyles.chatInputContainer}>
            <TextInput multiline={true} numberOfLines={4}
              placeholder="Message"
              style={GlobalStyles.chatInput}
              value={this.state.messageToSend}
              onChangeText={(messageToSend) => this.setState({ messageToSend })} />
            <Button title="Send" onPress={this.onSend.bind(this)} />
          </View>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ChatScreen
