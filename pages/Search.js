import { Link } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import indications from "../Assets/Images/set-diet-sound-bars.gif"

function Search({ navigation }) {
    const itemList = [
        { name: "Air conditioner", id: 0 },
        { name: "Refrigerator", id: 1 },
        { name: "Microwaves", id: 2 },
        { name: "Washing machine", id: 3 },
        { name: "Fresh", id: 4 },
        { name: "Mobiles", id: 5 },
        { name: "Fashion", id: 6 },
        { name: "Electronics", id: 7 },
        { name: "Women Clothing", id: 8 },
        { name: "Handbags", id: 9 },
        { name: "Watches", id: 10 },
        { name: "Jewelry", id: 11 },
        { name: "Air conditioner", id: 12 },
        { name: "Refrigerator", id: 13 },
        { name: "Microwaves", id: 14 },
        { name: "Washing machine", id: 15 },
        { name: "Fresh", id: 16 },
        { name: "Mobiles", id: 17 },
        { name: "Fashion", id: 18 },
        { name: "Electronics", id: 19 },
        { name: "Women Clothing", id: 20 },
        { name: "Handbags", id: 21 },
        { name: "Watches", id: 22 },
        { name: "Jewelry", id: 23 }
    ]
    const [filteredList, setFilteredList] = useState(itemList);
    const [searchManagement, setManagement] = useState({ activeId: "" });

    console.log(searchManagement, "search");

    const filterbySearch = (e) => {
        let query = e
        let updatedList = [...itemList];
        updatedList = updatedList.filter((itemList) => {
            return String(itemList.name).toLowerCase().includes(String(query).toLowerCase());
        });
        setFilteredList(updatedList);
    };

    return (
        <View style={style.Home_con}>
            <View style={style.header}>
                <TextInput
                    placeholder='Search Your Songs'
                    placeholderTextColor={"#848484"}
                    selectionColor={"tomato"}
                    autoFocus={true}
                    onChangeText={filterbySearch}
                    style={style.input} />
                <View style={style.CenBotton}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={style.text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.search_body}>
                <ScrollView>
                    {filteredList.map((item, i) => (
                        <TouchableOpacity onPress={() => setManagement({ ...searchManagement, activeId: item.id })}>
                            <View key={i} style={style.filtetValue_con}>
                                <View style={style.filtetValue_inner} >
                                    <Icon name={"music"} size={30} color={item.id === searchManagement.activeId ? "tomato" : "#ffff"} />
                                    <Text style={item.id === searchManagement.activeId ? style.TextValueActive : style.TextValue} >{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
             
            </View>
            
        </View>

    )
}

const style = StyleSheet.create({
    Home_con: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff"
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        height: 50,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderColor: "#000",
        fontSize: 13,
        padding: 5,
        color: "#fff"
    },
    CenBotton: {
        borderWidth: 1,
        borderColor: "#000",
        width: "auto",
        padding: 5,
    },
    text: {
        fontSize: 15,
        color: "tomato"
    },
    search_body: {
        height: 730,
        backgroundColor: "#000",

    },
    filtetValue_con: {
        borderBottomWidth: 0.5,
        borderColor: "#313131",
        height: "auto",
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },
    filtetValue_inner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    TextValue: {
        color: "#fff",
        fontSize: 13
    },
    TextValueActive: {
        color: "tomato",
        fontSize: 13
    },
    img: {
        width: 50,
        height: 50
    }

})

export default Search