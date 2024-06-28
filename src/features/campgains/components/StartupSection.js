import { View, StyleSheet, Text } from 'react-native';
import { FONT_SIZE, MARGINS } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'src/shared/constants/colorConstants';
import DefaultActivityIndicator from 'src/shared/components/DefaultActivityIndicator';
import FormErrorText from 'src/shared/components/FormErrorText';
import DefaultVerticalSpacing from 'src/features/auth/components/DefaultVerticalSpacing';

function StartupSection({ startup, isLoading, isError, styles, HighlightedText }) {
    const getSuccessRateColor = (rate) => {
        if (rate > 0.8) return PRIMARY_COLOR.dark;
        if (rate > 0.5) return 'orange';
        return 'red';
    }

    return isLoading ? <DefaultActivityIndicator /> : isError ? <FormErrorText text={'Error loading startup details.'} /> : (
        <View>
            <Text style={internalStyles.bigTitle}>Startup Details</Text>
            <Text style={styles.sectionItem}>🏢 Name: <HighlightedText text={startup.name} /></Text>
            <Text style={styles.sectionItem}>🌐 Website: <HighlightedText text={startup.website_url} /></Text>
            <Text style={styles.sectionItem}>💼 LinkedIn: <HighlightedText text={startup.linkedin_url} /></Text>
            <DefaultVerticalSpacing />
            <Text style={internalStyles.bigTitle}>Predicted Success Rate</Text>
            <Text style={[internalStyles.successRate, { color: getSuccessRateColor(startup.success_rate) }]}>
                {`${(startup.success_rate).toFixed(2)}%`}
            </Text>
            <Text style={styles.sectionItem}>
                This success rate is predicted by our AI model and isn't accurate. It is based on various factors and should be considered as an estimate.
            </Text>
            <DefaultVerticalSpacing />
            <Text style={styles.sectionTitle}>Funding Stages</Text>
            {startup.funding_stages.map((stage) => (
                <Text key={stage.id} style={styles.sectionItem}>💵 {stage.name}: <HighlightedText text={`$${stage.amount_funded.toLocaleString()} on ${new Date(stage.date).toLocaleDateString()}`} /></Text>
            ))}
        </View>
    );
}

const internalStyles = StyleSheet.create({
    bigTitle: {
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
        marginBottom: MARGINS.small,
        color: SECONDARY_COLOR.dark
    },
    successRate: {
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
        marginBottom: MARGINS.small
    }
});

export default StartupSection;
