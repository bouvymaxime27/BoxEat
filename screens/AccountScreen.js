import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../src/config/firebase';
import { signOut } from 'firebase/auth';

export default function AccountScreen() {
  const email = auth.currentUser?.email ?? '—';

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex:1, backgroundColor:'#f6f6f6', padding:16 }}>
      <Text style={{ fontSize:26, fontWeight:'800', marginBottom:16 }}>Mon profil</Text>
      <View style={{ backgroundColor:'#fff', borderRadius:16, padding:16, marginBottom:16 }}>
        <Text style={{ fontSize:18, fontWeight:'700' }}>Connecté</Text>
        <Text style={{ color:'#444', marginTop:6 }}>{email}</Text>
      </View>
      <TouchableOpacity onPress={logout} style={{ backgroundColor:'#e53935', padding:14, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'#fff', fontWeight:'700' }}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
