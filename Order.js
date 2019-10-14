
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
 
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity ,Alert} from 'react-native';
import {Customheader} from './Mainscreen'
export default class Order extends Component{
 constructor(props){
   super(props);
   this.state={
     data:''
   }
 }
  render() {
   
   
    return (
    
      <View style={styles.container}>
        {
          this.state.data == ' ' ?  <View
          style={styles.container}
          > 
          <Text>hello</Text> </View>
          :
          <View
          style={{flex:1}}
          >         
          <Customheader
          headername="My Orders"
          unique={() =>this.props.navigation.openDrawer()}
          />
         <View
         style={{flex:0.3,backgroundColor:'red'}}
         ></View>
         <View
         style={{position:'absolute',backgroundColor:'blue',height:120,width:'80%',borderRadius:12,top:200}}
         
         >
         <TouchableOpacity
         onPress={()=>Alert.alert("hello")}
         style={{height:10,width:10,backgroundColor:'red',position:'absolute',top:20}}
         ></TouchableOpacity>
         </View>
          </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  }
});