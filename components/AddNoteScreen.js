import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default function AddNoteScreen(props) {
    
    const [note, setNote] = useState();
    const root = props.route.params;

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Add Note</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.inputBox}>
                    <TextInput 
                        keyboardType = 'default'
                        style={styles.textInput}
                        placeholder='Add Note ...'
                        onChangeText = {(note)=> setNote(note)}
                        value = {note}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        root.getData('notes')
                            .then(val => {
                                val.push(note);
                                return root.storeData('notes', val)   
                            })
                            .then(val => {
                                props.navigation.goBack();
                            })
                    }}
                >
                    <Text style={styles.textSubmit}>ADD NOTE</Text>
                </TouchableOpacity>
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
    textSubmit: {
        padding: 35,
        fontSize: 18,
        color: 'blue'
    }
})