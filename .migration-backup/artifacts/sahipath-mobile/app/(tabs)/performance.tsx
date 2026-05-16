import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useGetTests } from "@workspace/api-client-react";

interface TestRecord {
  id: string;
  name: string;
  score: number;
  date: string;
}

function StatCard({ label, value, sub, color, colors }: {
  label: string; value: string; sub?: string; color: string; colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
    }}>
      <Text style={{ fontSize: 28, fontFamily: "Inter_700Bold", color }}>{value}</Text>
      <Text style={{ fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_500Medium", marginTop: 2 }}>{label}</Text>
      {sub && <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 1 }}>{sub}</Text>}
    </View>
  );
}

export default function PerformanceScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { data: testsData, isFetching } = useGetTests();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const tests: TestRecord[] = (testsData as any)?.tests || [];
  const sorted = [...tests].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const recent = sorted.slice(-10);

  const avg = tests.length > 0 ? Math.round(tests.reduce((s, t) => s + t.score, 0) / tests.length) : 0;
  const best = tests.length > 0 ? Math.max(...tests.map((t) => t.score)) : 0;
  const trend = recent.length >= 2
    ? recent[recent.length - 1].score - recent[0].score
    : 0;

  const CHART_HEIGHT = 140;

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
    statsRow: { flexDirection: "row", gap: 10, marginHorizontal: 16, marginTop: 16 },
    sectionTitle: { fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, marginHorizontal: 20, marginTop: 20, marginBottom: 14 },
    chartCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      marginHorizontal: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chartArea: {
      height: CHART_HEIGHT,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 6,
      justifyContent: "flex-start",
    },
    barCol: { alignItems: "center", gap: 4 },
    barLabel: { fontSize: 9, color: colors.mutedForeground, fontFamily: "Inter_400Regular", textAlign: "center" },
    emptyWrap: { alignItems: "center", paddingVertical: 60 },
    emptyText: { color: colors.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 12 },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "55",
    },
    rank: { width: 28, fontSize: 13, fontFamily: "Inter_700Bold", color: colors.mutedForeground },
    itemName: { flex: 1, fontSize: 14, fontFamily: "Inter_500Medium", color: colors.foreground },
    footer: { height: bottomPad + 80 },
  });

  const maxScore = recent.length > 0 ? Math.max(...recent.map((t) => t.score), 60) : 100;
  const trendColor = trend > 5 ? "#22C55E" : trend < -5 ? colors.destructive : colors.primary;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Progress</Text>
        <Text style={s.headerSub}>Your performance over time</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isFetching && !tests.length && (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        )}

        {tests.length === 0 && !isFetching ? (
          <View style={s.emptyWrap}>
            <Feather name="bar-chart-2" size={48} color={colors.border} />
            <Text style={s.emptyText}>No data yet — record some tests to see your progress</Text>
          </View>
        ) : (
          <>
            <View style={s.statsRow}>
              <StatCard label="Average" value={avg + "%"} color={colors.primary} colors={colors} />
              <StatCard label="Best" value={best + "%"} color="#22C55E" colors={colors} />
              <StatCard label="Trend" value={trend >= 0 ? "+" + trend + "%" : trend + "%"} color={trendColor} colors={colors} />
            </View>

            {recent.length > 0 && (
              <>
                <Text style={s.sectionTitle}>Score History</Text>
                <View style={s.chartCard}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={[s.chartArea, { minWidth: recent.length * 50 }]}>
                      {recent.map((test) => {
                        const barH = Math.max(8, (test.score / maxScore) * CHART_HEIGHT);
                        const barColor =
                          test.score >= 80 ? "#22C55E" :
                          test.score >= 60 ? colors.primary :
                          test.score >= 40 ? "#F59E0B" : colors.destructive;
                        const shortName = test.name.split(" ").slice(0, 2).join(" ");
                        return (
                          <View key={test.id} style={[s.barCol, { width: 44 }]}>
                            <Text style={{ fontSize: 10, color: barColor, fontFamily: "Inter_700Bold" }}>{test.score}</Text>
                            <View style={{
                              width: 32,
                              height: barH,
                              backgroundColor: barColor,
                              borderRadius: 6,
                              opacity: 0.85,
                            }} />
                            <Text style={s.barLabel} numberOfLines={2}>{shortName}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </>
            )}

            {tests.length > 0 && (
              <>
                <Text style={s.sectionTitle}>All Tests</Text>
                <View style={{
                  backgroundColor: colors.card,
                  borderRadius: 14,
                  marginHorizontal: 16,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}>
                  {[...tests]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map((test, idx) => {
                      const barColor =
                        test.score >= 80 ? "#22C55E" :
                        test.score >= 60 ? colors.primary :
                        test.score >= 40 ? "#F59E0B" : colors.destructive;
                      return (
                        <View key={test.id} style={s.listItem}>
                          <Text style={s.rank}>#{idx + 1}</Text>
                          <Text style={s.itemName} numberOfLines={1}>{test.name}</Text>
                          <Text style={{ fontSize: 14, fontFamily: "Inter_700Bold", color: barColor }}>{test.score}%</Text>
                        </View>
                      );
                    })}
                </View>
              </>
            )}
          </>
        )}

        <View style={s.footer} />
      </ScrollView>
    </View>
  );
}
