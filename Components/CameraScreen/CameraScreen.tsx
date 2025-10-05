import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation';

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

type Props = {
  navigation: CameraScreenNavigationProp;
};

export default function CameraScreen({ navigation }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((img) => {
        console.log(img);
        setImage(img.path);
      })
      .catch((e) => console.log(e));
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((img) => {
        console.log(img);
        setImage(img.path);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Screen</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Select From Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    padding: 16,
    backgroundColor: '#1a73e8',
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  image: { width: 300, height: 400, marginVertical: 16, borderRadius: 8 },
});
