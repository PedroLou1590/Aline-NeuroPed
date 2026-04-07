import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} MeuCurso. Todos os direitos reservados.
            </footer>
        </div>
    );
}