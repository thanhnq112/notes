import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


export default function MainScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (err) {
            console.log(err);
        }
    }

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData('notes').then(val => {
            setData(val);
        })
    }, [isFocused]);

    const onPress = () => {
        console.log();
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Notes</Text>

                <Pressable
                    style={styles.searchBtn}
                    onPress={() => {
                        navigation.navigate('SearchScreen', {getData, storeData});
                    }}
                >
                    <Image 
                        style={styles.search}
                        source={require('../assets/search.png')}
                    />
                </Pressable>

            </View>

            <View style={styles.main}>
                {(!data) ? null : (
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('NoteScreen', {item, index, getData, storeData});}}
                                key={index}
                            >
                                <View style={styles.task}>
                                    <Text style={styles.taskContent}>{item}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    })
                )}

            </View>
            
            {/* ADD NOTES */}
            <Pressable 
                style={styles.addButton} 
                onPress={() => {navigation.navigate('AddNoteScreen', {getData, storeData});}}
            >
                <Text style={{fontSize: 20, color: '#555'}}>+</Text>
            </Pressable>
        


            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.textFooter}>
                © Designed by Nguyen Quy Thanh from Vietnam
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    top: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 8,
        margin: 16,
    },
    footer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBtn: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 20,
        bottom: 10,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        width: 18,
        height: 18,
    },
    task: {
        marginBottom: 4,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 2,
    },
    taskContent: {
        fontSize: 16,
        paddingBottom: 2,
        paddingLeft: 4,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#66B2FF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
  