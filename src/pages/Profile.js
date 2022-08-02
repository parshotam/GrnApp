import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import {Appbar, Button, Paragraph} from 'react-native-paper';

import base64 from 'react-native-base64'

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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
    fontSize: 18,
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
  lbtn:{
    padding:8,
    marginTop:10,
    width: '82%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius:15,
    
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
  },
  submitButtonText:{
    color: 'white',
    fontSize:15,
     fontWeight:'bold',
 },
  
});
const Profile = ({}) => {
    
    const [userdetails, setUserdetails] = React.useState({});
    const [email, setEmail] = React.useState('')
    const navigation = useNavigation();

    const goToLogin = async () => {
        await AsyncStorage.removeItem('data')
        navigation.navigate('login')
    }
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('data')
        if(jsonValue != null || jsonValue != ''){
          const storedata = JSON.parse(jsonValue)
          setUserdetails(storedata)
          setEmail(base64.decode(storedata.StoreEmail))
        }
        return jsonValue != null ? jsonValue : null;
      } catch(e) {
        console.log(e)
        console.log("There was an error")
      }
    }
    
   useEffect(() => {
      getData()
    },[])
  

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        style={{height: 70}}
        animated={true}
        backgroundColor="#f5a04c"
      />
      <Appbar color="white" style={styles.appBar}>
      <Appbar.BackAction size={40} onPress={() => navigation.goBack()} color="#fff" />
        {/* <Image source={logobk} style={styles.mainLogo} /> */}
        <Appbar.Content
          title={
            <Text style={styles.headerText}> MY PROFILE </Text>
          }
          subtitle={''}
        />
        {/* <Image source={profile} style={styles.profileIcon} /> */}
        {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
      </Appbar>
      <View style={{padding:20, paddingBottom:5, flexDirection: "row",  display: "flex",}}>
          <Paragraph style={{color:'#000000', width:'33%', paddingBottom:5, fontSize:15, fontWeight:'700'}}>Store Name </Paragraph>
          <Paragraph style={{color:'#000000', width:'70%', fontSize:15, fontWeight:'700'}}> {userdetails.StoreName}</Paragraph>
          {/* <Text>Email: gchjagsjhdgjgasjhdgaj@gj.com</Text> */}
      </View>
      <View style={{padding:20, paddingTop:0, flexDirection: "row",  display: "flex",}}>
          <Paragraph style={{color:'#000000', width:'33%', paddingBottom:5, fontSize:15, fontWeight:'700'}}>Email </Paragraph>
          <Paragraph style={{color:'#000000', width:'70%',fontSize:15, fontWeight:'700'}}> {email}</Paragraph>
          {/* <Text>Email: gchjagsjhdgjgasjhdgaj@gj.com</Text> */}
      </View>
      <View style={{padding:20, paddingTop:0, flexDirection: "row",  display: "flex",}}>
            <Button  labelStyle={styles.submitButtonText} style={styles.lbtn}   mode="contained" onPress={() => goToLogin()}>
                Logout
            </Button>
      </View>
    </View>
  );


}

export default Profile;