import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import MusicStack from './MusicStack';
import Home from '../pages/Home';


const Tab = createBottomTabNavigator();

const Router = [
    {
        name: "Home",
        component: Home
    },
    {
        name: "Music",
        component: MusicStack
    },

]
function My_Bottom_Tab() {

    return (
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        const icons = {
                            Home: 'home',
                            Music: 'music',
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
                {Router.map(x => <Tab.Screen key={x.name} name={x.name} component={x.component} />)}
            </Tab.Navigator>
    )
}

export default My_Bottom_Tab