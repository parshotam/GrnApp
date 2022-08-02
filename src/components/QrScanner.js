import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
  Linking,
  View,
  AnimationEffect,
  Dimensions
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from "react-native-camera"
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

// const RNCamera = RNCameraImport.RNCamera()
// import { RNCamera, FaceDetector } from 'react-native-camera';

const overlayColor = "rgba(0,0,0,0.5)";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0065; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "#fff";

const edge: ViewStyle = {
  borderColor: 'white',
  borderLeftWidth: 3,
  borderTopWidth: 3,
  borderTopLeftRadius:10,
  position: 'absolute',
  height: 50,
  width: 44,
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    },
    rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    // rectangle: {
    //   height: 250,
    //   width: 250,
    //   borderWidth: 2,
    //   borderColor: '#fff',
    //   backgroundColor: 'transparent'
    // },
    
    rectangle: {
      height: rectDimensions,
      width: rectDimensions,
      // borderWidth: rectBorderWidth,
      // borderColor: rectBorderColor,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent"
    },
  
    topOverlay: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      justifyContent: "center",
      alignItems: "center"
    },
  
    bottomOverlay: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      paddingBottom: SCREEN_WIDTH * 0.25
    },
  
    leftAndRightOverlay: {
      height: SCREEN_WIDTH * 0.65,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor
    },
  
    scanBar: {
      width: scanBarWidth,
      height: scanBarHeight,
      backgroundColor: '#fff',
      
    },

    


    bottomRight: {
      transform: [{ rotate: '180deg' }],
      ...edge,
      right: 0,
      bottom: 0,
    },
    bottomLeft: {
      transform: [{ rotateX: '180deg' }],
      ...edge,
      bottom: 0,
      left: 0,
    },
    captureBox: {
      height: 230,
      width: 230,
      marginTop:10,
      paddingTop:30,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    topLeft: {
      ...edge,
      left: 0,
      top: 0,
    },
    topRight: {
      transform: [{ rotateY: '180deg' }],
      ...edge,
      top: 0,
      right: 0,
    },
  });

  const CustomQrMarker = () => {
    const makeSlideOutTranslation = (translationType, fromValue) => {
      return {
        from: {
          [translationType]: SCREEN_WIDTH * -0.18
        },
        to: {
          [translationType]: fromValue
        }
      };
    }
    return (
      <View testID="capture-box-container" style={styles.captureBox}>
        
        <View style={styles.rectangle}>
                <View testID="top-left-corner" style={styles.topLeft} />
                <View testID="top-right-corner" style={styles.topRight} />
                <View testID="bottom-right-corner" style={styles.bottomRight} />
                <View testID="bottom-left-corner" style={styles.bottomLeft} />
                
              </View>
              <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
          </View>
      // <View style={styles.rectangleContainer}>
      //       <View style={styles.topOverlay}>
      //         <Text style={{ fontSize: 30, color: "white" }}>
      //           QR CODE SCANNER
      //         </Text>
      //       </View>

            

      //       <View style={{ flexDirection: "row" }}>
      //         <View style={styles.leftAndRightOverlay} />

      //         <View style={styles.rectangle}>
      //           <Icon
      //             name="md-scan"
      //             style={{width:200,height:200,fontSize:200}}
      //             size={SCREEN_WIDTH * 0.73}
      //             color={iconScanColor}
      //           />
      //           <Animatable.View
      //             style={styles.scanBar}
      //             direction="alternate-reverse"
      //             iterationCount="infinite"
      //             duration={1700}
      //             easing="linear"
      //             animation={makeSlideOutTranslation(
      //               "translateY",
      //               SCREEN_WIDTH * -0.54
      //             )}
      //           />
      //         </View>

      //         <View style={styles.leftAndRightOverlay} />
      //       </View>

      //        <View style={styles.bottomOverlay} />
      //      </View>
    )
  }

  const QrScanner = ({navigation,getInvoiceDetails, getInvoiceCompletedDetails }) => {
  const [isFlashOn, setIsFlashOn] = React.useState(false);
  
    const onSuccess = (e) => {
      getInvoiceDetails(e.data)
      getInvoiceCompletedDetails(e.data)
      
      };

      
    
    return (
      <View style={{height:350}}>
        
        <Icon
          onPress={() => setIsFlashOn(!isFlashOn)}
          name={isFlashOn ? "flash" : "flash-off"}
          style={{position:'absolute', right:20, top:10, zIndex:1000}}
          size={20}
          color={iconScanColor}
        />
        
        <QRCodeScanner
        onRead={onSuccess}
        cameraProps={{ratio: "1:1"}}
        reactivate={true}
        reactivateTimeout={3000}
        containerStyle={{height:200}}
        cameraStyle={[{height:200}]}
        useGoogleVision={true}
        cameraType={AnimationEffect}
        customMarker={<CustomQrMarker />}
        showMarker={true}
        cameraContainerStyle={{ height:200,  paddingTop:0, marginTop:0, alignSelf: 'center', }} 
        cameraStyle={{ height:150, alignSelf: 'center', }}
        fadeIn={true}
        flashMode={isFlashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        />
         </View>
    );
      
}


export default QrScanner;