import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const { register } = useAuth(); // Utilise le contexte Auth

  const signUp = async () => {
    try {
      setErr('');
      await register(email.trim(), pass);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={setPass}
        value={pass}
        style={{ marginBottom: 8 }}
      />
      {!!err && <Text style={{ color: 'red' }}>{err}</Text>}
      <Button title="Créer le compte" onPress={signUp} />
    </View>
  );
}
