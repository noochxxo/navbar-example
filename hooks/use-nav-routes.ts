"use client";

import { AUTHENTICATED_ROUTES, NavRoute, ROLE_ROUTES, USER_ROUTE } from "@/config/navigation.config";
import { User } from "@/lib/validations/users";
import { useMemo } from "react";


export function useNavRoutes(user: User ): NavRoute[] {
  return useMemo(() => {
    const routes: NavRoute[] = [...AUTHENTICATED_ROUTES];

    if (!user) return routes;

    // All authenticated users get profile
    routes.push(USER_ROUTE);

    // Add role-specific routes
    const routeMap = new Map<string, NavRoute>();
    
    for (const role of user.role) {
      const roleRoutes = ROLE_ROUTES[role];
      if (roleRoutes) {
        roleRoutes.forEach(route => {
          routeMap.set(route.href, route);
        });
      }
    }

    routes.push(...routeMap.values());

    return routes;
  }, [user]);
}

