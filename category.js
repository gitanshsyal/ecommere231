
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

import { StyleSheet, Text, View, ImageBackground,ActivityIndicator, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Imgs } from './Imgs';
let category_name = '', category_id = '';
import { BASEURL } from '..';


var sublist

export default class category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      categorylist: '',
      loading: true,
      modalVisible: false,
      subcategoryname:'',
      data:
       [
        {
          id: 0, name: 'Svmsung', url: Imgs.slider5,
          items: [
            {
              id: 1, name: 'Samsung s7'
            },
            {
              id: 2, name: 'Samsung s8'
            },
            {
              id: 3, name: 'Samsung s9'
            },
            {
              id: 4, name: 'Samsung s10'
            }
          ]
          ,
        }, {

          id: 1, name: 'Nokia', url: Imgs.slider5,
          items: [
            {
              id: 1, name: 'Nokia s7'
            },
            {
              id: 2, name: 'Nokia s8'
            },
            {
              id: 3, name: 'Nokia s9'
            },
            {
              id: 4, name: 'Nokia s10'
            }
          ]
          ,
        },
        {
          id: 2, name: 'Mi', url: Imgs.slider5,
          items: [
            {
              id: 1, name: 'Samsung s7'
            },
            {
              id: 2, name: 'Samsung s8'
            },
            {
              id: 3, name: 'Samsung s9'
            },
            {
              id: 4, name: 'Samsung s10'
            }
          ]
          ,
        },
        {
          id: 3, name: 'Lava', url: Imgs.slider5,
          items: [
            {
              id: 1, name: 'Samsung s7'
            },
            {
              id: 2, name: 'Samsung s8'
            },
            {
              id: 3, name: 'Samsung s9'
            },
            {
              id: 4, name: 'Samsung s10'
            }
          ]
          ,
        },
        {
          id: 4, name: 'Appo', images: require('../src/images/slider1.jpg'),
          items: [
            {
              id: 1, name: 'Samsung s7'
            },
            {
              id: 2, name: 'Samsung s8'
            },
            {
              id: 3, name: 'Samsung s9'
            },
            {
              id: 4, name: 'Samsung s10'
            }
          ]
          ,
        },
      ],
    }

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  detail(j){
    this.props.navigation.navigate('Details',{ss:j})
    // this.props.navigation.navigate('Details')
  }
  componentDidMount() {
    category_id = this.props.navigation.getParam("id")
    category_name = this.props.navigation.getParam("name")
    console.log('category_id', category_id)
    console.log('category_name', category_name)
    this.setState({ name: category_name })
    console.log("api is", BASEURL + 'viewitem')
    fetch(BASEURL + 'viewitem', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  'Authorization': 'Bearer '+userToken
      },
      body: JSON.stringify({
        category_id: category_id

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
       
        console.log("reponse", responseJson)
        this.setState({ categorylist: responseJson.data, loading: false, })
        console.log("flatdata", this.state.categorylist)
        for(let i=0;i<this.state.categorylist.length;i++){
          console.log("categoryname",this.state.categorylist[i].name)
          console.log("subbbbbb",this.state.categorylist[i].item)
           sublist=this.state.categorylist[i].item
          for (let j=0;j<sublist.length;j++){
            console.log('good job',sublist[j].name)
           
          
          }
         
        }
      

      })
      .catch((error) => {
        console.error(error);
      })

  }
  renderitem(item) {
    console.log("lolololo", item.item.name)
    // const list = item.item.name
    console.log("lololo image", item.item.image)
    // const image = item.item.image
     console.log("subitem", item.item.item)

    
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 100, width: '100%', backgroundColor: '#EDEAE0', margin: 4, borderRadius: 18, elevation: 5 }}>

          {/* {
 image==null?
 <Image source={Imgs.profileicon}  
 style={{width: 60, height: 60}} />
 :
 <Image source={{uri:image}}  
 style={{width: 60, height: 60}} />
} */}
          <View
            style={{ flex: 1, flexDirection: 'row' }}
          >
            <View
              style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}
            >
              <Image
                source={{uri:item.item.image}}  
                style={styles.image} />
            </View>
            <View
              style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {item.item.name}
              </Text>
            </View>
          </View>



        </View>


        <View style={{ flex: 1}}>
          {
            item.item.item != null ? item.item.item.map(j =>
              <TouchableOpacity style={{flex:1,backgroundColor:'#F5F5F5',margin:5,padding:10,borderRadius:15,elevation:5,flexDirection:'row'}}
                onPress={() => this.detail(j)}
              >
                <View style={{flex:0.2}}>
                <Image
                 source={{uri:j.image}}  
                style={styles.image} />
                </View>

                <View style={{flex:0.5}}>
                <Text
                  style={{fontSize:18,fontWeight:'bold', color: 'black' }}
                >{j.name}</Text>
              
               
                </View>
                <View style={{flex:0.3}}>
                  <Text style={{fontSize:15,fontWeight:'bold',textAlign:'right'}}>
                  ₹ {j.price}
                  </Text>

                </View>
                  
               
              </TouchableOpacity>
            ) : null
          }
        </View>

      </View>

    )
  }
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    console.log("name", category_name)
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}

          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1, backgroundColor: '#EDEAE0', margin: 10, borderRadius: 20, marginTop: 26 }}>
            <View
              style={{ flex: 0.1, flexDirection: 'row' }}
            >
              <View
                style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}
              >
                <Text
                  style={{ fontSize: 29, fontWeight: 'bold' }}
                >{category_name}</Text>
              </View>

              <TouchableOpacity
                style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{backgroundColor:'black',padding:8,borderRadius:100, fontSize: 18, fontWeight: 'bold',color:'white' }}>X</Text>
              </TouchableOpacity>




            </View>
          </View>
        </Modal>
        <View
          style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 30, fontWeight: 'bold' }}
              >{category_name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => { this.setModalVisible(true) }}
              style={{ flex: 0.2 }}>
              <Image source={Imgs.logo} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>


          </View>



        </View>
        {this.state.categorylist != null ? <View
          style={{ flex: 0.9 }}
        >

          <FlatList style={{ margin: 5 }}


            data={this.state.categorylist}
            keyExtractor={(item, index) => index}
            renderItem={(item) => this.renderitem(item)}
          />

        </View> : <Text>Sorry no data</Text>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
   image: {
  width: 50,
  height: 50,
  borderRadius:80,
  resizeMode: 'contain'
}
});