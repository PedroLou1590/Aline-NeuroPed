import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useAuth } from "../../hooks/useAuth";

export function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate(ROUTES.HOME);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to={ROUTES.HOME} className="text-xl font-bold text-blue-700 shrink-0">
                    MeuCurso
                </Link>

                {/* Nav links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
                    <NavLink
                        to={ROUTES.COURSES}
                        className={({ isActive }) =>
                            isActive ? "text-blue-700" : "hover:text-blue-700 transition-colors"
                        }
                    >
                        Cursos
                    </NavLink>
                    {user && (
                        <NavLink
                            to={ROUTES.DASHBOARD}
                            className={({ isActive }) =>
                                isActive ? "text-blue-700" : "hover:text-blue-700 transition-colors"
                            }
                        >
                            Meu Painel
                        </NavLink>
                    )}
                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-600 hidden sm:block">
                                Olá, {user.user_metadata?.name || user.email}!
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to={ROUTES.LOGIN}
                                className="text-sm text-gray-500 hover:text-blue-700 transition-colors"
                            >
                                Entrar
                            </Link>
                            <Link
                                to={ROUTES.REGISTER}
                                className="text-sm font-semibold bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                            >
                                Começar grátis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}