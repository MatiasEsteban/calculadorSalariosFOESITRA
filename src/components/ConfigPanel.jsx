import React, { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Settings2, RotateCcw, Plus, Trash2, Calculator } from 'lucide-react';

const ConfigPanel = () => {
  const { settings, updateSettings, resetSettings } = useSettings();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Permite decimales guardando el valor de texto y convirtiéndolo luego a número si es válido
    updateSettings({ [name]: value === '' ? '' : parseFloat(value) });
  };

  const toggleDistributions = () => {
    updateSettings({ useDistributions: !settings.useDistributions });
  };

  const addDistribution = () => {
    const newDist = { id: Date.now(), percentage: 0, basico: 0, adicional: 0, viaticos: 0 };
    updateSettings({ distributions: [...(settings.distributions || []), newDist] });
  };

  const removeDistribution = (id) => {
    updateSettings({ distributions: settings.distributions.filter(d => d.id !== id) });
  };

  const updateDistribution = (id, field, value) => {
    const val = value === '' ? '' : parseFloat(value);
    const updatedDists = (settings.distributions || []).map(d => 
      d.id === id ? { ...d, [field]: val } : d
    );
    updateSettings({ distributions: updatedDists });
  };

  // Autocalcular promedios
  useEffect(() => {
    if (settings.useDistributions && settings.distributions) {
      let totalBasico = 0;
      let totalAdicional = 0;
      let totalViaticos = 0;

      settings.distributions.forEach(dist => {
        const p = parseFloat(dist.percentage) || 0;
        const b = parseFloat(dist.basico) || 0;
        const a = parseFloat(dist.adicional) || 0;
        const v = parseFloat(dist.viaticos) || 0;

        totalBasico += p * (b / 100);
        totalAdicional += p * (a / 100);
        totalViaticos += p * (v / 100);
      });

      const precisionBasico = parseFloat(totalBasico.toFixed(4));
      const precisionAdicional = parseFloat(totalAdicional.toFixed(4));
      const precisionViaticos = parseFloat(totalViaticos.toFixed(4));

      if (
        precisionBasico !== parseFloat(settings.porcentajeAumentoBasico || 0) ||
        precisionAdicional !== parseFloat(settings.porcentajeAumentoAdicional || 0) ||
        precisionViaticos !== parseFloat(settings.porcentajeAumentoViaticos || 0)
      ) {
        updateSettings({
          porcentajeAumentoBasico: precisionBasico,
          porcentajeAumentoAdicional: precisionAdicional,
          porcentajeAumentoViaticos: precisionViaticos
        });
      }
    }
  }, [settings.distributions, settings.useDistributions, settings.porcentajeAumentoBasico, settings.porcentajeAumentoAdicional, settings.porcentajeAumentoViaticos]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <Settings2 className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-lg">Configuración de Aumentos</h2>
        </div>
        <button 
          onClick={resetSettings}
          className="text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-indigo-50"
          title="Reiniciar a cero"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-5 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Pago Único NO Remunerativo (%)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="porcentajePagoUnico"
              value={settings.porcentajePagoUnico}
              onChange={handleChange}
              step="0.1"
              className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-500" />
              Distribución de Aumentos
            </h3>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={settings.useDistributions || false}
                  onChange={toggleDistributions}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${settings.useDistributions ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.useDistributions ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-600">
                Modo Detallado
              </span>
            </label>
          </div>

          {!settings.useDistributions ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Aumento al Básico (%)</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="porcentajeAumentoBasico"
                    value={settings.porcentajeAumentoBasico}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-slate-500 sm:text-sm">%</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Aumento al Adic. Especial (%)</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="porcentajeAumentoAdicional"
                    value={settings.porcentajeAumentoAdicional}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-slate-500 sm:text-sm">%</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Aumento a Viáticos (%)</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="porcentajeAumentoViaticos"
                    value={settings.porcentajeAumentoViaticos}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-slate-500 sm:text-sm">%</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {(settings.distributions || []).map((dist, index) => (
                  <div key={dist.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 relative group">
                    <button 
                      onClick={() => removeDistribution(dist.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-3 pr-6">
                      <span className="text-sm font-medium text-slate-600">Regla {index + 1}:</span>
                      <div className="relative w-24">
                        <input
                          type="number"
                          value={dist.percentage}
                          onChange={(e) => updateDistribution(dist.id, 'percentage', e.target.value)}
                          placeholder="0.0"
                          step="0.1"
                          className="block w-full rounded text-sm border-slate-300 py-1 pl-2 pr-6 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        />
                        <span className="absolute right-2 top-1.5 text-slate-400 text-xs">%</span>
                      </div>
                      <span className="text-sm text-slate-500">general</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pl-4 border-l-2 border-indigo-200">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Básico</label>
                        <div className="relative">
                          <input type="number" value={dist.basico} onChange={(e) => updateDistribution(dist.id, 'basico', e.target.value)} className="block w-full rounded text-xs border-slate-300 py-1 pl-2 pr-5 focus:ring-indigo-500 focus:border-indigo-500" />
                          <span className="absolute right-1 top-1 text-slate-400 text-[10px]">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Adicional</label>
                        <div className="relative">
                          <input type="number" value={dist.adicional} onChange={(e) => updateDistribution(dist.id, 'adicional', e.target.value)} className="block w-full rounded text-xs border-slate-300 py-1 pl-2 pr-5 focus:ring-indigo-500 focus:border-indigo-500" />
                          <span className="absolute right-1 top-1 text-slate-400 text-[10px]">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Viáticos</label>
                        <div className="relative">
                          <input type="number" value={dist.viaticos} onChange={(e) => updateDistribution(dist.id, 'viaticos', e.target.value)} className="block w-full rounded text-xs border-slate-300 py-1 pl-2 pr-5 focus:ring-indigo-500 focus:border-indigo-500" />
                          <span className="absolute right-1 top-1 text-slate-400 text-[10px]">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={addDistribution}
                className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-600 flex items-center justify-center gap-2 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                <Plus className="w-4 h-4" /> Agregar Distribución
              </button>

              {(settings.distributions || []).length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex justify-between text-sm">
                  <div className="text-indigo-800 font-medium">Totales calculados:</div>
                  <div className="text-indigo-600 text-right space-y-1">
                    <div>Básico: <span className="font-bold">{settings.porcentajeAumentoBasico || 0}%</span></div>
                    <div>Adicional: <span className="font-bold">{settings.porcentajeAumentoAdicional || 0}%</span></div>
                    <div>Viáticos: <span className="font-bold">{settings.porcentajeAumentoViaticos || 0}%</span></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800 border border-yellow-200">
          <p><strong>Nota:</strong> Los valores impactan automáticamente los cálculos en la tabla. La Tarifa Telefónica no recibe porcentajes de aumento.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
