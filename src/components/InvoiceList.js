import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {Appbar, Card, Avatar, Paragraph, Text, IconButton} from 'react-native-paper';



const styles = StyleSheet.create({
  animatedBox: {
    flex: 1,
    flexDirection: "row", 
    display: "flex",
    shadowColor: "black",
    borderRadius:15,
    width:'100%',
    paddingLeft:10
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
    fontWeight:'bold',
    color:'#747679',
    marginTop:10, 
    marginLeft:5,
    // width:'100%'\
    width:140,
  },
  subtitle: {
    fontSize:16, 
    color:'#aaabae',
    // margin:10, 
    paddingTop:12,
    // marginLeft:5, 
    // width:200,
    // borderColor:'red',
    // borderWidth:1,
    textAlign:"center",
    marginLeft:'auto',
    marginRight:'auto',
    alignSelf: 'center'
  },
  icon:{position: 'absolute', right: -7, top: 10, fontSize:38}
  
});

const InvoiceList = ({invoice, SupplierId, type}) => {
    const navigation = useNavigation();
    // const [invoicedata, setInvoicedata] = React.useState(invoice);

    
    return (

        <>
        
        
        <Card key={'card-'} style={{
          width: '96%', 
          minHeight: 95, 
          margin:7,borderWidth:1, 
          borderColor:'#eee', 
          borderRadius:10
        }}>
            {/* <Text>test</Text> */}
        <TouchableOpacity  style={styles.animatedBox} onPress={() => navigation.navigate('iteminvoice', invoice)}> 
          {/* <Image source={image} style={styles.leftImage} /> */}
          <View>
            <Text style={styles.title}>InvoiceId</Text> 
            <Text style={styles.title}>Quantity</Text> 
          </View>
          <View>
              {invoice != undefined && (
                <>
                  <Paragraph style={styles.subtitle}>{invoice.InvoiceID}</Paragraph>
                  <Paragraph style={styles.subtitle}>{invoice.Itemscount}</Paragraph>
                </>
            )}
          </View>
          {/* <IconButton
            style={styles.icon}
            color="grey"
            size={36}
            icon="chevron-right"
            
          /> */}
        </TouchableOpacity>
      </Card>
      {/* {invoicedatalist.map((item, index) => {
      })} */}
      </>
    )
}

export default InvoiceList;