import type { User as AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { signInFormSchema, signUpFormSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { NewUser, UserRole } from "@/lib/validations/users";
import type { db } from "@/db";
import { users } from "@/db/schemas";
import { createAdminClient } from "@/lib/supabase/server";
import { formatError } from "@/lib/utils";
import { eq } from "drizzle-orm";

type DrizzleClient = typeof db;

type ServiceResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        message: string;
        code?: string;
      };
    };

export class AuthService {
  private supabase: SupabaseClient;
  private db: DrizzleClient;

  constructor(supabase: SupabaseClient, db: DrizzleClient) {
    this.supabase = supabase;
    this.db = db;
  }

  public async signUpUser(
    input: z.infer<typeof signUpFormSchema>
  ): Promise<ServiceResponse<AuthUser>> {
    try {
      const { email, password } = input;

      const { data: authData, error: authError } =
        await this.supabase.auth.signUp({
          email,
          password,
          options: {
          data: {
            role: ['user'] as UserRole[],
          },
        },
        });

      if (authError) {
        return {
          success: false,
          error: {
            message: authError.message,
            code: authError.code,
          },
        };
      }

      if (!authData.user) {
        return {
          success: false,
          error: {
            message: "An unexpected error occurred during sign-up.",
            code: "AUTH_USER_NULL",
          },
        };
      }

      const authUser = authData.user;

      try {
        await this.db.transaction(async (tx) => {
          if (!authUser.email) {
            throw new Error("Auth user missing email");
          }

          const newUser: NewUser = {
            id: authUser.id,
            email: authUser.email,
          };

          await tx.insert(users).values(newUser);
        });

        return { success: true, data: authUser };
      } catch (dbError) {
        console.error(
          "Failed to create user profile, attempting to roll back auth user...",
          dbError
        );

        // Rollback auth user
        const supabaseAdmin = createAdminClient();
        const { error: deleteError } =
          await supabaseAdmin.auth.admin.deleteUser(authUser.id);

        if (deleteError) {
          console.error(
            "CRITICAL ERROR: Failed to roll back auth user after profile creation failure.",
            deleteError
          );
          return {
            success: false,
            error: {
              message: "A critical error occurred. Please contact support.",
              code: "ROLLBACK_FAILED",
            },
          };
        }

        console.log(`Successfully rolled back auth user: ${authUser.id}`);
        return {
          success: false,
          error: {
            message: "Failed to create user profile. Please try again.",
            code: "DB_INSERT_FAILED",
          },
        };
      }
    } catch (err) {
      console.error("Unexpected error in signUp:", formatError(err));
      return {
        success: false,
        error: {
          message: "An internal server error occurred.",
          code: "INTERNAL_ERROR",
        },
      };
    }
  }

  public async signInUser(
    input: z.infer<typeof signInFormSchema>
  ): Promise<ServiceResponse<AuthUser>> {
    try {
      const { email, password } = input;

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.code,
          },
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: {
            message: "An unexpected error occurred during sign-in.",
            code: "AUTH_USER_NULL",
          },
        };
      }

      try {
        await this.db
          .update(users)
          .set({
            lastLoginAt: new Date(),
            isActive: true,
          })
          .where(eq(users.id, data.user.id));
      } catch (updateError) {
        console.error("Failed to update lastLoginAt:", updateError);
      }

      return {
        success: true,
        data: data.user,
      };
    } catch (err) {
      console.error("Unexpected error in signIn:", formatError(err));
      return {
        success: false,
        error: {
          message: "An internal server error occurred.",
          code: "INTERNAL_ERROR",
        },
      };
    }
  }
}
