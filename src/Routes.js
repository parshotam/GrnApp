import * as React from 'react';
import {useEffect} from 'react';
// import { Router, Scene } from 'react-native-router-flux'
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Supplier from './pages/Supplier.js';
import Profile from './pages/Profile.js';
import InvoiceScanner from './pages/InvoiceScanner.js';
import ItemInvoice from './pages/ItemInvoice.js';
// import QrScanner from './components/QrScanner.js';

// import { Text, StyleSheet, StatusBar } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import AsyncStorage from '@react-native-community/async-storage';

const Stack = createNativeStackNavigator();
let user = null;


// getData().then(us => {
//   user = us.split('@')[0]
  
// })
// console.log('user = ', user);

const Routes = () =>{ 
  const [userdetails, setUserdetails] = React.useState('');
  const [defaultscreen, setDefaultscreen] = React.useState('login');
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('useremail')
      const userdata = await AsyncStorage.getItem('data')
      
      if(userdata != null || userdata != ''){
        setUserdetails(userdata.StoreName)
        const navigation = useNavigation();
        setDefaultscreen('home')
        navigation.navigate('home') 
      }
      return jsonValue != null ? jsonValue : null;
    } catch(e) {
      console.log(e)
      console.log("There was an error")
    }
  }
  useEffect(() => {
    getData().then(user => {
      // const username = user.split('@')[0]
      setUserdetails(user)
      
    })  
  },[])
  return (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultscreen} screenOptions={{headerShown: false}}>
        {userdetails == '' || userdetails == null || userdetails == undefined ? (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="invoicescanner" component={InvoiceScanner} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="profile" component={Profile} options={{gestureDirection: 'horizontal-inverted'}} />
            <Stack.Screen name="suppliers" component={Supplier} />
            <Stack.Screen name="iteminvoice" component={ItemInvoice} />
            
          </>
        ) : (
          <>
          
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="suppliers" component={Supplier} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
)};
export default Routes;
