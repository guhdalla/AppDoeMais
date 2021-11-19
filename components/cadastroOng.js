import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { createOng } from '../util/api/OngAPI';

export default function CadastroOng({ navigation }) {
  const [username, setUsername] = useState();
  const [cnpj, setCnpj] = useState();
  const [nome, setNome] = useState();
  const [password, setPassword] = useState();
  const [endereco, setEndereco] = useState();
  const [isLoading, setLoading] = useState(false);

  const cadastrar = async () => {
    setLoading(true);
    const created = await createOng(username, cnpj, nome, password, endereco);
    setLoading(false);
    if (created) {
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>CADASTRO DE ONG'S</Text>
      </View>


      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o CNPJ"
        onChangeText={setCnpj}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Endereço completo (rua e nº)"
        onChangeText={setEndereco}
      />

      {isLoading &&
        <ActivityIndicator size="large" color="black" />
      }

      {!isLoading &&
        <TouchableOpacity
          style={styles.bottom}
          onPress={() => cadastrar()}>

          <Text style={styles.botaoText}>Cadastrar</Text>

        </TouchableOpacity>
      }
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
  botaoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  }
});
