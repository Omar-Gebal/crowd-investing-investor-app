import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';



function UploadIdScreen(props) {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true, exif: false };
      const photo = await cameraRef.current.takePictureAsync(options);
      setPhoto(photo.uri);
      setCameraVisible(false);
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
        <Camera style={styles.camera} type={facing} ref={cameraRef} onCameraReady={() => console.log('Camera is ready')}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={() => setCameraVisible(true)} />
      <Button title="Upload from Gallery" onPress={() => console.log('Upload from Gallery pressed')} />
      {photo && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <Button title="Retake Photo" onPress={() => setCameraVisible(true)} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      flex: 1,
      width: '100%',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    previewContainer: {
      alignItems: 'center',
    },
    preview: {
      width: 300,
      height: 300,
      marginVertical: 20,
    },
  });
export default UploadIdScreen;