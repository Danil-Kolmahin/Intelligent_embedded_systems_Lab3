import React, {useState} from 'react'
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native'
import {FermatFactorization} from '../calculations/Lab3_1'

export const Lab3_1 = () => {
    const [resultNumber, setResultNumber] = useState(667)

    return (
        <View style={s.mainView}>
            <Text style={s.labelText}>Lab 3.1</Text>
            <View style={s.container}>
                <Text style={s.containerText1}>{(
                    (numbers) => !!numbers && `${numbers[0]} * ${numbers[1]}`
                )(FermatFactorization(resultNumber))}</Text>
                <Text style={s.containerText1}>=</Text>
                <TextInput
                    style={s.containerText2}
                    keyboardType={'numeric'}
                    value={resultNumber.toString()}
                    onChangeText={text => setResultNumber(Number.parseFloat(text) || 0)}
                />
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    mainView: {
        width: Dimensions.get('window').width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'KellySlab-Regular'
    },
    container: {
        height: 200,
        width: 200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 35,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15
    },
    containerText1: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'KellySlab-Regular'
    },
    containerText2: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'KellySlab-Regular'
    }
});