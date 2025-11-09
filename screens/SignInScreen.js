import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../src/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const signIn = async () => {
    try {
      setErr('');
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <View style={{ padding:16 }}>
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Mot de passe" secureTextEntry onChangeText={setPass} value={pass} />
      {!!err && <Text style={{ color:'red' }}>{err}</Text>}
      <Button title="Se connecter" onPress={signIn} />
    </View>
  );
}
