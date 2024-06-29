// ProgressBar.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, GREY_COLOR } from 'src/shared/constants/colorConstants';

const ProgressBar = ({ percentComplete }) => {
    return (
        <View style={styles.progressContainer}>
            <View
                style={[
                    styles.progressBar,
                    { width: `${percentComplete}%` },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        height: 10,
        backgroundColor: GREY_COLOR.lightest,
        borderRadius: 5,
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: PRIMARY_COLOR.main,
        borderRadius: 5,
    },
});

export default ProgressBar;
