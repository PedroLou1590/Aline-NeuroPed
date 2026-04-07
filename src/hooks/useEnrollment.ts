import { useState } from "react";
import type { Enrollment } from "../types";

interface UseEnrollmentReturn {
    isEnrolled: boolean;
    enrollment: Enrollment | null;
    isLoading: boolean;
    enroll: (courseId: string) => Promise<void>;
    error: string | null;
}

export function useEnrollment(
    initialEnrollment: Enrollment | null = null
): UseEnrollmentReturn {
    const [enrollment, setEnrollment] = useState<Enrollment | null>(
        initialEnrollment
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const enroll = async (courseId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/enrollments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId }),
            });

            if (!res.ok) throw new Error("Não foi possível realizar a matrícula");

            const data: Enrollment = await res.json();
            setEnrollment(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isEnrolled: enrollment !== null,
        enrollment,
        isLoading,
        enroll,
        error,
    };
}