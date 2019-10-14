
import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Imgs } from './Imgs';
import { BASEURL } from '..';

export default class Restpassword extends React.Component {
    static navigationOptions = () => ({
        title: 'New Password',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red'
        },
       
      })
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            confirmpassword:'',
            email:''
        };
    }
    componentDidMount(){
        let email1= this.props.navigation.getParam("email")
        this.setState({
            email:email1
        })
    }
    submit() {
        const { newpassword, confirmpassword,email } = this.state;
        // perform all neccassary validations
       
        //console.log("otpno",otpno)
        if(email == null || email==''){
            Alert.alert("Your email field is missing")
        }
       else  if(newpassword ==null || newpassword==''){
            Alert.alert("Your password field is missing")
          }
          else if(newpassword.length<6){
            Alert.alert("your password must be equal 6 characters or more")
          }else if(confirmpassword ==null || confirmpassword==''){
            Alert.alert("you need to enter confirm password")
          }
         else if (newpassword != confirmpassword) {
            Alert.alert("Passwords don't match");
         }
        
        else{
            let otpno= this.props.navigation.getParam("otp")
           
            console.log("email1",this.state.email)
          //  console.log("email",email1)
            fetch(BASEURL+'ChangePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+userToken
                },
                body: JSON.stringify({
                    email:this.state.email,
                    otp:otpno,
                    password:this.state.newpassword,
                    c_password:this.state.confirmpassword

                   


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
              //    console.log("reponse",responseJson.otp)
                //    this.props.navigation.replace('Otpconfirm',{no:responseJson.otp},{email})
                Alert.alert("Passwords is match");
                console.log("reponse",responseJson)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
       
    
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#f2efe1' }}>
                <View style={{ flex: 0.35,justifyContent:'center',alignItems:'center'}}>
                <Image style={{ height: 170, width:'100%' }}
              source={Imgs.gear}
            />
                <Text style={{fontSize:25,color:'black',textAlign:'center',fontWeight:'bold'}}>
                       Enter Your New Password
                    </Text>

                </View>
                <View style={styles.container}>
                    <Text>{this.state.email}</Text>
                    <Container>
                        <Content>
                            <Form>
                            
                                <Item floatingLabel>
                                    <Label>New Password</Label>
                                    <Input
                                     secureTextEntry
                                        style={{fontSize:20}}
                                        autoCapitalize="none"
                                        onChangeText={newpassword => this.setState({ newpassword })}
                                        value={this.state.newpassword}
                                    />
                                </Item>
                                <Item floatingLabel last>
                                            <Label>Confirm Password</Label>
                                            <Input
                                                secureTextEntry
                                                // style={styles.textInput}
                                                autoCapitalize="none"
                                                // placeholder="Password"
                                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                                                value={this.state.confirmpassword}
                                            />
                                        </Item>

                            </Form>
                        </Content>
                    </Container>
                    



                </View>
                <View style={{ flex: 0.35,justifyContent:'flex-start',alignItems:'center'}}>
                <TouchableOpacity style={{height:60,width:180, borderRadius:30,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onP onPress={() => this.submit()}>
                        <Text style={{fontSize:20,color:'white',textAlign:'center',fontWeight:'bold'}}>
                        Submit
                    </Text>

                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 0.3,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      elevation: 5,
      shadowRadius: 5,
      shadowOpacity: 1.0
    }
  })
  /*
  let array=[
      {
          subCategory_id:1,
          subCategory_name:'SamSung',
          items:[
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },

              },
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
              },
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
                  {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
              }
              },
          ]
      },
         {
          subCategory_id:1,
          subCategory_name:'SamSung',
          items:[
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },

              },
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
              },
              {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
                  {
                  item_id:1,
                  item_details:{
                      item_name:''
                  },
                  
              }
              },
          ]
      }
  ]
  
  
  
  
  
  */