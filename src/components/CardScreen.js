import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import {Appbar, Card, Avatar, Paragraph, IconButton} from 'react-native-paper';

const styles = StyleSheet.create({
  animatedBox: {
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    shadowColor: "black",
    borderRadius:15,
    width:'100%',
  },
  // mainCard:{
  //   width: '96%', 
  //   minHeight: minHeight, 
  //   margin:7,borderWidth:1, 
  //   borderColor:'#eee', 
  //   borderRadius:10
  // },
  leftImage: {
    width: 80, 
    height: 80, 
    margin:7, 
    borderColor:'gray', 
    borderWidth:1,borderRadius:10
  },
  title:{
    fontSize:18, 
    color:'#000',
    margin:10, 
    marginLeft:5
  },
  subtitle: {
    fontSize:16, 
    color:'#000',
    margin:10, 
    marginLeft:5, 
    maxWidth:230
  },
  icon:{position: 'absolute', right: -7, top: 10, fontSize:38}
  
});

const CardScreen = ({navigation, title, subtitle, image, minHeight, keyin}) => {
    const goToSupplier = () => {
        navigation.navigate('suppliers');
    }
    return (
        <Card key={'card-'+keyin} style={{
          width: '96%', 
          minHeight: minHeight, 
          margin:7,borderWidth:1, 
          borderColor:'#eee', 
          borderRadius:10
        }}>
        <TouchableOpacity onPress={goToSupplier}  style={styles.animatedBox}>
          <Image source={image} style={styles.leftImage} />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Paragraph style={styles.subtitle}>{subtitle}</Paragraph>
          </View>
          <IconButton
            style={styles.icon}
            color="grey"
            size={36}
            icon="chevron-right"
            
          />

          
          
        </TouchableOpacity>
      </Card>
    )
}

export default CardScreen;