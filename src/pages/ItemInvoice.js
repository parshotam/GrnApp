import React, {useEffect} from 'react';
import {Image, View, Text as Text1} from 'react-native';
import { StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Appbar, Card, Avatar, Paragraph, Text, IconButton, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config'

const styles = StyleSheet.create({
  appBar: {
    // color: "#fff",
    backgroundColor: '#ff882e',
  },
  newtitle: {
    color: '#ff882e',
    alignItems:'center',
    fontSize:18, 
    fontWeight:'bold',
    marginTop:15,
    marginRight:'auto',
    marginLeft:'auto'
  },
  animatedBox: {
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    shadowColor: "black",
    borderRadius:15,
    width:'100%',
    padding:10,
    maxHeight: 375,
    // borderWidth:1,
    // //paddingTop:10,
    // borderColor:'red'
  },
  animatedBox1: {
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    shadowColor: "black",
    borderRadius:15,
    width:'100%',
    padding:10,
    maxHeight: 60,
    marginBottom:10
  },
  animatedBox2:{
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    shadowColor: "black",
    borderRadius:15,
    width:'100%',
    padding:10,
    maxHeight: 60,
    marginBottom:10,
    position:'absolute',
    bottom:0
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
    // borderColor:'gray', 
    // borderWidth:1,
    borderRadius:10
  },
  headerText:{  
    fontSize: 21,
    color:'#fff',
    fontWeight: 'bold'
  },
  title1:{
    fontSize:15, 
    fontWeight:'800',
    color:'#747679',
    paddingTop:3,
    marginBottom:21, 
    // marginLeft:5,
    width:148,
    // borderWidth:1,
    // borderColor:'red'
  },
  input: {
    
    width: 160,
    maxHeight: 40,
    flex: 1,
    padding:0,
    // paddingTop:10,
    // marginTop:10,
    paddingHorizontal: 0,
    justifyContent:"center",
    // margin: 'auto',
    marginLeft: 32,
    textAlign:'right',
    marginRight: 'auto',
    borderRadius:15,
    borderWidth:0,
    borderStyle: 'solid'
    // paddingTop:10,
    // paddingBottom:10,

  },
  inputcomment:{
    width: '94%',
    maxHeight: 45,
    flex: 1,
    padding:0,
    // paddingTop:10,
    // marginTop:10,
    paddingHorizontal: 0,
    justifyContent:"center",
    // margin: 'auto',
    marginLeft: 12,
    // textAlign:'right',
    marginRight: 'auto',
    borderRadius:15,
    borderWidth:0,
    borderStyle: 'solid'
  },
  title:{
    fontSize:15, 
    fontWeight:'800',
    color:'#747679',
    // marginTop:10, 
    // marginLeft:5,
    width:148,
    // borderWidth:1,
    paddingTop:10,
    // borderColor:'red'
  },
  titleQuantity:{
    fontSize:15, 
    fontWeight:'800',
    color:'#747679',
    paddingTop:10, 
    width:150,
    // borderWidth:1,
    paddingBottom:4,
    // borderColor:'red'
  },
  titlecomment:{
    fontSize:15, 
    fontWeight:'800',
    color:'#747679',
    // marginTop:10, 
    // marginLeft:5,
    // width:148,
    // borderWidth:1,
    paddingTop:8,
    paddingLeft:13,
    // borderColor:'red'
  },
  subtitle1: {
    fontSize:13, 
    // color:'#aaabae',
    // padding:12,
    width:225,
    textAlign:"right",
    marginLeft:'auto',
    marginRight:'auto',
    // alignSelf: 'center',
    // borderWidth:1, borderColor:'blue',
    padding:5,
    paddingRight:18
  },
  subtitle: {
    fontSize:14, 
    // color:'#aaabae',
    // padding:12,
    width:225,
    textAlign:"right",
    paddingTop:10,
    // marginLeft:'auto',
    // marginRight:'auto',
    // alignSelf: 'center',
    // borderWidth:1, borderColor:'blue',
    paddingRight:18
  },
  subtitleQuantity:{
    fontSize:14, 
    width:225,
    textAlign:"right",
    // borderWidth:1, 
    // borderColor:'blue',
    paddingRight:18
  },
  subtitleReceived:{
    fontSize:14, 
    width:225,
    textAlign:"right",
    // borderWidth:1, 
    // borderColor:'blue',
    paddingTop:15,
    paddingBottom:15,
    paddingRight:22
  },
  icon:{position: 'absolute', right: -7, top: 10, fontSize:38},
  previousbtn:{
    width:'47%', height:45,marginLeft:8,  backgroundColor:'#ff882e', color:'#fff'
  },
  previousbtndisabled:{
    width:'47%', height:45,marginLeft:8,  backgroundColor:'#d2d2d2'
  },
  previousClrW:{
    color:"#fff"
  }

});

const ItemInvoice = ({route, navigation}) => {
  const { VendorID, SiteID, InvoiceID,  otherParam } = route.params;
    // const navigation = useNavigation();
    const [invoiceFullDetails, setInvoiceFullDetails] = React.useState({});
    const [invoicedata, setInvoicedata] = React.useState([]);
    const [invoicelist, setInvoicelist] = React.useState([]);
    const [currentindx, setCurrentindx] = React.useState(0);
    const [isdisablebtn, setIsdisablebtn] = React.useState(true);
    
    
    
    const goToSupplier = () => {
        navigation.navigate('suppliers');
    }

    const changeData = (comment, key) => {
      
      const newinvoicedata = invoicedata;
      newinvoicedata[key]=comment;
      setInvoicedata({...newinvoicedata});
      const newinvoicelist = invoicelist
      newinvoicelist[currentindx]=newinvoicedata
      setInvoicelist(newinvoicelist);
      const invoiceDetails = invoiceFullDetails[0];
      invoiceDetails.Invoiceitemslist = newinvoicelist
      setInvoiceFullDetails([invoiceDetails]);
    }
    
    const goToNext = () => {
      if (invoicedata.QuantityUpdated == null || invoicedata.QuantityUpdated ==''){
        alert('Fill all Field');
      }else{
        const currentindex = currentindx+1
        if(currentindex<invoicelist.length){
          setInvoicedata(invoicelist[currentindex])
          setCurrentindx(currentindx+1);
          setIsdisablebtn(false);
          saveInvoiceDetails();
        }
      }
      
    }
    const goToPrevious = () => {
      const currentindex = currentindx-1
      if(currentindex==0){
       setIsdisablebtn(true)
      }
      if(currentindex>=0){
       setCurrentindx(currentindex)
      }
      setInvoicedata(invoicelist[currentindex]);
      
    }
    


    const getInvoiceDetails = async () => {
      const conf = await config();
      const url = conf.apiUrl + "/GRN/GetInvoiceDetails"
      let userdata = await AsyncStorage.getItem('data')
      userdata = JSON.parse(userdata);
      const data = { SupplierId: VendorID, InvoiceID: InvoiceID,  SiteID:  SiteID}
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
          if(data.Success){
           setInvoiceFullDetails(data.message);
           setInvoicedata(data.message[0].Invoiceitemslist[0]);
           setInvoicelist(data.message[0].Invoiceitemslist);
          
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
     }

     const saveInvoiceDetails = async () => {
      const conf = await config();
      const url = conf.apiUrl + "/GRN/GetInvoicevalidatedData"
      let userdata = await AsyncStorage.getItem('data')
      userdata = JSON.parse(userdata);
      
      const data = invoiceFullDetails[0]
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
          
          if(data.Success){
          //  setInvoiceFullDetails(data.message);
          //  setInvoicedata(data.message[0].Invoiceitemslist[0]);
          //  setInvoicelist(data.message[0].Invoiceitemslist);
          
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
     }

     



    useEffect(() => {
      // if (type == 'PENDING'){
        getInvoiceDetails()
      // }
    },[])


    return (
        <>
        <Appbar color="white" style={styles.appBar} >
        {/* <Image source={logobk} style={styles.mainLogo} /> */}
        <Appbar.Content
        titleStyle={{alignSelf: 'center'}}
          title={
            <Text style={styles.headerText}> ITEM INVOICES </Text>
          }
          subtitle={''}
        />
        {/* <Appbar.Action icon="calendar" onPress={() => setOpen(true)} color="#f5a04c" /> */}
        {/* <Appbar.Action
          style={{position: 'absolute', top: 5, right: 0}}
          icon="user-circle"
          onPress={() => setOpen(false)}
        /> */}
        {/* <TouchableOpacity onPress={() => goToProfile()}>
        <Image source={profile} style={styles.profileIcon} />
        </TouchableOpacity> */}
            {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
        </Appbar>
        <Text1 style={styles.newtitle}>{currentindx+1}/{invoicelist.length}</Text1>
        {/* <View style={{margin:0, padding:0, borderWidth:1, borderColor:'red', flexDirection: "column",  display: "flex", }}>
            <Text style={styles.title}>VendorItemCode</Text>
            <Text style={styles.subtitle}>{invoicedata.ItemName}</Text>
        </View> */}
        <Card key={'card-'} style={{
          width: '96%', 
          minHeight: 410, 
          margin:7,
          // borderWidth:1, 
          // borderColor:'#eee', 
          borderRadius:10
        }}>
        <View style={styles.animatedBox}>
          
          <View style={{margin:0, padding:0, height: 270,   }}>
            <Text style={styles.title1}>Item Name</Text>
            
            <Text style={styles.title}>VendorItemCode</Text>
            <Text style={styles.titleQuantity}>Quantity Updated</Text>
            <Text style={styles.title}>Price</Text>
            <Text style={styles.title}>Quantity Received</Text>
            <Text style={styles.title}>Comments:</Text>
            
          </View>
          <View  style={{margin:0, padding:0}}>
            <Text style={styles.subtitle1}>{invoicedata.ItemName}</Text>
            <Text style={styles.subtitle}>{invoicedata.VendorItemCode}</Text>
            <Text style={styles.subtitleQuantity}>
              <TextInput
              underlineColorAndroid ='transparent' 
              style={styles.input}
              mode="outlined"
              // label="Email"
              onChangeText={text => changeData(text, 'QuantityUpdated')}
              value={invoicedata.QuantityUpdated}
              placeholder=""
              // right={<TextInput.Icon name="email" />}
              />
            </Text>
            <Text style={styles.subtitle}>{invoicedata.Price}</Text>
            <Text style={styles.subtitleReceived}>{invoicedata.QuantityReceived}</Text>
            <Text style={styles.subtitle}></Text>
            {/* <Paragraph style={styles.subtitle}>Select Default Comments:</Paragraph> */}
          </View>

          
          
        </View>
        <TextInput
              underlineColorAndroid ='transparent' 
              style={styles.inputcomment}
              mode="outlined"
              // label="Email"
              onChangeText={text => changeData(text, 'Comments')}
              value={invoicedata.Comments}
              placeholder=""
              // right={<TextInput.Icon name="email" />}
              />
        <Text style={styles.titlecomment}>Select Default Comments:</Text>
        <View style={styles.animatedBox1}>
        <Button mode="outlined"
          uppercase={false}
          style={{width:88,height:45, marginLeft:5,  backgroundColor:'#F4F6F8'}}  onPress={() => changeData('Short', 'Comments')}>
          <Text>Short</Text>
        </Button>
        <Button mode="outlined"
          uppercase={false} style={{width:98,height:45, marginLeft:8,  backgroundColor:'#F4F6F8'}} raised onPress={() => changeData('Excess', 'Comments')}>
           <Text>Excess</Text>
        </Button>
        <Button mode="outlined"
          uppercase={false} style={{width:118, height:45,marginLeft:8,  backgroundColor:'#F4F6F8'}} raised onPress={() => changeData('Damaged', 'Comments')}>
          
          <Text>Damaged</Text>
        </Button>
        </View>
      </Card>
      <View style={styles.animatedBox2}>
        <Button disabled={isdisablebtn}  style={isdisablebtn ? (styles.previousbtndisabled) : (styles.previousbtn) } onPress={() => goToPrevious()}>
            <Text style={isdisablebtn ? (styles.previousClr) : (styles.previousClrW) }>Previous</Text>
        </Button>
        <Button  style={{width:"47%", height:45,marginLeft:8,  backgroundColor:'#43A047'}} raised onPress={() => goToNext()} >
          <Text style={{color:'#fff'}}>Next</Text>
        </Button>
      </View>
      
      </>
    )
}

export default ItemInvoice;