import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
  source: string;
  tags?: string[];
}

const JOB_BOARDS = [
  { name: "LinkedIn", color: "#0077B5", icon: "briefcase" as const, buildUrl: (skill: string, loc: string) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(skill)}&location=${encodeURIComponent(loc)}` },
  { name: "Naukri", color: "#FF7555", icon: "search" as const, buildUrl: (skill: string) => `https://www.naukri.com/${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-jobs-in-india` },
  { name: "Internshala", color: "#019EBF", icon: "award" as const, buildUrl: (skill: string) => `https://internshala.com/internships/${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-internship` },
  { name: "Indeed", color: "#003A9B", icon: "globe" as const, buildUrl: (skill: string, loc: string) => `https://in.indeed.com/jobs?q=${encodeURIComponent(skill)}&l=${encodeURIComponent(loc)}` },
];

async function fetchRemoteJobs(skill: string): Promise<Job[]> {
  try {
    const res = await fetch(`https://remoteok.com/api?tag=${encodeURIComponent(skill)}`, {
      headers: { "User-Agent": "SahiPath/1.0" },
    });
    if (!res.ok) return [];
    const data = await res.json() as any[];
    const listings = Array.isArray(data) ? data.filter((j) => j.id && j.position) : [];
    return listings.slice(0, 6).map((j: any): Job => ({
      id: String(j.id),
      title: j.position,
      company: j.company || "Remote Company",
      location: j.location || "Remote",
      type: "Remote",
      url: j.url || `https://remoteok.com/l/${j.id}`,
      source: "RemoteOK",
      tags: (j.tags || []).slice(0, 3),
    }));
  } catch {
    return [];
  }
}

async function fetchHimalayasJobs(skill: string): Promise<Job[]> {
  try {
    const res = await fetch(`https://himalayas.app/jobs/api?q=${encodeURIComponent(skill)}&limit=5`);
    if (!res.ok) return [];
    const data = await res.json() as any;
    const jobs = (data.jobs || []) as any[];
    return jobs.slice(0, 5).map((j: any): Job => ({
      id: "h-" + j.id,
      title: j.title || "Job",
      company: j.company?.name || "Company",
      location: j.location || "Remote",
      type: j.jobType || "Full-time",
      url: j.applicationLink || j.url || "https://himalayas.app",
      source: "Himalayas",
    }));
  } catch {
    return [];
  }
}

export default function JobsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const primarySkill = profile?.skills?.[0] || profile?.careerInterests?.[0] || "software developer";
  const location = profile?.location?.split(",")[0]?.trim() || "India";

  useEffect(() => {
    loadJobs();
  }, [primarySkill]);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const [remoteJobs, himalayasJobs] = await Promise.all([
        fetchRemoteJobs(primarySkill),
        fetchHimalayasJobs(primarySkill),
      ]);
      const combined = [...remoteJobs, ...himalayasJobs];
      setJobs(combined);
      if (combined.length === 0) {
        setError("No live listings found. Try the job boards below.");
      }
    } catch {
      setError("Couldn't load live listings. Use the job boards below.");
    } finally {
      setLoading(false);
    }
  };

  const openUrl = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (Platform.OS === "web") {
      window.open(url, "_blank");
    } else {
      await WebBrowser.openBrowserAsync(url);
    }
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
    headerTitle: { fontSize: 24, fontFamily: "Inter_700Bold", color: colors.foreground },
    headerSub: { fontSize: 14, color: colors.mutedForeground, fontFamily: "Inter_400Regular", marginTop: 2 },
    refreshBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    section: { paddingHorizontal: 20, marginTop: 16 },
    sectionTitle: { fontSize: 15, fontFamily: "Inter_700Bold", color: colors.foreground, marginBottom: 10 },
    boardsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    boardCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      flex: 1,
      minWidth: "45%",
    },
    boardName: { fontSize: 13, fontFamily: "Inter_700Bold" },
    jobCard: {
      backgroundColor: colors.card,
      borderRadius: 14,
      marginBottom: 10,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    jobTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    jobTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold", color: colors.foreground, flex: 1, marginRight: 8 },
    sourceBadge: {
      backgroundColor: colors.secondary,
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 3,
    },
    sourceText: { fontSize: 10, fontFamily: "Inter_500Medium", color: colors.mutedForeground },
    jobCompany: { fontSize: 13, color: colors.primary, fontFamily: "Inter_500Medium", marginTop: 4 },
    jobMeta: { flexDirection: "row", gap: 12, marginTop: 6 },
    jobMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    jobMetaText: { fontSize: 12, color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
    tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 8 },
    tag: {
      backgroundColor: colors.secondary,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 3,
    },
    tagText: { fontSize: 11, color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
    applyBtn: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      backgroundColor: colors.primary + "18",
      borderRadius: 8,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.primary + "44",
    },
    applyText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: colors.primary },
    errorText: { color: colors.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", paddingHorizontal: 20, marginTop: 16 },
    footer: { height: bottomPad + 80 },
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>Jobs</Text>
          <Text style={s.headerSub}>
            Showing results for "{primarySkill}"
          </Text>
        </View>
        <Pressable style={s.refreshBtn} onPress={loadJobs}>
          <Feather name="refresh-cw" size={16} color={colors.foreground} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.section}>
          <Text style={s.sectionTitle}>Job Boards</Text>
          <View style={s.boardsGrid}>
            {JOB_BOARDS.map((board) => (
              <Pressable
                key={board.name}
                style={[s.boardCard, {
                  backgroundColor: board.color + "15",
                  borderColor: board.color + "44",
                }]}
                onPress={() => openUrl(board.buildUrl(primarySkill, location))}
              >
                <Feather name={board.icon} size={16} color={board.color} />
                <Text style={[s.boardName, { color: board.color }]}>{board.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Live Listings</Text>

          {loading && (
            <View style={{ alignItems: "center", paddingVertical: 24 }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13, marginTop: 8, fontFamily: "Inter_400Regular" }}>
                Searching for jobs...
              </Text>
            </View>
          )}

          {!loading && error && (
            <View style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Feather name="wifi-off" size={28} color={colors.border} />
              <Text style={[s.errorText, { marginTop: 10 }]}>{error}</Text>
            </View>
          )}

          {!loading && jobs.map((job) => (
            <View key={job.id} style={s.jobCard}>
              <View style={s.jobTop}>
                <Text style={s.jobTitle} numberOfLines={2}>{job.title}</Text>
                <View style={s.sourceBadge}>
                  <Text style={s.sourceText}>{job.source}</Text>
                </View>
              </View>
              <Text style={s.jobCompany}>{job.company}</Text>
              <View style={s.jobMeta}>
                <View style={s.jobMetaItem}>
                  <Feather name="map-pin" size={11} color={colors.mutedForeground} />
                  <Text style={s.jobMetaText}>{job.location}</Text>
                </View>
                <View style={s.jobMetaItem}>
                  <Feather name="clock" size={11} color={colors.mutedForeground} />
                  <Text style={s.jobMetaText}>{job.type}</Text>
                </View>
              </View>
              {job.tags && job.tags.length > 0 && (
                <View style={s.tagsRow}>
                  {job.tags.map((tag) => (
                    <View key={tag} style={s.tag}>
                      <Text style={s.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
              <Pressable style={s.applyBtn} onPress={() => openUrl(job.url)}>
                <Feather name="external-link" size={13} color={colors.primary} />
                <Text style={s.applyText}>View & Apply</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={s.footer} />
      </ScrollView>
    </View>
  );
}
