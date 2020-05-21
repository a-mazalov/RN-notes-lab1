import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
import { Item, Text, Button } from 'native-base'
import { ButtonGroup } from 'react-native-elements';

export class AboutScreen extends Component {


    static navigationOptions = {
        header: null
    }

    backFunction = () => {
        this.props.navigation.goBack()
	}

	
	render() {
        return(
            <View>
                <Header name={'О разработчике'} f={this.backFunction}/>
                <StatusBar barStyle='light-content' />
                <Text style={styles.text}>
                    <Text>Автор:</Text>
                    <Text>Мазалов Александр Максимович</Text>
                   
                </Text>
                <Text style={styles.text}>
                   Группа: 781071
                </Text>
                <Text style={styles.text}>
                   Приложениие на React Native
                </Text>
                <Text style={styles.text}>
                   Заметки v1.0.0 alpha-beta-lala
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: '#21252b',
        margin: 15
    },
    textBold: {
        fontSize: 20,
        color: '#21252b',
        margin: 15,
        fontWeight: "500"
	},
	titleDate: {
		fontSize: 12,
	},
	container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerStyle: {
        height: 50,
		width: 350,
        // borderTopRightRadius: 20,
        backgroundColor: '#ffffff',
        marginTop: 0,
		borderRadius: 0,
		justifyContent: "center",
    },
	buttonStyle: {
		width: 50,
		borderRadius: '100%',
        backgroundColor: '#eeeeee',
		borderWidth: 2,
		borderColor: '#ffffff', 
		alignSelf: "center"
    },
    selectedButtonStyle: {
		borderColor: '#34495e', 
		borderWidth: 3,
    },
})
export default AboutScreen