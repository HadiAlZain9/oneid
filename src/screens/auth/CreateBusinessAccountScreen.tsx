import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../services/firebase';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const CreateBusinessAccountScreen = () => {
  const navigation: any = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [highlights, setHighlights] = useState('');

  const handleCreate = async () => {
    try {
      if (!businessName || !ownerName) {
        alert("يرجى ملء الحقول الأساسية");
        return;
      }

      const docRef = await addDoc(collection(db, "business_accounts"), {
        businessName,
        ownerName,
        category,
        location,
        phone,
        facebook,
        instagram,
        whatsapp,
        telegram,
        workingHours,
        highlights,
        createdAt: serverTimestamp(),
      });
await AsyncStorage.setItem("currentUserId", docRef.id);
navigation.navigate({
  index: 0,
  routes: [{ name: "HomeTabs", params: { userId: docRef.id } }],
});
    } catch (error) {
      console.log("Error creating business account:", error);
      alert("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="storefront-outline" size={32} color="#111827" />
        <Text style={styles.title}>معلومات النشاط التجاري</Text>
      </View>

      <Field label="اسم النشاط" icon="business-outline" value={businessName} onChange={setBusinessName} />
      <Field label="اسم المالك" icon="person-outline" value={ownerName} onChange={setOwnerName} />
      <Field label="نوع النشاط" icon="pricetag-outline" value={category} onChange={setCategory} />

      <Field label="الموقع الجغرافي" icon="location-outline" value={location} onChange={setLocation} />
      <Field label="رقم الهاتف" icon="call-outline" value={phone} onChange={setPhone} />

      <Field label="فيسبوك" icon="logo-facebook" value={facebook} onChange={setFacebook} />
      <Field label="إنستغرام" icon="logo-instagram" value={instagram} onChange={setInstagram} />
      <Field label="واتساب" icon="logo-whatsapp" value={whatsapp} onChange={setWhatsapp} />
      <Field label="تيلجرام" icon="send-outline" value={telegram} onChange={setTelegram} />

      <Field label="ساعات الدوام" icon="time-outline" value={workingHours} onChange={setWorkingHours} />
      <Field label="أبرز الأعمال" icon="star-outline" value={highlights} onChange={setHighlights} />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>إنشاء الحساب</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateBusinessAccountScreen;

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
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});