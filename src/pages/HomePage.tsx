import { Link } from "react-router-dom";
import { ROUTES } from "../consts";
import { CourseGrid } from "../components/course/CourseGrid";
import { useSupabaseCourses } from "../hooks/useSupabaseCourses";

export function HomePage() {
    const { courses, isLoading } = useSupabaseCourses();

    return (
        <div className="space-y-16">

            {/* Hero */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 text-white px-8 py-16 text-center space-y-6">
                <span className="inline-block bg-white/10 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
                    Plataforma de Cursos
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                    Aprenda com os melhores,<br />
                    <span className="text-blue-300">no seu ritmo</span>
                </h1>
                <p className="text-blue-100 text-lg max-w-xl mx-auto">
                    Cursos práticos e atualizados para você evoluir na carreira. Do básico ao avançado, com certificado reconhecido.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to={ROUTES.COURSES} className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                        Ver cursos
                    </Link>
                    <Link to={ROUTES.REGISTER} className="border border-white/30 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                        Começar grátis
                    </Link>
                </div>
                <div className="flex justify-center gap-12 pt-4">
                    <div>
                        <div className="text-2xl font-bold">12k+</div>
                        <div className="text-blue-200 text-sm">Alunos ativos</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">80+</div>
                        <div className="text-blue-200 text-sm">Cursos</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">4.9</div>
                        <div className="text-blue-200 text-sm">Avaliação média</div>
                    </div>
                </div>
            </section>

            {/* Cursos em destaque */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Cursos em destaque</h2>
                    <Link to={ROUTES.COURSES} className="text-sm text-blue-700 hover:underline">
                        Ver todos →
                    </Link>
                </div>
                <CourseGrid courses={courses.slice(0, 4)} isLoading={isLoading} />
            </section>

        </div>
    );
}