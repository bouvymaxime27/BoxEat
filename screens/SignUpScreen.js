import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../src/config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const signUp = async () => {
    try {
      setErr('');
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <View style={{ padding:16 }}>
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Mot de passe" secureTextEntry onChangeText={setPass} value={pass} />
      {!!err && <Text style={{ color:'red' }}>{err}</Text>}
      <Button title="Créer le compte" onPress={signUp} />
    </View>
  );
}
