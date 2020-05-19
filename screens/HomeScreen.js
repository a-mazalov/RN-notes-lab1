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



export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        isDataReady: false,
		items: {},
		cloneItems: {},
		search: '',
    }
	
    componentDidMount = () => {
        this.loadItems()
    }

    loadItems = async () => {
        try {
            await Font.loadAsync({
                Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
            })

            const getItems = await AsyncStorage.getItem('items')
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
        		return { ...newState }
        	})
        }
	}

	deleteTodo = id => {
        this.setState(prevState => {
            const items = prevState.items
            delete items[id]
            const newState = {
                ...prevState,
                ...items
            }
            this.saveItems(newState.items)
            return { ...newState }
        })
	}

	clickItem = obj => {
		this.props.navigation.navigate('ShowScreen', {
			date: obj.date,
			text: obj.text,
			category: obj.category,
		})
    }

    saveItems = newItems => {
        const saveItems = AsyncStorage.setItem('items', JSON.stringify(newItems))
	}

	onPressFab = () => {
        this.props.navigation.navigate('AddTask', {
            saveItem: this.addTodo
        })
	}

	updateSearch = search => {

		let filtered = _values(this.state.cloneItems).filter(word =>
			(word.text.toLowerCase() + ' ' + new Date(word.date).toLocaleDateString("ru-RU"))
			.includes(search.toLowerCase()));

		console.log('[SEARCH]',filtered);

		this.setState({
			items: filtered
		});
		this.setState({ search });
	};

    render() {
		const { search } = this.state;
        const { isDataReady } = this.state

        if (!isDataReady) {
            return <AppLoading />
        }

		console.log(this.state.items)
		console.log(_values(this.state.items))

        return (
            <View style={styles.container}>
                <Header/>
				<StatusBar barStyle='light-content' />
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
	}
})

export default HomeScreen