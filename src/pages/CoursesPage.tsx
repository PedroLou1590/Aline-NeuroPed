import { useState } from "react";
import { CourseGrid } from "../components/course/CourseGrid";
import { useSupabaseCourses } from "../hooks/useSupabaseCourses";
import { LEVEL_LABELS } from "../consts";

export function CoursesPage() {
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [level, setLevel] = useState("");

    const { courses, isLoading, error } = useSupabaseCourses({ search, level });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Todos os Cursos</h1>
                {!isLoading && (
                    <p className="text-gray-500 mt-1">{courses.length} cursos disponíveis</p>
                )}
            </div>

            {/* Filtros */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Buscar cursos..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Todos os níveis</option>
                    {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                    Buscar
                </button>
            </form>

            {/* Erro */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Grid */}
            <CourseGrid courses={courses} isLoading={isLoading} />

        </div>
    );
}