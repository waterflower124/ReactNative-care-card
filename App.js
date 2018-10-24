import React from 'react'
import { StyleSheet, View, Navigator } from 'react-native'
import { Header } from 'react-native-elements'
import {SafeAreaView, createStackNavigator, createSwitchNavigator} from 'react-navigation';


import Card from './src/components/Card'

import SplashScreen from './src/pages/SplashScreen';
import Home from './src/pages/Home';
import Prescription from './src/pages/Prescription';
import DrugList from './src/pages/DrugList';
import DrugInfo from './src/pages/DrugInfo';
import Reminder from './src/pages/Reminder';
import Schedule from './src/pages/Schedule';
import Repeat from './src/pages/Repeat';
import ReminderConfirm from './src/pages/ReminderConfirm';
import CustomRepeat from './src/pages/CustomRepeat';

import PrescriptionList from './src/pages/PrescriptionList';
import PrescriptionInput from './src/pages/PrescriptionInput';


const Navigation = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen, 
        header: null,
        navigationOptions: {
            header: null
        }    
    }, 
    Home: {screen: Home},
    Prescription: {screen: Prescription},
    DrugList: {screen: DrugList},
    DrugInfo: {screen: DrugInfo},
    Reminder: {screen: Reminder},
    Schedule: {screen: Schedule},
    Repeat: {screen: Repeat},
    ReminderConfirm: {screen: ReminderConfirm},
    CustomRepeat: {screen: CustomRepeat},


    PrescriptionList: {screen: PrescriptionList},
    PrescriptionInput: {screen: PrescriptionInput},
    
})

export default Navigation;



