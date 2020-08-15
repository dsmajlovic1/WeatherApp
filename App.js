import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from "./src/screens/HomeScreen"
import DetailsScreen from "./src/screens/DetailsScreen";

//ApiKey
//4b1e7d2cbc6bfd585086d380ffc422d4

const navigator = createStackNavigator({
  Details: DetailsScreen,
  HomeScr: HomeScreen
}, {
  initialRouteName: 'HomeScr',
  defaultNavigationOptions:{
    title: 'Weather App'
  }
});

export default createAppContainer(navigator);
