import React from 'react';
import { Calculator, FileSpreadsheet, ArrowRight, CheckCircle2 } from 'lucide-react';

const TutorialModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 sm:p-8 text-white relative flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <span className="sr-only">Cerrar</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-xl sm:text-3xl font-bold mb-2 pr-6 sm:pr-0">¡Bienvenido al Calculador de Escalas Salariales!</h2>
          <p className="text-blue-100 text-base sm:text-lg">
            Te ayudamos a calcular y organizar los aumentos salariales de forma rápida y sencilla.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              ¿Cómo cargar la información?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              El sistema dividirá automáticamente el aumento configurado en las diferentes partes del salario de un trabajador. Puedes calcular de dos formas distintas:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Camino 1 */}
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                <Calculator className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Cálculo Individual</h4>
              <p className="text-sm text-gray-600 mb-4">
                Ideal para calcular un sueldo específico.
              </p>
              <div className="bg-white p-3 rounded-lg text-sm text-gray-700 border border-gray-100">
                <span className="font-semibold block mb-1">Ejemplo:</span>
                Juan tiene un <b>Básico de $500.000</b> y un <b>Adicional de $50.000</b>. Ingresas esos dos valores y el sistema aplicará el % de aumento sobre cada ítem por separado.
              </div>
            </div>

            {/* Camino 2 */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Cálculo por Base</h4>
              <p className="text-sm text-gray-600 mb-4">
                Útil para procesar escalas salariales completas.
              </p>
              <div className="bg-white p-3 rounded-lg text-sm text-gray-700 border border-gray-100">
                <span className="font-semibold block mb-1">Ejemplo:</span>
                Subes un archivo Excel con todas las categorías. El sistema distribuirá el aumento a cada columna (Básico, Presentismo) según su peso en el sueldo.
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 flex justify-end items-center border-t border-gray-100 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
            >
              Comenzar a usar la app
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
