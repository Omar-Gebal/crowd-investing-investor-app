import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import CustomButton from 'src/shared/components/CustomButton';
import DefaultVerticalSpacing from '../components/DefaultVerticalSpacing';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import CustomModal from '../components/CustomModal';

function UploadIdScreen({ navigation }) {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const firstPictureTaken = useRef(false);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false)

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
        firstPictureTaken.current= true;
      } else {
        setCameraVisible(false);
        setPhoto2(photo.uri);
        firstPictureTaken.current= false;
      }
    }
  };

  const handlePickImage = async () => {      //doesnt function lol
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
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  if (cameraVisible) {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={facing} ref={cameraRef} onCameraReady={() => console.log('Camera is ready')} />
        <View style={[styles.buttonContainer, {backgroundColor:PRIMARY_COLOR.light}]}>
            <CustomButton title="Flip Camera"  onPress={toggleCameraFacing} />      
            <CustomButton title={photo1 ? "Take a Picture of the cards BACK face": "Take a Picture of the cards FRONT face" } onPress={handleTakePicture} />
          </View>
      </View>
    );
  }

  return (   

    <CustomSafeArea>
      <View style={styles.container}>
        <View style={styles.upperHalf}>
          <DefaultVerticalSpacing />
          <View style={{flexDirection:"row", alignItems:"baseline", justifyContent:"space-between"}}>
            <Text style={{fontSize:FONT_SIZE.large, fontWeight:"bold"}}>Final Step</Text> 
            {photo2?(<TouchableOpacity onPress={() => {setModalVisible(true);}}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>):<Text>provide pictures of your ID to contiue</Text>}
          </View>
          <DefaultVerticalSpacing />
          <Text style={{fontSize:FONT_SIZE.medium}}>Please verify your identity by providing images of the front and back faces of your ID card</Text>
        </View>
        <DefaultVerticalSpacing />
        <View style={styles.bottomHalf}>
          <View style={styles.btnsView}>
            {photo2? <CustomButton title="Retake Photos" onPress={() => {setPhoto1(null);setPhoto2(null);setCameraVisible(true);}} /> :<CustomButton title="Take Picture" onPress={() => setCameraVisible(true)} />}
            <CustomButton title="Upload from Gallery" onPress={() => {setPhoto1(null);setPhoto2(null); handlePickImage}} />
          </View>
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
        </View>
      </View>
      <CustomModal mainTxt="Your ID has been sent for verification" subTxt="It'll take some time until your ID gets validated" visible={modalVisible} onPress={handleModal} />
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:"center",
    height:100,
    justifyContent:"space-around",
    width:"100%",
  },

  previewContainer: {
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
  btnsView:{
    width:500,
    flexDirection:"row",
    justifyContent:"space-evenly",
  },
  bottomHalf:{
    justifyContent:"center",
    height:700
  },
  upperHalf:{
    
    
  }
  
});

export default UploadIdScreen;