import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { TokenContext } from '../context/TokenContext';
import { UserContext } from '../context/UserContext';
import { postOrder } from '../util/api/OrderAPI';
import { getProdutos } from '../util/api/ProdutoAPI';
import Product from './Product';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const tokenContext = useContext(TokenContext);
  const userContext = useContext(UserContext);

  const consultarProdutos = async () => {
    try {
      setLoading(true);
      setProdutos(await getProdutos(tokenContext.token));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const fazerPedido = async (businessId, idProduct) => {
    try {
      await postOrder(tokenContext.token, businessId, idProduct)
      consultarProdutos();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultarProdutos();
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
            <Text style={styles.h1}>Lista de Produtos</Text>
          </View>
          <FlatList
            data={produtos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <>
                {item.status == "AVAILABLE" ?
                  <Product
                    item={item}
                    acao={fazerPedido}
                  /> : null}
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
