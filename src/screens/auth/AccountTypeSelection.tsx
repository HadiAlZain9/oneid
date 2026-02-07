import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountTypeSelection'>;

const AccountTypeSelection: React.FC<Props> = ({ navigation, route }) => {
  const { qrCode, qrDocId } = route.params;

  const selectType = (type: string) => {
    navigation.navigate('CreateAccount', {
      qrCode,
      qrDocId,
      accountType: type,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر نوع الحساب</Text>

      <Button title="شخصي" onPress={() => selectType('personal')} />
      <Button title="عمل" onPress={() => selectType('work')} />
      <Button title="نشاط تجاري" onPress={() => selectType('business')} />
    </View>
  );
};

export default AccountTypeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});