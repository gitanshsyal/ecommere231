import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,AsyncStorage
} from 'react-native';
import {Imgs} from './Imgs'
class Custom extends React.Component{

  render(){
    const {name,customcolor,images}=this.props
    return(
      <View
      style={{flex:0.15}}
      >
        <TouchableOpacity
        onPress={()=>this.props.UniqueFunction()}
      style={{flex:0.9,backgroundColor:customcolor,flexDirection:'row'}}
      >
        <View
        style={{flex:0.2,justifyContent:'center',alignItems:'center'}}
        >
          <Image
          source={images}
          style={{height:30,width:30,padding:10}}
          ></Image>
        </View>
        <View
        style={{flex:0.8,justifyContent:'center',marginHorizontal:8}}
        >
             <Text
        style={{fontSize:23,color:'red',fontWeight:'bold'}}
        
        >{name}</Text>
        </View>
     
      </TouchableOpacity>
      
      <View
      style={{flex:0.01,backgroundColor:'white'}}
      ></View>
      </View>
     
    )
  }
}
export default class DrawerComponent extends React.Component{
  
  signout(){
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Homescreen')
    
  }
    render(){
        console.log('dRAWER PROPS>>',(this.props.navigation))
      return(
        <View
        style={styles.container}
        >
            <View
            style={styles.header}
            >
                 <View
              style={styles.headerimage}
            >
              <Image
              style={styles.headerimagesize}
              ></Image>
            </View>
            <View
            style={styles.header2}
            >
              <View
               style={styles.headername}
              >
                <Text
                style={[styles.headernametext,{padding:5}]}
                >Gitansh</Text>
              </View>
              <View
               style={[styles.headername,{justifyContent:'flex-start'}]}
              >
                <Text
                style={[styles.headeremailtext,{margin:3}]}
                >gitanshsyal@gmail.com</Text>
              </View>
            </View>
            </View>
            
           <View
           style={{flex:0.7}}
           >
             <Custom
             name="Home"
             images={Imgs.homeicon}
             customcolor="transparent"
             UniqueFunction={() => this.props.navigation.navigate('Mainscreen')}
             />
             <Custom
             name="My Profile"
             customcolor="transparent"
             images={Imgs.profileicon}
             UniqueFunction={() =>{
              this.props.navigation.navigate('Profile')
             } 
      
            }
             />
             <Custom
             name="My Order"
             images={Imgs.logo}
             customcolor="transparent"
             UniqueFunction={() => this.props.navigation.navigate('Order')}
             />
             <Custom
             name="About us"
             images={Imgs.abouticon}
             customcolor="transparent"
             UniqueFunction={() => this.props.navigation.navigate('About')}
             />
             <Custom
             name="Contact us"
             images={Imgs.contacticon}
             customcolor="transparent"
             UniqueFunction={() => this.props.navigation.navigate('Contact')}
             />
             <Custom
             name="Logout"
             images={Imgs.logouticon}
             customcolor="transparent"
             UniqueFunction={() => 
           this.signout()
             

             }
             />
           </View>
        </View>
      )
    }
  }
  const styles=StyleSheet.create({
container:{
    flex:1,backgroundColor:'#F0F0F0'
},
header:{
    flex:0.25,backgroundColor:'red',flexDirection:'row'
},
headerimage:{
    flex:0.40,justifyContent:'center',alignItems:'center'
},
headerimagesize:{
height:100,width:100,borderRadius:50,backgroundColor:'white'
},
header2:{
  flex:0.60,flexDirection:'column'
},
headername:{
flex:0.5,alignItems:'center',justifyContent:'flex-end'
},
headernametext:{
color:'white',fontSize:18,fontWeight:'bold'
},
headeremailtext:{
  color:'white',fontSize:14,fontWeight:'200'
  },
 
  })