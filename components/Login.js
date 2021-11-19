import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TokenContext } from '../context/TokenContext';
import { UserContext } from '../context/UserContext';
import { infoOng, login } from '../util/api/AuthAPI';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const tokenContext = useContext(TokenContext);
  const userContext = useContext(UserContext);

  const isLogged = async () => {
    setToken('');
    setLoading(true);
    const newtoken = await login(username, password)
    setToken(newtoken);
    if (token != null) {
      const tokenPrefix = "Bearer " + token;
      tokenContext.setToken(tokenPrefix);
      await getUsuario(tokenPrefix);
    }
    setLoading(false);
  }

  const getUsuario = async (tokenPrefix) => {
    try {
      const usuario = await infoOng(tokenPrefix);
      userContext.setUserData(usuario);
    } catch (error) {
      console.log(error);
      tokenContext.setToken(null);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/image.png')}
          style={styles.img} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      {isLoading &&
        <ActivityIndicator size="large" color="black" />
      }

      {!isLoading &&
        <TouchableOpacity
          style={styles.bottom}
          onPress={() => isLogged()}>

          <Text style={styles.botaoText}>Entrar</Text>
        </TouchableOpacity>
      }

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}>

        <Text style={styles.botaoTextBlack}>Cadastre-se</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 300,
    marginBottom: 30,
    marginTop: 70
  },
  input: {
    marginBottom: 10,
    padding: 10,
    width: 300,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 1,
  },
  bottom: {
    width: 200,
    height: 45,
    backgroundColor: '#78908C',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  botaoTextBlack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 20
  },
  botaoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {
    width: 300,
    height: 100,
  },
});
