import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:24 }}>
      <Text style={{ fontSize:28, fontWeight:'800', textAlign:'center', marginBottom:24 }}>
        Bienvenue sur BoxEat
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}
        style={{ backgroundColor:'#3FAE49', padding:14, borderRadius:12, width:'80%', alignItems:'center', marginBottom:12 }}>
        <Text style={{ color:'#fff', fontWeight:'700' }}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
        style={{ borderColor:'#3FAE49', borderWidth:2, padding:14, borderRadius:12, width:'80%', alignItems:'center' }}>
        <Text style={{ color:'#3FAE49', fontWeight:'700' }}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}
