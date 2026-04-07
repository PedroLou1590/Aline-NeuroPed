import { Link } from "react-router-dom";
import type { Course } from "../../types";
import { formatDuration, formatPrice, starsFromRating } from "../../utils";
import { ROUTES, LEVEL_LABELS, LEVEL_COLORS } from "../../consts";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={ROUTES.COURSE_DETAIL(course.slug)}
      className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-blue-50 flex items-center justify-center text-4xl">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {course.price === 0 && (
          <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            Grátis
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span
          className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${LEVEL_COLORS[course.level]}`}
        >
          {LEVEL_LABELS[course.level]}
        </span>

        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500">{course.instructor.name}</p>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-amber-400">{starsFromRating(course.rating)}</span>
          <span className="font-semibold text-gray-700">{course.rating.toFixed(1)}</span>
          <span className="text-gray-400">({course.ratingCount})</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
          <span>{formatDuration(course.totalDurationSeconds)}</span>
          <span>·</span>
          <span>{course.totalLessons} aulas</span>
          <span className="ml-auto font-semibold text-gray-800 text-sm">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}