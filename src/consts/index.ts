export const ROUTES = {
    HOME: "/",
    COURSES: "/courses",
    COURSE_DETAIL: (slug: string) => `/courses/${slug}`,
    COURSE_LEARN: (slug: string) => `/courses/${slug}/learn`,
    CATEGORY: (slug: string) => `/categories/${slug}`,
    DASHBOARD: "/dashboard",
    MY_COURSES: "/dashboard/my-courses",
    PROFILE: "/dashboard/profile",
    LOGIN: "/login",
    REGISTER: "/register",
    ADMIN: "/admin",
    ADMIN_COURSES: "/admin/courses",
    ADMIN_COURSE_EDIT: (id: string) => `/admin/courses/${id}/edit`,
    ADMIN_USERS: "/admin/users",
} as const;

export const ITEMS_PER_PAGE = 12;

export const LEVEL_LABELS: Record<string, string> = {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
};

export const LEVEL_COLORS: Record<string, string> = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-yellow-100 text-yellow-700",
    advanced: "bg-red-100 text-red-700",
};