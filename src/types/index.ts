// ─── User ───────────────────────────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: "student" | "instructor" | "admin";
    enrolledCourseIds: string[];
    createdAt: string;
}

// ─── Course ──────────────────────────────────────────────────────────────────
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnailUrl: string;
    instructorId: string;
    instructor: Pick<User, "id" | "name" | "avatarUrl">;
    price: number;
    level: CourseLevel;
    status: CourseStatus;
    categoryId: string;
    tags: string[];
    totalDurationSeconds: number;
    totalLessons: number;
    enrollmentCount: number;
    rating: number;
    ratingCount: number;
    modules: Module[];
    createdAt: string;
    updatedAt: string;
}

// ─── Module / Lesson ─────────────────────────────────────────────────────────
export interface Module {
    id: string;
    courseId: string;
    title: string;
    order: number;
    lessons: Lesson[];
}

export type LessonType = "video" | "article" | "quiz";

export interface Lesson {
    id: string;
    moduleId: string;
    title: string;
    type: LessonType;
    durationSeconds: number;
    order: number;
    isFree: boolean;
    videoUrl?: string;
    content?: string;
}

// ─── Enrollment & Progress ────────────────────────────────────────────────────
export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: string;
    progress: Progress;
}

export interface Progress {
    completedLessonIds: string[];
    lastLessonId?: string;
    percentComplete: number;
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category {
    id: string;
    name: string;
    slug: string;
    iconName?: string;
}

// ─── API helpers ─────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code?: string;
    status: number;
}