import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { HomeTabsParamList } from '../../navigation/types';

type Props = BottomTabScreenProps<HomeTabsParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const userId = route.params?.userId;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (!userId) return;
      const ref = doc(db, 'users', userId);
      const snap = await getDoc(ref);
      if (snap.exists()) setUser(snap.data());
    } catch (err) {
      console.log('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>لا يمكن تحميل بيانات المستخدم</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        {/* أيقونات التعديل والمشاركة */}
        <View style={styles.cardIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>

              <Ionicons name="create-outline" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Share')}>
            <Ionicons name="share-social-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* صورة المستخدم */}
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Ionicons name="person-circle-outline" size={70} color="#aaa" />
          </View>
        )}

        {/* الاسم */}
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>

        {/* نوع الحساب */}
        <Text style={styles.type}>
          {user.accountType === 'personal' && 'حساب شخصي'}
          {user.accountType === 'work' && 'حساب عمل'}
          {user.accountType === 'business' && 'نشاط تجاري'}
        </Text>

        {/* معلومات الحساب */}
        <View style={styles.infoBox}>
          {renderUserInfo(user)}
        </View>

      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const renderUserInfo = (user: any) => {
  if (user.accountType === 'work') {
    return (
      <>
        <Info label="عرف عن نفسك" value={user.bio} />
        <Info label="الجنس" value={user.gender} />
        <Info label="الموقع" value={user.location} />
        <Info label="رقم الهاتف" value={user.phone} />
        <Info label="المهنة" value={user.job} />
        <Info label="ساعات الدوام" value={user.workingHours} />
        <Info label="فيسبوك" value={user.facebook} />
        <Info label="إنستاغرام" value={user.instagram} />
        <Info label="واتساب" value={user.whatsapp} />
        <Info label="تيلجرام" value={user.telegram} />
      </>
    );
  }

  if (user.accountType === 'personal') {
    return (
      <>
        <Info label="الجنس" value={user.gender} />
        <Info label="الموقع" value={user.location} />
        <Info label="رقم الهاتف" value={user.phone} />
        <Info label="فيسبوك" value={user.facebook} />
        <Info label="إنستاغرام" value={user.instagram} />
        <Info label="واتساب" value={user.whatsapp} />
        <Info label="تيلجرام" value={user.telegram} />
      </>
    );
  }

  if (user.accountType === 'business') {
    return (
      <>
        <Info label="اسم النشاط" value={user.businessName} />
        <Info label="نوع النشاط" value={user.businessType} />
        <Info label="الموقع" value={user.location} />
        <Info label="رقم الهاتف" value={user.phone} />
        <Info label="ساعات الدوام" value={user.workingHours} />
        <Info label="أبرز الأعمال" value={user.highlights} />
        <Info label="فيسبوك" value={user.facebook} />
        <Info label="إنستاغرام" value={user.instagram} />
        <Info label="واتساب" value={user.whatsapp} />
        <Info label="تيلجرام" value={user.telegram} />
      </>
    );
  }

  return null;
};

const Info = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 13, color: '#666' }}>{label}</Text>
      <Text style={{ fontSize: 15, fontWeight: '500' }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#f5f5f8',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
  },
  cardIcons: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#e5e5ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  type: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginBottom: 18,
  },
  infoBox: {
    marginTop: 10,
  },
});