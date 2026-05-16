import { pgTable, text, real, timestamp } from "drizzle-orm/pg-core";

export const testRecordsTable = pgTable("test_records", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  score: real("score").notNull(),
  date: text("date").notNull(),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TestRecord = typeof testRecordsTable.$inferSelect;
export type InsertTestRecord = typeof testRecordsTable.$inferInsert;
