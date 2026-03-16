import { Calculator } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-indigo-600 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Calculadora de Escalas Salariales
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              Gestión, simulación y proyección de convenios colectivos
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
