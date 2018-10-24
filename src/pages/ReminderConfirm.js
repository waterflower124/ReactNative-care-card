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

} from 'react-native'

import DatePicker from '../components/datetimepicker/datepicker.js';
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

export default class ReminderConfirm extends Component {

    static navigationOptions = {
        title: 'Reminder',
  
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            isFlipping: false,
            isFront: true,

            drugName: this.props.navigation.state.params.drugname,
            startDate: 'Jul 07 2018',
            startTime: '10:00',
            endDate: 'Jul 13 2018',
            endTime: '18:00',
            repeatIndex: this.props.navigation.state.params.repeatIndex,
            repeatState: ['Never', 'Every Day', 'Every Week', 'Every 2 Weeks', 'Every Month'],

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



    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Header
                    centerComponent = {{ text: this.state.drugName + ' Reminder', style: styles.textStyle }}
                    statusBarProps = {{hidden: true}}
                    backgroundColor = 'transparent'
                >
                </Header>
            </View>
            <View style = {styles.cardview}>
                <Animatable.View animation={this.state.isFlipping ? flip : ''} style={styles.cardContainer} duration={1000}>
                    
                    {!this.state.isFlipping && (
                        <CardButtons flip={this.handleRotate}/>
                    )}

                    {
                        !this.state.isFlipping && this.state.isFront && (
                            <View style = {styles.infoView}>
                                <View style = {{height: '80%', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style = {styles.listView}>
                                        <View style = {{flexDirection: 'row'}}>
                                            <View style = {{width: '35%'}}>
                                                <Text style = {styles.listItem}>Start:</Text>
                                            </View>
                                            <View style = {{width: '65%'}}>
                                                <DatePicker
                                                    style = {{width:200}}
                                                    mode="date"
                                                    date = {this.state.startDate}
                                                    format="MMM DD YYYY"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    onDateChange={(date) => {this.setState({startDate: date});}}
                                                />
                                                <DatePicker
                                                    style = {{width:200}}
                                                    mode="time"
                                                    date = {this.state.startTime}
                                                    format="HH:mm"
                                                    is24Hour = {true}
                                                    minuteInterval = {10}
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    onDateChange={(time) => {this.setState({startTime: time});}}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style = {styles.listView}>
                                        <View style = {{flexDirection: 'row'}}>
                                            <View style = {{width: '35%'}}>
                                                <Text style = {styles.listItem}>End:</Text>
                                            </View>
                                            <View style = {{width: '65%'}}>
                                                <DatePicker
                                                    style = {{width:200}}
                                                    mode="date"
                                                    date = {this.state.endDate}
                                                    format="MMM DD YYYY"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    onDateChange={(date) => {this.setState({endDate: date});}}
                                                />
                                                <DatePicker
                                                    style = {{width:200}}
                                                    mode="time"
                                                    date = {this.state.endTime}
                                                    format="HH:mm"
                                                    is24Hour = {true}
                                                    minuteInterval = {10}
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    onDateChange={(time) => {this.setState({endTime: time});}}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style = {styles.listView}>
                                        <View style = {{flexDirection: 'row'}}>
                                            <View style = {{width: '35%'}}>
                                                <Text style = {styles.listItem}>Repeat:</Text>
                                            </View>
                                            <View style = {{width: '65%'}}>
                                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Repeat', {drugname: this.state.drugName, repeatindex: this.state.repeatIndex,
                                                    startDate: this.state.startDate, startTime: this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime,})}>
                                                    <Text style = {styles.listItem}>{this.state.repeatState[this.state.repeatIndex]}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style = {{height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity style = {styles.button}>
                                        <Text style = {styles.buttontext}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    {
                        !this.state.isFlipping && !this.state.isFront &&
                        <View style = {styles.infoView}>
                            <Text>This is a general information of reminder</Text>
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
        color: '#383b42',
        fontWeight: 'bold',
        fontSize: 18
    }, 
    infoView: {
        flex: 1,
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    listView: {
        marginBottom: 25,
    },
    listItem: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    contentView: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
    parameterView: {
        width: '70%',
        height: '100%',
    },
    valueView: {
        width: '30%',
        height: '100%',
    },
    buttonView: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 50,
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
        fontFamily: 'avenirHeavy',
        color: '#000000'
    },
    header: {
        width: '100%',
        height: '10%',
    },
    cardview: {
        width: '100%',
        height: '90%',
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
        zIndex: 5
    }
});













