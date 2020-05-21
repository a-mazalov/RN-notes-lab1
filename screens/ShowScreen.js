import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
import { Item, Text, Button } from 'native-base'
import { ButtonGroup } from 'react-native-elements';

export class ShowScreen extends Component {

	constructor (props) {
		super(props)
		this.state = {
		  selectedIndex: parseInt(this.props.navigation.getParam('category'), 10)
		}
		this.updateIndex = this.updateIndex.bind(this)
	}

	updateIndex (selectedIndex) {
		this.setState({selectedIndex})
	}

    static navigationOptions = {
        header: null
    }

    backFunction = () => {
        this.props.navigation.goBack()
	}

	
	render() {
		const buttons = [
			{ element: () => <Text style={{backgroundColor: '#27ae60', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#3498db', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#f1c40f', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
		]
		const { selectedIndex } = this.state;

        return(
            <View>
                <Header name={this.props.navigation.getParam('text')} f={this.backFunction}/>
                <StatusBar barStyle='light-content' />
                <Text style={styles.text}>
                    <Text style={styles.titleDate}>Создано: </Text>
                    {new Date(this.props.navigation.getParam('date')).toLocaleDateString("ru-RU")}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.textBold}>{this.props.navigation.getParam('title')}</Text>
                </Text>
                <Text style={styles.text}>
                    <Text>{this.props.navigation.getParam('text')}</Text>
                </Text>
                {/* <Text style={styles.text}>
                    <Text style={styles.textBold}>Категория: </Text>
                    {this.props.navigation.getParam('category')}
				</Text> */}
				{/* <ButtonGroup
					onPress={this.updateIndex}
					selectedIndex={selectedIndex}
					buttons={buttons}
                    containerStyle={styles.containerStyle}
                    buttonStyle={styles.buttonStyle}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    containerBorderRadius={0}
                    underlayColor='#eeeeee'
				/> */}
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
export default ShowScreen