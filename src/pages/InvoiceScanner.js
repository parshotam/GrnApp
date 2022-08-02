import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import { StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';

import {Appbar, Card, Avatar, Paragraph, Text, IconButton} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import CustomTabBar from '../components/CustomTabBar';
import InvoiceList from '../components/InvoiceList.js';
import QrScanner from '../components/QrScanner.js';
import config from '../config'

const Tab = createMaterialTopTabNavigator();

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
  },
  textcenter: {
    textAlign: 'center',
    marginTop:"40%",
    fontSize: 20,
    fontWeight: '400'
  }
  
});
const InvoiceScanner = ({ route, authtoken }) => {
  const { SupplierId, otherParam } = route.params;
  const ref = React.useRef();
  const [suplierid, setSuplierid] = React.useState();
  const [tabtype, setTabtype] = React.useState('PENDING');
  const [invoicelist, setInvoicelist] = React.useState([]);
  const [invoicecompletedlist, setInvoicecompletedlist] = React.useState([]);
  const [isloading, setIsloading] = React.useState(true);
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate('profile');
  }

  const setActiveTab = (type) => {
    setTabtype(type);

  }

  async function getInvoiceDetails (Supplierid) {
    const conf = await config();
    const url = conf.apiUrl + "/GRN/GetInvoiceIdPendingdata"
    
    setIsloading(true)
    let userdata = await AsyncStorage.getItem('data')
    userdata = JSON.parse(userdata);
    const data = { SupplierId: Supplierid, SiteID:  userdata.StoreCode}
    let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ userdata.Token);
        headers.append('Content-Type', 'application/json');
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        // navigation.navigate('home') 
        setIsloading(false)
        if(data.Success){
         if(data.message != null && data.message != ''){
          setInvoicelist(data.message);
         }
         
        //  setSuppliers(data.message);
        //  AsyncStorage.setItem('useremail', data.message.email);
        //  AsyncStorage.setItem('data', JSON.stringify(data.message))
        //  navigation.navigate('home')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

   }

   const getInvoiceCompletedDetails = async (Supplierid) => {
    // ref.current.method();
    const conf = await config();
    const url = conf.apiUrl + "/GRN/GetInvoiceCompleteddata"
    //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
  
    let userdata = await AsyncStorage.getItem('data')
    userdata = JSON.parse(userdata);
    const data = { SupplierId: Supplierid, SiteID:  userdata.StoreCode}
    let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ userdata.Token);
        headers.append('Content-Type', 'application/json');
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        // navigation.navigate('home') 
        if(data.Success){
        if(data.message != null && data.message != ''){
          setInvoicecompletedlist(data.message);
        }
        
        //  setSuppliers(data.message);
        //  AsyncStorage.setItem('useremail', data.message.email);
        //  AsyncStorage.setItem('data', JSON.stringify(data.message))
        //  navigation.navigate('home')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

 }

  useEffect(() => {
    getInvoiceDetails(SupplierId);
    getInvoiceCompletedDetails(SupplierId);
  },[suplierid])
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        style={{height: 70}}
        animated={true}
        backgroundColor="#f5a04c"
        onPress={() => setOpen(false)}
      />
      <Tab.Navigator
          swipeEnabled={false}
        //   onPress={() => setOpen(false)}
          tabBar={props => (
            <CustomTabBar {...props} setActiveTab={setActiveTab} />
          )}
        //   onChangeIndex={(newIndex) => {console.log('newIndex = ',newIndex)}}
        //   //   style={{ textTransform: 'lowercase'}}useNavigation
        //   //   upperCaseLabel={false}
        //     activeColor={'#F5Cff882eB44'}
        //     //           inactiveColor={'#ff882e'}
        //     screenOptions={{
        //       activeTintColor: '#gray',
        //       inactiveColor:'#gray',
        //     tabBarActiveTintColor: 'gray',
        //     tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize'},
        //     pressColor: '#fff',
        //     upperCaseLabel:false,
        //     tabBarItemStyle: { color: 'red'},
        //     tabBarStyle: { backgroundColor: '#fff', activeColor:'red', textTransform: 'lowercase', color:'red' },
        //     // tabBarIndicatorContainerStyle: { backgroundColor: 'red' },
        //     tabBarIndicatorStyle:{ backgroundColor: '#ff882e', color:'#ff882e'   },
        //   }}
        >
          <Tab.Screen
            // style={{textTransform: 'lowercase'}}
            name="PENDING"
            // onPress={() => setOpen(false)}
            // component={InvoiceList}
            
            children={() => {
              return (
                <ScrollView>
                {tabtype == 'PENDING' && invoicelist.length > 0 ? (
                
                    <>
                      <QrScanner getInvoiceDetails={sid => getInvoiceDetails(sid)}
                      getInvoiceCompletedDetails={(sid) => getInvoiceCompletedDetails(sid)}/>
                      {invoicelist.map((item, index) => {
                      return (<InvoiceList
                        invoice={item}
                        SupplierId={SupplierId}
                        type="PENDING"
                        />)
                      })}
                        </>
                
                ): (isloading ? (<><QrScanner getInvoiceDetails={sid => getInvoiceDetails(sid)}
                getInvoiceCompletedDetails={(sid) => getInvoiceCompletedDetails(sid)}/>
                <ActivityIndicator  size="large" color="#ff882e" style={{marginTop:'50%'}} /></>): (<><QrScanner getInvoiceDetails={sid => getInvoiceDetails(sid)}
                      getInvoiceCompletedDetails={(sid) => getInvoiceCompletedDetails(sid)}/><Text style={styles.textcenter}>No Pending Invoices</Text></>)) 
                  
                }
                </ScrollView>
              );
            }}
          />
          <Tab.Screen
            name="COMPLETED"
            // component={InvoiceList}nvoicecompletedlist
            children={() => {
                return (
                  <ScrollView>
                  {tabtype == 'COMPLETED' && invoicecompletedlist.length > 0 ? (
                  invoicecompletedlist.map((item, index) => {
                      return (<InvoiceList
                          invoice={item}
                          type="COMPLETED"
                          />)
                  })
                  ):(isloading ? (<ActivityIndicator  size="large" color="#ff882e" style={{marginTop:'50%'}} />): (<Text style={styles.textcenter}>No Completed Invoices</Text>)) }
                  </ScrollView>
                );
              }}
            // children={() => {
              
            //   return (
            //     <>
            //     {tabtype == 'Week' && (
            //     <DayScreen
            //       setEnddte={setEnddte}
            //       selectedDate={setDte}
            //       confirmdate={confirmdate}
            //       setConfirmdate={setConfirmdate}
            //       closeMenu={() => setOpen(false)}
            //       type="week"
            //       setActiveTab={setActiveTab}
            //     />)}
            //     </>
            //   );
            // }}
          />
        </Tab.Navigator>
      
      
    </View>
  );


}

export default InvoiceScanner;