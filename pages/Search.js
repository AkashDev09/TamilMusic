import React, { useState } from 'react'
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import PlayIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { SelectItem } from '../Store/action';
import { useRoute } from '@react-navigation/native';

function Search({ navigation }) {

    const dispatch = useDispatch();

    const { selectItem, Songs } = useSelector((state) => state.reducer);
    const [filteredList, setFilteredList] = useState(Songs);
    const [isSearching, setIsSearching] = React.useState({ value: "", active: false });

    const filterbySearch = (e) => {
        let updatedList, query = e;
        if (e === '') {
            updatedList = Songs;
            setIsSearching({ ...isSearching, active: false, value: query });
        } else {
            updatedList = Songs.filter((itemList) => {
                return String(itemList.name).toLowerCase().includes(String(query).toLowerCase());
            });
            setIsSearching({ ...isSearching, active: true, value: query });
        }
        setFilteredList(updatedList);
    };
    const textMax = 50
    const _filteredItems = (item) => {
        let searchedkey = String(isSearching.value).toLowerCase();
        let name = String(item.name);
        let Txt = name.toLowerCase().indexOf(searchedkey);
        return <React.Fragment>
            <Text style={[item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue]} >
                {Txt !== 0 && (name.substring(0, Txt))}
                <Text style={[item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue, { color: item.Id === selectItem?.songs?.Id ? "#fff" : "tomato" }]} >{name.substring(Txt, (Txt + searchedkey.length))}</Text>
                {(Txt + searchedkey.length) !== name.length && (name.substring((Txt + searchedkey.length), name.length))}
            </Text>
        </React.Fragment>
    }
    const AutoRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { dispatch(SelectItem({ songs: item, RouterN: "Search", play: true, destroyPair: item.Id === selectItem?.songs?.Id ? false : true })); navigation.navigate("Player"); }}>
                <View style={style.filtetValue_con}>
                    <View style={style.filtetValue_inner} >
                        {item.imageURL === "" || item.imageURL === null ? (
                            <View style={style.songsIma}>
                                <Icon name={"music"} size={30} color={item.Id === selectItem?.songs?.Id ? "tomato" : "#ffff"} />
                            </View>
                        ) : (
                            <View >
                                <ImageBackground style={{ ...style.songsImaNO, width: 50, height: 50, }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' source={{ uri: item.imageURL }} >
                                    <PlayIcon name={"play"} size={20} color={item.Id === selectItem?.songs?.Id ? "tomato" : "#fff"} />
                                </ImageBackground>
                            </View>
                        )}

                        <View style={style.Sn_dis}>
                            {(isSearching.active === false) ? <Text style={item.Id === selectItem?.songs?.Id ? style.TextValueActive : style.TextValue} >{item.name}</Text> : _filteredItems(item)}
                            <Text style={style.disN}>{item.desc.length > textMax ? ((String(item.desc).substring(0, textMax - 3)) + "...") : item.desc}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={style.Home_con}>
            <View style={style.header}>
                <View style={style.searchBar}>
                    <TextInput
                        placeholder='Search Your Songs'
                        placeholderTextColor={"#848484"}
                        selectionColor={"tomato"}
                        autoFocus={Object.values(selectItem).length === 0 ? true : false}
                        onChangeText={filterbySearch}
                        style={style.input} />
                    <View style={style.CenBotton}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={style.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={style.search_body}>
                <SafeAreaView>
                    <FlatList
                        data={filteredList}
                        renderItem={({ item }) => <AutoRow item={item} />}
                        key={item => item.Id}
                    />              
                </SafeAreaView>

            </View>

        </View>

    )
}

const style = StyleSheet.create({
    Home_con: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        height: 100,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#313131",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 350,
        borderRadius: 20,
        padding: 5
    },
    input: {
        width: 250,
        fontSize: 13,
        padding: 5,
        color: "#fff"
    },
    CenBotton: {
        width: "auto",
        padding: 10,
    },
    text: {
        fontSize: 14,
        color: "tomato"
    },
    search_body: {
        height: 805,
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
        fontSize: 13,
        padding: 0,
        margin: 0
    },
    TextValueActive: {
        color: "tomato",
        fontSize: 13,
        padding: 0,
        margin: 0
    },
    img: {
        width: 50,
        height: 50
    },
    Sn_dis: {
        width: 300,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    disN: {
        color: "#5e5b56",
        fontSize: 11,
        padding: 0,
        margin: 0
    },
    songsIma: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#939997",
        borderRadius: 10
    },
    songsImaNO: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    }
})

export default Search