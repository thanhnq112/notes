import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default function NoteScreen(props) {

    const root = props.route.params;
    const [note, setNote] = useState(root.item);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Change Note</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.inputBox}>
                    <TextInput 
                        keyboardType = 'default'
                        style={styles.textInput}
                        onChangeText = {(note)=> setNote(note)}
                        value = {note}
                    />
                </View>

                <View style={styles.funcBtn}>
                    <TouchableOpacity
                        onPress={() => {
                            root.getData('notes')
                                .then(val => {
                                    val[root.index] = note
                                    return root.storeData('notes', val)
                                })
                                .then(val => {
                                    props.navigation.goBack();
                                })
                        }}
                    >
                        <Text style={styles.textSubmit}>SAVE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            root.getData('notes')
                                .then(val => {
                                    val.splice(root.index, 1);
                                    return root.storeData('notes', val)   
                                })
                                .then(val => {
                                    props.navigation.goBack();
                                })
                        }}
                    >
                        <Text style={styles.textSubmit}>DELETE</Text>
                    </TouchableOpacity>

                </View>

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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        height: 36,
        width: 300,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 2,
    },
    textInput: {
        height: 40,
        fontSize: 18,
    },

    funcBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    textSubmit: {
        padding: 35,
        fontSize: 18,
        color: 'blue'
    }
})