import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import { FONT_SIZE, MARGINS } from 'src/shared/constants/dimension_constants';
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'src/shared/constants/colorConstants';
import CustomButton from 'src/shared/components/CustomButton';
import DefaultVerticalSpacing from '../components/DefaultVerticalSpacing';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import CustomModal from '../components/CustomModal';
import { useUploadVerificationIdMutation } from 'src/shared/state/api/apiSlice';
import { useSelector } from 'react-redux';

function UploadIdScreen({ navigation }) {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const firstPictureTaken = useRef(false);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadId, { isLoading, error }] = useUploadVerificationIdMutation();
  const accessToken = useSelector((state) => state.user.accessToken);
  const userId = useSelector((state) => state.user.userData.id);


  function handleModal() {
    setModalVisible(!modalVisible);
    navigation.navigate("TabNavigator");
  }


  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true, exif: false };
      const photo = await cameraRef.current.takePictureAsync(options);

      if (!firstPictureTaken.current) {
        setPhoto1(photo.uri);
        firstPictureTaken.current = true;
      } else {
        setCameraVisible(false);
        setPhoto2(photo.uri);
        firstPictureTaken.current = false;
      }
    }
  };

  const handleUploadId = async () => {
    setModalVisible(true);
    console.log(userId);
    const formData = new FormData();
    formData.append("id_document", {
      uri: photo1,
      name: `id_front_${userId}.jpg`,
      type: "image/jpeg",
    });
    formData.append("back", {
      uri: photo2,
      name: `id_back_${userId}.jpg`,
      type: "image/jpeg",
    });
    console.log("Uploading Image form data:", formData);
    const response = await uploadId({
      image: formData,
      accessToken: accessToken,
    });
    if ('data' in response) {
      console.log("Images uploaded:", response);
      navigation.replace('TabNavigator');
    }
    console.log("Images not uploaded:", response);
    return response;
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      if (!photo1) {
        setPhoto1(result.uri);
      } else if (!photo2) {
        setPhoto2(result.uri);
      }
    }
  };



  const toggleCameraFacing = () => {
    setFacing(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <CustomButton title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  if (cameraVisible) {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={facing} ref={cameraRef} onCameraReady={() => console.log('Camera is ready')} />
        <View style={[styles.buttonContainer, { backgroundColor: PRIMARY_COLOR.light }]}>
          <CustomButton title={photo1 ? "Take a Picture of the card's BACK face" : "Take a Picture of the card's FRONT face"} onPress={handleTakePicture} />
          <DefaultVerticalSpacing />
          <CustomButton color={SECONDARY_COLOR.main} title="Flip Camera" onPress={toggleCameraFacing} />
        </View>
      </View>
    );
  }

  return (

    <CustomSafeArea>
      <View style={styles.container}>
        <View style={styles.upperHalf}>
          <DefaultVerticalSpacing />
          <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
            <Text style={{ fontSize: FONT_SIZE.large, fontWeight: "bold" }}>Final Step</Text>
            {photo2 ? (<TouchableOpacity onPress={handleUploadId}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>) : <Text>provide pictures of your ID to continue</Text>}
          </View>
          <DefaultVerticalSpacing />
          <Text style={{ fontSize: FONT_SIZE.medium }}>Please verify your identity by providing images of the front and back faces of your ID card</Text>
        </View>
        <DefaultVerticalSpacing />
        <View style={styles.bottomHalf}>
          {photo1 && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo1 }} style={styles.preview} />
            </View>
          )}
          {photo2 && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo2 }} style={styles.preview} />
            </View>
          )}
          <View style={styles.btnsView}>
            {photo2 ? <CustomButton title="Retake Photos" onPress={() => { setPhoto1(null); setPhoto2(null); setCameraVisible(true); }} /> : <CustomButton title="Take Picture" onPress={() => setCameraVisible(true)} />}
            <CustomButton title="Upload from Gallery" onPress={() => { setPhoto1(null); setPhoto2(null); handlePickImage }} />
          </View>
        </View>
      </View>
      <CustomModal isLoading={isLoading} mainTxt="Your ID has been sent for verification" subTxt="It'll take some time until your ID gets validated" visible={modalVisible} onPress={handleModal} />
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  camera: {
    flex: 1,
    marginTop: MARGINS.large,
    width: '100%',
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: 'column',
  },

  previewContainer: {
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 250,
    marginVertical: 10,
    backgroundColor: 'pink'

  },
  btnsView: {
    width: 500,
    marginTop: MARGINS.medium,
    flexDirection: "row",
    justifyContent: "space-evenly",

  },
  bottomHalf: {
    justifyContent: "center",

  },
  upperHalf: {

  }
});

export default UploadIdScreen;