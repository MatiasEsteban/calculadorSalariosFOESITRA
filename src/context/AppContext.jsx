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

  // Persistir cambios en LocalStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('salaryCalculatorSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('salaryCalculatorData', JSON.stringify(salaryData));
  }, [salaryData]);

  return (
    <AppContext.Provider value={{ settings, setSettings, salaryData, setSalaryData }}>
      {children}
    </AppContext.Provider>
  );
};
