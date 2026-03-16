import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useSettings = () => {
  const { settings, setSettings } = useContext(AppContext);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings({
      porcentajePagoUnico: 0,
      porcentajeAumentoBasico: 0,
      porcentajeAumentoAdicional: 0,
      porcentajeAumentoViaticos: 0
    });
  };

  return { settings, updateSettings, resetSettings };
};
