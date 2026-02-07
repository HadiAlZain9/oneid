import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { RootStackParamList } from '../../navigation/types';
import uuid from 'react-native-uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC<Props> = ({ navigation, route }) => {
  const { qrCode, qrDocId, accountType } = route.params;

  // الحقول المشتركة
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  // حسابات التواصل
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');

  // حقول خاصة
  const [bio, setBio] = useState(''); // work
  const [job, setJob] = useState(''); // work
  const [workingHours, setWorkingHours] = useState(''); // work + business

  const [businessName, setBusinessName] = useState(''); // business
  const [businessType, setBusinessType] = useState(''); // business
  const [highlights, setHighlights] = useState(''); // business

  const handleCreate = async () => {
    if (!firstName || !lastName || !phone) {
      Alert.alert('تنبيه', 'يرجى إدخال الحقول الأساسية');
      return;
    }

    const userId = uuid.v4() as string;

    const baseData = {
      id: userId,
      qrCode,
      accountType,
      firstName,
      lastName,
      gender,
      location,
      phone,
      facebook,
      instagram,
      whatsapp,
      telegram,
      avatarUrl: null,
      createdAt: new Date().toISOString(),
    };

    let finalData: any = { ...baseData };

    if (accountType === 'work') {
      finalData = {
        ...finalData,
        bio,
        job,
        workingHours,
      };
    }

    if (accountType === 'business') {
      finalData = {
        ...finalData,
        businessName,
        businessType,
        workingHours,
        highlights,
      };
    }

    try {
      await setDoc(doc(db, 'users', userId), finalData);

      await updateDoc(doc(db, 'qrCodes', qrDocId), {
        assigned: true,
        userId,
      });

      navigation.replace('HomeTabs', { userId });
    } catch (err) {
      console.log(err);
      Alert.alert('خطأ', 'تعذر إنشاء الحساب');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>إنشاء حساب جديد</Text>

      {/* الحقول المشتركة */}
      <Input label="الاسم الأول" value={firstName} onChange={setFirstName} />
      <Input label="الاسم الأخير" value={lastName} onChange={setLastName} />
      <Input label="الجنس" value={gender} onChange={setGender} />
      <Input label="الموقع الجغرافي" value={location} onChange={setLocation} />
      <Input label="رقم الهاتف" value={phone} onChange={setPhone} />

      {/* حسابات التواصل */}
      <Text style={styles.section}>حسابات التواصل</Text>
      <Input label="فيسبوك" value={facebook} onChange={setFacebook} />
      <Input label="إنستاغرام" value={instagram} onChange={setInstagram} />
      <Input label="واتساب" value={whatsapp} onChange={setWhatsapp} />
      <Input label="تيلجرام" value={telegram} onChange={setTelegram} />

      {/* حقول حسب نوع الحساب */}
      {accountType === 'work' && (
        <>
          <Text style={styles.section}>معلومات العمل</Text>
          <Input label="عرف عن نفسك" value={bio} onChange={setBio} />
          <Input label="المهنة" value={job} onChange={setJob} />
          <Input label="ساعات الدوام" value={workingHours} onChange={setWorkingHours} />
        </>
      )}

      {accountType === 'business' && (
        <>
          <Text style={styles.section}>معلومات النشاط التجاري</Text>
          <Input label="اسم النشاط" value={businessName} onChange={setBusinessName} />
          <Input label="نوع النشاط" value={businessType} onChange={setBusinessType} />
          <Input label="ساعات الدوام" value={workingHours} onChange={setWorkingHours} />
          <Input label="أبرز الأعمال" value={highlights} onChange={setHighlights} />
        </>
      )}

      <Button title="إنشاء الحساب" onPress={handleCreate} />
    </ScrollView>
  );
};

export default CreateAccountScreen;

const Input = ({ label, value, onChange }: { label: string; value: string; onChange: (t: string) => void }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ marginBottom: 4 }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      style={styles.input}
      placeholder={label}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
});