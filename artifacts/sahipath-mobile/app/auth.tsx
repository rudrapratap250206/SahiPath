import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

const LANGUAGES = [
  { code: "English", label: "English", flag: "🇺🇸" },
  { code: "Hindi", label: "हिंदी", flag: "🇮🇳" },
  { code: "Tamil", label: "தமிழ்", flag: "🇮🇳" },
  { code: "Telugu", label: "తెలుగు", flag: "🇮🇳" },
  { code: "Kannada", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "Malayalam", label: "മലയാളം", flag: "🇮🇳" },
  { code: "Bengali", label: "বাংলা", flag: "🇮🇳" },
  { code: "Marathi", label: "मराठी", flag: "🇮🇳" },
];

export default function AuthScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedLang, setSelectedLang] = useState("English");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const s = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flexGrow: 1,
      paddingTop: topPad + 24,
      paddingBottom: bottomPad + 24,
      paddingHorizontal: 24,
    },
    logo: {
      alignItems: "center",
      marginBottom: 36,
    },
    logoIconWrap: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: colors.primary + "22",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.primary + "44",
    },
    title: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      marginTop: 4,
    },
    langSection: {
      marginBottom: 28,
    },
    langLabel: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    langGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    langChip: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    langChipText: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleRow: {
      flexDirection: "row",
      marginBottom: 20,
      backgroundColor: colors.secondary,
      borderRadius: 10,
      padding: 4,
    },
    toggleBtn: {
      flex: 1,
      paddingVertical: 9,
      borderRadius: 8,
      alignItems: "center",
    },
    toggleBtnText: {
      fontSize: 14,
      fontFamily: "Inter_600SemiBold",
    },
    label: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: "Inter_500Medium",
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
      marginBottom: 14,
    },
    errorBox: {
      backgroundColor: colors.destructive + "18",
      borderWidth: 1,
      borderColor: colors.destructive + "55",
      borderRadius: 8,
      padding: 10,
      marginBottom: 14,
    },
    errorText: {
      color: colors.destructive,
      fontSize: 13,
      fontFamily: "Inter_400Regular",
    },
    btn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 4,
    },
    btnText: {
      fontSize: 15,
      fontFamily: "Inter_700Bold",
      color: colors.primaryForeground,
    },
  });

  const handleSubmit = async () => {
    setError(null);
    if (!email.includes("@")) { setError("Enter a valid email address"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    try {
      setLoading(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password);
      }
      router.replace("/setup");
    } catch (err: any) {
      const msg = err?.data?.error || err?.message || "Something went wrong. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    router.replace("/setup");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.logo}>
          <View style={s.logoIconWrap}>
            <Feather name="compass" size={28} color={colors.primary} />
          </View>
          <Text style={s.title}>SahiPath</Text>
          <Text style={s.subtitle}>Your AI Career Mentor</Text>
        </View>

        <View style={s.langSection}>
          <Text style={s.langLabel}>Choose your language</Text>
          <View style={s.langGrid}>
            {LANGUAGES.map((lang) => {
              const active = selectedLang === lang.code;
              return (
                <Pressable
                  key={lang.code}
                  style={[s.langChip, {
                    backgroundColor: active ? colors.primary + "22" : colors.secondary,
                    borderColor: active ? colors.primary : colors.border,
                  }]}
                  onPress={() => setSelectedLang(lang.code)}
                >
                  <Text style={{ fontSize: 14 }}>{lang.flag}</Text>
                  <Text style={[s.langChipText, { color: active ? colors.primary : colors.mutedForeground }]}>
                    {lang.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={s.card}>
          <View style={s.toggleRow}>
            {(["login", "register"] as const).map((m) => {
              const active = mode === m;
              return (
                <Pressable
                  key={m}
                  style={[s.toggleBtn, { backgroundColor: active ? colors.primary : "transparent" }]}
                  onPress={() => { setMode(m); setError(null); }}
                >
                  <Text style={[s.toggleBtnText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>
                    {m === "login" ? "Sign In" : "Register"}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={s.label}>Email address</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@gmail.com"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            value={password}
            onChangeText={setPassword}
            placeholder={mode === "register" ? "Minimum 6 characters" : "Your password"}
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            onSubmitEditing={handleSubmit}
          />

          {error && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}

          <Pressable style={[s.btn, loading && { opacity: 0.6 }]} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.primaryForeground} />
            ) : (
              <Text style={s.btnText}>{mode === "login" ? "Sign In" : "Create Account"}</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={handleGuestContinue} style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: colors.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular" }}>
            Continue without account →
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
