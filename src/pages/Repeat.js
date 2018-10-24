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

export default class Repeat extends Component {

    static navigationOptions = ({navigation}) => ({
        // title: 'Repeat',
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

            drugName: this.props.navigation.state.params.drugname,
            startDate: this.props.navigation.state.params.startDate,
            startTime: this.props.navigation.state.params.startTime,
            endDate: this.props.navigation.state.params.endDate,
            endTime: this.props.navigation.state.params.endTime,
            repeatIndex: this.props.navigation.state.params.repeatIndex,
            repeatState: ['Never', 'Every Day', 'Every Week', 'Every 2 Weeks', 'Every Month'],

            setDataState: this.props.navigation.state.params.setDataState,

            customCateIndex: 0,
            customCateState: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
            customNumofCounts: 1,
            customDayArray:[],
            customWeekArrayIndex: 0,
            customWeek: ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'],
            customWeekArray: [],
            customMonthArrayIndex: 0,
            customMonth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            customMonthArray: [],

            txtCustomRepeat: this.props.navigation.state.params.txtCustomRepeat,
            
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            avenir: avenirFont,
            avenirHeavy: avenirHeavyFont,
            AvenirBookOblique: avenirBookObliqueFont,
            avenirBook: avenirBookFont,
            avenirMedium: avenirMediumFont
        });
        this.setState({isReady: true});

    }

    setCustomRepeatState = data => {
    	this.setState(data);
    }

    selectRepeatState = (index) => {

    	this.setState({repeatIndex: index});
    	if(index != -1) {
    		
    		this.props.navigation.navigate('Reminder', {drugname: this.state.drugName, repeatIndex: index, startDate: this.state.startDate, startTime: 
    			this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime});

    		this.props.navigation.state.params.setDataState({repeatIndex: index});

    	} else {
    		this.props.navigation.navigate('CustomRepeat', {setDataState: this.state.setDataState, drugname: this.state.drugName, repeatIndex: index, startDate: this.state.startDate, startTime: 
    			this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime, customCateIndex: this.state.customCateIndex, customNumofCounts: this.state.customNumofCounts,
    			customDayArray: this.state.customDayArray, customWeekArray: this.state.customWeekArray, customMonthArray: this.state.customMonthArray, txtCustomRepeat: this.state.txtCustomRepeat});
    	}
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
        this.props.navigation.navigate('Reminder', {drugname: this.state.drugName, repeatIndex: this.state.repeatIndex, startDate: this.state.startDate, startTime: 
                this.state.startTime, endDate: this.state.endDate, endTime: this.state.endTime});

        this.props.navigation.state.params.setDataState({repeatIndex: this.state.repeatIndex});
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
                            {
                            	this.state.repeatState.map((item, index) => 
                                    <TouchableOpacity style = {styles.state_style} key = {index} onPress = {() => this.selectRepeatState(index)}>
                                    	<View style = {{flexDirection: 'row'}}>
                                    		<View style = {{width: '60%'}}>
                                        		<Text style = {styles.listItem}>{item}</Text>
                                        	</View>
                                        	{
                                        		(this.state.repeatIndex == index) &&
	                                        	<View style = {{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
	                                        		<Image style = {{width: 20, height: 20}} source = {require('../assets/icons/check.png')}/>
	                                        	</View>
                                        	}
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
	                            <TouchableOpacity style = {[styles.state_style, {marginTop: 20}]} onPress = {() => this.selectRepeatState(-1)}>
	                            	<View style = {{flexDirection: 'row'}}>
	                            		<View style = {{width: '60%'}}>
	                                		<Text style = {styles.listItem}>Custom</Text>
	                                	</View>
	                                	{
	                                		(this.state.repeatIndex == -1) &&
	                                    	<View style = {{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
	                                    		<Image style = {{width: 20, height: 20}} source = {require('../assets/icons/check.png')}/>
	                                    	</View>
	                                	}
	                            	</View>
	                            </TouchableOpacity>
	                            {
	                            	(this.state.repeatIndex == -1) &&
	                            	<Text style = {{color: '#808080'}}>{this.state.txtCustomRepeat}</Text>
	                            }
	                            
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
        justifyContent: 'center',
        
    },
    listView: {
        marginBottom: 25,
    },
    state_style: {
    	// width: '100%',
    	borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 10,
    },
    listItem: {
    	height: 30,
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
        alignItems: 'center'
    }
});













