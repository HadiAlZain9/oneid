import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyContactsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>جهات الاتصال</Text>
      <Text>هنا ستظهر قائمة الأشخاص الذين أضفتهم.</Text>
    </View>
  );
};

export default MyContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
});