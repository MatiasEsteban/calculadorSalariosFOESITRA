import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import DataUploader from './components/DataUploader';
import SalaryTable from './components/SalaryTable';
import TutorialModal from './components/TutorialModal';
import ModeSelectionModal from './components/ModeSelectionModal';
import IndividualCalculator from './components/IndividualCalculator';

function AppContent() {
  const { isFirstVisit, setIsFirstVisit, calculationMode, setCalculationMode } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      
      {isFirstVisit && (
        <TutorialModal onClose={() => setIsFirstVisit(false)} />
      )}

      {(!isFirstVisit && !calculationMode) && (
        <ModeSelectionModal onSelectMode={(mode) => setCalculationMode(mode)} />
      )}

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ConfigPanel />
            {calculationMode === 'file' && <DataUploader />}
            
            {(calculationMode === 'individual' || calculationMode === 'file') && (
              <button 
                onClick={() => setCalculationMode(null)}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path></svg>
                Cambiar Modo
              </button>
            )}
          </div>
          
          <div className="lg:col-span-3 xl:col-span-4 overflow-hidden">
            {calculationMode === 'file' && <SalaryTable />}
            {calculationMode === 'individual' && <IndividualCalculator />}
            {!calculationMode && (
              <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-pulse">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <p className="text-gray-500 text-lg font-medium">Esperando selección de modo...</p>
                <p className="text-gray-400 mt-2">Por favor, elige "Cálculo Individual" o "Cálculo por Base" en la ventana emergente.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
