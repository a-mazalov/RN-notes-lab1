import React from 'react'
import { Header as NBHeader, Left, Body, Title, Button, Icon, Right } from 'native-base'

const Header = ({name, f}) => {
	if (name) {
		return (
			<NBHeader style={{ backgroundColor: '#21252b' }}>
				<Left>
					<Button transparent onPress={() => f()}>
						<Icon style={{color: '#ffffff'}} name='arrow-back' />
					</Button>
				</Left>
				<Body>
				<Title style={{ color: '#ffffff' }}>{name}</Title>
				</Body>
				<Right></Right>
			</NBHeader>
		)
	} else {
		return (
			<NBHeader style={{ backgroundColor: '#21252b' }}>
				<Body>
					<Title style={{ color: '#ffffff' }}>Главная</Title>
				</Body>
			</NBHeader>
		)
	}

}

export default Header