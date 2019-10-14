
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



export default class Forgetpassword extends React.Component {
    static navigationOptions = () => ({
        title: 'OTP Confirm',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red'
        },
       
      })
    constructor(props) {
        super(props);
        this.state = {
            number: ''
        };
    }
    otpconfirm() {
        let otpno= this.props.navigation.getParam("no")
        let email= this.props.navigation.getParam("email")
       console.log("email",email)
       if (this.state.number==otpno){
           console.log('Im good boy')
         
           this.props.navigation.navigate('Restpassword',{otp:otpno,email:email})
       }
       else{
           Alert.alert("Sorry Wrong Otp")
       }
       
    }
    render() {
     
        return (
            <View style={{ flex: 1,backgroundColor:'#efece1' }}>
                <View style={{ flex: 0.4,justifyContent:'center',alignItems:'center'}}>
                <Image style={{ height: 150, width:'100%' }}
              source={Imgs.loader}
            />
                <Text style={{fontSize:25,color:'black',textAlign:'center',fontWeight:'bold'}}>
                       Enter Your Confirm OTP
                    </Text>

                </View>
                <View style={styles.container}>
                    <Container>
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>OTP</Label>
                                    <Input
                                        style={{fontSize:20}}
                                        autoCapitalize="none"
                                        keyboardType="number-pad"
                                        onChangeText={number => this.setState({ number })}
                                        value={this.state.number}
                                    />
                                </Item>

                            </Form>
                        </Content>
                    </Container>



               


                </View>
                <View style={{ flex: 0.4,justifyContent:'flex-start',alignItems:'center'}}>
                <TouchableOpacity style={{height:60,width:180, borderRadius:30,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onPress={() => this.otpconfirm()}>
                        <Text style={{fontSize:20,color:'white',textAlign:'center',fontWeight:'bold'}}>
                        Confirm
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
      shadowRadius: 5,
      shadowOpacity: 1.0
    }
  })
  