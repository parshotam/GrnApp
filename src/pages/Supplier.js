import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Appbar, Searchbar, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import base64 from 'react-native-base64'

// import AsyncStorage from '@react-native-async-community/async';
import AsyncStorage from '@react-native-community/async-storage';
import logobk from '../../assets/logo.png';
import profile from '../../assets/profile_image.png';
import config from '../config';

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
const Home = ({}) => {
    const [userdt, setUserdt] = React.useState();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [suppliers, setSuppliers] = React.useState([]);
    const [allsuppliers, setAllsuppliers] = React.useState([]);
    const [authtoken, setAuthtoken] = React.useState('');
    const [isloading, setIsloading] = React.useState(false);
  const navigation = useNavigation();
  const onChangeSearch = query => {
      setSearchQuery(query)
      const filteredData = allsuppliers.filter((item) => {
        const regex = new RegExp(query, "gi");
        return item.SupplierName.match(regex);
      });
      setSuppliers(filteredData)
    };

    const handleSearchClear = async () => {
      setSearchQuery('')
      setSuppliers(allsuppliers)
    }

    const getSupplier = async () => {
      setIsloading(true);
      const jsonValue = await AsyncStorage.getItem('data');
      const storedata = JSON.parse(jsonValue)
      const conf = await config();
      const url = conf.apiUrl + "/GRN/GetSupplierDetails";
      
      const data = { SiteID: storedata.StoreCode}
      
      
      setAuthtoken(storedata.Token);
      let headers = new Headers();
          headers.append('Authorization', 'Bearer '+ storedata.Token);
          headers.append('Content-Type', 'application/json');
          
  
      fetch(url, {
          method: 'POST', // or 'PUT'
          headers: headers,
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          
          if(data.Success){
          
           setAllsuppliers(data.message);
           setSuppliers(data.message);
           setIsloading(false);
          //  AsyncStorage.setItem('useremail', data.message.email);
          //  AsyncStorage.setItem('data', JSON.stringify(data.message))
          //  navigation.navigate('home') 
          }else{
          //  setErrmsg(data.message)
          //  setIsopen(true)
           setIsloading(false);
           navigation.navigate('login')
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
     }

     const gotoscanner = () => {
      
      navigation.navigate('invoicescanner')
     }

     const getData = async () => {
      try {
        setIsloading(true);
        const jsonValue = await AsyncStorage.getItem('data')
      
        if(jsonValue != null || jsonValue != ''){
          const storedata = JSON.parse(jsonValue)
          getSupplier(storedata);
          // navigation.navigate('home') 
        }
        return jsonValue != null ? jsonValue : null;
      } catch(e) {
        console.log(e)
        console.log("There was an error")
      }
    }
   useEffect(() => {
      getSupplier();
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
        <Image source={logobk} style={styles.mainLogo} />
        <Appbar.Content
          title={
            <Text style={styles.headerText}> SUPPLIERS/VENDORS </Text>
          }
          subtitle={''}
        />
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image source={profile} style={styles.profileIcon} />
        </TouchableOpacity>
      </Appbar>
      <Searchbar
      style={{width:'95%', marginLeft:'auto', marginRight:'auto', marginTop:10}}
      placeholder="Search here"
      onChangeText={onChangeSearch}
      onCancel={handleSearchClear}
      onClear={handleSearchClear}
      value={searchQuery}
    />
    <ScrollView>
    {isloading && (
      <ActivityIndicator  size="large" color="#ff882e" style={{marginTop:'50%'}} />
    )}
    

    <List.Section>
      {suppliers.map((item, index) => {
        return (
          <List.Item onPress={() => {console.log(authtoken);navigation.navigate('invoicescanner', item )}} authtoken={authtoken} key={item.SupplierId} style={{borderBottomWidth:1, borderBottomColor:'#eee'}} title={item.SupplierName} />  
        )}
      )}
      </List.Section>
    </ScrollView>
    </View>
  );


}

export default Home;