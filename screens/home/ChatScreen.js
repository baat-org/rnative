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
      messages: []
    }
  };

  onSend() {
    const { userId, messageToSend } = this.state;
    API.chat(userId, messageToSend, () => { }, () => { });
    this.setState({ messageToSend: '' });
  };

  render() {
    if (this.props.show) {
      return (
        <Fragment>
          <ScrollView>
            {this.state.messages.map((message, key) =>
              <Text>From: {message.senderUserId}, Message: {message.textMessage}</Text>
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
