import { useParams, Link } from "react-router-dom";
import { mockCourses } from "../lib/mockCourses";
import { formatDuration, formatPrice, starsFromRating } from "../utils";
import { ROUTES, LEVEL_LABELS } from "../consts";

export function CourseDetailPage() {
    const { slug } = useParams();
    const course = mockCourses.find((c) => c.slug === slug);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                <span className="text-5xl mb-4">😕</span>
                <p className="text-lg">Curso não encontrado.</p>
                <Link to={ROUTES.COURSES} className="mt-4 text-blue-700 hover:underline">
                    Ver todos os cursos
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-10">

            {/* Hero do curso */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Info principal */}
                <div className="lg:col-span-2 space-y-4">
                    <Link to={ROUTES.COURSES} className="text-sm text-blue-700 hover:underline">
                        ← Voltar para cursos
                    </Link>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {LEVEL_LABELS[course.level]}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                    <p className="text-gray-600 text-lg">{course.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <span className="text-amber-400 text-lg">{starsFromRating(course.rating)}</span>
                        <span className="font-bold text-gray-800">{course.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-sm">({course.ratingCount} avaliações)</span>
                        <span className="text-gray-400 text-sm">· {course.enrollmentCount.toLocaleString()} alunos</span>
                    </div>

                    {/* Instrutor */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                            {course.instructor.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Instrutor</p>
                            <p className="font-semibold text-gray-800">{course.instructor.name}</p>
                        </div>
                    </div>
                </div>

                {/* Card lateral */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full aspect-video object-cover"
                    />
                    <div className="p-6 space-y-4">
                        <div className="text-3xl font-bold text-gray-900">
                            {formatPrice(course.price)}
                        </div>
                        <button className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-colors">
                            {course.price === 0 ? "Matricular grátis" : "Comprar agora"}
                        </button>
                        <div className="space-y-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                            <div className="flex justify-between">
                                <span>Duração total</span>
                                <span className="font-medium text-gray-800">{formatDuration(course.totalDurationSeconds)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Aulas</span>
                                <span className="font-medium text-gray-800">{course.totalLessons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Nível</span>
                                <span className="font-medium text-gray-800">{LEVEL_LABELS[course.level]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Acesso</span>
                                <span className="font-medium text-gray-800">Vitalício</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Currículo */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Currículo do curso</h2>
                {course.modules.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-400">
                        <p>O currículo detalhado será adicionado em breve.</p>
                    </div>
                ) : (
                    course.modules.map((module) => (
                        <div key={module.id} className="rounded-xl border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-5 py-3 font-semibold text-gray-800">
                                {module.title}
                            </div>
                            <div className="divide-y divide-gray-100">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600">
                                        <span>{lesson.title}</span>
                                        <span className="text-gray-400">{formatDuration(lesson.durationSeconds)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}