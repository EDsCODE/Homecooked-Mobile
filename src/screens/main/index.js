import { createBottomTabNavigator } from 'react-navigation';
import Feed from './feed';
import HistoryStack from './history';
import Notifications from './notifications';
import Account from './account';
import RatingStack from './common/RatingStack';

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
        },
        Notification: {
            screen: Notifications
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: 'Account'
    }
);

export default MainStack;
