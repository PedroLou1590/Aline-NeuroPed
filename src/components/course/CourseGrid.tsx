import type { Course } from "../../types";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
    courses: Course[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export function CourseGrid({
    courses,
    isLoading = false,
    emptyMessage = "Nenhum curso encontrado.",
}: CourseGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="text-5xl mb-4">📚</span>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
        </div>
    );
}