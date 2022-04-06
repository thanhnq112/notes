import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default function AddNoteScreen(props) {
    
    const [note, setNote] = useState('');
    const [result, setResult] = useState([]);
    const root = props.route.params;

    useEffect(() => {
        root.getData('notes')
            .then(val => {
                if (note) {
                    setResult(val.filter((element) => element.includes(note)))
                }
                console.log('result: ' + result);
            })
    }, [note])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Search Note</Text>
            </View>

            <View style={styles.input}>
                <View style={styles.inputBox}>
                    <TextInput 
                        keyboardType = 'default'
                        style={styles.textInput}
                        placeholder='Search ...'
                        onChangeText = {(note)=> setNote(note)}
                        value = {note}
                    />
                </View>

                
            </View>
            
            <View style={styles.main}>
                {(!note) ? (
                    
                    <Text>No results found.</Text>
                    
                ) 
                : (
                    result.map((item, index) => {
                        return (
                            <View style={styles.task}>
                                <Text style={styles.taskContent}>{item}</Text>
                            </View>
                        )
                    })
                )}
                
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
    input: {
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
    },
    main: {
        marginTop: 20,
        marginHorizontal: 20
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
})