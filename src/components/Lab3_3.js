import React, {useState} from 'react'
import {Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import {generateChromosome, geneticCalculations} from '../calculations/Lab3_3'

const initialChromosomesNumber = 4

export const Lab3_3 = () => {
    const [abcArgs, setAbcArgs] = useState([1, 1, 2, 4])
    const [yArg, setYArg] = useState(21)

    const [minGeneValue, setMinGeneValue] = useState(1)
    const [maxGeneValue, setMaxGeneValue] = useState(5)

    const [chromosomes, setChromosomes] = useState(
        generateChromosome(initialChromosomesNumber, abcArgs.length, minGeneValue, maxGeneValue)
    )

    const [minMutationsValue, setMinMutationsValue] = useState(-1)
    const [maxMutationsValue, setMaxMutationsValue] = useState(1)

    const [crossoverLine, setCrossoverLine] = useState(2)

    const [isDisabled, setIsDisabled] = useState(false)

    return (
        <View style={Object.assign({}, s.mainView, s.commonText)}>
            <View style={Object.assign({}, s.function)}>
                <Text style={Object.assign({
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                })}>
                    {abcArgs.map((el, i) => <View key={i}
                                                  style={[{flexDirection: 'row', alignItems: 'flex-end'}]}>
                        <TextInput keyboardType={'numeric'} value={el.toString()}
                                   style={{fontSize: 20}}
                                   onChangeText={text => setAbcArgs(prev => {
                                       prev[i] = Number.parseFloat(text) || 0
                                       return [...prev]
                                   })}/>
                        <Text style={{fontSize: 20,}}>x</Text>
                        <Text style={{fontSize: 10,}}>{i + 1}</Text>
                        <Text style={{fontSize: 20,}}> {i < abcArgs.length - 1 && '+ '}</Text>
                    </View>)}
                </Text>
                {/*style={Object.assign({flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',})}*/}
                <Text>
                    <View>
                        <AntDesign name="minuscircle" size={24} color="black"
                                   onPress={() => setAbcArgs(prev => {
                                       prev.pop()
                                       return [...prev]
                                   })}/>
                        <Text style={{fontSize: 30,}}>=</Text>
                        <AntDesign name="pluscircle" size={24} color="black"
                                   onPress={() => setAbcArgs(prev => {
                                       prev.push(1)
                                       return [...prev]
                                   })}/>
                    </View>
                </Text>
                <Text style={Object.assign({width: 25,})}>
                    <View>
                        <TextInput style={Object.assign({fontSize: 30,})}
                                   keyboardType={'numeric'}
                                   value={yArg.toString()}
                                   onChangeText={text => setYArg(Number.parseFloat(text) || 0)}/>
                    </View>
                </Text>
            </View>
            <View>
                <View style={Object.assign({flexDirection: 'row', flexWrap: 'wrap',})}>
                    {chromosomes.map((chrome, i) => <View key={i} style={Object.assign({
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    })}>
                        <View key={i} style={Object.assign({}, s.chromosome)}>
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
                                       onPress={() => setChromosomes(prev => {
                                           prev.pop()
                                           prev.pop()
                                           return [...prev]
                                       })}/>
                        </View>}
                    </View>)}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
                    <AntDesign name="pluscircle" size={50} color="black" onPress={() => setChromosomes(prev => {
                        return prev.concat(generateChromosome(
                            2, abcArgs.length, minGeneValue, maxGeneValue
                        ))
                    })}/>
                    <MaterialCommunityIcons name="movie-roll" size={57} color="black"
                                            onPress={() => setChromosomes(() => {
                                                return generateChromosome(
                                                    chromosomes.length, abcArgs.length, minGeneValue, maxGeneValue
                                                )
                                            })}/>
                </View>
            </View>
            <View style={s.lastRow}>
                <View>
                    <Text style={{fontSize: 17}}>GeneValues</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                    <StrangeButton text={minGeneValue} onPress={setMinGeneValue}/>
                    <StrangeButton text={maxGeneValue} onPress={setMaxGeneValue}/>
                </View>
                </View>
                <Pressable onPress={isDisabled ? () => {} : async () => {
                    // console.log('0')
                    setIsDisabled(true)
                    Alert.alert('Lab 3.3', await geneticCalculations(chromosomes, {
                            abcArgs,
                            yArg,
                            minGeneValue,
                            maxGeneValue,
                            crossoverLine,
                            minMutationsValue,
                            maxMutationsValue,
                        }))
                    // console.log('1')
                    setIsDisabled(false)
                }}><View style={getContainerStyles(isDisabled)}>
                    <Text style={s.labelText}>Lab 3.3</Text>
                </View></Pressable>
                <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                    <StrangeButton text={minMutationsValue} onPress={setMinMutationsValue}/>
                    <StrangeButton text={maxMutationsValue} onPress={setMaxMutationsValue}/>
                </View>
                    <Text style={{fontSize: 18}}>Mutations</Text>
                </View>
            </View>
        </View>
    )
}

const StrangeButton = ({text, onPress}) => {
    return (
        <View style={ss.mainView}>
            <AntDesign name="caretup" size={24} color="black" onPress={() => onPress(prev => prev + 1)}/>
            <View style={ss.textView}><Text style={s.commonText}>{text}</Text></View>
            <AntDesign name="caretdown" size={24} color="black" onPress={() => onPress(prev => prev - 1)}/>
        </View>
    )
}

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
    commonText: {
        fontFamily: 'PressStart2P-Regular'
    },
    container: {
        backgroundColor: 'white',
        shadowColor: 'black',
    },
    containerDis: {
        backgroundColor: 'black',
        shadowColor: 'white',
    },
    lastRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainView: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    labelText: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'PressStart2P-Regular'
    },
    function: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
        width: 400,
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
    chromosome: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 100,
        margin: 5,
        padding: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15
    }
})

const ss = StyleSheet.create({
    mainView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textView: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15
    }
})