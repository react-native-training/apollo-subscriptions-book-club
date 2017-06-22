import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { TabNavigator } from 'react-navigation';

import BooksNav from './Books';
import AddBook from './AddBook';

const RouteConfig = {
  Books: {
    screen: BooksNav,
    navigationOptions: {
      tabBarLabel: 'Books',
      tabBarIcon: (props) => (
        <Image
          source={require('./assets/booksIcon.png')}
          style={{ width: 26, height: 26, tintColor: props.tintColor }}
        />
      )
    }
  },
  AddBook: {
    screen: AddBook,
    navigationOptions: {
      tabBarIcon: (props) => (
        <Image
          source={require('./assets/addIcon.png')}
          style={{ width: 26, height: 26, tintColor: props.tintColor }}
        />
      )
    }
  },
}

const TabConfig = {
  tabBarOptions: {
    activeTintColor: '#f50057'
  }
}

export default TabNavigator(RouteConfig, TabConfig)
