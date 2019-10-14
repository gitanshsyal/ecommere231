

import React, { Component } from 'react';
 
import { StyleSheet, Text, View,ImageBackground,Image,Linking,Platform,TouchableOpacity,TextInput } from 'react-native';
import {Customheader} from './Mainscreen'
import {Imgs}  from './Imgs'
//import { Container, Content, Form, Item, Input, Label } from 'native-base';
class Contactcustom extends React.Component{
    render(){
        return(
            <View
            style={{flex:0.2,flexDirection:'row'}}
            >
                <View
                style={{flex:0.2,backgroundColor:'green'}}
                >
                   
                </View>
            </View>
        )
    }
    
}
export default class Contact extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      phone:'',
      comment:''
    }
  }
    dialCall = (number) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
       else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
   
     };
  render() {
    
    return (
      <View style={styles.container}>
 <Customheader
 headername="Contact Us"
 unique={() =>this.props.navigation.openDrawer()}
 />
  <View
  style={styles.gifcontainer}
  >
      <Image
      source={Imgs.contactgif}
      style={[styles.gifsize,{width:'100%',padding:10}]}
      ></Image>
  </View>
  <View
  style={styles.secondview}
  > 
   <View
   style={styles.itemsview}
   >
       <TextInput  
                    style={styles.input}  
                    placeholder="Your email address"  
                    underlineColorAndroid="black"
                    onChangeText={(email) => this.setState({email})}  
                />
   </View>
   <View
   style={styles.itemsview}
   >
       <TextInput  
                    style={styles.input}  
                    placeholder="Your phone number"  
                    underlineColorAndroid="black"
                    onChangeText={(phone) => this.setState({phone})}  
                />
   </View>
   <View
   style={[styles.itemsview,{flex:0.3,borderRadius:10,borderColor:'black',borderwidth:5}]}
   >
       <TextInput  
                    style={styles.input}  
                    placeholder="Your Comments"  
                    underlineColorAndroid="black"
                    onChangeText={(comment) => this.setState({comment})}  
                />
   </View>
   <TouchableOpacity
   style={[styles.itemsview,{justifyContent:'center',alignItems:'center'}]}
   >
     <Text
     style={{fontSize:22,fontWeight:'bold'}}
     >Contact us</Text>
   </TouchableOpacity>
      
    
  </View>
  <View
                   style={styles.thirdview}
                 
                >
                <Text
                onPress={()=>{this.dialCall(9876543210)}}
                style={{padding:10,fontSize:25,color:'red',fontWeight:'bold',fontStyle:'italic'}}
                > --> HELP</Text>
                </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  gifcontainer:{
      flex:0.55
  },
  gifsize:{
      flex:1
  },
  secondview:
  {flex:0.30,margin:10,borderColor:'black',borderRadius:10,borderWidth:2},
  itemsview:
    {flex:0.3,justifyContent:'center',alignItems:'center'},
    input:{
      flex:1,backgroundColor: 'azure', fontSize: 20,width:'100%'},
   thirdview:{
     flex:0.15,justifyContent:'center',alignItems:'flex-end'
   }
    
  
});