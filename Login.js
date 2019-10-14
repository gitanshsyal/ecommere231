
import React, { Fragment } from 'react';
import {

    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView, Keyboard, AsyncStorage
} from 'react-native';


import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Button } from './Homescreen'
import { Imgs } from './Imgs'
import SplashScreen from 'react-native-splash-screen';
import { BASEURL } from '..';

export default class App extends React.Component {


    static navigationOptions = () => ({
        title: 'Login',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'red'
        },

    })
    constructor(props) {
        super(props)
        this.state = { email: '', password: '' }
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    forgetpassword() {
        this.props.navigation.navigate('Forgetpassword')
    }
    login() {
        Keyboard.dismiss();
        console.log("email", this.state.email)

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.email == null || this.state.email == '') {
            Alert.alert("Your email field is missing")
        }
        else if (reg.test(this.state.email) === false) {
            // this.props.navigation.replace('AppDrawerNavigator')
            Alert.alert("Your email field is not of correct format")
        }
        else if (this.state.password == null || this.state.password == '') {
            Alert.alert("Your password field is missing")
        }
        else if (this.state.password.length < 6) {
            Alert.alert("your password must be equal 6 characters or more")
        }
        else {

            fetch(BASEURL + 'login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status == 200) {
                        console.log("reponse", responseJson)
                        console.log("token", responseJson.success.token)
                        var token = responseJson.success.token
                        AsyncStorage.setItem('token', token);
                        this.props.navigation.replace('AppDrawerNavigator')
                    } else {
                        Alert.alert('Please check your email and Password')
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }

        // this.props.navigation.replace('AppDrawerNavigator')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 100, width: 100 }}
                                source={Imgs.logo} />

                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Container>
                                <Content>
                                    <Form>
                                        <Item floatingLabel>
                                            <Label>Username</Label>
                                            <Input
                                                // style={styles.textInput}
                                                autoCapitalize="none"
                                                onChangeText={email => this.setState({ email })}
                                                value={this.state.email}
                                            />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Label>Password</Label>
                                            <Input
                                                secureTextEntry
                                                // style={styles.textInput}
                                                autoCapitalize="none"
                                                // placeholder="Password"
                                                onChangeText={password => this.setState({ password })}
                                                value={this.state.password}
                                            />
                                        </Item>
                                    </Form>
                                </Content>
                            </Container>
                        </View>
                        <TouchableOpacity style={{ flex: 0.1 }} onPress={() => this.forgetpassword()}>
                            <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', color: 'red' }}>
                                Forget Password?

                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.3 }}>
                            <View style={{ flex: 1 }}>
                                <Button name="Sigin"
                                    colortxt="red"
                                    navigationProp={this.props.navigation}
                                    colorborder="red"
                                    UniqueFunction={() => this.login()}
                                    color="white"
                                />
                            </View>



                        </View>
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>
                                Or Connect With

                            </Text>


                        </View>
                        <View style={{ flex: 0.3 }}>

                        </View>
                        <View style={{ flex: 0.3 }}>

                        </View>

                    </View>

                </View>

            </View>
        );
    }
}