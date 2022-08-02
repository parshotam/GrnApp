import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import {Appbar, Card, Avatar, Paragraph, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CardScreen from '../components/CardScreen'
import logobk from '../../assets/logo.png';
import profile from '../../assets/profile_image.png';
import fork1 from '../../assets/fork1.jpg';
import fork2 from '../../assets/fork2.jpg';
import note from '../../assets/note.png';
const styles = StyleSheet.create({
  appBar: {
    // color: "#fff",
    backgroundColor: '#ff882e',
  },
  animatedBox: {
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    // backgroundColor: "black",
    shadowColor: "black",
    // borderRightColor:'#f6f7f8',
    // borderRightWidth:2,
    // borderWidth:1,
    // borderColor:'gray',
    // padding: 10,
    borderRadius:15,
    width:'100%',
  },
  headerText:{  
    fontSize: 23,
    color:'#fff',
    fontWeight: 'bold'
  },
  mainLogo:{
    width: 30, 
    height: 35, 
    marginLeft:20
  },
  clrW: {
    color: '#fff',
  },
  container: {
    //  paddingTop: 25, //ios only
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  profileIcon:{
    width: 40, 
    height: 40, 
    marginRight:15, 
    borderRadius:25
  }
  
});
const Home = () => {
  const listOFCard = [{'title':'GRN', subtitle: 'Generate GRN from list' , image: note, minHeight:95},
  {'title':'INVENTORY', subtitle: 'Stock update', image: fork1, minHeight:95}, 
  {'title':'INVENTORY TRANSFER', subtitle: 'Inventory transfer - Store to Store', image: fork2, minHeight:105}]
  const navigation = useNavigation();
  const goToProfile = () => {
    
    navigation.navigate('profile');
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        style={{height: 70}}
        animated={true}
        backgroundColor="#f5a04c"
        onPress={() => setOpen(false)}
      />
      <Appbar color="white" style={styles.appBar} onPress={() => setOpen(false)}>
        <Image source={logobk} style={styles.mainLogo} />
        <Appbar.Content
        titleStyle={{alignSelf: 'center'}}
          title={
            <Text style={styles.headerText}> MAIN </Text>
          }
          subtitle={''}
        />
        {/* <Appbar.Action icon="calendar" onPress={() => setOpen(true)} color="#f5a04c" /> */}
        {/* <Appbar.Action
          style={{position: 'absolute', top: 5, right: 0}}
          icon="user-circle"
          onPress={() => setOpen(false)}
        /> */}
        <TouchableOpacity onPress={() => goToProfile()}>
        <Image source={profile} style={styles.profileIcon} />
        </TouchableOpacity>
        {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
      </Appbar>
      {listOFCard.map((item, index) => {
        return (
            <CardScreen key={index} keyin={index} navigation={navigation} title={item.title} subtitle={item.subtitle} image={item.image} minHeight={item.minHeight}/>
        )}
      )}
      
    </View>
  );


}

export default Home;