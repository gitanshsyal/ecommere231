
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

// import React, { Component } from 'react';

// import { StyleSheet, Text, View,ImageBackground } from 'react-native';
//  import {Customheader} from './Mainscreen'
// export default class Profile extends Component{

//   render() {
//  //   const {headername}=this.props
//     return (
//       <View style={styles.container}>

//  <Customheader
//  headername="My Profile"
//  unique={() =>this.props.navigation.openDrawer()}
//  />
//     <Text>Profile</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   }
// });
///////////////////////////////////////////////////////////////////////
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground,ActivityIndicator, AsyncStorage, TouchableOpacity, Alert, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Customheader } from './Mainscreen';
import { Imgs } from './Imgs';
import { BASEURL } from '..';
// var show
var userToken = '';
class Editview extends React.Component {
  btnsave() {
    Alert.alert("Save")
  }

  render() {


    const { name, field, btnname } = this.props
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 13 }}>
          {name}
        </Text>
        <TextInput style={{ fontSize: 15, fontWeight: 'bold' }}
          // underlineColorAndroid="transparent"
          placeholder={field}
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />


        <TouchableOpacity style={{ marginLeft: 125, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.btnsave()}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'red' }}>
            {btnname}
          </Text>

        </TouchableOpacity>

      </View>
    );

  }
}

class Textview extends React.Component {
  render() {

    const { name, field } = this.props
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {name}
        </Text>
        <Text>
          {field}
        </Text>

      </View>
    );
  }
}



export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      filePath: {},
      imageStatus: false,
      loading: true,
      imageUri: '',
      info:[]
    };
  }
  componentDidMount() {
  
    AsyncStorage.getItem('token').then((token) => {
      userToken = token
      console.log("tokenmain", userToken)
    
   // let formData = new FormData();
        fetch(BASEURL + 'profileDetail',
            {
                method: 'POST',
                headers:
                {
                    'Authorization': 'Bearer '+userToken
                },
                body: {

                }
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
            })
          })
         
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          imageUri: source.uri
        });
        console.log("file", this.state.filePath)
        var path = this.state.filePath
        console.log("path", path.isVertical)
        if (path.isVertical = true) {
          console.log("filename", path.fileName)
        }
      }
    });
  };



  editprofile() {

    console.log("show", this.state.show)
    this.setState({ show: !this.state.show })
    console.log("show2", this.state.show)

    if (this.state.show == true) {

      <Textview />
    }
    else {

      <Editview />
    }

  }


  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
  
    const { imageStatus, imageUri,info } = this.state
    console.log('address',info.address)
    var ad=info.address
    console.log('ad',ad)
    AsyncStorage.setItem('address', ad);

    AsyncStorage.getItem('address').then((address) => {
  
      console.log("addrr",address)

      })
   
    return (
      <View style={{ flex: 1 }}>
        <Customheader
          headername="My Profile"
          unique={() => this.props.navigation.openDrawer()}
        />

        <View style={{ flex: 0.30, backgroundColor: 'red' }}>

          {
            this.state.show == true ?
              <TouchableOpacity
                style={{ height: 180, width: 200, alignSelf: 'center', position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 100 }}
              >
                <Image style={{ height: 150, width: 150, borderRadius: 75 }}
                  source={Imgs.profileicon}

                />
                {/* <TouchableOpacity style={{
                  position: 'absolute',
                  top: 80, right: 15
                }} onPress={() => this.editprofile()}>
                  <Image style={{ height: 30, width: 30 }}
                    source={Imgs.pen}

                  />
                </TouchableOpacity> */}
              </TouchableOpacity>

              :
              imageUri == ''
                ?
                <TouchableOpacity style={{ position: 'absolute', left: 130, top: 115, }}
                  onPress={this.chooseFile.bind(this)}>

                  <Image style={{ height: 150, width: 150, borderRadius: 75 }}
                    source={Imgs.profileicon}

                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ position: 'absolute', left: 130, top: 115, }}
                  onPress={this.chooseFile.bind(this)}>

                  <Image style={{ height: 150, width: 150, borderRadius: 75 }}
                    source={{ uri: imageUri }}

                  />
                </TouchableOpacity>

          }

          {/* <TouchableOpacity style={{backgroundColor:'blue',borderColor:'black',borderWidth:10, position: 'absolute', left: 180, top: 230 }} onPress={() => this.editprofile()}>
            <Image style={{ height: 30, width: 30 }}
              source={Imgs.pen}

            />
          </TouchableOpacity> */}


        </View>
        <View style={{ flex: 0.12 }}>
          {
              this.state.show == true ?
              <TouchableOpacity style={{
                position: 'absolute',
                top:35,right:190
              
              }} onPress={() => this.editprofile()}>
                <Image style={{ height: 30, width: 30 }}
                  source={Imgs.pen}

                />
              </TouchableOpacity>
              :
            null
          }
       

        </View>

        <View style={{ flex: 0.58 }}>
          <View style={{ flex: 1 }}>
            {
              this.state.show == true ?
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>
                    {info.first_name} {info.last_name}
             </Text>
                </View>
                :
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                  <TextInput style={{ fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center' }}
                    placeholder='mmm'
                  ></TextInput>
                </View>

            }
            <View style={{ flex: 0.9 }}>
              {
                this.state.show == true ?
                  <View style={styles.container} >
                    

                    <Textview name="Email: " field={info.email} />


                    <Textview name="Phone Number: " field={info.contact_no} />

                    <Textview name="Address: " field={info.address} />

                    <Textview name="PinCode: " field='147852' />

                    <Textview name="State: " field='Punjab' />

                    <Textview name="City: " field='Mohali' />

                  </View>

                  :
                  <View style={styles.container} >

                    <Textview name="Email: " field='manpreet@gmail.com' />

                    <Editview name="Phone Number: " field='8527946946' />

                    <Editview name="Address: " field='#ghjk' />

                    <Editview name="Pincode: " field='852852' />

                    <Editview name="State: " field='dfdscfs' />

                    <Editview name="City: " field='hgvhjbv' />

                    <Editview btnname="Save" />



                  </View>

              }

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
    margin: 10,
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
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
})
