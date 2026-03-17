import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Inicializar estado desde LocalStorage o usar valores por defecto
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('salaryCalculatorSettings');
    return saved ? JSON.parse(saved) : {
      porcentajePagoUnico: 0,
      porcentajeAumentoBasico: 0,
      porcentajeAumentoAdicional: 0,
      porcentajeAumentoViaticos: 0,
      useDistributions: false,
      distributions: []
    };
  });

  const [salaryData, setSalaryData] = useState(() => {
    const saved = localStorage.getItem('salaryCalculatorData');
    return saved ? JSON.parse(saved) : [];
  });

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    const saved = localStorage.getItem('salaryCalculatorFirstVisit');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [calculationMode, setCalculationMode] = useState(() => {
    const saved = localStorage.getItem('salaryCalculatorMode');
    // null, 'individual', or 'file'
    return saved ? JSON.parse(saved) : null;
  });

  // Persistir cambios en LocalStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('salaryCalculatorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('salaryCalculatorData', JSON.stringify(salaryData));
  }, [salaryData]);

  useEffect(() => {
    localStorage.setItem('salaryCalculatorFirstVisit', JSON.stringify(isFirstVisit));
  }, [isFirstVisit]);

  useEffect(() => {
    localStorage.setItem('salaryCalculatorMode', JSON.stringify(calculationMode));
  }, [calculationMode]);

  return (
    <AppContext.Provider value={{ 
      settings, setSettings, 
      salaryData, setSalaryData,
      isFirstVisit, setIsFirstVisit,
      calculationMode, setCalculationMode
    }}>
      {children}
    </AppContext.Provider>
  );
};
