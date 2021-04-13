import React from 'react'
import {Lab3_1} from "./Lab3_1";
import {ScrollView} from "react-native";
import {Lab3_2} from "./Lab3_2";
import {Lab3_3} from "./Lab3_3";

export const MuLabsScroll = () => {
    const pages = [<Lab3_1 key={'1'}/>, <Lab3_2 key={'2'}/>, <Lab3_3 key={'3'}/>]

    // const { width } = Dimensions.get('window').width
    // const { height } = Dimensions.get('window').height

    return <ScrollView
        pagingEnabled
        horizontal
        // style={{width, height}}
        showsHorizontalScrollIndicator={false}
    >
        {pages.map(el => el)}
        {/*<StatusBar style="auto" />*/}
    </ScrollView>
}