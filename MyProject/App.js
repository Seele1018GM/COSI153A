import React from 'react';
import {View,Text} from 'react-native';
import Keypad from './components/StackDemo';


const App = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:40}}></Text>
            <Keypad/>
            
        </View>

    )
}
export default App


