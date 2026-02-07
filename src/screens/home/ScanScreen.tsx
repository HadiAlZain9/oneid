import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

type Props = {
  route: { params: { userId: string } };
  navigation: any;
};

const ScanScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [manualId, setManualId] = useState('');

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const addContact = async (targetId: string) => {
    if (!targetId) {
      Alert.alert('خطأ', 'أدخل معرف المستخدم أو امسح الكود');
      return;
    }

    try {
      const ref = doc(db, 'Usres', targetId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        Alert.alert('خطأ', 'المستخدم غير موجود');
        return;
      }

      const user = snap.data() as any;
      const contactId = `${userId}_${targetId}`;

      await setDoc(doc(db, 'contacts', contactId), {
        ownerId: userId,
        contactUserId: targetId,
        createdAt: Date.now(),
        summary: {
          name:
            user.businessName ||
            `${(user.firstName || '')} ${(user.lastName || '')}`.trim(),
          accountType: user.accountType,
          phone: user.phone || null,
        },
      });

      Alert.alert('تم', 'تمت إضافة جهة الاتصال');
    } catch (err) {
      console.error(err);
      Alert.alert('خطأ', 'تعذر إضافة جهة الاتصال');
    }
  };

  const handleScan = async (result: any) => {
    if (scanned) return;
    setScanned(true);

    const data = result?.data;
    if (!data) return;

    await addContact(data);
  };

  if (!permission) {
    return <Text>جاري طلب صلاحية الكاميرا...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>يجب السماح للكاميرا لاستخدام هذه الميزة</Text>
        <Button title="السماح" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>مسح QR أو إدخال ID</Text>

      {Platform.OS !== 'web' ? (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleScan}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>
          الكاميرا غير مدعومة على الويب — استخدم الإدخال اليدوي
        </Text>
      )}

      {scanned && (
        <Button title="مسح مرة أخرى" onPress={() => setScanned(false)} />
      )}

      <Text style={styles.label}>أو أدخل ID يدوياً</Text>
      <TextInput
        placeholder="User ID"
        style={styles.input}
        value={manualId}
        onChangeText={setManualId}
      />

      <Button title="إضافة" onPress={() => addContact(manualId.trim())} />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, marginBottom: 12, textAlign: 'center' },
  camera: { width: '100%', height: 350, borderRadius: 12, overflow: 'hidden' },
  label: { marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});