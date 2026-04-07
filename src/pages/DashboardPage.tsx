import { Link } from "react-router-dom";
import { ROUTES, LEVEL_LABELS } from "../consts";
import { mockCourses } from "../lib/mockCourses";
import { formatDuration } from "../utils";

const mockEnrollments = [
    { courseId: "1", percentComplete: 65, lastLesson: "Hooks avançados" },
    { courseId: "2", percentComplete: 30, lastLesson: "Tipografia e espaçamento" },
];

export function DashboardPage() {
    const enrolledCourses = mockEnrollments.map((enrollment) => ({
        ...enrollment,
        course: mockCourses.find((c) => c.id === enrollment.courseId)!,
    }));

    return (
        <div className="space-y-10">

            {/* Boas vindas */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Olá, Pedro! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Continue de onde parou.</p>
                </div>
                <Link
                    to={ROUTES.COURSES}
                    className="bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
                >
                    Explorar cursos
                </Link>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-1">
                    <p className="text-sm text-gray-500">Cursos matriculados</p>
                    <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-1">
                    <p className="text-sm text-gray-500">Horas assistidas</p>
                    <p className="text-3xl font-bold text-gray-900">14h</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-1">
                    <p className="text-sm text-gray-500">Certificados</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
            </div>

            {/* Cursos em andamento */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Meus cursos</h2>
                <div className="space-y-4">
                    {enrolledCourses.map(({ course, percentComplete, lastLesson }) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-xl border border-gray-200 p-5 flex gap-5 items-center"
                        >
                            {/* Thumbnail */}
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {course.title}
                                    </h3>
                                    <span className="text-sm font-medium text-gray-500 shrink-0">
                                        {percentComplete}%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    Última aula: {lastLesson}
                                </p>
                                {/* Barra de progresso */}
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                                        style={{ width: `${percentComplete}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{LEVEL_LABELS[course.level]} · {formatDuration(course.totalDurationSeconds)}</span>
                                    <Link
                                        to={ROUTES.COURSE_DETAIL(course.slug)}
                                        className="text-blue-700 font-medium hover:underline"
                                    >
                                        Continuar →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}