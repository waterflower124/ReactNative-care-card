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
    Image
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


var times = ['06:00', '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '23:00'];
var drugs = ['vitaminA', 'vitaminB', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminF', 'vitaminG', 'vitaminH', 'vitaminI', 'vitaminJ', 'vitaminK', 'vitaminL'];

var date, month, year;
var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var showdays = [];
var showmonth = [];

export default class Schedule extends Component {

    static navigationOptions = ({navigation}) => ({
        // title: 'Schedule',
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

            // drugName: this.props.navigation.state.params.drugname,

            times: [],
            drugs: [],
            nextMonth: false,

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
        this.setState({
            times: times,
            drugs: drugs,
        });

        var today = new Date();
        date = today.getDate();
        month = parseInt(today.getMonth() + 1);
        year = today.getFullYear();

        var afterdate = new Date();
        for(i = 0; i < 6; i ++) {
            afterdate.setDate(date + i);
            showdays.push(afterdate.getDate());
            aftermonth = parseInt(afterdate.getMonth() + 1);
            showmonth.push(aftermonth);
            if(month != aftermonth) {
                this.setState({
                    nextMonth: true,
                });
            }
            afterdate = new Date();
        }
       


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

    selectDate = (item, month) => {
        alert("ddd :" + item + "   " + month_array[month - 1]);
        this.setState({
            times: ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '23:00'],
            drugs: ['vitaminF', 'vitaminG', 'vitaminH', 'vitaminI', 'vitaminJ', 'vitaminK', 'vitaminL'],
        });
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
                        <CardButtons flip={this.handleRotate}/>
                    )}
                    {
                        !this.state.isFlipping && this.state.isFront &&
                        <View style = {styles.header}>
                            <Header
                                centerComponent = {{ text: 'Schedule', style: styles.textStyle }}
                                statusBarProps = {{hidden: true}}
                                backgroundColor = 'transparent'
                            >
                            </Header>
                        </View>
                    }
                    {
                        !this.state.isFlipping && this.state.isFront && (
                            <View style = {styles.infoView}>
                                <View style = {{height: '30%'}}>
                                    <View style = {{height: '50%', flexDirection: 'row'}}>
                                        <View style = {{width: '50%', alignItems: 'flex-start', justifyContent: 'center'}}>
                                            <Text style = {styles.text_month}>{month_array[month - 1]}</Text>
                                        </View>
                                        {
                                            this.state.nextMonth && 
                                            <View style = {{width: '50%', alignItems: 'flex-end', justifyContent: 'center'}}>
                                                <Text style = {styles.text_month}>{month_array[month]}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style = {{height: '50%', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    {
                                        showdays.map((item, index) => 
                                            <TouchableOpacity key = {index} onPress = {() => this.selectDate(item, showmonth[index])}>
                                                <Text  style = {styles.text_month}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    </View>
                                </View>
                                <View style = {{height: '70%'}}>
                                    <ScrollView style = {styles.listView}>
                                        <View style = {{flexDirection: 'row'}}>
                                            <View style = {{width: '40%'}}>
                                            {
                                                this.state.times.map((item, index) => 
                                                        <Text key = {index} style = {styles.listItem}>{item}</Text>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '60%'}}>
                                            {
                                                this.state.drugs.map((item, index) => 
                                                    <Text key = {index} style = {styles.listItem}>{item}</Text>
                                                )
                                            }
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    }
                    {
                        !this.state.isFlipping && !this.state.isFront &&
                        <View style = {styles.infoView}>
                            <Text>This is a general information of Schedule</Text>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        
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
        width: '80%',
        height: '100%',
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
    },
    text_month: {
        fontSize: 18,
        fontFamily: 'avenirBook',
        fontWeight: 'bold',
    }
});













