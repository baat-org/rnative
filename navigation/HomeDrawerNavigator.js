import { createDrawerNavigator } from 'react-navigation-drawer';
import ChatScreen from '../screens/home/ChatScreen'
import MembersScreen from '../screens/home/MembersScreen'

export default createDrawerNavigator(
  {
    Chat: ChatScreen,
    Members: MembersScreen
  }
);

