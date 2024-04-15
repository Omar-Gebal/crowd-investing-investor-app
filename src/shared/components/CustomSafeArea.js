import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Dimensions, StatusBar, Platform } from 'react-native';


const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
const isIOS = Platform.OS === 'ios';

const CustomSafeArea = ({ children, backgroundColor }) => {
    return (
        <SafeAreaView style={{ paddingBottom: (!isIOS) ? `${navbarHeight}px` : 0, flex: 1, backgroundColor:backgroundColor }}>
            {children}
        </SafeAreaView>
    );
};

export default CustomSafeArea;
