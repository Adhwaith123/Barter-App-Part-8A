import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';



export const AppTabNavigator = createBottomTabNavigator({
  
  ThingsToDonate: {
    screen: ThingsToDonate,
    navigationOptions :{
      tabBarLabel : "Thing To Donate",
    }
  },

  ThingsToRequest: {
    screen: ThingsToRequest,
    navigationOptions :{
      tabBarLabel : "Thing To Request",
    }
  }
});
