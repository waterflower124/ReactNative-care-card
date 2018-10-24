import React, {Component} from 'react';

import { Header } from 'react-native-elements'
import {SafeAreaView, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import {
    AppStyles,
    avenirBookObliqueFont,
    avenirBookFont,
    avenirFont,
    avenirHeavyFont,
    avenirMediumFont,
    navigationOptions
} from "../Styles";
import { StyleSheet, View, Navigator, TouchableOpacity, Text, ScrollView,
    Alert,
    Image,
} from 'react-native'

import Card from '../components/Card'
import CardButtons from '../components/CardButtons'

const flip = {
  0: {
    rotateY: '0deg'
  },
  1: {
    rotateY: '180deg'
  }
}

export default class Prescription extends Component {

    static navigationOptions = ({navigation}) => ({
        // title: 'Prescription',
        title: '',
        headerBackTitle: null,
        headerRight: <TouchableOpacity style = {{width:50, height:50, marginRight: 10, alignItems: 'center', justifyContent: 'center'}} onPress = {() => navigation.navigate('Home')}><Image style = {{height: 30, width: 30}} source = {require('../assets/icons/home.png')}/></TouchableOpacity>
  
    });

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            isFlipping: false,
            isFront: true,

            prescriptionName: this.props.navigation.state.params.prescription,

        };
    }

    async componentWillMount() {

        // Globals.db_book.transaction(
        //     tx => {
        //         tx.executeSql(
        //             'create table if not exists prescription (id integer primary key not null, title text, doc_name text, clinic_name text, date text);'  /////// flag = 0:online flag = 1:offline
        //         );
        //     }, ()=>{console.log('error1')}, (res)=>{console.log('success1', res)}
        // );
        // this.initPrescriptionDatabase();

        await Expo.Font.loadAsync({
            avenir: avenirFont,
            avenirHeavy: avenirHeavyFont,
            AvenirBookOblique: avenirBookObliqueFont,
            avenirBook: avenirBookFont,
            avenirMedium: avenirMediumFont
        });
        this.setState({isReady: true});
        
    }

    handleRotate = () => {
        this.setState({
            isFlipping: true,
            isFront: !this.state.isFront
        })
        setTimeout(() => {
            this.setState({isFlipping: false})
        }, 1000)
    }

    info = () => {
        this.setState({
            isFlipping: true,
            isFront: !this.state.isFront
        })
        setTimeout(() => {
            this.setState({isFlipping: false})
        }, 1000)
    }

    schedule = () => {
        this.props.navigation.navigate('Schedule');
    }

    druglist = () => {
        this.props.navigation.navigate('DrugList', {prescription: this.state.prescriptionName});
    }


    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
        <View style={styles.container}>
            
            <View style = {styles.cardview}>
                <Animatable.View animation={this.state.isFlipping ? flip : ''} style={styles.cardContainer} duration={1000}>
                    
                    {!this.state.isFlipping && (
                        <CardButtons topleft={this.handleRotate} bottomleft = {this.schedule} topright = {this.info} bottomright = {this.druglist}/>
                    )}
                    {
                        !this.state.isFlipping && this.state.isFront &&
                            <View style = {styles.header}>
                                <Header
                                    centerComponent = {{ text: this.state.prescriptionName, style: styles.title }}
                                    statusBarProps = {{hidden: true}}
                                    backgroundColor = 'transparent'
                                >
                                </Header>
                            </View>
                    }
                    {
                        !this.state.isFlipping && this.state.isFront &&

                            <View style = {styles.infoView}>
                                <View style = {styles.contentView}>
                                    <View style = {styles.itemsStyle}>
                                        <View style = {{width: '60%'}}>
                                            <Text style = {styles.textStyle}>Create Date</Text>
                                        </View>
                                        <View style = {{width: '40%'}}>
                                            <Text style = {styles.textStyle}>15.08.18</Text>
                                        </View>
                                    </View>
                                    <View style = {styles.itemsStyle}>
                                        <View style = {{width: '60%'}}>
                                            <Text style = {styles.textStyle}>Doctor</Text>
                                        </View>
                                        <View style = {{width: '40%'}}>
                                            <Text style = {styles.textStyle}>John Doe</Text>
                                        </View>
                                    </View>
                                    <View style = {styles.itemsStyle}>
                                        <View style = {{width: '60%'}}>
                                            <Text style = {styles.textStyle}>Clinic</Text>
                                        </View>
                                        <View style = {{width: '40%'}}>
                                            <Text style = {styles.textStyle}>The Best Hospital</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style = {styles.buttonView}>
                                    <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('DrugList', {prescription: this.state.prescriptionName})}>
                                        <Text style = {styles.buttontext}>View Drugs</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }

                </Animatable.View>
            </View>

            
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',

    },
    title: {
        fontSize: 20,
        fontFamily: 'avenirHeavy',
    }, 
    infoView: {
        flex: 1,
        margin: 50,
        alignItems: 'center',

    },
    itemsStyle: {
        width: '100%', 
        flexDirection: 'row',
        marginBottom: 30,
    },
    contentView: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        width: 200,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        height: '50%',
        // borderColor: '#645cd5',
        borderColor: "transparent",
        borderWidth: 2,
        borderRadius: 10,    
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6532ad",
    },
    buttontext: {
        fontSize: 20,
        fontFamily: 'avenirHeavy',
        color: '#ffffff'
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    header: {
        width: '80%',
        height: '10%',
    },
    cardview: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5,
        zIndex: 5,
        alignItems: 'center',
    }
});













