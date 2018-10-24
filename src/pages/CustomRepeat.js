import React, {Component} from 'react';

import { Header } from 'react-native-elements'
import {SafeAreaView, createStackNavigator, createSwitchNavigator, HeaderBackButton} from 'react-navigation';
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
    Picker,
    Platform,
} from 'react-native'
import { Constants } from 'expo';
// import Moment from 'react-moment';
// import 'moment-timezone';

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

var dayRow0 = [1, 2, 3, 4, 5, 6, 7];
var dayRow1 = [8, 9, 10, 11, 12, 13, 14];
var dayRow2 = [15, 16, 17, 18, 19, 20, 21];
var dayRow3 = [22, 23, 24, 25, 26, 27, 28];
var dayRow4 = [29, 30 , 31];

var monthRow0 = ['Jan', 'Feb', 'Mar', 'Apr'];
var monthRow1 = ['May', 'Jun', 'Jul', 'Aug'];
var monthRow2 = ['Sep', 'Oct', 'Nov', 'Dec'];

export default class CustomRepeat extends Component {

    static navigationOptions = ({navigation}) => ({
        // title: 'Repeat',
        title: '',
        headerBackTitle: null,
        headerRight: <TouchableOpacity style = {{width:50, height:50, marginRight: 10, alignItems: 'center', justifyContent: 'center'}} onPress = {() => navigation.navigate('Home')}><Image style = {{height: 30, width: 30}} source = {require('../assets/icons/home.png')}/></TouchableOpacity>
  
    });

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            title: 'Custom Repeat',
            headerBackTitle: null,
            headerLeft: (<HeaderBackButton onPress = {params.goReminder}/>),
            headerRight: <TouchableOpacity style = {{width:50, height:50, marginRight: 10, alignItems: 'center', justifyContent: 'center'}} onPress = {() => navigation.navigate('Home')}><Image style = {{height: 30, width: 30}} source = {require('../assets/icons/home.png')}/></TouchableOpacity>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            isFlipping: false,
            isFront: true,

            isFrequency: false,
            isEvery: false,
            isWeek : false,
            isMonth: false,
            isYear: false,

            drugName: this.props.navigation.state.params.drugname,
            startDate: this.props.navigation.state.params.startDate,
            startTime: this.props.navigation.state.params.startTime,
            endDate: this.props.navigation.state.params.endDate,
            endTime: this.props.navigation.state.params.endTime,
            repeatIndex: this.props.navigation.state.params.repeatindex,
            repeatState: ['Never', 'Every Day', 'Every Week', 'Every 2 Weeks', 'Every Month'],


            selectCatePeriodIndex: 0,
            customCateIndex: this.props.navigation.state.params.customCateIndex,
            customCateState: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
            customCatePeriodState: ['Day', 'Week', 'Month', 'Year'],
            customNumofCounts: this.props.navigation.state.params.customNumofCounts,

            customDayArray: this.props.navigation.state.params.customDayArray,
            customDayArrayBoolean: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, false, false, false, false],//size is 31

            customWeekArrayIndex: 0,
            customWeek: ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'],
            customWeekArray: this.props.navigation.state.params.customWeekArray,

            customMonthArrayIndex: 0,
            customMonth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            customMonthArray: this.props.navigation.state.params.customMonthArray,
            customMonthArrayBoolean: [false, false, false, false, false, false, false, false, false, false, false, false],//size is 12

            selectState: '',
            selectDay: 0,

            txtCustomRepeat: this.props.navigation.state.params.txtCustomRepeat,

        };
    }

    async componentWillMount() {

        this.props.navigation.setParams({ goReminder: this._goReminder });

        this.setState({selectState: this.state.customCateState[this.state.customCateIndex]});

        if(this.state.customCateIndex === 0 && this.state.customNumofCounts === 1)
            this.setState({txtCustomRepeat: 'Event will occur every day'});

        var arrayDayBoolean = this.state.customDayArrayBoolean;
        for(let i = 0; i < this.state.customDayArray.length; i ++) {
            arrayDayBoolean[this.state.customDayArray[i] - 1] = true;
        }
        this.setState({customDayArrayBoolean: arrayDayBoolean});

        var arrayMonthBoolean = this.state.customMonthArrayBoolean;
        for(let i = 0; i < this.state.customMonthArray.length; i ++) {
            for (let j = 0; j < this.state.customMonth.length; j ++) {
                if(this.state.customMonthArray[i] === this.state.customMonth[j])
                    arrayMonthBoolean[j] = !arrayMonthBoolean[j];
            }
        }
        this.setState({customMonthArrayBoolean: arrayMonthBoolean});


        await Expo.Font.loadAsync({
            avenir: avenirFont,
            avenirHeavy: avenirHeavyFont,
            AvenirBookOblique: avenirBookObliqueFont,
            avenirBook: avenirBookFont,
            avenirMedium: avenirMediumFont
        });
        this.setState({isReady: true});
    }

    _goReminder = () => {
        this.props.navigation.navigate('Reminder', {});
        // this.props.navigation.state.params.setDataState({repeatIndex: -1});
        this.props.navigation.state.params.setDataState({repeatIndex: -1, selectCatePeriodIndex: this.state.selectCatePeriodIndex, customNumofCounts: this.state.customNumofCounts, 
            customDayArray: this.state.customDayArray, customWeekArray: this.state.customWeekArray, customMonthArray: this.state.customMonthArray, txtCustomRepeat: this.state.txtCustomRepeat});
    }

    // selectRepeatState = (index) => {

    // 	this.setState({repeatIndex: index});
    // 	if(index != -1) {
    // 		this.props.navigation.navigate('ReminderConfirm', {drugname: this.state.drugName, repeatIndex: index, startDate: this.state.startDate, startTime: 
    // 			this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime,});
    // 	} else {
    // 		this.props.navigation.navigate('CustomRepeat', {drugname: this.state.drugName, repeatIndex: index, startDate: this.state.startDate, startTime: 
    // 			this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime,});
    // 	}
    // }

    setFrequency =() => {
        this.setState({isFrequency: !this.state.isFrequency});
        this.setState({isEvery: false});

    }

    setEvery = () => {
        this.setState({isEvery: !this.state.isEvery});
        this.setState({isFrequency: false});
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

    reminder = () => {
        this.props.navigation.navigate('Reminder', {});
        // this.props.navigation.state.params.setDataState({repeatIndex: -1});
        this.props.navigation.state.params.setDataState({repeatIndex: -1, selectCatePeriodIndex: this.state.selectCatePeriodIndex, customNumofCounts: this.state.customNumofCounts, 
            customDayArray: this.state.customDayArray, customWeekArray: this.state.customWeekArray, customMonthArray: this.state.customMonthArray, txtCustomRepeat: this.state.txtCustomRepeat});
    }

    renderCountPickItem = () => {
        const items = [];
        for(let i = 1; i < 1000; i ++) {
            items.push(
                <Picker.Item key = {i} label = {i.toString()} value = {i.toString()} />
            )
        }
        return items;
    }

    setCustomDayArray = (index) => {

        var arrayBoolean = this.state.customDayArrayBoolean;
        var arraycustomDay = this.state.customDayArray;

        arrayBoolean[index] = !arrayBoolean[index];

        if(arrayBoolean[index]) {
            arraycustomDay.push(index + 1);
        } else {
            for (let i = 0; i < arraycustomDay.length; i ++) {
                if(arraycustomDay[i] === (index + 1)) {
                    arraycustomDay.splice(i, 1);
                    break;
                }
            }
            
        }
        this.setState({customDayArray: arraycustomDay});
        this.setState({customDayArrayBoolean: arrayBoolean});
        
        var txt = '';
        for(let i = 0; i < this.state.customDayArray.length; i ++) {

            if(i < (this.state.customDayArray.length - 2))
                txt = txt + this.state.customDayArray[i] + ', ';
            if(i === (this.state.customDayArray.length - 2))
                txt = txt + this.state.customDayArray[i] + ' and ';
            if(i === (this.state.customDayArray.length - 1))
                txt = txt + this.state.customDayArray[i] + '.';
        }
        txt = 'Event will be occur every ' + this.state.customNumofCounts + ' months on ' + txt;
        this.setState({txtCustomRepeat: txt});

    }

    setCustomMonthArray = (index) => {
        var arrayMonthBoolean = this.state.customMonthArrayBoolean;
        var arrayCustomMonth = this.state.customMonthArray;

        arrayMonthBoolean[index] = !arrayMonthBoolean[index];

        if(arrayMonthBoolean[index]) {
            arrayCustomMonth.push(this.state.customMonth[index]);
        } else {
            for(let i = 0; i < arrayCustomMonth.length; i ++) {
                if(arrayCustomMonth[i] == this.state.customMonth[index])
                    arrayCustomMonth.splice(i, 1);
            }
        }

        this.setState({customMonthArrayBoolean: arrayMonthBoolean});
        this.setState({customMonthArray: arrayCustomMonth});

        var txt = '';
        for(let i = 0; i < this.state.customMonthArray.length; i ++) {
            if(i < (this.state.customMonthArray.length - 2))
                txt = txt + this.state.customMonthArray[i] + ', ';
            if(i === (this.state.customMonthArray.length - 2))
                txt = txt + this.state.customMonthArray[i] + ' and ';
            if(i === (this.state.customMonthArray.length - 1))
                txt = txt + this.state.customMonthArray[i] + '.';
        }
        txt = 'Event will be occur every ' + this.state.customNumofCounts + ' years in ' + txt;
        this.setState({txtCustomRepeat: txt});
    }

    setCustomRepeatWithFrequency = (itemValue, itemPosition) => {
        this.setState({customCateIndex: itemPosition, selectState: itemValue});
        
        var txt = '';

        switch (itemPosition) {
            case 0 :
                this.setState({
                    isWeek: false,
                    isMonth: false,
                    isYear: false,
                });
                txt = 'Event will be occur every ' + this.state.customNumofCounts + ' days' 
                break;
            case 1 :
                this.setState({
                    isWeek: true,
                    isMonth: false,
                    isYear: false,
                });
                for(let i = 0; i < this.state.customWeekArray.length; i ++) {
                    if(i < (this.state.customWeekArray.length - 2))
                        txt = txt + this.state.customWeekArray[i] + ', ';
                    if(i === (this.state.customWeekArray.length - 2))
                        txt = txt + this.state.customWeekArray[i] + ' and ';
                    if( i === (this.state.customWeekArray.length - 1))
                        txt = txt + this.state.customWeekArray[i] + '.';
                }
                txt = 'Event will be occur every ' + this.state.customNumofCounts + ' weeks on ' + txt;
                break;
            case 2 :
                this.setState({
                    isWeek: false,
                    isMonth: true,
                    isYear: false,
                });
                for(let i = 0; i < this.state.customDayArray.length; i ++) {
                    if(i < (this.state.customDayArray.length - 2))
                        txt = txt + this.state.customDayArray[i] + ', ';
                    if(i === (this.state.customDayArray.length - 2))
                        txt = txt + this.state.customDayArray[i] + ' and ';
                    if(i === (this.state.customDayArray.length - 1))
                        txt = txt + this.state.customDayArray[i] + '.';
                }
                txt = 'Event will be occur every ' + this.state.customNumofCounts + ' months on ' + txt;
                break;
            case 3 :
                this.setState({
                    isWeek: false,
                    isMonth: false,
                    isYear: true,
                });
                for(let i = 0; i < this.state.customMonthArray.length; i ++) {
                    if(i < (this.state.customMonthArray.length - 2))
                        txt = txt + this.state.customMonthArray[i] + ', ';
                    if(i === (this.state.customMonthArray.length - 2))
                        txt = txt + this.state.customMonthArray[i] + ' and ';
                    if(i === (this.state.customMonthArray.length - 1))
                        txt = txt + this.state.customMonthArray[i] + '.';
                }
                txt = 'Event will be occur every ' + this.state.customNumofCounts + ' years in ' + txt;
                break;
        }
        this.setState({selectCatePeriodIndex: itemPosition});
        this.setState({txtCustomRepeat: txt});
    }

    setCustomRepeatWithEvery = (itemValue, itemPosition) => {
        this.setState({customNumofCounts: itemPosition + 1});

        var txt = '';
        switch (this.state.customCateIndex) {
            case 0:
                txt = 'Event will be occur every ' + (itemPosition + 1) + ' days' 
                break;
            case 1:
                for(let i = 0; i < this.state.customWeekArray.length; i ++) {
                    if(i < (this.state.customWeekArray.length - 2))
                        txt = txt + this.state.customWeekArray[i] + ', ';
                    if(i === (this.state.customWeekArray.length - 2))
                        txt = txt + this.state.customWeekArray[i] + ' and ';
                    if( i === (this.state.customWeekArray.length - 1))
                        txt = txt + this.state.customWeekArray[i] + '.';
                }
                txt = 'Event will be occur every ' + (itemPosition + 1) + ' weeks on ' + txt;
                break;
            case 2:
                for(let i = 0; i < this.state.customDayArray.length; i ++) {
                    if(i < (this.state.customDayArray.length - 2))
                        txt = txt + this.state.customDayArray[i] + ', ';
                    if(i === (this.state.customDayArray.length - 2))
                        txt = txt + this.state.customDayArray[i] + ' and ';
                    if(i === (this.state.customDayArray.length - 1))
                        txt = txt + this.state.customDayArray[i] + '.';
                }
                txt = 'Event will be occur every ' + (itemPosition + 1) + ' months on ' + txt;
                break;
            case 3:
                for(let i = 0; i < this.state.customMonthArray.length; i ++) {
                    if(i < (this.state.customMonthArray.length - 2))
                        txt = txt + this.state.customMonthArray[i] + ', ';
                    if(i === (this.state.customMonthArray.length - 2))
                        txt = txt + this.state.customMonthArray[i] + ' and ';
                    if(i === (this.state.customMonthArray.length - 1))
                        txt = txt + this.state.customMonthArray[i] + '.';
                }
                txt = 'Event will be occur every ' + (itemPosition + 1) + ' years in ' + txt;
                break;
        }

        
        // txt = txt + (itemPosition + 1) + ' ' + this.state.customCatePeriodState[this.state.customCateIndex];
        this.setState({txtCustomRepeat: txt});
    }

    selectWeek = (index) => {

        var array = this.state.customWeekArray;
        var isExist = false;
        var i;
        for(i = 0; i < array.length; i ++) {
            if(array[i] === this.state.customWeek[index]) {
                isExist = true;
                break;
            }
        }
        if(!isExist)
            array.push(this.state.customWeek[index]);
        else {
            array.splice(i, 1);
        }
        this.setState({customWeekArray: array});

        var txt = '';
        for (let i = 0; i < this.state.customWeekArray.length; i ++) {
            if(i < (this.state.customWeekArray.length - 2))
                txt = txt + this.state.customWeekArray[i] + ', ';
            if(i === (this.state.customWeekArray.length - 2))
                txt = txt + this.state.customWeekArray[i] + ' and ';
            if( i === (this.state.customWeekArray.length - 1))
                txt = txt + this.state.customWeekArray[i] + '.';
        }
        txt = 'Event will be occur every ' + this.state.customNumofCounts + ' weeks on ' + txt;
        this.setState({txtCustomRepeat: txt});
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
                        <CardButtons topleft={this.handleRotate} bottomleft = {this.schedule} topright = {this.info} bottomright = {this.reminder}/>
                    )}
                    {
                        !this.state.isFlipping && this.state.isFront && 
                        <View style = {styles.header}>
                            <Header
                                centerComponent = {{ text: this.state.drugName + ' Reminder', style: styles.textStyle }}
                                statusBarProps = {{hidden: true}}
                                backgroundColor = 'transparent'
                            >
                            </Header>
                        </View>
                    }

                    {
                        !this.state.isFlipping && this.state.isFront && (
                            <View style = {styles.infoView}>
                                <ScrollView>
    	                            <TouchableOpacity style = {[styles.state_style, {marginTop: 20}]} onPress = {() => this.setFrequency()}>
    	                            	<View style = {{flexDirection: 'row'}}>
    	                            		<View style = {{width: '60%'}}>
    	                                		<Text style = {styles.listItem}>Frequecy</Text>
    	                                	</View>

                                        	<View style = {{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
                                        		<Text style = {[styles.listItem, {color: '#808080'}]}>{this.state.customCateState[this.state.customCateIndex]}</Text>
                                        	</View>
    	                            	</View>
    	                            </TouchableOpacity>
                                    {
                                        this.state.isFrequency && 
                                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                            <Picker
                                                selectedValue = {this.state.selectState}
                                                style = {Platform.OS == 'android' ? {width: '100%'} : {width: '100%', height: 200}}
                                                onValueChange = {(itemValue, itemPosition) => this.setCustomRepeatWithFrequency(itemValue, itemPosition)}>
                                                <Picker.Item label = "Daily" value = '0' />
                                                <Picker.Item label = "Weekly" value = '1' />
                                                <Picker.Item label = "Monthly" value = '2' />
                                                <Picker.Item label = "Yearly" value = '3' />
                                                
                                            </Picker>
                                        </View>
                                    }


                                    <TouchableOpacity style = {[styles.state_style, {marginTop: 20}]} onPress = {() => this.setEvery()}>
                                        <View style = {{flexDirection: 'row'}}>
                                            <View style = {{width: '60%'}}>
                                                <Text style = {styles.listItem}>Every</Text>
                                            </View>

                                            <View style = {{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
                                            {
                                                (this.state.customNumofCounts != 0) &&
                                                <Text style = {[styles.listItem, {color: '#808080'}]}>{this.state.customNumofCounts} {this.state.customCatePeriodState[this.state.customCateIndex]}</Text>
                                            }
                                            {
                                                (this.state.customNumofCounts === 0) &&
                                                <Text style = {[styles.listItem, {color: '#808080'}]}>{this.state.customCatePeriodState[this.state.customCateIndex]}</Text>
                                            }
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                     {
                                        this.state.isEvery&& 
                                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                                            <Picker
                                                selectedValue = {this.state.customNumofCounts.toString()}
                                                style = {Platform.OS == 'android' ? {width: '100%'} : {width: '100%', height: 200}}
                                                onValueChange = {(itemValue, itemPosition) => this.setCustomRepeatWithEvery(itemValue, itemPosition)}>

                                                {this.renderCountPickItem()}
                                                
                                            </Picker>
                                        </View>
                                    }

                                    <Text style = {{color: "#808080", fontFamily: 'avenirBook', marginBottom: 5}}>{this.state.txtCustomRepeat}</Text>
                                    
                                    {
                                        this.state.isWeek && 
                                        (
                                            this.state.customWeek.map((item, index) => 
                                                <TouchableOpacity style = {styles.substate_style} key = {index} onPress = {() => this.selectWeek(index)}>
                                                    <View style = {{flexDirection: 'row'}}>
                                                        <View style = {{width: '60%', justifyContent: 'center'}}>
                                                            <Text style = {styles.sublistItem}>{item}</Text>
                                                        </View>
                                                        {
                                                            this.state.customWeekArray.map((subitem, subindex) => 
                                                                (subitem == item) &&
                                                                <View key = {index} style = {{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
                                                                    <Image style = {{width: 20, height: 20}} source = {require('../assets/icons/check.png')}/>
                                                                </View>
                                                            )
                                                            
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        )
                                    }
                                    {
                                        this.state.isMonth && 
                                        <View style = {{width: '100%', height: 150}}>
                                            <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                                            {
                                                dayRow0.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customDayArrayBoolean[index] ? [styles.itemRowStyle, {width: '14%', backgroundColor:'#ffaaaa'}] : [styles.itemRowStyle, {width: '14%'}]} 
                                                        onPress = {() => this.setCustomDayArray(index)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                                            {
                                                dayRow1.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customDayArrayBoolean[index + 7] ? [styles.itemRowStyle, {width: '14%', backgroundColor:'#ffaaaa'}] : [styles.itemRowStyle, {width: '14%'}]}
                                                        onPress = {() => this.setCustomDayArray(index + 7)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                                            {
                                                dayRow2.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customDayArrayBoolean[index + 14] ? [styles.itemRowStyle, {width: '14%', backgroundColor:'#ffaaaa'}] : [styles.itemRowStyle, {width: '14%'}]}
                                                        onPress = {() => this.setCustomDayArray(index + 14)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                                            {
                                                dayRow3.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customDayArrayBoolean[index + 21] ? [styles.itemRowStyle, {width: '14%', backgroundColor:'#ffaaaa'}] : [styles.itemRowStyle, {width: '14%'}]}
                                                        onPress = {() => this.setCustomDayArray(index + 21)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                                            {
                                                dayRow4.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customDayArrayBoolean[index + 28] ? [styles.itemRowStyle, {width: '14%', backgroundColor:'#ffaaaa'}] : [styles.itemRowStyle, {width: '14%'}]}
                                                        onPress = {() => this.setCustomDayArray(index + 28)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                        </View>
                                    }
                                    {
                                        this.state.isYear && 
                                        <View style = {{width: '100%', height: 100}}>
                                            <View style = {{width: '100%', height: '33%', flexDirection: 'row'}}>
                                            {
                                                monthRow0.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customMonthArrayBoolean[index] ? [styles.itemRowStyle, {backgroundColor:'#ffaaaa', width: '25%'}] : [styles.itemRowStyle, {width: '25%'}]} 
                                                        onPress = {() => this.setCustomMonthArray(index)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '33%', flexDirection: 'row'}}>
                                            {
                                                monthRow1.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customMonthArrayBoolean[index + 4] ? [styles.itemRowStyle, {backgroundColor:'#ffaaaa', width: '25%'}] : [styles.itemRowStyle, {width: '25%'}]} 
                                                        onPress = {() => this.setCustomMonthArray(index + 4)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                            <View style = {{width: '100%', height: '33%', flexDirection: 'row'}}>
                                            {
                                                monthRow2.map((item, index) => 
                                                    <TouchableOpacity key = {index} style = { this.state.customMonthArrayBoolean[index + 8] ? [styles.itemRowStyle, {backgroundColor:'#ffaaaa', width: '25%'}] : [styles.itemRowStyle, {width: '25%'}]} 
                                                        onPress = {() => this.setCustomMonthArray(index + 8)}>
                                                        <Text style = {styles.matrixItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            </View>
                                        </View>
                                    }

                                    
                                </ScrollView>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        
    },
    listView: {
        marginBottom: 25,
    },
    state_style: {
    	width: '100%',
    	borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 10,
    },
    substate_style: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        marginBottom: 10,
    },
    listItem: {
    	height: 30,
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    sublistItem: {
        height: 30,
        fontSize: 15,
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
    pickerItemstyle: {
        width: '100%',
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    itemRowStyle: {
        // width: '14%', 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    matrixItemText: {
        fontSize: 18,
        fontFamily: 'avenirBook',
    },
});













