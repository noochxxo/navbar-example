import { VALID_ROLES } from "@/config/roles.config";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, UserRole } from "./validations/users";
import { ZodError } from "zod";
import { Route } from "next/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error instanceof ZodError) {
    const fieldErrors = error.issues.map((issue) => issue.message);
    return fieldErrors.join(". ");
  } else if (error.code === "23505") {
    const constraintName = error.constraint || "";
    if (constraintName.includes("email")) {
      return "Email already exists";
    }
    return "Record already exists";
  } else {
    return typeof error?.message === "string"
      ? error.message
      : JSON.stringify(error?.message || error);
  }
}

export function hasAnyRole(user: User, roles: UserRole[]): boolean {
  return roles.some((role) => user.role.includes(role));
}

export function getRedirectPathForRole(userRoles: UserRole[]): Route {
  for (const role of VALID_ROLES) {
    if (userRoles.includes(role)) {
      return `/${role}/dashboard` as Route;
    }
  }
  
  return "/learner/dashboard" as Route;
}

export function isValidUserRoles(value: unknown): value is UserRole[] {
  return (
    Array.isArray(value) &&
    value.every((role) => VALID_ROLES.includes(role as UserRole))
  );
}