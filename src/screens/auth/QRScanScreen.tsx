import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'QRScan'>;

const QRScanScreen: React.FC<Props> = ({ navigation }) => {
  const [qrValue, setQrValue] = useState('');

  const handleCheckQR = async () => {
    if (!qrValue.trim()) {
      Alert.alert('تنبيه', 'الرجاء إدخال رمز QR');
      return;
    }

    try {
      const q = query(
        collection(db, 'qrCodes'),
        where('code', '==', qrValue.trim())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('خطأ', 'الرمز غير صحيح');
        return;
      }

      const docSnap = snapshot.docs[0];
      const data = docSnap.data() as {
        assigned?: boolean;
        userId?: string | null;
      };

     if (data.assigned && data.userId) {
  Alert.alert('تنبيه', 'هذا الرمز مستخدم من قبل');
  return;
}

navigation.navigate('AccountTypeSelection', {
  qrCode: qrValue,
  qrDocId: docSnap.id,
});
    } catch (error) {
      console.log(error);
      Alert.alert('خطأ', 'حدث خطأ أثناء التحقق من الرمز');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أدخل رمز QR للمتابعة</Text>

      <TextInput
        placeholder="رمز QR"
        value={qrValue}
        onChangeText={setQrValue}
        style={styles.input}
      />

      <Button title="متابعة" onPress={handleCheckQR} />
    </View>
  );
};

export default QRScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});