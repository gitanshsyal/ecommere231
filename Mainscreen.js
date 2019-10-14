import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar, TouchableOpacity, FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import { Imgs } from './Imgs'
import Slideshow from 'react-native-image-slider-show';
import { BASEURL } from '..';
export class Customheader extends React.Component {


  render() {
    const { headername } = this.props
    return (
      <View
        style={{ flex: 0.09, backgroundColor: 'red', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            flex: 0.2, justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => this.props.unique()}
        >
          <Image
            style={{ height: 30, width: 30 }}
            source={Imgs.menuicon}
          ></Image>
        </TouchableOpacity>
        <View
          style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}
        ><Text
          style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}
        >{headername}</Text></View>


      </View>
    )
  };
}
export default class Mainscreen extends React.Component {
  static navigationOptions = {
    title: 'Mainscreen',
  };
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      text: '',
      loading: true,
      searchText: "",

      filteredData: [],
      category:'',
      items: [{
        id: 0, name: 'electronic'
      }, {
        id: 1, name: 'Clothing'
      },
      {
        id: 2, name: 'Footwear'
      },
      {
        id: 3, name: 'Mobiles'
      },
      {
        id: 4, name: 'Laptop'
      },
      {
        id: 5, name: 'Sports'
      },
      {
        id: 6, name: 'Accessories'
      },
      {
        id: 7, name: 'Fitness'
      },
      {
        id: 8, name: 'Fitness'
      },
      {
        id: 9, name: 'Fitness'
      },
      {
        id: 10, name: 'Fitness'
      },
      {
        id: 11, name: 'Fitness'
      }

      ],
      dataSource: [
        {

          url: Imgs.slider1,
        }, {

          url: Imgs.slider2,
        }, {

          url: Imgs.slider4,
        },
        {

          url: Imgs.slider5,
        },
        {

          url: Imgs.slider6,
        },

      ],
    };
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    SplashScreen.hide();
    fetch(BASEURL + 'viewcategory', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
   
  }).then((response) => response.json())
      .then((responseJson) => {
      
        console.log('response of APi >>>>'+JSON.stringify(responseJson))
        console.log("data",responseJson.length)
        if(responseJson.status == "200")
        {
          
          var data= responseJson.category
          this.setState({category:data, loading: false,})
          console.log("category",this.state.category)
  for(let i=0;i<data.length;i++){
     console.log("data1",data[i].name)
   }
  }
          else
          {
  console.log("error",responseJson)
          }
        
      })
      .catch((error) => {
          console.error(error);
      });
  }
  get(item) {
    //const{items}=this.state
    console.log("maincategory",item)
    console.log('id',item.item.id)
    console.log('name',item.item.name)
    this.props.navigation.navigate('category',{id:item.item.id,name:item.item.name})

  }
  SearchFilterFunction = text => {
    this.setState({ text: text });
    console.log("this", this.state.items)
    let filteredData = this.state.category.filter(function (item) {

      console.log("itemna", item.name)
      if (item.name.toLowerCase().match(text.toLowerCase()))
        return item
    });

    this.setState({ filteredData: filteredData });

  };
  renderitem(item) {
    console.log("items", item)
    console.log("category1",this.state.category)
    return (

      <TouchableOpacity
        onPress={() => this.get(item)}
        style={{ height: 110, backgroundColor: item.index % 3 == 0 ? 'pink' : item.index % 3 == 1 ? 'skyblue' : 'lightgreen', width: 110, margin: 10, borderRadius: 55, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}
        >{item.item.name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return (
      <View style={styles.container}>
        <Customheader
          unique={() =>
            // this.props.navigation.navigate('AppDrawerNavigator')
            this.props.navigation.openDrawer()
          }
          headername="Home Screen"
        ></Customheader>
        <View style={{ flex: 0.1, flexDirection: 'row', backgroundColor: "red" }}>
          <View style={{ flex: 1, margin: 10, borderRadius: 30, backgroundColor: '#edf1fe',flexDirection:'row',justifyContent:'flex-start',alignItems:'center' }}>
          <Image
            style={{marginLeft:15, height: 25, width: 25 }}
            source={Imgs.search}
          ></Image>


            <TextInput style={{fontSize:15,marginLeft:10}}


              onChangeText={text => this.SearchFilterFunction(text)}

              placeholder='Search for Products, Brands and More'
              value={this.state.search}
            />




          </View>
        </View>
        <View
          style={styles.slide}
        >
          <Slideshow

            dataSource={this.state.dataSource}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })} />
          <View
            style={{ flex: 1, backgroundColor: 'white', margin: 10, borderRadius: 17, elevation: 30 }}
          >
            {
              this.state.category != ''
              ?
              <FlatList style={{ margin: 5 }}
              numColumns={3}                  // set number of columns 
              columnWrapperStyle={styles.row}  // space them out evenly

              data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.category}
              keyExtractor={(item, index) => item.id}
              renderItem={(item) => this.renderitem(item)}
            />
              :
              <Text>no data</Text>
            }
            
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {

    flex: 1, backgroundColor: '#edf1fe'
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  row: {
    flex: 0.4,
    justifyContent: "space-around",

  },
  slide: { flex: 0.9, marginTop: 10 }
})