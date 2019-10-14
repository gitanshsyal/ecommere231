
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
    ImageBackground,
    KeyboardAvoidingView,AsyncStorage
} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Imgs } from './Imgs';
import { BASEURL } from '..';


export default class Forgetpassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }
    otpconfirm() {
        const{email}=this.state
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email ==null || email=='' ){
            Alert. alert('Please input the email');
        }
          else if (reg.test(this.state.email) === false){
            Alert. alert('Please Vaild email');
           }
           else{
          //  this.props.navigation.navigate('Otpconfirm')
          AsyncStorage.getItem('token').then((token) => {
            userToken = token
            console.log("tokenmain", userToken)
          //  console.log("email",email)
            fetch(BASEURL+'CustomerForgotPassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+userToken
                },
                body: JSON.stringify({
                    email: email,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log("reponse",responseJson.otp)
                    this.props.navigation.replace('Otpconfirm',{no:responseJson.otp,email:email})

                })
                .catch((error) => {
                    console.error(error);
                })
         // let formData = new FormData();
              
                  
                })
           }
       
    }
    static navigationOptions = () => ({
        title: 'Forget Password',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red'
        },
       
      })
    render() {
        return (
            <View style={{ flex: 1 }}>
    
                <View style={{ flex: 0.6,justifyContent:'center',alignItems:'center'}}>
                <Image style={{ height: 310, width: '100%' }}
              source={Imgs.back}
            />
                <Text style={{marginVertical:10, fontSize:20,color:'black',textAlign:'center',fontWeight:'bold'}}>
                       Forgetpassword?
                    </Text>
                    <Text style={{fontSize:17,color:'black',textAlign:'center'}}>
                       Please Enter Your Vaild Email Address..
                    </Text>

                </View>
                <View style={styles.container}>
                    <Container>
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input
                                        style={{fontSize:20}}
                                        autoCapitalize="none"
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                    />
                                </Item>

                            </Form>
                        </Content>
                    </Container>



                   


                </View>
                <View style={{ flex: 0.2,justifyContent:'flex-start',alignItems:'center'}}>
                <TouchableOpacity style={{height:60,width:180, borderRadius:30,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onPress={() => this.otpconfirm()}>
                        <Text style={{fontSize:20,color:'white',textAlign:'center',fontWeight:'bold'}}>
                            Reset
                    </Text>

                    </TouchableOpacity>

                </View>
               

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 0.2,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      elevation: 10,
      shadowRadius: 10,
      shadowOpacity: 3.0
    }
  })
  