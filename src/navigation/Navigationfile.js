import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen_navigated from '../Screens/Screen_navigated';
import Screen_main from '../Screens/Screen_main';

const Navigationfile = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main_screen">
                <Stack.Screen
                    name="Main_screen"
                    component={Screen_main}
                    options={{title:'switch'}}
                />
                <Stack.Screen
                name="Screen_for_cities"
                component={Screen_navigated}
                options={{title:'back'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigationfile
