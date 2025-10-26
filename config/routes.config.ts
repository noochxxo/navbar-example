import { UserRole } from "@/lib/validations/users";
import { Route } from "next";

export const AUTH_ROUTES: Route[] = [
  "/",
  "/",
];

export const PUBLIC_ROUTES: Route[] = [
  "/",
  "/",
  "/",
];

export const AUTHENTICATED_ROUTES: Route[] = [
  "/" as Route,
  "/" as Route,
  "/" as Route,
  "/" as Route,
];

export const USER_ROUTE: Route = "/" as Route;

export const ROLE_ROUTES: Record<UserRole, Route[]> = {
  user: [
    "/" as Route,
  ],
  moderator: [
    "/" as Route,
    "/" as Route,
    "/" as Route,
    "/" as Route,
  ],
  admin: [
    "/" as Route,
    "/" as Route,
    "/" as Route,
    "/" as Route,
  ],
};