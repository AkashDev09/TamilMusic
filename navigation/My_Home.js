import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Player from '../pages/Player';


const My_Home = () => {

    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName={"HomeStack"} screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name={"HomeStack"} component={Home} />
            <HomeStack.Screen name={"Search"} component={Search} />
            <HomeStack.Screen name={"Player"} component={Player} />

        </HomeStack.Navigator>
    )
}

export default My_Home  