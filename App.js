import React from 'react'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'
import {MuLabsScroll} from './src/components/MyLabsScroll'

export default function App() {
    let [fontsLoaded] = useFonts({
        'StalinistOne-Regular': require('./src/assets/fonts/StalinistOne-Regular.ttf'),
        'KellySlab-Regular': require('./src/assets/fonts/KellySlab-Regular.ttf'),
        'PressStart2P-Regular': require('./src/assets/fonts/PressStart2P-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            //<View style={{marginTop: 50, width, height}}>
                <MuLabsScroll/>
            //</View>
        );
    }
}