import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Pedido({ item, acao }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image
                    style={styles.fotoProduto}
                    source={{
                        uri: item.product.imageUri,
                    }}
                />
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.title}>{item.product.name}</Text>
                <Text>Data de Vencimento:</Text>
                <Text>{item.product.dueDate}</Text>
                <Text>Descricao:</Text>
                <Text>{item.product.description}</Text>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button}
                 onPress={() => acao(item.id)}
                >
                    <Icon name='trash' color='black' size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row'
    },
    containerImg: {
        padding: 20,
    },
    containerInfo: {
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 26,
    },
    fotoProduto: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#acfc97',
        borderRadius: 100,
        padding: 5
    },
    containerButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        alignItems: 'center'

    }
});
