import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Player from '../pages/Player';
import Index from '../Layout';

const Stack = createNativeStackNavigator();

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

function My_stack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
                {Router.map((route, idx) => (
                    <Stack.Screen key={idx} name={route.name} >
                        {() =>
                            <Index >
                                <route.component />
                            </Index>
                        }
                    </Stack.Screen>

                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default My_stack