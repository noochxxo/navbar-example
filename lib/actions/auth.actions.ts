"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signInFormSchema, signUpFormSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import {
  formatError,
  getRedirectPathForRole,
  isValidUserRoles,
} from "@/lib/utils";
import { AuthService } from "@/lib/services/auth/auth.service";
import { AuthUserForm } from "@/lib/types/auth";
import { UserRole } from "@/lib/validations/users";

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
    }
  } catch (error) {
    console.error("Unexpected sign out error:", error);
  }

  return redirect("/");
}

export async function signUpUser(
  prevState: AuthUserForm | undefined,
  formData: FormData
) {
  const validation = signUpFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  });

  if (!validation.success) {
    return {
      success: false,
      data: {
        email: formData.get("email") as string,
      },
      error: {
        message: formatError(validation.error),
      },
    };
  }

  const validatedFields = validation.data;

  const supabase = await createClient();
  const authService = new AuthService(supabase, db);

  const result = await authService.signUpUser(validatedFields);

  if (!result.success) {
    return {
      success: false,
      data: {
        email: validatedFields.email,
      },
      error: result.error,
    };
  }

  try {
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims.role) {
      // revalidatePath("/sign-in");
      // return redirect("/sign-in");
      revalidatePath("/");
      return redirect("/");
    }
    const userRoles: UserRole[] = isValidUserRoles(data.claims.role)
      ? data.claims.role
      : ["user"];
    const redirectPath = getRedirectPathForRole(userRoles);

    revalidatePath(redirectPath);
    // return redirect(redirectPath);
  } catch (error) {
    console.error("Failed to fetch user role from claims:", error);
    revalidatePath("/");
    return redirect("/");
  }
}

export async function signInUser(
  prevState: AuthUserForm | undefined,
  formData: FormData
) {
  const validation = signInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return {
      success: false,
      data: {
        email: formData.get("email") as string,
      },
      error: {
        message: formatError(validation.error),
      },
    };
  }

  const validatedFields = validation.data;

  const supabase = await createClient();
  const authService = new AuthService(supabase, db);

  const result = await authService.signInUser(validatedFields);

  if (!result.success) {
    return {
      success: false,
      data: {
        email: validatedFields.email,
      },
      error: result.error,
    };
  }

  try {
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims.role) {
      // revalidatePath("/sign-in");
      // return redirect("/sign-in");
      revalidatePath("/");
      return redirect("/");
    }
    const userRoles: UserRole[] = isValidUserRoles(data.claims.role)
      ? data.claims.role
      : ["user"];
    const redirectPath = getRedirectPathForRole(userRoles);

    revalidatePath(redirectPath);
    // return redirect(redirectPath);
  } catch (error) {
    console.error("Failed to fetch user role from claims:", error);
    // revalidatePath("/learner/dashboard");
    // return redirect("/learner/dashboard");
    revalidatePath("/");
  }
}
