import { UserRole } from "@/lib/validations/users";
import {
  Hash,
  Users,
  GraduationCap,
  BookOpen,
  User as UserIcon,
  BarChart,
  ShieldCheck,
  Flag,
  Settings,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { Route } from "next";

export type NavRoute = {
  href: Route;
  label: string;
  icon: LucideIcon;
  priority: number;
};

export const AUTH_ROUTES: NavRoute[] = [
  { href: "/", label: "Sign In", icon: GraduationCap, priority: 1 },
  { href: "/", label: "Sign Up", icon: GraduationCap, priority: 2 },
];

export const PUBLIC_ROUTES: NavRoute[] = [
  { href: "/", label: "Home", icon: GraduationCap, priority: 1 },
  { href: "/", label: "About", icon: GraduationCap, priority: 2 },
  { href: "/", label: "Contact", icon: Users, priority: 3 },
];

export const AUTHENTICATED_ROUTES: NavRoute[] = [
  { href: "/" as Route, label: "Classes", icon: GraduationCap, priority: 1 },
  { href: "/" as Route, label: "Groups", icon: Users, priority: 2 },
  { href: "/" as Route, label: "Topics", icon: Hash, priority: 3 },
  { href: "/" as Route, label: "Directory", icon: BookOpen, priority: 4 },
];

export const USER_ROUTE: NavRoute = {
  href: "/" as Route,
  label: "My Profile",
  icon: UserIcon,
  priority: 1,
};

export const ROLE_ROUTES: Record<UserRole, NavRoute[]> = {
  user: [
    { href: "/" as Route, label: "Home", icon: ShieldCheck, priority: 1 },
  ],
  moderator: [
    { href: "/" as Route, label: "Moderation", icon: ShieldCheck, priority: 1 },
    { href: "/" as Route, label: "Reports", icon: Flag, priority: 2 },
    { href: "/" as Route, label: "Manage Users", icon: Users, priority: 3 },
    { href: "/" as Route, label: "Site Settings", icon: Settings, priority: 4 },
  ],
  admin: [
    { href: "/" as Route, label: "Dashboard", icon: LayoutDashboard, priority: 1 },
    { href: "/" as Route, label: "All Users", icon: Users, priority: 2 },
    { href: "/" as Route, label: "Analytics", icon: BarChart, priority: 3 },
    { href: "/" as Route, label: "Settings", icon: Settings, priority: 4 },
  ],
};