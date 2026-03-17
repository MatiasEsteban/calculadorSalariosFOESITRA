import React from 'react';
import { Calculator, FileSpreadsheet } from 'lucide-react';

const ModeSelectionModal = ({ onSelectMode }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">¿Qué deseas hacer hoy?</h2>
          <p className="text-gray-500 text-base sm:text-lg">Selecciona el modo de cálculo que mejor se adapte a tus necesidades</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          
          <button
            onClick={() => onSelectMode('individual')}
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-5 sm:p-6 text-left hover:border-indigo-500 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cálculo Individual</h3>
            <p className="text-gray-500 text-sm">
              Ingresa los datos de un único sueldo base y calcula los desgloses y los nuevos aumentos rápidamente de manera manual.
            </p>
          </button>

          <button
            onClick={() => onSelectMode('file')}
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-5 sm:p-6 text-left hover:border-emerald-500 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cálculo desde Archivo</h3>
            <p className="text-gray-500 text-sm">
              Sube directamente una escala salarial (.xls, .csv), configura porcentajes y genera una nueva tabla completa.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ModeSelectionModal;
