import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import Home from '../pages/Home';
import Player from '../pages/Player';

const Tab = createBottomTabNavigator();

const Router = [
    {
        name: "Home",
        component: Home
    },
    {
        name: "Player",
        component: Player
    }
]
function My_Bottom_Tab() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const icons = {
                        Home: 'home',
                        Player: 'music',
                    };
                    return (
                        <Icon
                            name={icons[route.name]}
                            color={color}
                            size={25}
                        />
                    );
                },
                tabBarStyle: { backgroundColor: "#000" },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                // tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            {Router.map(x => <Tab.Screen key={x.name} name={x.name}  component={x.component} />)}
        </Tab.Navigator>
    )
}

export default My_Bottom_Tab