import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import MusicStack from './MusicStack';
import My_Home from './My_Home';


const Tab = createBottomTabNavigator();

const Router = [
    {
        name: "Home",
        component: My_Home
    },
    {
        name: "Music",
        component: MusicStack
    },

]
function My_Bottom_Tab() {

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    )
}

export default My_Bottom_Tab