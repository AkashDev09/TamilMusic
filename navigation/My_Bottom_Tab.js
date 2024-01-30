import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import Home from '../pages/Home';
import Player from '../pages/Player';
import { useSelector } from 'react-redux';
import Search from '../pages/Search';



function My_Bottom_Tab() {

    const Tab = createBottomTabNavigator();

    const { selectItem } = useSelector((state) => state.reducer);
    const Router = [
        {
            name: "Home",
            component: Home
        },
        {
            name: "Player",
            component: Object.keys(selectItem).length > 0 ? Player : Search
        },

    ]

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
            {Router.map(x => <Tab.Screen key={x.name} name={x.name} component={x.component} />)}
        </Tab.Navigator>
    )
}

export default My_Bottom_Tab