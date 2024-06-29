import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import Pfp from "./Pfp";
import Field from "./Field";
import CustomButton from "src/shared/components/CustomButton";
import FormErrorText from "src/shared/components/FormErrorText";
import DefaultVerticalSpacing from "src/features/auth/components/DefaultVerticalSpacing";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "src/shared/state/api/apiSlice";
import { useState } from "react";
import DefaultActivityIndicator from "src/shared/components/DefaultActivityIndicator";
import { logUserOut, setUserData } from "src/shared/state/userSlice";
import { SECONDARY_COLOR, ERROR_COLOR, RED_COLOR } from "src/shared/constants/colorConstants";

function ProfileCard({ navigation }) {
    const [editSuccessful, setEditSuccessful] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [editProfile, { isLoading, error }] = useEditProfileMutation();
    const accessToken = useSelector((state) => state.user.accessToken);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number,
        }
    });

    const onSubmit = async (data) => {
        setEditSuccessful(false);
        const response = await editProfile({
            accessToken,
            body: data
        });
        if ('data' in response) {
            console.log(response.data);
            setEditSuccessful(true);
            dispatch(setUserData(response.data));
        }
        console.log(response);
    };

    const handleLogout = () => {
        dispatch(logUserOut());
        navigation.navigate("SignIn")

    };

    return (
        <View style={styles.container}>
            <Pfp />
            <View style={styles.formStyle}>
                <Field control={control} label={'First Name'} name="first_name" rules={{ required: true }} />
                {errors.first_name && <FormErrorText marginLeft={0} text={"first name required"} />}
                <DefaultVerticalSpacing />

                <Field control={control} label={'Last Name'} name="last_name" rules={{ required: true }} />
                {errors.last_name && <FormErrorText marginLeft={0} text={"Last name required"} />}
                <DefaultVerticalSpacing />

                <Field control={control} label={'Phone number'} name="phone_number" rules={{ required: true }} />
                {errors.phone_number && <FormErrorText marginLeft={0} text={"Phone number required"} />}
                <DefaultVerticalSpacing />
                <View style={styles.btnView}>
                    <CustomButton onPress={handleSubmit(onSubmit)} title={isLoading ? <DefaultActivityIndicator /> : "Save changes"} />
                    {editSuccessful && <Text style={styles.successMessageStyle}> Your profile is edited successfully</Text>}
                </View>
                <DefaultVerticalSpacing />
                <CustomButton color={RED_COLOR.main} onPress={handleLogout} title="Logout" style={styles.logoutButton} textStyle={styles.logoutButtonText} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 510,
        elevation: 10,
        zIndex: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    formStyle: {
        margin: 20,
        height: 450, // Adjusted height to accommodate the logout button
        padding: 1,
    },
    successMessageStyle: {
        alignSelf: 'center',
        color: SECONDARY_COLOR.main,
        marginTop: 2,
    },
    btnView: {
        alignItems: "stretch",
    },
    marginRemover: {
        marginLeft: 0
    },
    logoutButton: {
        backgroundColor: ERROR_COLOR.main,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default ProfileCard;
