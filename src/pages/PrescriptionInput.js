import React from 'react'
import Expo from 'expo'
import { StyleSheet, View, Navigator, TouchableOpacity, Text } from 'react-native'
import { Header } from 'react-native-elements'
import {SafeAreaView, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Font, Constants} from 'expo';

import {
    avenirBookObliqueFont,
    avenirBookFont,
    avenirFont,
    avenirHeavyFont,
    avenirMediumFont,
} from "../Styles";

import Card from '../components/Card'

export default class PrescriptionInput extends React.Component {

    static navigationOptions = {
        title: 'Prescription List',
        headerTitleStyle: {
            color: '#000000',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
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

    manage_user = async() => {
        this.props.navigation.navigate('ManageUserTag');        
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
            <View style={styles.container}>
                <Text>This is Prescription Input Window</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#383b42',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'avenirHeavy',
  }
});