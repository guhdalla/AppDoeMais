import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { TokenContext } from '../context/TokenContext';
import { UserContext } from '../context/UserContext';
import { deleteOrder, getPedidos } from '../util/api/OrderAPI';
import Pedido from './Pedido';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const tokenContext = useContext(TokenContext);
  const userContext = useContext(UserContext);

  const consultarPedidos = async () => {
    try {
      setLoading(true);
      setPedidos(await getPedidos(tokenContext.token));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const abandonarPedido = async (idOrder) => {
    try {
      await deleteOrder(tokenContext.token, idOrder)
      consultarPedidos();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultarPedidos();
  }, []);
  return (
    <View style={styles.container}>

      {isLoading &&
        <ActivityIndicator size="large" color="black" />
      }

      {!isLoading &&
        <>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/image.png')}
              style={styles.img} />
          </View>
          <View>
            <Text style={styles.h1}>Lista de Pedidos</Text>
          </View>
          <FlatList
            data={pedidos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <>
                  <Pedido
                    item={item}
                    acao={abandonarPedido}
                  />
              </>
            )}
          />
          
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 100,
  },
  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
});
