import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUserById(userId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

export async function getUsersByIds(userIds: string[]) {
  if (userIds.length === 0) return [];

  return await db
    .select()
    .from(users)
    .where(inArray(users.id, userIds));
}