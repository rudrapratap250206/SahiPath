import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { useGetTests } from "@workspace/api-client-react";

function Section({ title, children, colors }: { title: string; children: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Text style={{ fontSize: 13, fontFamily: "Inter_700Bold", color: colors.primary, textTransform: "uppercase", letterSpacing: 0.8 }}>{title}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.primary + "33" }} />
      </View>
      {children}
    </View>
  );
}

function Tag({ text, colors }: { text: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{
      backgroundColor: colors.primary + "18",
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: colors.primary + "44",
      marginRight: 6,
      marginBottom: 6,
    }}>
      <Text style={{ fontSize: 12, fontFamily: "Inter_500Medium", color: colors.primary }}>{text}</Text>
    </View>
  );
}

export default function ResumeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile, logout } = useAuth();
  const { data: testsData } = useGetTests();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const tests = (testsData as any)?.tests || [];
  const avgScore = tests.length > 0
    ? Math.round(tests.reduce((s: number, t: any) => s + t.score, 0) / tests.length)
    : null;

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await logout();
    router.replace("/auth");
  };

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topPad + 8,
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {},
    headerTitle: { fontSize: 24, fontFamily: "Inter_700Bold", color: colors.foreground },
    headerSub: { fontSize: 14, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 },
    body: { padding: 20 },
    nameCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    avatarCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary + "22",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.primary + "44",
    },
    avatarInitial: { fontSize: 22, fontFamily: "Inter_700Bold", color: colors.primary },
    personName: { fontSize: 20, fontFamily: "Inter_700Bold", color: colors.foreground },
    personRole: { fontSize: 14, color: colors.primary, fontFamily: "Inter_500Medium", marginTop: 2 },
    personSub: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },
    infoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
    infoText: { fontSize: 14, color: colors.foreground, fontFamily: "Inter_400Regular" },
    body2: { fontSize: 14, color: colors.foreground, fontFamily: "Inter_400Regular", lineHeight: 21 },
    tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
    logoutBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: colors.destructive + "15",
      borderWidth: 1,
      borderColor: colors.destructive + "33",
    },
    emptyCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 40,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    footer: { height: bottomPad + 80 },
  });

  if (!profile || !profile.firstName) {
    return (
      <View style={s.container}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>Resume</Text>
            <Text style={s.headerSub}>Your career profile</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
          <View style={s.emptyCard}>
            <Feather name="file-text" size={40} color={colors.border} />
            <Text style={{ fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 14 }}>
              No profile yet
            </Text>
            <Text style={{ fontSize: 14, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 6, textAlign: "center" }}>
              Complete your profile setup to generate your resume.
            </Text>
            <Pressable
              style={{ marginTop: 20, backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12 }}
              onPress={() => router.push("/setup")}
            >
              <Text style={{ fontSize: 14, fontFamily: "Inter_700Bold", color: colors.primaryForeground }}>
                Complete Setup
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const initials = [profile.firstName?.[0], profile.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "?";

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.headerTitle}>Resume</Text>
          <Text style={s.headerSub}>Your career profile</Text>
        </View>
        <Pressable style={s.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={14} color={colors.destructive} />
          <Text style={{ fontSize: 13, fontFamily: "Inter_500Medium", color: colors.destructive }}>Sign out</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>
        <View style={s.nameCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarInitial}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.personName}>{profile.firstName} {profile.lastName}</Text>
            {profile.currentRole && <Text style={s.personRole}>{profile.currentRole}</Text>}
            <Text style={s.personSub}>
              {[profile.location, profile.educationLevel].filter(Boolean).join(" · ")}
            </Text>
          </View>
        </View>

        <View style={s.card}>
          <Section title="Contact" colors={colors}>
            {profile.email && (
              <View style={s.infoRow}>
                <Feather name="mail" size={14} color={colors.primary} />
                <Text style={s.infoText}>{profile.email}</Text>
              </View>
            )}
            {profile.location && (
              <View style={s.infoRow}>
                <Feather name="map-pin" size={14} color={colors.primary} />
                <Text style={s.infoText}>{profile.location}</Text>
              </View>
            )}
            {profile.age && (
              <View style={s.infoRow}>
                <Feather name="user" size={14} color={colors.primary} />
                <Text style={s.infoText}>Age {profile.age}</Text>
              </View>
            )}
          </Section>

          {(profile.yearsOfExperience !== undefined || profile.educationLevel) && (
            <Section title="Experience" colors={colors}>
              {profile.educationLevel && (
                <View style={s.infoRow}>
                  <Feather name="book" size={14} color={colors.primary} />
                  <Text style={s.infoText}>{profile.educationLevel}</Text>
                </View>
              )}
              {profile.yearsOfExperience !== undefined && (
                <View style={s.infoRow}>
                  <Feather name="briefcase" size={14} color={colors.primary} />
                  <Text style={s.infoText}>{profile.yearsOfExperience} years of experience</Text>
                </View>
              )}
              {profile.availableHoursPerWeek !== undefined && (
                <View style={s.infoRow}>
                  <Feather name="clock" size={14} color={colors.primary} />
                  <Text style={s.infoText}>{profile.availableHoursPerWeek}h/week available</Text>
                </View>
              )}
            </Section>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <Section title="Skills" colors={colors}>
              <View style={s.tagsRow}>
                {profile.skills.map((skill) => <Tag key={skill} text={skill} colors={colors} />)}
              </View>
            </Section>
          )}

          {profile.careerInterests && profile.careerInterests.length > 0 && (
            <Section title="Interests" colors={colors}>
              <View style={s.tagsRow}>
                {profile.careerInterests.map((interest) => <Tag key={interest} text={interest} colors={colors} />)}
              </View>
            </Section>
          )}

          {profile.currentGoals && (
            <Section title="Goals" colors={colors}>
              <Text style={s.body2}>{profile.currentGoals}</Text>
            </Section>
          )}

          {profile.challenges && (
            <Section title="Areas to Develop" colors={colors}>
              <Text style={s.body2}>{profile.challenges}</Text>
            </Section>
          )}

          {avgScore !== null && (
            <Section title="Test Performance" colors={colors}>
              <View style={s.infoRow}>
                <Feather name="bar-chart-2" size={14} color={colors.primary} />
                <Text style={s.infoText}>Average score: {avgScore}% across {tests.length} test{tests.length !== 1 ? "s" : ""}</Text>
              </View>
            </Section>
          )}
        </View>

        <View style={s.footer} />
      </ScrollView>
    </View>
  );
}
