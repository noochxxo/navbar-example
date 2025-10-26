import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  index,
  text,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const userRoleEnum = pgEnum("user_role", [
  "user",
  "moderator",
  "admin",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    role: text("role", {
      enum: ["user", "moderator", "admin"],
    }).array()
      .notNull()
      .default(["user"]),
    profilePictureUrl: text("profile_picture_url"),
    lastLoginAt: timestamp("last_login_at"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("users_email_idx").on(t.email),
    index("users_name_idx").on(t.name),
    index("users_role_idx").on(t.role),
    index("users_role_active_idx").on(t.role, t.isActive),
  ]
);

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.enum(["user", "moderator"]),
  profilePictureUrl: z.string().url("Invalid URL").optional(),
});

export const selectUserSchema = createSelectSchema(users);

export const updateUserSchema = insertUserSchema
  .partial()
  .required({ id: true })
  .omit({
    createdAt: true,
    updatedAt: true,
  });

export const updateUserProfileSchema = insertUserSchema
  .pick({
    name: true,
    profilePictureUrl: true,
  })
  .partial();

export const publicUserSchema = selectUserSchema.pick({
  id: true,
  name: true,
  role: true,
  profilePictureUrl: true,
  createdAt: true,
  updatedAt: true,
});

export const adminUserSchema = selectUserSchema;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type AdminUser = z.infer<typeof adminUserSchema>;
export type UserRole = typeof userRoleEnum.enumValues[number];

