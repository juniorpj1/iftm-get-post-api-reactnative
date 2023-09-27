import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://6501a5d8736d26322f5c1121.mockapi.io/prova/notas'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleAddPerson = async () => {
    if (!name || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(
        'https://65148c8ddc3282a6a3cd489a.mockapi.io/api/users',
        { name, email }
      );

      if (response.status === 201) {
        alert('Pessoa cadastrada com sucesso!');
        setName('');
        setEmail('');
        fetchData();
      } else {
        alert('Erro ao cadastrar pessoa.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    }
  };

  const renderPerson = ({ item }) => {
    const color = item.nota < 6 ? 'red' : 'blue';

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 5,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
        <Text style={{ fontSize: 18, marginBottom: 10 }}>{item.nome}</Text>
        <Text style={{ fontSize: 18, marginBottom: 10, marginLeft: 10 }}>
          Nota: {item.nota}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
      <Text style={{ fontSize: 60 }}>Lista de Pessoas</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPerson}
      />

      <Text style={{ fontSize: 24, marginTop: 20 }}>Cadastrar Pessoa</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', width: 200, padding: 5, marginBottom: 10 }}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', width: 200, padding: 5, marginBottom: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Cadastrar" onPress={handleAddPerson} />
    </View>
  );
};

export default App;
