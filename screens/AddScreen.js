import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Form, Item, Input, Button, Text as NBText } from 'native-base'
import Header from '../components/Header'
import { ButtonGroup, Text } from 'react-native-elements';

export class AddScreen extends Component {

	// constructor () {
	// 	super()
	// 	this.state = {
	// 	  selectedIndex: null
	// 	}
	// 	this.updateIndex = this.updateIndex.bind(this)
	// }

	updateIndex (selectedIndex) {
		this.setState({selectedIndex})
	}

    static navigationOptions = {
        header: null
    }

    state = {
        date: '',
        title: '',
        text: '',
        category: 0
    }

    onChangeText = event => {
        const {date, title, text, category} = this.state;
        this.setState({ date: date, title: title, text: text, category: category})
    }

    backFunction = () => {
        this.props.navigation.goBack()
    }

    onAddTask = () => {
		let obj = {
			date: new Date().getTime(),
			title: this.state.title,
			text: this.state.text,
			category: this.state.category
		}
		this.props.navigation.state.params.saveItem(obj)
		this.props.navigation.goBack()
    }

	render() {
		
		const buttons = [
			{ element: () => <Text style={{backgroundColor: '#27ae60', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#3498db', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#f1c40f', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
		]
		const { category } = this.state;

        return (
            <View>
                <Header name={'Добавить'} f={this.backFunction}/>
                <StatusBar barStyle='light-content' />
                <View style={{ marginRight: 10, marginTop: 25 }}>
                    <Form>
                        <Item>
                            <Input
                            	value={this.state.titleTest}
                                placeholder='Заголовок'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                onChangeText={title => this.setState({title})}
                                returnKeyType={'done'}
                            />
						</Item>
                        <Item>
                            <Input
                            	value={this.state.task}
                                placeholder='Заметка'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                onChangeText={text => this.setState({text})}
                                returnKeyType={'done'}
                            />
						</Item>
						<ButtonGroup
							onPress={category => this.setState({category})}
							selectedIndex={category}
							buttons={buttons}
							containerStyle={styles.containerStyle}
							buttonStyle={styles.buttonStyle}
							selectedButtonStyle={styles.selectedButtonStyle}
							containerBorderRadius={0}
							underlayColor='#eeeeee'
						/>
                        {/* <Item>
                            <Input
                            	value={this.state.task}
                                placeholder='Категория'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                keyboardType="numeric"
                                onChangeText={category => this.setState({category})}
                                returnKeyType={'done'}
                            />
						</Item> */}
						{/* <Item>
                            <Input
                            	value={this.state.task}
                                placeholder='Дата'                                
                                autoFocus
                                clearButtonMode='always'
								autoCorrect={false}
                                onChangeText={date => this.setState({date})}
                                returnKeyType={'done'}
                            />
                        </Item> */}
                    </Form>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        style={{ backgroundColor: '#21252b', margin: 25, justifyContent: 'center' }}
                        onPress={this.onAddTask}
                    >
                        <NBText style={{ fontWeight: 'bold' }}>Добавить</NBText>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 50,
		width: 350,
        // borderTopRightRadius: 20,
        backgroundColor: '#ffffff',
        marginTop: 10,
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
		borderWidth: 2,
    },
})

export default AddScreen