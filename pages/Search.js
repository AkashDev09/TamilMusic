import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

function Search({ navigation }) {
    const itemList = [
        { name: "Air conditioner" },
        { name: "Refrigerator" },
        { name: "Microwaves" },
        { name: "Washing machine" },
        { name: "Fresh" },
        { name: "Mobiles" },
        { name: "Fashion" },
        { name: "Electronics" },
        { name: "Women Clothing" },
        { name: "Handbags" },
        { name: "Watches" },
        { name: "Jewelry" },
        { name: "Air conditioner" },
        { name: "Refrigerator" },
        { name: "Microwaves" },
        { name: "Washing machine" },
        { name: "Fresh" },
        { name: "Mobiles" },
        { name: "Fashion" },
        { name: "Electronics" },
        { name: "Women Clothing" },
        { name: "Handbags" },
        { name: "Watches" },
        { name: "Jewelry" }
    ]
    const [filteredList, setFilteredList] = useState(itemList);

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
                        <View key={i} style={style.filtetValue_con}>
                            <Text style={style.TextValue} >{item.name}</Text>
                        </View>
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
        borderBottomWidth: 1,
        borderColor: "#313131",
        height: "auto",
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 5
    },
    TextValue: {
        color: "#fff",
        fontSize: 13
    }

})
export default Search