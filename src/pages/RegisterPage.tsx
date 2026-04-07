import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../consts";
import { useAuth } from "../hooks/useAuth";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres.");
            setIsLoading(false);
            return;
        }

        try {
            await signUp(name, email, password);
            setSuccess(true);
        } catch (err) {
            setError("Erro ao criar conta. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-md text-center space-y-4">
                    <div className="text-5xl">📧</div>
                    <h2 className="text-2xl font-bold text-gray-900">Confirme seu email!</h2>
                    <p className="text-gray-500">
                        Enviamos um link de confirmação para <strong>{email}</strong>. Acesse seu email e clique no link para ativar sua conta.
                    </p>
                    <Link
                        to={ROUTES.LOGIN}
                        className="inline-block mt-4 bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors"
                    >
                        Ir para o login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">

                {/* Header */}
                <div className="text-center">
                    <Link to={ROUTES.HOME} className="text-2xl font-bold text-blue-700">
                        MeuCurso
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                        Criar sua conta
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm">
                        Já tem conta?{" "}
                        <Link to={ROUTES.LOGIN} className="text-blue-700 hover:underline font-medium">
                            Entrar
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
                        <label className="text-sm font-medium text-gray-700">Nome completo</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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
                        <label className="text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Criando conta..." : "Criar conta grátis"}
                    </button>

                    <p className="text-xs text-center text-gray-400">
                        Ao se cadastrar você concorda com os{" "}
                        <a href="#" className="text-blue-700 hover:underline">Termos de uso</a>
                        {" "}e a{" "}
                        <a href="#" className="text-blue-700 hover:underline">Política de privacidade</a>
                    </p>
                </div>

            </div>
        </div>
    );
}