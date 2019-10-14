
import React, { Component } from 'react';

import { StyleSheet, Text, View, Alert, ImageBackground, AsyncStorage, ActivityIndicator, FlatList, Image, TouchableOpacity, Modal } from 'react-native';

import { Imgs } from './Imgs';
let category_name = '', category_id = '';
import { BASEURL } from '..';

var total_price = []
var sum = 0
var userToken=''
export default class ViewCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      categorylist: '',
      loading: true,
      ss: 0,
      ch: [],
      order:{},
      order_list:[]

      // data:
      //   [
      //     {
      //       id: 0, name: 'Svmsung', description: 'good 64 gb Ram '
      //     },


      //     { id: 1, name: 'Nokia', description: 'good 64 gb Ram ' },

      //     { id: 2, name: 'Mi', description: 'good 64 gb Ram ' },

      //     { id: 3, name: 'Lava', description: 'good 64 gb Ram ' },

      //     { id: 4, name: 'Appo', description: 'good 64 gb Ram ' },


      //   ],
    }

  }



  componentDidMount() {



    AsyncStorage.getItem('detail').then((list) => {
      console.log('good job', list)
      console.log('Get in Array',JSON.parse(list))
      var list_parse= JSON.parse(list)
      console.log('list_parse',list_parse)
      AsyncStorage.getItem('token').then((token) => {
        var  userToken=token
          console.log("tokenmain",userToken)
 
          })
    
      for(i=0;i<list_parse.length;i++){
        console.log('category_id',list_parse[i].id)
        console.log('subcategory_id',list_parse[i].subcategory_id)
        console.log('quantity',list_parse[i].quantity)
        
       this.state.order_list.push(
          {
            'subacategory_id':list_parse[i].subcategory_id,
            "item_id":list_parse[i].id,
            'quantity':list_parse[i].quantity
          }
        )
    
        console.log('order_list',this.state.order_list)

      }


      this.setState({ ch: JSON.parse(list) })
      console.log('name', this.state.ch)
      for (var i = 0; i < this.state.ch.length; i++) {
        console.log('cchhcchh', this.state.ch[i].price)
        var pri = this.state.ch[i].price
        console.log('price', pri)
        console.log('quanty', this.state.ch[i].quantity)
        var qty = this.state.ch[i].quantity
        console.log('qty', qty)
        total_price = parseInt(qty) * parseInt(pri)
        console.log('total price', total_price)
        sum += total_price

        console.log('sum', sum)
        this.setState({ ss: sum })

        console.log('ss', this.state.ss)

      }


    })

    AsyncStorage.getItem('address').then((address) => {
  
        console.log("address",address)

        })


  }
  remove(item, index) {
    const { ch } = this.state
    console.log("delete message!");
    console.log(item);
    index = this.state.ch.indexOf(item.item);
    console.log(index);
    for (let i = 0; i < ch.length; i++) {
      if (ch[i].id == item.item.id) {
        ch.splice(i, 1);
      }
    }
    console.log('ch is ' + JSON.stringify(ch))
    // let newList = this.state.ch.splice(index,1);
    // console.log(newList);
    this.setState({
      ch

    });
    AsyncStorage.setItem('detail', JSON.stringify(ch))
  }

  placeorder(){

   // let formData = new FormData();
   fetch(BASEURL + 'storeorder',
   {
       method: 'POST',
       headers:
       {
           'Authorization': 'Bearer '+userToken
       },
       body: JSON.stringify({
        id: this.state.order_list,

       


    }),
   })
   .then(response => response.json())
   .then(data => {
     this.setState({
       loading: false,
       info: data.data
    
      })
      console.log('info',this.state.info)
   })
   .catch(error => {
       console.log('error', error);
   });
  }

  renderitem(item, index) {

    console.log('itemmmmm', item)
    //  total_price=parseInt(item.item.quantity) * parseInt(item.item.price)
    //  console.log('total price',total_price )
    //  sum += total_price
    // this.hhh()
    // console.log('sum',sum)


    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: '#F5F5F5', margin: 4, borderRadius: 18, elevation: 5 }}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.4, justifyContent: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{ uri: item.item.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }} />
                </View>
                <View style={{ flex: 0.7, marginTop: 15 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
                    {item.item.name}
                  </Text>

                </View>

              </View>



            </View>
            <View style={{ flex: 0.1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                {item.item.quantity}

              </Text>

            </View>
            <View style={{ flex: 0.15, justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
                ₹ {item.item.price}

              </Text>

            </View>
            <View style={{ flex: 0.25, justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
                ₹ {parseInt(item.item.quantity) * parseInt(item.item.price)}

              </Text>

            </View>
            <TouchableOpacity onPress={() => { this.remove(item, index) }} style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: 'red', borderRadius: 50, paddingHorizontal: 5 }}>
                X
              </Text>

            </TouchableOpacity>



          </View>


        </View>



      </View>

    )
  }

  render() {

    return (
      <View style={styles.container}>
        <View
          style={{ flex: 0.1, flexDirection: 'row' }}
        >
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'lightgray' }}>
            <View style={{ flex: 0.4, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Products

              </Text>

            </View>
            <View style={{ flex: 0.1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Qyt

              </Text>

            </View>
            <View style={{ flex: 0.15, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Price

              </Text>

            </View>
            <View style={{ flex: 0.25, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Total

              </Text>

            </View>
            <View style={{ flex: 0.1 }}>

            </View>



          </View>



        </View>
        {this.state.categorylist != null ? <View
          style={{ flex: 0.8 }}
        >

          <FlatList style={{ margin: 5 }}


            data={this.state.ch}
            keyExtractor={(item, index) => index}
            renderItem={(item) => this.renderitem(item)}
            extraData={this.state}
          />

        </View> : <Text>Sorry no data</Text>
        }

        <View style={{ flex: 0.1, elevation: 50, backgroundColor: '#FFFAFA' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold' }}>
                ₹ {this.state.ss}

              </Text>

            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity onPress={()=>{this.placeorder()}} style={styles.placeorder}>
                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                  Place Order

                </Text>

              </TouchableOpacity>


            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  placeorder: { height: 50, width: 200, backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', borderWidth: 2, borderColor: 'red', margin: 5 }
});