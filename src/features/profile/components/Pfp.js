import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import { useSelector } from 'react-redux';

function Pfp(props) {
    const userData = useSelector((state) => state.user.userData);
    const [fontsLoaded, fontError] = useFonts({
        'Migae': require('assets/fonts/MigaeSemibold-3zd2M.otf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={PRIMARY_COLOR.light} />;
    }

    if (fontError) {
        return <Text>Error loading font.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Migae', fontSize: 50 }}>{`${userData.first_name[0]}${userData.last_name[0]}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR.light,
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Pfp;
