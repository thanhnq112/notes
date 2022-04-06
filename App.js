import { StyleSheet } from 'react-native';

import MainScreen from './components/MainScreen';
import AddNoteScreen from './components/AddNoteScreen';
import NoteScreen from './components/NoteScreen';
import SearchScreen from './components/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name='AddNoteScreen' component={AddNoteScreen} options={{headerShown: false}}/>
        <Stack.Screen name='NoteScreen' component={NoteScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

