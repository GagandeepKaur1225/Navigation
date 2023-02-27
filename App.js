// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Practise from './Practise';
import Navigationfile from './src/navigation/Navigationfile';
import Screen_main from './src/Screens/Screen_main';
import Screen_navigated from './src/Screens/Screen_navigated';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        {/* <Screen_navigated/>
        <Screen_main /> */}
        <Navigationfile/>
        {/* <Practise/> */}
      </SafeAreaView>
    );
  }
}

export default App;
