import React from 'react'
import { ScrollView, TouchableOpacity, View, FlatList, Text, Image } from 'react-native'
import md5 from 'js-md5'

const PUBLIC_KEY = '4e8241524961595b080076b5dce70b41'
const PRIVATE_KEY = '89713b72cb99246f33e08f27b9d7805acc1f42e8'

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Heroes'
    }
    
    state = {
        data: []
    }
    
    async componentDidMount() {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const response = 
        await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=100&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        
        const responseJson = await response.json()
        this.setState({data: responseJson.data.results})
    }

    renderItem = ({item}) => {
        return  (
            <ScrollView>
                <TouchableOpacity onPress={()=>this.onItemPress(item)} 
                    style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                    <Image style={{height: 50, width: 50, borderRadius: 25}} 
                       source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                    <Text style={{marginLeft: 10}}>{item.name}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    onItemPress = (item) => {
        this.props.navigation.navigate('Description', {hero: item})
    } 

    render() {
        return (
            <FlatList 
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                ItemSeparatorComponent={()=>
                    <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                />}
            />
        )
    }
}