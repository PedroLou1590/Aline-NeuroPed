import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../consts";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await signIn(email, password);
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            setError("Email ou senha incorretos. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">

                {/* Header */}
                <div className="text-center">
                    <Link to={ROUTES.HOME} className="text-2xl font-bold text-blue-700">
                        MeuCurso
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                        Entrar na sua conta
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm">
                        Não tem conta?{" "}
                        <Link to={ROUTES.REGISTER} className="text-blue-700 hover:underline font-medium">
                            Cadastre-se grátis
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-5">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-700">Senha</label>
                            <a href="#" className="text-xs text-blue-700 hover:underline">
                                Esqueci minha senha
                            </a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </button>
                </div>

            </div>
        </div>
    );
}