import { useState, useEffect, useCallback } from "react";
import type { Course, PaginatedResponse } from "../types";
import { ITEMS_PER_PAGE } from "../consts";

interface UseCourseFilters {
    search?: string;
    categoryId?: string;
    level?: string;
    page?: number;
}

interface UseCoursesReturn {
    courses: Course[];
    total: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useCourses(filters: UseCourseFilters = {}): UseCoursesReturn {
    const { search = "", categoryId, level, page = 1 } = filters;

    const [courses, setCourses] = useState<Course[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (categoryId) params.set("categoryId", categoryId);
            if (level) params.set("level", level);
            params.set("page", String(page));
            params.set("pageSize", String(ITEMS_PER_PAGE));

            const res = await fetch(`/api/courses?${params.toString()}`);
            if (!res.ok) throw new Error("Erro ao carregar cursos");

            const data: PaginatedResponse<Course> = await res.json();
            setCourses(data.data);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setIsLoading(false);
        }
    }, [search, categoryId, level, page]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, total, totalPages, isLoading, error, refetch: fetchCourses };
}