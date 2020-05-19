import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Clipboard } from 'react-native'
import { Icon } from 'native-base'
import { Button } from 'react-native-elements';
const { width } = Dimensions.get('window')

const Item = ({ dateT, textT, categoryT, id, deleteTodo, clickItem  }) => {

    // clipboardItem = () => {
    //     Clipboard.setString(dateT + '\n' + textT + '\n' + categoryT)
    //     Alert.alert('Сообщение', 'Данные скопированны')
	// }

	function categoryStyle(category) {
		let style = {
			width: '98%',
			height: '98%',
			borderRadius: '100%',
			backgroundColor: null,
			paddingRight: 10,
		};

		switch ( parseInt(categoryT, 10) ) {
			case 0: style.backgroundColor = '#27ae60'; break;
			case 1: style.backgroundColor = '#3498db'; break;
			case 2: style.backgroundColor = '#f1c40f'; break;
			default: style.backgroundColor = '#eeeeee';
		}

		return style;
	}


	return (
		<View style={styles.container}>
			<View style={styles.rowContainer} >
				{/* <Text style={styles.text} onPress={() => clickItem({date: dateT, text: textT, category: categoryT})} onLongPress={this.clipboardItem}> */}

				<Text style={styles.text} onPress={() => clickItem({ date: dateT, text: textT, category: categoryT })} >
					<Button
						style={{ marginRight: 10 }}
						buttonStyle={categoryStyle(categoryT)}
					/>
					{textT.length > 15 ? textT.slice(0,15) + '...' : textT}
				</Text>
				<Text onPress={() => clickItem({date: dateT, text: textT, category: categoryT})} style={styles.dateTitle}>
					{new Date(dateT).toLocaleDateString("ru-RU")}
				</Text>
			</View>
			<TouchableOpacity onPressOut={() => deleteTodo(id)}>
				<Icon name='md-trash' style={{ color: '#21252b', paddingRight: 15 }} />
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		borderBottomColor: '#21252b',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	text: {
		color: '#21252b',
        fontSize: 18,
        fontWeight: "400",
        // paddingVertical: 20,
        // width: width / 0.2,
        height: 60,
	},
	dateTitle: {
		fontSize: 12
	},	

	rowContainer: {
		flexDirection: 'column',
		width: width / 1.5,
        // alignItems: 'center',
		height: 60,
		paddingLeft: 10
	},
	buttonStyleCategory0: {
		width: '98%',
		height: '98%',
		borderRadius: '100%',
		backgroundColor: '#27ae60'
	},
	buttonStyleCategory1: {
		width: '98%',
		height: '98%',
		borderRadius: '100%',
		backgroundColor: '#3498db'
	},
	buttonStyleCategory2: {
		width: '98%',
		height: '98%',
		borderRadius: '100%',
		backgroundColor: '#f1c40f'
	}
})


// { element: () => <Text style={{backgroundColor: '#27ae60', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
// { element: () => <Text style={{backgroundColor: '#3498db', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },
// { element: () => <Text style={{backgroundColor: '#f1c40f', width: '98%', height: '98%', borderRadius: '100%' }}></Text> },

export default Item