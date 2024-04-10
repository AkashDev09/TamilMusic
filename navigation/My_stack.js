import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import My_Bottom_Tab from './My_Bottom_Tab';
import Search from '../pages/Search';
import Player from '../pages/Player';
import FavoriteList from '../pages/FavoriteList';

const Stack = createNativeStackNavigator();

function My_stack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"MyTab"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"MyTab"} component={My_Bottom_Tab} />
                <Stack.Screen name={"Search"} component={Search} />
                <Stack.Screen name={"favorite_List"} component={FavoriteList} />
                <Stack.Screen name={"fullScreenPlayer"} component={Player} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default My_stack  