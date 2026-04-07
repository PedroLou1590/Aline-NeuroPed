import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Course } from "../types";

interface UseSupabaseCoursesFilters {
    search?: string;
    level?: string;
}

export function useSupabaseCourses(filters: UseSupabaseCoursesFilters = {}) {
    const { search = "", level = "" } = filters;

    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            setIsLoading(true);
            setError(null);

            try {
                let query = supabase
                    .from("courses")
                    .select("*")
                    .eq("status", "published");

                if (search) {
                    query = query.ilike("title", `%${search}%`);
                }

                if (level) {
                    query = query.eq("level", level);
                }

                const { data, error } = await query;

                if (error) throw error;

                // Mapeia os dados do banco para o tipo Course
                const mapped: Course[] = (data || []).map((c: any) => ({
                    id: c.id,
                    title: c.title,
                    slug: c.slug,
                    description: c.description,
                    thumbnailUrl: c.thumbnail_url,
                    instructorId: c.instructor_id,
                    instructor: { id: c.instructor_id, name: "Instrutor", avatarUrl: "" },
                    price: c.price,
                    level: c.level,
                    status: c.status,
                    categoryId: c.category_id,
                    tags: c.tags || [],
                    totalDurationSeconds: c.total_duration_seconds,
                    totalLessons: c.total_lessons,
                    enrollmentCount: c.enrollment_count,
                    rating: c.rating,
                    ratingCount: c.rating_count,
                    modules: [],
                    createdAt: c.created_at,
                    updatedAt: c.updated_at,
                }));

                setCourses(mapped);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, [search, level]);

    return { courses, isLoading, error };
}