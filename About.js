
// import React, {Fragment} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';



// export default class App extends React.Component{
 
//     static navigationOptions = {
//         title: 'Signup',
//       };
//     render(){
//       return(
//   <View>
  
//   </View>
//       );
//     }
//   }

/////////////////////////////////////////////////////////

import React, { Component } from 'react';
 
import { StyleSheet, Text, View,ImageBackground,Image,ScrollView } from 'react-native';
import {Customheader} from './Mainscreen'
import{Imgs} from './Imgs'
export default class About extends Component{
 
  render() {
    
    return (
      <View style={styles.container}>
 <Customheader
 headername="About Us"
 unique={() =>this.props.navigation.openDrawer()}
 />
 <View
 style={styles.gifcontainer}
 >
     <Image
     source={Imgs.aboutgif}
     style={[styles.gifsize,{width:'100%'}]}
     ></Image>
 </View>
   <View
style={{flex:0.65,justifyContent:'center',alignItems:'center'}}
   >
       <Text
       style={{textAlign:'center',fontSize:20,fontStyle:'italic',fontWeight:'bold'}}
       >
       All of us love to do online shopping as in this tech world who does not want to get his/her work done while sitting comfortably at home? Shopping and buying necessities have been made less time consuming, less expensive and much easier and comfortable for us by online e-commerce platforms. It could not have been possible if these e-commerce platforms were not available. One of these major platforms is Online E-commerce which is grabbing a larger share of the e-commerce market.It is a platform where you can buy anything from anywhere.Our Moto is 'Come,Buy and Come again'.For us,maintaining trust of our employees is the most priority.


       </Text>
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
      flex:0.35
  },
  gifsize:{
      flex:1
  }
});