import  React , { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import axios from 'axios'
import pokedex from 'pokemon'
import Pokemon from './components/Pokemon'

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading : false,
            searchInput : '',
            name : '',
            pic : '',
            types : [],
            desc : ''
        }
    }

    render() {
        const { name, pic, types, desc, searchInput, isLoading } = this.state
        return (
            <SafeAreaView style={styles.wrapper} >
                <View style={styles.container} >
                    <View style={styles.headContainer} >
                        <View style={styles.textInputContainer} >
                            <TextInput
                                style={styles.textInput}
                                placeholder="Pokemon's name"
                                onChangeText={(searchInput) => this.setState({searchInput})}
                                value={this.state.searchInput}
                                clearButtonMode="always"
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Search"
                                color="#0064E1"
                                onPress={this.searchPokemon}
                            />
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        {isLoading && <ActivityIndicator color="#0064E1" size="large"/>}
                        {!isLoading && (
                            <Pokemon name={name} pic={pic} types={types} desc={desc} />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    searchPokemon = async () => {
        try {
            this.setState({isLoading : true})
            const pokemon_id = pokedex.getId(this.state.searchInput)
            const {data : pokemonData} = await axios.get(`${POKE_API_BASE_URL}/pokemon/${pokemon_id}`)
            const {data : pokemonSpecieData} = await axios.get(`${POKE_API_BASE_URL}/pokemon-species/${pokemon_id}`)
            const { name, sprites, types} = pokemonData
            const { flavor_text_entries } = pokemonSpecieData
            this.setState({
                name,
                pic : sprites.front_default,
                types : this.getTypes(types),
                desc : this.getDesc(flavor_text_entries),
                isLoading : false
            })
        } catch (error) {
            Alert.alert('Error', 'Pokemon not found')
            this.setState({isLoading : false})
        }
        
    }

    getTypes = (types) => types.map(({slot, type}) => ({
        id : slot,
        name : type.name
    }))

    getDesc = (entries) => entries.find( item => item.language.name == 'en').flavor_text
}

const styles = StyleSheet.create({
    wrapper : {
        flex : 1
    },
    container : {
        flex : 1,
        padding : 20,
        backgroundColor : '#f5fcff'
    },
    headContainer : {
        flex : 1,
        flexDirection : 'row',
        marginTop : 100
    },
    textInputContainer : {
        flex : 2
    },
    buttonContainer : {
        flex : 1
    },
    mainContainer : {
        flex : 9
    },
    textInput : {
        height : 35,
        marginBottom : 10,
        borderColor : '#ccc',
        borderWidth : 1,
        backgroundColor : '#eaeaea',
        padding : 5
    }
})