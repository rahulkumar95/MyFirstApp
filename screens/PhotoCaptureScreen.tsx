import React, { useState } from 'react';
import {
 View,
 Button,
 Image,
 StyleSheet,
 Alert,
 PermissionsAndroid,
 Platform
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';

export default function PhotoCaptureScreen() {
 const [photoUri, setPhotoUri] = useState<string | null>(null);

 // Request camera permission (for Android)
 const requestCameraPermission = async () => {
   if (Platform.OS === 'android') {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.CAMERA,
         {
           title: "Camera Permission",
           message: "App needs access to your camera to take photos.",
           buttonNeutral: "Ask Me Later",
           buttonNegative: "Cancel",
           buttonPositive: "OK"
         }
       );
       return granted === PermissionsAndroid.RESULTS.GRANTED;
     } catch (err) {
       console.warn(err);
       return false;
     }
   } else {
     // On iOS, permission is handled via Info.plist and system prompt
     return true;
   }
 };

 const takePhoto = async () => {
   const hasPermission = await requestCameraPermission();
   if (!hasPermission) {
     Alert.alert('Permission denied', 'You need to grant camera permission.');
     return;
   }
   launchCamera(
     { mediaType: 'photo', saveToPhotos: true },
     response => {
       if (response.didCancel) {
         return;
       }
       if (response.errorCode) {
         Alert.alert('Camera error', response.errorMessage || 'Error');
         return;
       }
       if (response.assets && response.assets.length > 0) {
         setPhotoUri(response.assets[0].uri || null);
       }
     }
   );
 };

 return (
   <View style={styles.container}>
     <Button title="Take Photo" onPress={takePhoto} />
     {photoUri && (
       <Image
         source={{ uri: photoUri }}
         style={styles.preview}
       />
     )}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
 },
 preview: {
   width: 250,
   height: 250,
   marginTop: 20,
   borderRadius: 10,
   borderWidth: 1,
   borderColor: '#aaa',
 },
});