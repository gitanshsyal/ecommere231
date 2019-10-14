
import React, { Component } from 'react';

import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, FlatList, Image, TouchableOpacity, AsyncStorage, Alert, Modal } from 'react-native';
import { Imgs } from './Imgs';
import { BASEURL } from '..';


var detail
export class Category extends React.Component {
    render() {
        const { name } = this.props
        return (

            <View style={styles.container_item}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {name}

                </Text>


            </View>
        );
    }
}


export default class Details extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            change: true,
            changeview: true,
            additems: 1,

            value: []

        };

    }
    componentDidMount() {

        var detail = this.props.navigation.getParam("ss")
        console.log('detail', detail)
        console.log('detail_name', detail.name)
        AsyncStorage.getItem('detail').then((tt) => {
            console.log('add ho gya', tt);
            console.log('length of data async'+tt.length)
            
            if (tt === 'null') {
                console.log('if conditionh')
                this.setState({
                    value: []
                })
            } else {
                console.log('else conditionh')

                this.setState({ value: JSON.parse(tt) })
            }

            // this.nextmethod()
            // console.log('valueeee',JSON.stringify(value))
            // for (var i = 0; i < value.length; i++) {
            //     console.log('value_id',value[i].id)
            // }


        })



    }
    nextmethod() {
        const { value } = this.state
        console.log('valueeee', JSON.stringify(value))
        for (var i = 0; i < value.length; i++) {
            console.log('value_id',value[i].id)
        
        var nxt_id =value[i].id
        console.log('iddddd',nxt_id)
        if(nxt_id === nxt_id){
            this.state.additems
            console.log('never agin')
        }
        }
    }
    btnchange() {
        this.setState({ change: !this.state.change })
    }
    btnchangeview() {
        console.log('click', detail)
        const { value, additems } = this.state
        detail['quantity'] = additems
        console.log('state array', JSON.stringify(value))
        value.push(detail)
        console.log('state new  array', JSON.stringify(value))

        AsyncStorage.setItem('detail', JSON.stringify(value));
        // AsyncStorage.setItem('additems',additems);


       this.nextmethod()
        this.setState({ changeview: !this.state.changeview })
    }
    add() {
        this.setState({ additems: this.state.additems + 1 });
    }
    sub() {
        this.setState({ additems: this.state.additems - 1 });
        if (this.state.additems == 1) {
            this.setState({ change: !this.state.change })
        }
    }
    clear() {
        AsyncStorage.removeItem('detail');
    }
    render() {
        detail = this.props.navigation.getParam("ss")
        console.log('detail', detail)
        console.log('detail_name', detail.name)
        console.log('image', detail.image)
        console.log('description', detail.description)
        var array = detail.description
        var str = array.split('||')
        for (var i = 0; i < str.length; i++) {
            console.log('dataaaa', str[i])
            // this.setState({ value:str[i] })
        }

        {
            str != null ? str.map(i =>
                console.log('edkhkegfwvbkg', i)

            ) : null
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.40, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: detail.image }}
                        style={{ width: 150, height: 250 }} />
                    <TouchableOpacity onPress={() => { this.clear() }}>
                        <Text style={{ fontSize: 25 }}>
                            clear
                            </Text>

                    </TouchableOpacity>

                </View>
                <View style={{ flex: 0.50, margin: 5, elevation: 5, borderRadius: 20, padding: 20 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.3 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                {detail.name}
                            </Text>
                            <View style={{ flex: 0.01, backgroundColor: 'black', margin: 10 }}>

                            </View>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 0.8 }}>



                                    {
                                        str != null ? str.map(i =>
                                            <Category name={i} />

                                        ) : null
                                    }
                                </View>
                                <View style={{ flex: 0.2, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
                                                Quantity:
                         </Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>



                                            {
                                                this.state.change == true ?


                                                    <TouchableOpacity style={styles.add} onPress={() => { this.btnchange() }}>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 5 }}>
                                                            ADD
                         </Text>

                                                    </TouchableOpacity>

                                                    :



                                                    <TouchableOpacity style={styles.add}>
                                                        <TouchableOpacity style={{ flex: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.add() }}>
                                                            <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                                                                +
                        </Text>

                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                                                                {this.state.additems}
                                                            </Text>

                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ flex: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.sub() }}>
                                                            <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                                                                -
                        </Text>

                                                        </TouchableOpacity>


                                                    </TouchableOpacity>

                                            }


                                        </View>

                                    </View>







                                </View>




                            </View>

                        </View>



                    </View>



                </View>
                <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        this.state.changeview == true ?


                            <TouchableOpacity style={styles.addtocart} onPress={() => { this.btnchangeview() }}>
                                <Text style={{ fontSize: 20, color: "white", textAlign: 'center', fontWeight: 'bold' }}>
                                    ADD to cart
                      </Text>

                            </TouchableOpacity>
                            :
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.addtocart2} onPress={() => { this.props.navigation.navigate('ViewCart') }}>
                                    <Text style={{ fontSize: 20, color: "white", textAlign: 'center', fontWeight: 'bold' }}>
                                        ViewCart
                      </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.addtocart2} onPress={() => { this.props.navigation.navigate('AppDrawerNavigator') }}>
                                    <Text style={{ fontSize: 18, color: "white", textAlign: 'center', fontWeight: 'bold' }}>
                                        Continue Shopping
                      </Text>
                                </TouchableOpacity>
                            </View>


                    }




                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container_item: {
        flex: 1, justifyContent: 'center'
    },
    add: { height: 40, width: 100, backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', flexDirection: 'row', borderWidth: 2, borderColor: 'red' },

    addtocart: { height: 50, width: 200, backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', borderWidth: 2, borderColor: 'red' },

    addtocart2: { height: 50, width: 200, backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', borderWidth: 2, borderColor: 'red', margin: 5 }

})