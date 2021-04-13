import React, {useState} from 'react'
import {Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import {makeRandomWithin} from '../calculations/Lab3_3'
import {perceptronModel} from '../calculations/Lab3_2'

export const Lab3_2 = () => {
    const [PValue, setPValue] = useState(4)
    const [dots, setDots] = useState([[1, 5], [2, 4]])
    const [learningSpeed, setLearningSpeed] = useState('0.1')

    const [timeDeadline, setTimeDeadline] = useState(1)
    const [iterationsNumber, setIterationsNumber] = useState(7)

    const [isIterable, setIsIterable] = useState(true)

    const [isDisabled, setIsDisabled] = useState(false)

    return (
        <View style={s.mainView}>
            <TextWithInput value={PValue} setValue={setPValue} text={'P value'}/>
            <Dots dots={dots} setDots={setDots}/>
            <TextWithInput value={learningSpeed} setValue={setLearningSpeed}
                           text={'learning\nSpeed'} fontSize={26}/>
            <Iterable isIterable={isIterable} setIsIterable={setIsIterable}
                      iterationsNumber={iterationsNumber} setIterationsNumber={setIterationsNumber}
                      timeDeadline={timeDeadline} setTimeDeadline={setTimeDeadline}/>
            <BigButton isDisabled={isDisabled} setIsDisabled={setIsDisabled}
                       PValue={PValue} dots={dots} learningSpeed={learningSpeed}
                       timeDeadline={timeDeadline} iterationsNumber={iterationsNumber}/>
        </View>
    )
}

const TextWithInput = ({value, setValue, text, fontSize = 30}) => <View
    style={[{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around',}]}>
    <Text style={{fontFamily: 'StalinistOne-Regular', fontSize: fontSize,}}>{text}</Text>
    <View style={[s.commonForm, {margin: 20}]}>
        <Text><View>
            <TextInput style={{fontFamily: 'StalinistOne-Regular', fontSize: 20,}}
                       keyboardType={'numeric'} value={Number.isInteger(value) ? value.toString() : value}
                       onChangeText={text => setValue(Number.isInteger(value) ? (Number.parseFloat(text) || 0) : text)}/>
        </View></Text>
    </View>
</View>

const BigButton = ({
                       setIsDisabled, PValue, dots, learningSpeed, timeDeadline,
                       iterationsNumber, isDisabled
                   }) => <View style={{alignItems: 'center',}}>
    <Pressable onPress={isDisabled ? () => {
    } : async () => {
        // console.log('0')
        setIsDisabled(true)
        await Alert.alert('Lab 3.2', await perceptronModel({
            P: PValue,
            dots,
            learningSpeed: Number.parseFloat(learningSpeed),
            timeDeadline,
            iterationsNumber,
        }).toString())
        // console.log('1')
        setIsDisabled(false)
    }}>
        <View style={getContainerStyles(isDisabled)}>
            <Text style={{textAlign: 'center',
                fontFamily: 'StalinistOne-Regular', fontSize: 20,}}>Lab 3.2</Text>
        </View>
    </Pressable>
</View>

const Iterable = ({
                      isIterable, setIsIterable,
                      iterationsNumber, setIterationsNumber,
                      timeDeadline, setTimeDeadline,
                  }) => <View style={
    {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around',}
}>
    <View>{isIterable ?
        <AntDesign name="clockcircle" size={50} color="black"
                   onPress={() => setIsIterable(prev => !prev)}/>
        :
        <MaterialCommunityIcons name="counter" size={57} color="black"
                                onPress={() => setIsIterable(prev => !prev)}/>}</View>
    <View>{isIterable ?
        <TextWithInput value={iterationsNumber} fontSize={22}
                       setValue={setIterationsNumber}
                       text={'iterations\nNumber'}/>
        :
        <TextWithInput value={timeDeadline} fontSize={23}
                       setValue={setTimeDeadline}
                       text={'time\nDeadline'}/>
    }</View>
</View>

const Dots = ({dots, setDots}) => <View>
    <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
        {dots.map((chrome, i) => <View key={i} style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <View key={i} style={[{height: 50, width: 150,}, s.commonForm]}>
                <Text style={Object.assign({fontSize: 23,})}>[
                    {chrome.map((bit, j) => <Text key={j}>
                        <TextInput keyboardType={'numeric'}>{bit}</TextInput>
                        <Text>{j < chrome.length - 1 && ', '}</Text>
                    </Text>)}
                    ]</Text>
            </View>
            {i > 0 && (i - 1) % 2 === 0 &&
            <View style={{width: 50, height: 50, marginLeft: 10}} key={Date.now().toString()}>
                <AntDesign name="closecircle" size={50} color="black"
                           onPress={() => setDots(prev => {
                               prev.pop()
                               prev.pop()
                               return [...prev]
                           })}/>
            </View>}
        </View>)}
    </View>
    <View style={{
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-around', margin: 10
    }}>
        <AntDesign name="pluscircle" size={50} color="black" onPress={() => setDots(prev => {
            return prev.concat([[0, 0].map(() => makeRandomWithin(0, 6)),
                [0, 0].map(() => makeRandomWithin(0, 6))])
        })}/>
    </View>
</View>

const getContainerStyles = isDisabled => StyleSheet.create(
    [{
        height: 150,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
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
    }, isDisabled ? s.containerDis : s.container]
)

const s = StyleSheet.create({
    mainView: {
        width: Dimensions.get('window').width,
        flex: 1,
        // backgroundColor: 'black',
        justifyContent: 'space-around',
    },
    commonForm: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        margin: 5,
        padding: 17,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15
    },
})