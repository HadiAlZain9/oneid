import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAppSettings } from "../../context/AppSettingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const userId = route.params?.userId;

  const { language, theme, setLanguage, setTheme } = useAppSettings();

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const collections = [
      { name: "work_accounts", type: "work" },
      { name: "personal_accounts", type: "personal" },
      { name: "business_accounts", type: "business" },
    ];

    for (const col of collections) {
      const ref = doc(db, col.name, userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUser({ ...snap.data(), accountType: col.type });
        break;
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>جاري تحميل البيانات...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={32} color="#111" />
        <Text style={styles.title}>الإعدادات</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.type}>
          {user.accountType === "work" && "حساب عمل"}
          {user.accountType === "personal" && "حساب شخصي"}
          {user.accountType === "business" && "نشاط تجاري"}
        </Text>
      </View>

      {/* اللغة */}
      <Text style={styles.section}>اللغة</Text>
      <View style={styles.row}>
        <Chip label="العربية" active={language === "ar"} onPress={() => setLanguage("ar")} />
        <Chip label="English" active={language === "en"} onPress={() => setLanguage("en")} />
      </View>

      {/* الثيم */}
      <Text style={styles.section}>المظهر</Text>
      <View style={styles.row}>
        <Chip label="فاتح" active={theme === "light"} onPress={() => setTheme("light")} />
        <Chip label="داكن" active={theme === "dark"} onPress={() => setTheme("dark")} />
      </View>

      {/* خيارات أخرى */}
      <SettingItem icon="help-circle-outline" label="مركز المساعدة" onPress={() => navigation.navigate("Support")} />
      <SettingItem icon="document-text-outline" label="سياسة الخصوصية" onPress={() => navigation.navigate("Privacy")} />
      <SettingItem icon="shield-checkmark-outline" label="شروط الخدمة" onPress={() => navigation.navigate("Terms")} />
<SettingItem
  icon="log-out-outline"
  label="تسجيل الخروج"
  danger
  onPress={async () => {
    await AsyncStorage.removeItem("currentUserId");
    navigation.navigate({
      index: 0,
      routes: [{ name: "QRScan" }],
    });
  }}
/>    </ScrollView>
  );
};

export default SettingsScreen;

/* Components */

const SettingItem = ({ icon, label, onPress, danger }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={22} color={danger ? "#d00" : "#333"} />
    <Text style={[styles.itemText, danger && { color: "#d00" }]}>{label}</Text>
    <Ionicons name="chevron-back" size={18} color="#aaa" style={{ transform: [{ rotate: "180deg" }] }} />
  </TouchableOpacity>
);

const Chip = ({ label, active, onPress }: any) => (
  <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

/* Styles */

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "700" },
  card: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 12, marginBottom: 20 },
  name: { fontSize: 18, fontWeight: "700" },
  type: { fontSize: 14, color: "#666", marginTop: 4 },
  section: { fontSize: 15, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  row: { flexDirection: "row", gap: 8 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { flex: 1, marginLeft: 12, fontSize: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#ccc" },
  chipActive: { backgroundColor: "#111", borderColor: "#111" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#fff", fontWeight: "600" },
});