import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import My_Bottom_Tab from './My_Bottom_Tab';

const Stack = createNativeStackNavigator();

function My_stack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"MyTab"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"MyTab"} component={My_Bottom_Tab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default My_stack  