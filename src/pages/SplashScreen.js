import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';


export default class SplashScreen extends Component {

  static navigationOption = {
    screen: {
      title: 'Splash',      
      // navigationBarStyle: {navBarHidden: false},
      navigationOptions: {
        headerMode: null,
      }  
    },
  };


  constructor(){
    super();

    this.state={
      isVisible : true,
    }
  }

  Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });

    this.props.navigation.navigate('Home');
  }

  componentDidMount(){
    var that = this;

    setTimeout(function(){
        that.Hide_Splash_Screen();
      }, 3000)
      
    };

  render() {

    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          {
            <Image source= {require('../assets/images/splash.png')}
            style={{width: 300, height:300, resizeMode:'contain'}} />
          }
        </View>
      </View>
    );

    return (
      <View style = { styles.container}>
        {
          (this.state.isVisible === true) ? Splash_Screen : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  SplashScreen_RootView:
  {
      justifyContent: 'center',
      flex:1,
      position: 'absolute',
      width: '100%',
      height: '100%',
  },

  SplashScreen_ChildView:
  {
      justifyContent: 'center',
      alignItems: 'center',
//      backgroundColor: '#00BCD4',
      flex:1,      
  },

  TouchableOpacity_Style:{

      width:25, 
      height: 25, 
      top:9, 
      right:9, 
      position: 'absolute'

  }
});