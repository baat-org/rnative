import React, { Fragment } from 'react';
import { ScrollView, Text, TextInput, View, Button} from 'react-native';
import GlobalStyles from '../../GlobalStyles';

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
          <Text>   Chat screen for {userId}   </Text>
        </ScrollView>
        <View style={GlobalStyles.chatInputContainer}>
            <TextInput multiline={true} numberOfLines={4} placeholder="Message" style={GlobalStyles.chatInput} />
            <Button title="Send"/>
        </View>
      </Fragment>
    );
  }
}

export default ChatScreen
