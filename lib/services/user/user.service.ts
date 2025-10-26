
import { createClient } from "@/lib/supabase/server";
import type { User, PublicUser } from "@/db/schemas/users.schema";
import { publicUserSchema } from "@/db/schemas/users.schema";
import { getUserByEmail, getUserById, getUsersByIds } from "@/lib/queries/user/user.queries";

export class UserService {
  async getCurrentUser(): Promise<User | null> {
    const supabase = await createClient();
    
    const { data: { user: authUser }, error } = await supabase.auth.getUser();
    
    if (error || !authUser) {
      return null;
    }

    const user = await getUserById(authUser.id);
    
    return user ?? null;
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await getUserById(userId);
    return user ?? null;
  }

  async getPublicUserById(userId: string): Promise<PublicUser | null> {
    const user = await getUserById(userId);
    
    if (!user) {
      return null;
    }

    return publicUserSchema.parse(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await getUserByEmail(email);
    return user ?? null;
  }

  async getUsersByIds(userIds: string[]): Promise<User[]> {
    return await getUsersByIds(userIds);
  }

  async getPublicUsersByIds(userIds: string[]): Promise<PublicUser[]> {
    const users = await getUsersByIds(userIds);
    return users.map(user => publicUserSchema.parse(user));
  }
}