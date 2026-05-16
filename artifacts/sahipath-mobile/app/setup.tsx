import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
import type { UserProfile } from "@workspace/api-client-react";

const EDUCATION_LEVELS = ["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"];
const LEARNING_STYLES = ["Interactive", "Reading", "Video", "Hands-on", "Mixed"];

export default function SetupScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { saveProfile, user } = useAuth();

  const [step, setStep] = useState<"personal" | "professional">("personal");
  const [loading, setLoading] = useState(false);

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: user?.email || "",
    location: "",
    educationLevel: "Bachelor's",
    currentRole: "",
    yearsOfExperience: "",
  });

  const [professional, setProfessional] = useState({
    skills: "",
    careerInterests: "",
    currentGoals: "",
    challenges: "",
    availableHoursPerWeek: "",
    preferredLearningStyle: "Interactive",
  });

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: {
      flexGrow: 1,
      paddingTop: topPad + 16,
      paddingBottom: bottomPad + 24,
      paddingHorizontal: 20,
    },
    header: { marginBottom: 24 },
    stepRow: { flexDirection: "row", gap: 6, marginBottom: 20 },
    stepDot: { flex: 1, height: 4, borderRadius: 2 },
    title: { fontSize: 24, fontWeight: "700" as const, color: colors.foreground, fontFamily: "Inter_700Bold", marginBottom: 4 },
    subtitle: { fontSize: 14, color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
    field: { marginBottom: 16 },
    label: { fontSize: 13, color: colors.mutedForeground, fontFamily: "Inter_500Medium", marginBottom: 6 },
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
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      borderWidth: 1,
    },
    chipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
    btn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 12,
    },
    btnText: { fontSize: 15, fontFamily: "Inter_700Bold", color: colors.primaryForeground },
    btnSecondary: {
      backgroundColor: colors.secondary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 8,
    },
    btnSecText: { fontSize: 14, fontFamily: "Inter_500Medium", color: colors.mutedForeground },
  });

  const handleNext = () => {
    if (!personal.firstName.trim() || !personal.currentRole.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep("professional");
  };

  const handleFinish = async () => {
    if (!professional.skills.trim() || !professional.careerInterests.trim()) return;
    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const profile: UserProfile = {
        language: "English",
        firstName: personal.firstName.trim(),
        lastName: personal.lastName.trim(),
        age: parseInt(personal.age) || undefined,
        email: personal.email.trim() || user?.email || "",
        location: personal.location.trim(),
        educationLevel: personal.educationLevel,
        currentRole: personal.currentRole.trim(),
        yearsOfExperience: parseInt(personal.yearsOfExperience) || undefined,
        skills: professional.skills.split(",").map((s) => s.trim()).filter(Boolean),
        careerInterests: professional.careerInterests.split(",").map((s) => s.trim()).filter(Boolean),
        currentGoals: professional.currentGoals.trim(),
        challenges: professional.challenges.trim(),
        availableHoursPerWeek: parseInt(professional.availableHoursPerWeek) || undefined,
        preferredLearningStyle: professional.preferredLearningStyle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveProfile(profile);
      router.replace("/(tabs)");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (step === "personal") {
    return (
      <View style={s.container}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <View style={s.header}>
            <View style={s.stepRow}>
              <View style={[s.stepDot, { backgroundColor: colors.primary }]} />
              <View style={[s.stepDot, { backgroundColor: colors.border }]} />
            </View>
            <Text style={s.title}>Personal Info</Text>
            <Text style={s.subtitle}>Tell us a bit about yourself</Text>
          </View>

          <View style={s.field}>
            <Text style={s.label}>First Name *</Text>
            <TextInput style={s.input} value={personal.firstName}
              onChangeText={(v) => setPersonal((p) => ({ ...p, firstName: v }))}
              placeholder="Rahul" placeholderTextColor={colors.mutedForeground} testID="first-name-input" />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Last Name</Text>
            <TextInput style={s.input} value={personal.lastName}
              onChangeText={(v) => setPersonal((p) => ({ ...p, lastName: v }))}
              placeholder="Sharma" placeholderTextColor={colors.mutedForeground} />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Age</Text>
            <TextInput style={s.input} value={personal.age}
              onChangeText={(v) => setPersonal((p) => ({ ...p, age: v }))}
              placeholder="22" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Location</Text>
            <TextInput style={s.input} value={personal.location}
              onChangeText={(v) => setPersonal((p) => ({ ...p, location: v }))}
              placeholder="Mumbai, India" placeholderTextColor={colors.mutedForeground} />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Current Role / What you do *</Text>
            <TextInput style={s.input} value={personal.currentRole}
              onChangeText={(v) => setPersonal((p) => ({ ...p, currentRole: v }))}
              placeholder="Student / Software Engineer" placeholderTextColor={colors.mutedForeground}
              testID="current-role-input" />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Years of Experience</Text>
            <TextInput style={s.input} value={personal.yearsOfExperience}
              onChangeText={(v) => setPersonal((p) => ({ ...p, yearsOfExperience: v }))}
              placeholder="2" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" />
          </View>
          <View style={s.field}>
            <Text style={s.label}>Education Level</Text>
            <View style={s.chipRow}>
              {EDUCATION_LEVELS.map((lvl) => {
                const active = personal.educationLevel === lvl;
                return (
                  <Pressable key={lvl} style={[s.chip, {
                    backgroundColor: active ? colors.primary + "22" : colors.secondary,
                    borderColor: active ? colors.primary : colors.border,
                  }]} onPress={() => setPersonal((p) => ({ ...p, educationLevel: lvl }))}>
                    <Text style={[s.chipText, { color: active ? colors.primary : colors.mutedForeground }]}>{lvl}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable style={s.btn} onPress={handleNext} testID="next-btn">
            <Text style={s.btnText}>Next →</Text>
          </Pressable>
          <Pressable style={s.btnSecondary} onPress={() => router.replace("/(tabs)")}>
            <Text style={s.btnSecText}>Skip for now</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <View style={s.stepRow}>
            <View style={[s.stepDot, { backgroundColor: colors.primary }]} />
            <View style={[s.stepDot, { backgroundColor: colors.primary }]} />
          </View>
          <Text style={s.title}>Career Profile</Text>
          <Text style={s.subtitle}>Help your AI mentor guide you better</Text>
        </View>

        <View style={s.field}>
          <Text style={s.label}>Skills (comma-separated) *</Text>
          <TextInput style={[s.input, { minHeight: 60 }]} value={professional.skills}
            onChangeText={(v) => setProfessional((p) => ({ ...p, skills: v }))}
            placeholder="Python, React, Data Analysis" placeholderTextColor={colors.mutedForeground}
            multiline testID="skills-input" />
        </View>
        <View style={s.field}>
          <Text style={s.label}>Career Interests (comma-separated) *</Text>
          <TextInput style={[s.input, { minHeight: 60 }]} value={professional.careerInterests}
            onChangeText={(v) => setProfessional((p) => ({ ...p, careerInterests: v }))}
            placeholder="Machine Learning, Web Dev, Product Management" placeholderTextColor={colors.mutedForeground}
            multiline testID="interests-input" />
        </View>
        <View style={s.field}>
          <Text style={s.label}>Current Goals</Text>
          <TextInput style={[s.input, { minHeight: 60 }]} value={professional.currentGoals}
            onChangeText={(v) => setProfessional((p) => ({ ...p, currentGoals: v }))}
            placeholder="Get a software engineer job at a top startup" placeholderTextColor={colors.mutedForeground}
            multiline />
        </View>
        <View style={s.field}>
          <Text style={s.label}>Challenges</Text>
          <TextInput style={[s.input, { minHeight: 60 }]} value={professional.challenges}
            onChangeText={(v) => setProfessional((p) => ({ ...p, challenges: v }))}
            placeholder="Lack of real-world projects, interview prep" placeholderTextColor={colors.mutedForeground}
            multiline />
        </View>
        <View style={s.field}>
          <Text style={s.label}>Hours available per week</Text>
          <TextInput style={s.input} value={professional.availableHoursPerWeek}
            onChangeText={(v) => setProfessional((p) => ({ ...p, availableHoursPerWeek: v }))}
            placeholder="10" placeholderTextColor={colors.mutedForeground} keyboardType="number-pad" />
        </View>
        <View style={s.field}>
          <Text style={s.label}>Preferred Learning Style</Text>
          <View style={s.chipRow}>
            {LEARNING_STYLES.map((style) => {
              const active = professional.preferredLearningStyle === style;
              return (
                <Pressable key={style} style={[s.chip, {
                  backgroundColor: active ? colors.primary + "22" : colors.secondary,
                  borderColor: active ? colors.primary : colors.border,
                }]} onPress={() => setProfessional((p) => ({ ...p, preferredLearningStyle: style }))}>
                  <Text style={[s.chipText, { color: active ? colors.primary : colors.mutedForeground }]}>{style}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable style={[s.btn, loading && { opacity: 0.6 }]} onPress={handleFinish} disabled={loading} testID="finish-btn">
          {loading ? <ActivityIndicator size="small" color={colors.primaryForeground} />
            : <Text style={s.btnText}>Start My Journey</Text>}
        </Pressable>
        <Pressable style={s.btnSecondary} onPress={() => setStep("personal")}>
          <Text style={s.btnSecText}>← Back</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
