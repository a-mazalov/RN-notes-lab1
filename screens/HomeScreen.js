import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
import _values from 'lodash.values'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Header from '../components/Header'
import Item from '../components/Item'
import FloatingButton from '../components/FloatingButton'
import { Button } from 'native-base'
import { SearchBar } from 'react-native-elements';
import { ButtonGroup } from 'react-native-elements';



export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

	constructor () {
		super()
		this.state = {
			isDataReady: false,
			items: {},
			cloneItems: {},
			search: '',
		  selectedIndex: null
		}
		this.updateIndex = this.updateIndex.bind(this)
	  }

    // state = {
    //     isDataReady: false,
	// 	items: {},
	// 	cloneItems: {},
	// 	search: '',
	// 	selectedIndex: 0,
	// }
	

	
    componentDidMount = () => {
        this.loadItems()
    }

    loadItems = async () => {
        try {
            await Font.loadAsync({
                Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
            })

            const getItems = await AsyncStorage.getItem('laboneitems')
			const parsedItems = JSON.parse(getItems)
			console.log(parsedItems);
            this.setState({ isDataReady: true, items: parsedItems || {}, cloneItems: parsedItems || {} })
        } catch (err) {
            alert('Application Error. Cannot load data.')
        }
	}
	
	addTodo = item => {
		const newItem = item
		if(Object.keys(newItem).length !== 0) {
        	this.setState(prevState => {
        		const ID = uuidv1()
        		const newItemObject = {
        			[ID]: {
        				id: ID,
						date: newItem.date,
						title: newItem.title,
						text: newItem.text,
        				category: newItem.category
        			}
        		}
        		const newState = {
        			...prevState,
        			items: {
        				...prevState.items,
        				...newItemObject
        			}
        		}
        		this.saveItems(newState.items)
        		// this.saveItems(newState.cloneItems)
        		return { ...newState }
        	})
        }
	}

	deleteTodo = id => {
        this.setState(prevState => {
            const items = prevState.items
            // const cloneItems = prevState.clonetems
			delete items[id]
			// delete cloneItems[id]

            const newState = {
                ...prevState,
				...items,
				// ...cloneItems
            }
            this.saveItems(newState.items)
            return { ...newState }
        })
	}

	clickItem = obj => {
		this.props.navigation.navigate('ShowScreen', {
			date: obj.date,
			title: obj.title,
			text: obj.text,
			category: obj.category,
		})
    }

    saveItems = newItems => {
        const saveItems = AsyncStorage.setItem('laboneitems', JSON.stringify(newItems))
	}

	onPressFab = () => {
        this.props.navigation.navigate('AddTask', {
            saveItem: this.addTodo
        })
	}
	onPressAbout = () => {
		this.props.navigation.navigate('About');
	}

	updateSearch = search => {

		let filtered = _values(this.state.cloneItems).filter(word =>
			(
				word.title.toLowerCase() +
				word.text.toLowerCase() +
				' ' +
				new Date(word.date).toLocaleDateString("ru-RU")
			)
			.includes(search.toLowerCase()));

		console.log('[SEARCH]',filtered);


		// let test = filtered.map(function (item) {
		// 	const key = item.id;
		// 	let sad = {item.id: item}
		// 	return {item.id: item};
		// });
		this.setState({
			items: filtered
		});
		this.setState({ search });
	};

	updateIndex(selectedIndex) {

		console.log('clone Items', _values(this.state.cloneItems));
		console.log('index', selectedIndex);

		if (selectedIndex == this.state.selectedIndex) {
			this.setState({
				selectedIndex: null,
				items: _values(this.state.cloneItems)
			})

			
		} else {
			let filtered = _values(this.state.cloneItems).filter(item => parseInt(item.category) == (parseInt(selectedIndex)));
			
			console.log('[changeIndex]', filtered);

			this.setState({
				items: filtered
			});

	
			console.log('[changeIndex]', selectedIndex);

			this.setState({ selectedIndex })
		}


	}

    render() {
		const { search } = this.state;
        const { isDataReady } = this.state

        if (!isDataReady) {
            return <AppLoading />
		}
		
		const buttons = [
			{ element: () => <Text style={{backgroundColor: '#27ae60', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#3498db', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
			{ element: () => <Text style={{backgroundColor: '#f1c40f', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
		]
		const { selectedIndex } = this.state;

		console.log(this.state.items)
		console.log(_values(this.state.items))

        return (
            <View style={styles.container}>
                <Header/>
				<StatusBar barStyle='light-content' />

				<ButtonGroup
					onPress={this.updateIndex}
					selectedIndex={selectedIndex}
					buttons={buttons}
					containerStyle={styles.containerStyle}
					buttonStyle={styles.buttonStyle}
					selectedButtonStyle={styles.selectedButtonStyle}
					containerBorderRadius={0}
					underlayColor='#eeeeee'
				/>

				<SearchBar
					lightTheme
					placeholder="Поиск..."
					onChangeText={this.updateSearch}
					value={search}
				/>

                <FlatList
                    data={_values(this.state.items)}
                    contentContainerStyle={styles.content}
                    renderItem={row => {
                        return (
							<Item
								dateT={row.item.date}
								titleT={row.item.title}
								textT={row.item.text}
								categoryT={row.item.category}
								id={row.item.id}
								deleteTodo={this.deleteTodo}
								clickItem = {this.clickItem}
								alertF={this.alertF}
							/>
						)
                    }}
                    keyExtractor={item => item.id}
                />
				{/* <FloatingButton actionOnPress={this.onPressFab} /> */}

				<View style={{
					
					width: 380,
					height: 50,
					alignItems: 'flex-end',
					flexDirection: 'row',
				}}>

						<Button onPress={this.onPressFab} style={{ borderRadius: 0, backgroundColor: '#1abc9c'}} title="Добавить">
							<Text style={{ textAlign: "center", width: 380, color: '#FFFFFF'}}>
								Добавить
							</Text>
					</Button>
					<Button onPress={this.onPressAbout} style={{ borderRadius: 0, backgroundColor: '#2c3e50'}} title="Добавить">
						<Text style={{ textAlign: "center", width: 380, color: '#FFFFFF'}}>
							О разработчике
						</Text>
					</Button>

				</View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		alignSelf: 'stretch'
	},
	contentHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	},
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

export default HomeScreen