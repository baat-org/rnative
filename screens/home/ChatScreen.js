import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import API from '../../api/API';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      directUserId: this.props.directUserId,
      channelId: this.props.channelId,
      messageToSend: '', 
    }
  };

  onSend() {
    const { channelId, directUserId, messageToSend } = this.state;
    API.chat(channelId, directUserId, messageToSend, () => { }, () => { });

    this.state.messageToSend = '';

    this.props.onSend({ channelId: channelId, directUserId: directUserId, textMessage: messageToSend });
  };

  render() {
    if (this.props.show) {
      return (
        <Fragment>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            {this.props.messages.map((message, key) =>
              <View style={GlobalStyles.chatMessageContainer} key={key}>
                <Text style={GlobalStyles.chatMessageFrom}>{message.fromUser.fullName}:</Text>
                <Text>{message.textMessage}</Text>
              </View>
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
