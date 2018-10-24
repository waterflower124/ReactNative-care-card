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
    WebView,
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

export default class DrugInfo extends Component {

    static navigationOptions = ({navigation}) => ({
        // title: 'Drug Information',
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

            webShow: false,

            drugName: this.props.navigation.state.params.drugname,

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

    showWebSite = () => {
        this.setState({webShow: true});
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

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
        <View style={styles.container}>
            
            <View style = {styles.cardview}>
            {
                this.state.webShow&&
                <View>
                    <View style = {{width: '100%', height: '95%', }}>
                        <WebView source={{uri: 'https://bit.ly/2kbNgKE'}}/>
                    </View>
                    <View style = {{width: '100%', height: '5%', alignItems: 'flex-end', justifyContent: 'center'}}>
                        <TouchableOpacity style = {{width:30, height:30, marginRight: 10, alignItems: 'center', justifyContent: 'center'}} onPress = {() => {this.setState({webShow: false})}}>
                            <Image style = {{height: 30, width: 30}} source = {require('../assets/icons/return.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {
                !this.state.webShow&&
                <Animatable.View animation={this.state.isFlipping ? flip : ''} style={styles.cardContainer} duration={1000}>
                    
                    {!this.state.isFlipping && (
                        <CardButtons topleft={this.handleRotate} bottomleft = {this.schedule} topright = {this.info} bottomleft_disable = {true}/>
                    )}
                    {
                        !this.state.isFlipping && this.state.isFront &&
                        <View style = {styles.header}>
                            <Header
                                centerComponent = {{ text: this.state.drugName, style: styles.textStyle }}
                                statusBarProps = {{hidden: true}}
                                backgroundColor = 'transparent'
                            >
                            </Header>
                        </View>
                    }
                    {
                        !this.state.isFlipping && this.state.isFront && (
                            <View style = {styles.infoView}>
                                <View style = {styles.contentView}>
                                    <ScrollView style = {styles.listView}>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Duration:</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>7 W</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Dosage</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>400IU Tablets</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Conditions</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>After breakfast</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Repeat in</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>24H</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Comments</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>Plenty of water</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>Total Quality</Text>
                                                </View>
                                                <View style = {styles.valueView}>
                                                    <Text style = {styles.listItem}>98 Tablets</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style = {styles.rowItem}>
                                            <View style = {{flexDirection: 'row'}}>
                                                <View style = {styles.parameterView}>
                                                    <Text style = {styles.listItem}>FDA description</Text>
                                                </View>
                                                <TouchableOpacity style = {styles.valueView} onPress = {() => {this.setState({webShow: true})}}>
                                                    <Text style = {[styles.listItem, {color: '#0000ff'}]}>Click here</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                    </ScrollView>
                                </View>
                                <View style = {styles.buttonView}>
                                    <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('Reminder', {drugname: this.state.drugName, repeatIndex: 0})}>
                                        <Text style = {styles.buttontext}>Need a Remainder?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('Schedule')}>
                                        <Text style = {styles.buttontext}>Want a Schedule?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    {
                        !this.state.isFlipping && !this.state.isFront &&
                        <View style = {styles.infoView}>
                            <Text>This is a general information of each Drug</Text>
                        </View>
                    }
                </Animatable.View>
            }
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
        
    },
    listItem: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'avenirBook',
    },
    contentView: {
        width: '100%',
        height: '70%',
        alignItems: 'center',
    },
    parameterView: {
        width: '50%',
        height: '100%',
    },
    valueView: {
        width: '50%',
        height: '100%',
    },
    buttonView: {
        width: '100%',
        height: '30%',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    rowItem: {
        marginBottom: 10,
        // borderBottomWidth: 1,
        // borderColor: '#808080',
    }
});













