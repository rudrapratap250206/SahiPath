import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useGetTests, useRecordTest } from "@workspace/api-client-react";

interface TestRecord {
  id: string;
  name: string;
  score: number;
  date: string;
  notes?: string;
}

function ScoreBadge({ score, colors }: { score: number; colors: ReturnType<typeof useColors> }) {
  const color =
    score >= 80 ? "#22C55E" :
    score >= 60 ? colors.primary :
    score >= 40 ? "#F59E0B" : colors.destructive;
  return (
    <View style={{
      backgroundColor: color + "22",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: color + "55",
    }}>
      <Text style={{ fontSize: 14, fontFamily: "Inter_700Bold", color }}>{score}%</Text>
    </View>
  );
}

export default function TestsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { data: testsData, refetch, isFetching } = useGetTests();
  const recordMutation = useRecordTest();

  const [form, setForm] = useState({ name: "", score: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const tests: TestRecord[] = (testsData as any)?.tests || [];

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topPad + 8,
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: { fontSize: 24, fontFamily: "Inter_700Bold", color: colors.foreground },
    headerSub: { fontSize: 14, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      marginHorizontal: 16,
      marginTop: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 15, fontFamily: "Inter_700Bold", color: colors.foreground, marginBottom: 14 },
    label: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_500Medium", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 },
    input: {
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
      marginBottom: 12,
    },
    row: { flexDirection: "row", gap: 10 },
    btn: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
    },
    btnText: { fontSize: 14, fontFamily: "Inter_700Bold", color: colors.primaryForeground },
    errorText: { color: colors.destructive, fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 8 },
    successText: { color: "#22C55E", fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 8 },
    sectionTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
    testItem: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 8,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    testName: { fontSize: 15, fontFamily: "Inter_600SemiBold", color: colors.foreground },
    testDate: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 },
    emptyWrap: { alignItems: "center", paddingVertical: 40 },
    emptyText: { color: colors.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 8 },
    footer: { height: bottomPad + 80 },
  });

  const handleSubmit = async () => {
    setError(null);
    const scoreNum = parseFloat(form.score);
    if (!form.name.trim()) { setError("Test name is required"); return; }
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) { setError("Score must be 0–100"); return; }
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await recordMutation.mutateAsync({ data: { name: form.name.trim(), score: scoreNum, notes: form.notes.trim() } });
      setForm({ name: "", score: "", notes: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      refetch();
    } catch (err: any) {
      setError(err?.data?.error || "Failed to record test");
    }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Tests</Text>
        <Text style={s.headerSub}>Track your study progress</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.card}>
          <Text style={s.cardTitle}>Record a Test</Text>
          <Text style={s.label}>Test Name</Text>
          <TextInput style={s.input} value={form.name} onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="e.g. Data Structures" placeholderTextColor={colors.mutedForeground} />
          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.label}>Score (0–100)</Text>
              <TextInput style={s.input} value={form.score} onChangeText={(v) => setForm((p) => ({ ...p, score: v }))}
                placeholder="85" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" />
            </View>
          </View>
          <Text style={s.label}>Notes (optional)</Text>
          <TextInput style={[s.input, { minHeight: 50 }]} value={form.notes}
            onChangeText={(v) => setForm((p) => ({ ...p, notes: v }))}
            placeholder="Areas to improve..." placeholderTextColor={colors.mutedForeground} multiline />
          {error && <Text style={s.errorText}>{error}</Text>}
          {success && <Text style={s.successText}>Test recorded successfully!</Text>}
          <Pressable style={[s.btn, recordMutation.isPending && { opacity: 0.6 }]}
            onPress={handleSubmit} disabled={recordMutation.isPending}>
            {recordMutation.isPending
              ? <ActivityIndicator size="small" color={colors.primaryForeground} />
              : <Text style={s.btnText}>Record Test</Text>}
          </Pressable>
        </View>

        <Text style={s.sectionTitle}>Past Tests {isFetching && <ActivityIndicator size="small" color={colors.primary} />}</Text>

        {tests.length === 0 ? (
          <View style={s.emptyWrap}>
            <Feather name="edit-3" size={36} color={colors.border} />
            <Text style={s.emptyText}>No tests recorded yet</Text>
          </View>
        ) : (
          tests.map((test) => (
            <View key={test.id} style={s.testItem}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={s.testName} numberOfLines={1}>{test.name}</Text>
                <Text style={s.testDate}>{formatDate(test.date)}</Text>
                {test.notes ? <Text style={{ fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 }} numberOfLines={1}>{test.notes}</Text> : null}
              </View>
              <ScoreBadge score={test.score} colors={colors} />
            </View>
          ))
        )}

        <View style={s.footer} />
      </ScrollView>
    </View>
  );
}
