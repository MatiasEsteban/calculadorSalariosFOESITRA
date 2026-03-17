import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Calculator } from 'lucide-react';

const IndividualCalculator = () => {
  const { settings } = useContext(AppContext);

  // Estados locales para los montos base
  const [inputs, setInputs] = useState({
    basico: '',
    adicional: '',
    viaticos: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir números y puntos decimales
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  const parseMonto = (valor) => {
    const num = parseFloat(valor);
    return isNaN(num) ? 0 : num;
  };

  const basicoValue = parseMonto(inputs.basico);
  const adicionalValue = parseMonto(inputs.adicional);
  const viaticosValue = parseMonto(inputs.viaticos);

  // Cálculos de aumentos
  const aumentoBasico = basicoValue * (settings.porcentajeAumentoBasico / 100);
  const aumentoAdicional = adicionalValue * (settings.porcentajeAumentoAdicional / 100);
  const aumentoViaticos = viaticosValue * (settings.porcentajeAumentoViaticos / 100);

  // Subtotales Nuevos
  const nuevoBasico = basicoValue + aumentoBasico;
  const nuevoAdicional = adicionalValue + aumentoAdicional;
  const nuevoViaticos = viaticosValue + aumentoViaticos;

  // Pago Único (sobre Sueldo Conformado Anterior: Básico + Adicional + Viáticos o cómo esté definido,
  // Asumiremos sobre la suma de los tres para este calculador sencillo, o según se configure general)
  const remuneracionAnterior = basicoValue + adicionalValue + viaticosValue;
  const pagoUnico = remuneracionAnterior * (settings.porcentajePagoUnico / 100);

  const remuneracionNueva = nuevoBasico + nuevoAdicional + nuevoViaticos;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-200" />
          Calculadora Individual
        </h2>
        <div className="text-indigo-100 text-sm">
          Aplica las configuraciones globales
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Columna de Entradas */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">1. Ingresa los Valores Actuales</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sueldo Básico Actual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="basico"
                    value={inputs.basico}
                    onChange={handleInputChange}
                    className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adicionales (Antigüedad, Presentismo, etc.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="adicional"
                    value={inputs.adicional}
                    onChange={handleInputChange}
                    className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Viáticos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="viaticos"
                    value={inputs.viaticos}
                    onChange={handleInputChange}
                    className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna de Resultados */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">2. Resultados del Aumento</h3>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Nuevo Básico <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">+{settings.porcentajeAumentoBasico}%</span></span>
                <span className="font-semibold text-gray-900">{formatCurrency(nuevoBasico)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Nuevo Adicional <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">+{settings.porcentajeAumentoAdicional}%</span></span>
                <span className="font-semibold text-gray-900">{formatCurrency(nuevoAdicional)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Nuevos Viáticos <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">+{settings.porcentajeAumentoViaticos}%</span></span>
                <span className="font-semibold text-gray-900">{formatCurrency(nuevoViaticos)}</span>
              </div>

              {settings.porcentajePagoUnico > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-orange-700 bg-orange-50 -mx-2 px-2 rounded">
                  <span className="font-medium">Suma Fija No Rem. <span className="text-xs">({settings.porcentajePagoUnico}%)</span></span>
                  <span className="font-bold">{formatCurrency(pagoUnico)}</span>
                </div>
              )}

              <div className="pt-2">
                <div className="flex justify-between items-center bg-indigo-600 text-white rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm text-indigo-200 mb-1">Total Remuneración Nueva</span>
                    <span className="text-indigo-100 line-through text-xs">Antes: {formatCurrency(remuneracionAnterior)}</span>
                  </div>
                  <span className="text-2xl font-bold">{formatCurrency(remuneracionNueva)}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCalculator;
