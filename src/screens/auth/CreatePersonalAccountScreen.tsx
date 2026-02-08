import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../services/firebase';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
const CreatePersonalAccountScreen = () => {
  const navigation: any = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');

  const handleCreate = async () => {
    try {
      if (!firstName || !lastName) {
        alert("يرجى ملء الحقول الأساسية");
        return;
      }

      const docRef = await addDoc(collection(db, "personal_accounts"), {
        firstName,
        lastName,
        gender,
        location,
        phone,
        facebook,
        instagram,
        whatsapp,
        telegram,
        createdAt: serverTimestamp(),
      });
await AsyncStorage.setItem("currentUserId", docRef.id);

navigation.navigate({
  index: 0,
  routes: [{ name: "HomeTabs", params: { userId: docRef.id } }],
});
    } catch (error) {
      console.log("Error creating personal account:", error);
      alert("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-outline" size={32} color="#111827" />
        <Text style={styles.title}>معلومات الحساب الشخصي</Text>
      </View>

      <Field label="الاسم الأول" icon="person-outline" value={firstName} onChange={setFirstName} />
      <Field label="الاسم الأخير" icon="person-outline" value={lastName} onChange={setLastName} />

      <Text style={styles.label}>الجنس</Text>
      <View style={styles.row}>
        <Chip label="ذكر" active={gender === 'male'} onPress={() => setGender('male')} />
        <Chip label="أنثى" active={gender === 'female'} onPress={() => setGender('female')} />
      </View>

      <Field label="الموقع الجغرافي" icon="location-outline" value={location} onChange={setLocation} />
      <Field label="رقم الهاتف" icon="call-outline" value={phone} onChange={setPhone} />

      <Field label="فيسبوك" icon="logo-facebook" value={facebook} onChange={setFacebook} />
      <Field label="إنستغرام" icon="logo-instagram" value={instagram} onChange={setInstagram} />
      <Field label="واتساب" icon="logo-whatsapp" value={whatsapp} onChange={setWhatsapp} />
      <Field label="تيلجرام" icon="send-outline" value={telegram} onChange={setTelegram} />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>إنشاء الحساب</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePersonalAccountScreen;

/* ---------------------- Field Component ---------------------- */
type FieldProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChange: (text: string) => void;
};

const Field: React.FC<FieldProps> = ({ label, icon, value, onChange }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#555" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  </>
);

/* ---------------------- Chip Component ---------------------- */
type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={active ? styles.chipTextActive : styles.chipText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------------------- Styles ---------------------- */
const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '500', marginTop: 12, marginBottom: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 8 },
  row: { flexDirection: 'row', gap: 8, marginTop: 4 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});