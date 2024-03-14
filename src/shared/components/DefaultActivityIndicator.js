import { ActivityIndicator } from "react-native";
function DefaultActivityIndicator({ color, isLarge }) {
    return (
        <ActivityIndicator color={color ?? 'white'} size={isLarge ? 'large' : 'small'} />
    );
}

export default DefaultActivityIndicator;