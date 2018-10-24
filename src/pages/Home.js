import React, {Component} from 'react';
import { StyleSheet, View, Navigator, TouchableOpacity, Text, ScrollView } from 'react-native'
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

var prescriptionList = ['Prescription 01/07/18', 'Prescription 02/07/18', 'Prescription 03/07/18', 'Prescription 04/07/18', 'Prescription 05/07/18'];

export default class Home extends Component {

        static navigationOptions = {
            // title: 'Home',
           title: '',
            headerLeft: null,
            headerRight: null,
            headerBackTitle: null,
            passProps: {},
            animationType: 'slide-down'
        };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            isFlipping: false,
            isFront: true,

            prescriptionList: [],

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
        this.setState({prescriptionList: prescriptionList});
        
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

    prescription = () => {
        this.props.navigation.navigate('Prescription', {prescription: prescriptionList[0]});
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
                        <CardButtons topleft={this.handleRotate} bottomleft = {this.schedule} topright = {this.info} bottomright = {this.prescription}/>
                    )}
                    {
                        !this.state.isFlipping && this.state.isFront &&
                        <View style = {styles.header}>
                            <Header
                                centerComponent = {{ text: 'My Prescriptions', style: styles.textStyle }}
                                statusBarProps = {{hidden: true}}
                                backgroundColor = 'transparent'
                            >
                            </Header>
                        </View>
                    }

                    <ScrollView style = {styles.listView}>
                        <View style = {{alignItems: 'center'}}>
                            {
                                !this.state.isFlipping && this.state.isFront &&
                                this.state.prescriptionList.map((item, index) => 
                                    <TouchableOpacity key = {index} onPress = {() => this.props.navigation.navigate('Prescription', {prescription: item})}>
                                        <Text style = {styles.listItem}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            {
                                !this.state.isFlipping && !this.state.isFront &&
                                <Text>This is a general information of prescription list</Text>
                            }
                        </View>

                    </ScrollView>

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
        color: '#383b42',
        fontWeight: 'bold',
        fontSize: 18
    }, 
    listView: {
        margin: 50,
        flex: 1,
    },
    listItem: {
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    button: {
        width: 300,
        height: 45,
        // borderColor: '#645cd5',
        borderColor: "transparent",
        borderWidth: 2,
        borderRadius: 10,    
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6532ad",
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'avenirHeavy',
        color: '#000000'
    },
    header: {
        width: '70%',
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













