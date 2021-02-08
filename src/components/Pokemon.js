import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'

const Pokemon = ({name, pic, types, desc}) => {
    return (
        <View style={styles.mainDetails} >
            <Image style={styles.image} source={{uri : pic}} resizeMode="contain" />
            <Text style={styles.mainText} >{name}</Text>
            <FlatList
                columnWrapperStyle={styles.types}
                numColumns={2}
                data={types}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={[styles[item.name], styles.type]}>
                        <Text style={styles.typeText}>{item.name}</Text>
                    </View>
                )}
            />
            <View style={styles.description}>
                <Text>
                    {desc}
                </Text>
            </View>
        </View>
    );
}

export default Pokemon;

const styles = StyleSheet.create({
    mainDetails : {
        padding : 30,
        alignItems : 'center'
    },
    image : {
        width : 100,
        height : 100
    },
    mainText : {
        fontSize : 25,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    description : {
        marginTop : 20
    },
    types : {
        flexDirection : 'row',
        marginTop : 20
    },
    type : {
        padding : 5,
        width : 100,
        alignItems : 'center'
    },
    typeText : {
        color : '#fff'
    },
    normal : {
        backgroundColor : '#8a8a59'
    },
    fire : {
        backgroundColor : '#f09030'
    },
    water : {
        backgroundColor : '#6890f0'
    },
    eletric : {
        backgroundColor : '#f8d030'
    },
    grass : {
        backgroundColor : '#78c850'
    },
    ice : {
        backgroundColor : '#98d8d8'
    },
    fighting : {
        backgroundColor : '#c03028'
    },
    poison : {
        backgroundColor : '#a040a0'
    },
    ground : {
        backgroundColor : '#e0c068'
    },
    flying : {
        backgroundColor : '#a890f0'
    },
    phychic : {
        backgroundColor : '#f85888'
    },
    bug : {
        backgroundColor : '#a8b820'
    },
    rock : {
        backgroundColor : '#b8a038'
    },
    ghost : {
        backgroundColor : '#705898'
    },
    dragon : {
        backgroundColor : '#7038f8'
    },
    dark : {
        backgroundColor : '#705848'
    },
    steel : {
        backgroundColor : '#b8b8d0'
    },
    fairy : {
        backgroundColor : '#e898e8'
    }
})