// screens/ReservationsScreen.js
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, Alert, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useReservations } from '../src/context/ReservationsContext';
import { db } from '../src/config/firebase';       // ou { auth } si besoin
// + tes imports de 'firebase/firestore' (addDoc, doc, etc.)

const formatEuro = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return '—';
  return `${n.toFixed(2)} €`;
};

const statusStyle = (s) => {
  const status = (s || 'confirmé').toLowerCase();
  if (status.startsWith('prépa') || status.includes('prep')) {
    return { label: 'En préparation', bg: '#FFF4E5', fg: '#B26A00' };
  }
  if (status.startsWith('retir')) {
    return { label: 'Retiré', bg: '#E8F5E9', fg: '#1B5E20' };
  }
  return { label: 'Confirmé', bg: '#E3F2FD', fg: '#0D47A1' };
};

export default function ReservationsScreen({ navigation }) {
  const { reservations, removeReservation } = useReservations();

  // une seule ligne ouverte à la fois
  const openRowRef = useRef(null);

  // toast léger
  const [toastMsg, setToastMsg] = useState('');
  const toastY = useRef(new Animated.Value(-60)).current;
  const showToast = (msg) => {
    setToastMsg(msg);
    Animated.timing(toastY, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setTimeout(() => {
        Animated.timing(toastY, { toValue: -60, duration: 180, useNativeDriver: true }).start();
      }, 1200);
    });
  };

  useEffect(() => () => { openRowRef.current = null; }, []);

  // sections par jour
  const sections = useMemo(() => {
    if (!reservations || reservations.length === 0) return [];
    const groups = reservations.reduce((acc, it) => {
      const key = it?.day || 'Autre';
      if (!acc[key]) acc[key] = [];
      acc[key].push(it);
      return acc;
    }, {});
    return Object.entries(groups).map(([day, data]) => ({ title: day, data }));
  }, [reservations]);

  // total panier
  const total = useMemo(
    () => reservations.reduce((sum, r) => sum + Number(r.price) * (r.qty ?? 1), 0),
    [reservations]
  );

  if (!sections.length) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
        <Text style={{ fontSize:22, fontWeight:'800', marginBottom:8 }}>Mes commandes</Text>
        <Text style={{ color:'#666', textAlign:'center' }}>
          Aucune commande. Réservez un plat depuis l’onglet Menu.
        </Text>
      </View>
    );
  }

  const confirmDelete = (row, item, index) => {
    const rid = item?.rid ?? index;
    Alert.alert(
      'Annuler la commande',
      `Supprimer "${item?.title ?? 'Plat'}" ?`,
      [
        { text: 'Non', style: 'cancel', onPress: () => row?.close() },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            row?.close();
            removeReservation(rid);
            showToast('Commande supprimée');
          },
        },
      ],
    );
  };

  const RightAction = ({ onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        width: 92,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c62828',
        marginVertical: 6,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
      }}
      accessibilityRole="button"
      accessibilityLabel="Supprimer la commande"
    >
      <Text style={{ color:'#fff', fontWeight:'800' }}>Suppr.</Text>
    </TouchableOpacity>
  );

  const LeftAction = ({ onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        width: 104,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1565C0',
        marginVertical: 6,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
      }}
      accessibilityRole="button"
      accessibilityLabel="Infos de la commande"
    >
      <Text style={{ color:'#fff', fontWeight:'800' }}>Infos</Text>
    </TouchableOpacity>
  );

  const openInfos = (row, item) => {
    row?.close();
    const st = statusStyle(item?.status);
    Alert.alert(
      item?.title ?? 'Commande',
      `Jour : ${item?.day ?? '—'}\nStatut : ${st.label}\nPrix : ${formatEuro(item?.price)}\nQuantité : x${item?.qty ?? 1}`,
      [{ text: 'OK' }],
    );
  };

  // footer total + paiement
  const Footer = () => (
    <View style={{ paddingHorizontal:16, paddingTop:4, paddingBottom:16 }}>
      <View style={{ backgroundColor:'#fff', borderRadius:12, padding:14 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 }}>
          <Text style={{ fontWeight:'700' }}>Total</Text>
          <Text style={{ fontWeight:'800' }}>{formatEuro(total)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={{ backgroundColor:'#2e7d32', padding:14, borderRadius:12, alignItems:'center' }}
          disabled={!reservations.length}
        >
          <Text style={{ color:'#fff', fontWeight:'800' }}>Passer au paiement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex:1, backgroundColor:'#f6f6f6' }}>
      {/* Toast */}
      <Animated.View
        pointerEvents="none"
        style={{
          position:'absolute',
          top:0,
          left:0,
          right:0,
          transform:[{ translateY: toastY }],
          zIndex: 10,
        }}
      >
        <View style={{
          marginHorizontal:16, marginTop:14, paddingVertical:10, paddingHorizontal:14,
          backgroundColor:'#323232', borderRadius:10, alignSelf:'center'
        }}>
          <Text style={{ color:'#fff', fontWeight:'700' }}>{toastMsg}</Text>
        </View>
      </Animated.View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${String(item?.rid ?? 'noid')}-${index}`}
        contentContainerStyle={{ padding:16, paddingBottom:8 }}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor:'#f6f6f6' }}>
            <Text style={{ fontSize:26, fontWeight:'800', marginTop:8, marginBottom:12 }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          const img = item?.image
            ? { uri: item.image }
            : { uri: 'https://via.placeholder.com/112x112.png?text=BoxEat' };
          const st = statusStyle(item?.status);

          let rowRef = null;

          return (
            <Swipeable
              ref={(ref) => { rowRef = ref; }}
              onSwipeableOpen={() => {
                if (openRowRef.current && openRowRef.current !== rowRef) {
                  openRowRef.current.close();
                }
                openRowRef.current = rowRef;
              }}
              renderRightActions={() => (
                <RightAction onPress={() => confirmDelete(rowRef, item, index)} />
              )}
              renderLeftActions={() => (
                <LeftAction onPress={() => openInfos(rowRef, item)} />
              )}
              overshootRight={false}
              overshootLeft={false}
            >
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                  padding:14,
                  borderRadius:16,
                  backgroundColor:'#fff',
                  marginBottom:12,
                  shadowColor:'#000',
                  shadowOpacity:0.06,
                  shadowRadius:6,
                  elevation:2,
                }}
              >
                <Image source={img} style={{ width:56, height:56, borderRadius:10, marginRight:12 }} />
                <View style={{ flex:1 }}>
                  <Text style={{ fontSize:16, fontWeight:'700' }} numberOfLines={1}>
                    {item?.title ?? 'Plat'}
                  </Text>

                  <View style={{ flexDirection:'row', alignItems:'center', marginTop:6 }}>
                    <View
                      style={{
                        backgroundColor: st.bg,
                        paddingHorizontal:10,
                        paddingVertical:4,
                        borderRadius:999,
                        marginRight:8,
                      }}
                    >
                      <Text style={{ color: st.fg, fontSize:12, fontWeight:'700' }}>{st.label}</Text>
                    </View>
                    <Text style={{ color:'#666' }}>
                      {formatEuro(item?.price)} {item?.qty ? `• x${item.qty}` : ''}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => confirmDelete(rowRef, item, index)}
                  style={{ backgroundColor:'#c62828', paddingVertical:8, paddingHorizontal:12, borderRadius:10 }}
                >
                  <Text style={{ color:'#fff', fontWeight:'700' }}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </Swipeable>
          );
        }}
        ListFooterComponent={Footer}
      />
    </View>
  );
}
