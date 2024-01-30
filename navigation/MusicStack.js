import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Player from "../pages/Player";
import Search from "../pages/Search";
import { useSelector } from 'react-redux';


const MusicStack = ({ navigation }) => {
    const { selectItem } = useSelector((state) => state.reducer);

    const MusicStackNav = createNativeStackNavigator();

    const _screenOptions = { headerShown: false };

    const onNavScreen = () => {
        let nav = selectItem;
        if (Object.keys(nav).length > 0) navigation.navigate("player");
        else navigation.navigate("search")
    }
    React.useEffect(() => onNavScreen(), []);

    return <MusicStackNav.Navigator initialRouteName={"player"} screenOptions={_screenOptions}>
        <MusicStackNav.Screen name={"player"} component={Player} />
        <MusicStackNav.Screen name={"search"} component={Search} />
    </MusicStackNav.Navigator>

}


export default MusicStack;