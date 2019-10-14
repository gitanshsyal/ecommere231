
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
 
import { StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity,Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import {Imgs} from './Imgs'
import { BASEURL } from '..';
var array='';
export default class App extends Component{
  static navigationOptions = () => ({
    title: 'SignUp',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'red'
    },
   
  })
  constructor(props){
    super(props);
    this.state={
      email:'',
     firstname:'',
     lastname:'',
     address:'',
     confirmpassword:'',
      password:'',
      contactno:''
      
    }
  }
  get(){
    const {email,firstname,lastname,password,confirmpassword,contactno,address}=this.state
    let email1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
if(firstname ==null || firstname==''){
  Alert.alert("Please enter your first name")
}
else if(lastname ==null || lastname==''){
  Alert.alert("Please enter your last name ")
}
else if(email ==null || email==''){
  Alert.alert("your email field is empty")
}
else if(email1.test(email)==false){
  Alert.alert("your email is not of correct format")
}
else if(password ==null || password==''){
  Alert.alert("Your password field is missing")
}
else if(password.length<6){
  Alert.alert("your password must be equal 6 characters or more")
}else if(confirmpassword ==null || confirmpassword==''){
  Alert.alert("you need to enter confirm password")
}
else if(confirmpassword != password){
  Alert.alert("you need to match your password")
}
else if(contactno ==null || contactno==''){
  Alert.alert("your need to enter your contact")
}
else if(address ==null || address==''){
  Alert.alert("you need to enter your address details")
}
else{
  fetch(BASEURL+ 'registerCustomer', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    first_name:this.state.firstname ,
    last_name: this.state.lastname,
    address:this.state.address,
    password:this.state.password,
    email:this.state.email,
    contact_no:this.state.contactno
  }),
}).then((response) => response.json())
    .then((responseJson) => {
     console.log("reponse",responseJson)
     this.props.navigation.navigate('Login')
    })
    .catch((error) => {
      console.error(error);
    });
 
}
  }
 componentDidMount(){
   SplashScreen.hide()
   
 }
  render() {
    
    return (
      <View style={styles.container}>

 <View
 style={styles.container2}
 >
   <Image
   source={Imgs.logo}
   style={[styles.container2image]}
   ></Image>

 </View>
 <View
 style={styles.containermain}
 >
<Container
style={{flex:0.9,backgroundColor:'#F0FFFF',borderRadius:12,margin:6}}
>
                                <Content>
                                    <Form>
                                        <Item floatingLabel
                                       
                                        >
                                            <Label>First Name</Label>
                                            <Input
                                              // style={styles.float}
                                                autoCapitalize="none"
                                                onChangeText={firstname => this.setState({ firstname })}
                                                value={this.state.name}
                                            />
                                        </Item> 
                                        <Item floatingLabel>
                                            <Label>Last name</Label>
                                            <Input
                                              // style={styles.float}
                                         //     keyboardType="name-phone-pad"
                                                autoCapitalize="none"
                                                onChangeText={lastname => this.setState({ lastname })}
                                                value={this.state.lastname}
                                            />
                                        </Item> 
                                        <Item floatingLabel>
                                            <Label>Your E-mail Address</Label>
                                            <Input
                                            //   style={styles.float}
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                                onChangeText={email => this.setState({ email})}
                                                value={this.state.email}
                                            />
                                        </Item> 
                                        <Item floatingLabel>
                                            <Label>Choose your Password</Label>
                                            <Input
                                            //   style={styles.float}
                                            secureTextEntry
                                                autoCapitalize="none"
                                                onChangeText={password => this.setState({ password })}
                                                value={this.state.password}
                                            />
                                        </Item> 
                                        <Item floatingLabel>
                                            <Label>Confirm Your Password</Label>
                                            <Input
                                            //   style={styles.float}
                                           // keyboardType="visible-password"
                                            secureTextEntry
                                                autoCapitalize="none"
                                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                                                value={this.state.confirmpassword}
                                            />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Contact No</Label>
                                            <Input
                                            //   style={styles.float}
                                             keyboardType = 'number-pad'
                                                autoCapitalize="none"
                                                onChangeText={contactno=> this.setState({ contactno })}
                                                value={this.state.contactno}
                                            />
                                        </Item> 
                                        <Item floatingLabel>
                                            <Label>Enter your Address</Label>
                                            <Input
                                            //   style={styles.float}
                                                autoCapitalize="none"
                                                onChangeText={address=> this.setState({ address })}
                                                value={this.state.address}
                                            />
                                        </Item> 
                                        </Form>
                                       
                                        </Content>
                                        
                                        </Container>
                                        <TouchableOpacity
                                        onPress={()=>this.get()}
                                
                                        style={{flex:0.1,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:10}}
                                        >
                                          <Text
                                          style={{fontSize:20,fontWeight:'bold',color:'white'}}
                                          >Signup to Proceed</Text>
                                        </TouchableOpacity>
                                        
 </View>
       
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  container1:{
    flex:0.1,backgroundColor:'red',justifyContent:'center',alignItems:'center'
  },
  headertext:{
    color:'white',fontSize:20,fontWeight:'bold'
  },
  container2:{
   flex:0.15,justifyContent:'center',alignItems:'center'
  },
  container2image:{
  height:100,width:100
  },
  float:{
borderColor:'black',borderRadius:10,borderWidth:4,flex:0.2,alignSelf:'center'
  },containermain:{
    flex:0.85,margin:10
  },
 
});