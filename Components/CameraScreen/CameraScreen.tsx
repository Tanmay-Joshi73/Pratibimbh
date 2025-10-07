import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraWithOverlay = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const cameraPermission = await Camera.requestCameraPermission();
        setHasPermission( cameraPermission === 'granted');
      } catch (error) {
        console.error('Permission error:', error);
        setHasPermission(false);
      }
    };

    requestPermissions();
  }, []);

  if (hasPermission === null) return <View style={styles.center}><Text>Checking permissions...</Text></View>;
  if (hasPermission === false) return <View style={styles.center}><Text>No camera permission</Text></View>;
  if (!device) return <View style={styles.center}><Text>No camera device</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      
      {/* Camera Overlay */}
      <View style={styles.overlay}>
        {/* Top Instruction */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Point camera at text
          </Text>
        </View>

        {/* Scanning Area */}
        <View style={styles.scanArea}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        {/* Bottom Hint */}
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>
            Ensure text is within the frame
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  instructionContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanArea: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00FF00',
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00FF00',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#00FF00',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#00FF00',
  },
  hintContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  hintText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CameraWithOverlay;