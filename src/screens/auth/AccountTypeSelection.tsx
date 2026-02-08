import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'; // Adjust the path as needed
type Props = NativeStackScreenProps<RootStackParamList, 'AccountTypeSelection'>;



const AccountTypeSelectionScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر نوع الحساب</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CreateWorkAccount')}
      >
        <Text style={styles.cardTitle}>حساب عمل</Text>
        <Text style={styles.cardSubtitle}>مخصص لأصحاب العمل والمهنيين</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CreatePersonalAccount')}
      >
        <Text style={styles.cardTitle}>حساب شخصي</Text>
        <Text style={styles.cardSubtitle}>مخصص للاستخدام الشخصي والتواصل</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CreateBusinessAccount')}
      >
        <Text style={styles.cardTitle}>نشاط تجاري</Text>
        <Text style={styles.cardSubtitle}>مخصص للمطاعم، المتاجر، والأنشطة التجارية</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountTypeSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#666' },
});