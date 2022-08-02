import React, {useEffect} from 'react'
import { TouchableOpacity,  StyleSheet} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-paper';
import { Image, View, StatusBar } from 'react-native';
import { Button, Text } from 'react-native-paper';
import base64 from 'react-native-base64'

// import AsyncStorage from '@react-native-async-community/async';
import AsyncStorage from '@react-native-community/async-storage';

// import SyncStorage from 'sync-storage';
// import SnackBar from 'react-native-snackbar-component'
import logobk from '../../assets/Burger-King.png'
import config from '../config'


const styles = StyleSheet.create({
    container: {
    //    paddingTop: 23,
      backgroundColor: "#fff",
      height:"100%",
      // fontFamily:"Flame-Regular"
    },
    containera:{
        // height: "100%",
        backgroundColor: "#fff"
    },
    header:{
      width:'40%',
      marginTop:120,
      margin:'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    loginText:{
        margin: 'auto',
        marginTop:25,
        fontSize:40,
        fontWeight:'bold',
        color: "#ff882e",
        marginLeft: 32,
        // textTransform:'lowercase'
      //   marginRight: 'auto'

    },
    inputlabel:{
      fontSize:20,
      marginTop:16,
      fontWeight:'bold',
      marginLeft: 32,
      color: "#000000",
    },
    image:{
       width: 300,
      margin:'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    //   marginTop: 100
    },
    input: {
      width: '83%',
      marginTop:10,
      margin: 'auto',
      marginLeft: 32,
      marginRight: 'auto',
      borderRadius:15,
      borderWidth:0,
      borderStyle: 'solid'
      // paddingTop:10,
      // paddingBottom:10,

    },
    submitButton: {
       backgroundColor: '#fff',
       padding: 10,
       margin: 15,
       height: 40,
    },
    btnrow:{
        width: '90%',
        marginTop:20,
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    lbtn:{
        padding:8,
        marginTop:10,
        width: '92%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius:15,
        
    },
    inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#d7d7d7',
        
        
      },
    submitButtonText:{
       color: 'white',
       fontSize:15,
        fontWeight:'bold',
    },
    snackbar:{
       width:"90%",
       margin: 'auto',
       marginLeft: 15,
       marginRight: 'auto'
    }
 })

const Login = ({navigation}) => {
   const [email, setEmail] = React.useState('');
   const [passwordVisible, setPasswordVisible] = React.useState(true);
   
   const [password, setPassword] = React.useState('');
   const [errmsg, setErrmsg] = React.useState('');
   const [isopen, setIsopen] = React.useState(false);
   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const btnEnable = (password.length >= 2 )
   
   const goToLogin = async () => {
     
    const conf = await config();
    const url = conf.apiUrl + "/Login/ValidLogin" //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
    const data = { StoreEmail:base64.encode(email), Storepassword: base64.encode(password)}
    
    let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        

    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        if(data.Success){
         AsyncStorage.setItem('useremail', data.message.email);
         AsyncStorage.setItem('data', JSON.stringify(data.message))
         navigation.navigate('home') 
        }else{
         setErrmsg(data.message)
         setIsopen(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

   }

   const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem('data')
        jsonValue = JSON.parse(jsonValue)
        if(jsonValue != null && jsonValue != ''){
          navigation.navigate('home') 
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
         <StatusBar barStyle="dark-content" style={{height:100}} 
          showHideTransition={1} animated={true} backgroundColor="#f5a04c" />
          <View style={styles.containera}>
         
         
         <Text style={styles.loginText}>Login</Text>

         <Text style={styles.inputlabel}>StoreId</Text>
         <TextInput
            underlineColorAndroid ='transparent' 
            style={styles.input}
            mode="outlined"
            // label="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your StoreId"
            // right={<TextInput.Icon name="email" />}
         />
         <Text style={styles.inputlabel}>Password</Text>
         <TextInput
            style={styles.input}
            mode="outlined"
            textContentType={'password'} 
            secureTextEntry={passwordVisible}
            multiline={false}
            value={password}
            onChangeText={text =>  setPassword(text)} 
            // label="Password"
            placeholder="Enter store password"
            right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}

         />
         <View style={styles.btnrow}>
            {/* <Button
                title="Login"
                color="#f5a04c"
                style={styles.lbtn}
                
                accessibilityLabel="Login"
            /> */}
            <Button uppercase="false" disabled={!btnEnable} labelStyle={styles.submitButtonText} style={styles.lbtn}   mode="contained" onPress={() => goToLogin()}>
                Login
            </Button>
         </View>
         {/* <SnackBar visible={isopen} backgroundColor="red" position="top"  containerStyle={styles.snackbar}
            autoHidingTime={2000} textMessage={errmsg} 
            actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="let's go"/> */}

         </View>
      </View>
   )
}
export default Login

