import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useSupabaseEnrollment(courseId: string) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function checkEnrollment() {
            setIsLoading(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setIsLoading(false);
                return;
            }

            const { data } = await supabase
                .from("enrollments")
                .select("id")
                .eq("user_id", user.id)
                .eq("course_id", courseId)
                .single();

            setIsEnrolled(!!data);
            setIsLoading(false);
        }

        checkEnrollment();
    }, [courseId]);

    const enroll = async () => {
        setIsEnrolling(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error("Você precisa estar logado para se matricular.");

            const { error } = await supabase
                .from("enrollments")
                .insert({ user_id: user.id, course_id: courseId });

            if (error) throw error;

            setIsEnrolled(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao realizar matrícula.");
        } finally {
            setIsEnrolling(false);
        }
    };

    return { isEnrolled, isLoading, isEnrolling, enroll, error };
}