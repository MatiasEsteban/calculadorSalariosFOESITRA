import { useMemo } from 'react';
import { useSalaryData } from '../hooks/useSalaryData';
import { useSettings } from '../hooks/useSettings';
import { calculateAll } from '../logic/calculationEngine';
import { Trash2, AlertTriangle, Download } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0);
};

const formatPercent = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format((value || 0) / 100);
};

const SalaryTable = () => {
  const { salaryData, updateRow, deleteRow, resetData } = useSalaryData();
  const { settings } = useSettings();

  const calculatedData = useMemo(() => {
    return calculateAll(salaryData, settings);
  }, [salaryData, settings]);

  const handleExportCSV = () => {
    if (calculatedData.length === 0) return;
    
    // Preparar cabeceras
    const headers = [
      'Categoría', 'Básico Anterior', 'Adic. Especial Anterior', 'Viáticos Anterior', 
      'Tarifa Telefónica', 'Total Anterior', 'Pago Único', 
      'Nuevo Básico', 'Nuevo Adic. Especial', 'Nuevos Viáticos', 
      'Nuevo Total', 'Aumento Neto ($)', 'Aumento (%)'
    ];
    
    // Preparar filas
    const rows = calculatedData.map(row => [
      row.categoria, row.basico, row.adicionalEspecial, row.viaticos,
      row.tarifaTelefonica, row.totalAnterior, row.pagoUnico,
      row.nuevoBasico, row.nuevoAdicionalEspecial, row.nuevosViaticos,
      row.nuevoTotal, row.aumentoNeto, row.aumentoPorcentual
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'escala_salarial_calculada.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (calculatedData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No hay datos para mostrar</h3>
        <p className="text-slate-500 max-w-sm">
          Agrega filas manualmente o importa un archivo CSV/JSON desde el panel lateral para comenzar a calcular.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-slate-800">Resultados y Proyección</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button
            onClick={resetData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar Todo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th colSpan={6} className="px-4 py-3 border-b border-r border-slate-200 font-semibold text-slate-700 text-center">
                Valores Base (Editables)
              </th>
              <th className="px-4 py-3 border-b border-r border-slate-200 font-semibold text-amber-900 bg-amber-50/50 text-center">
                Extra
              </th>
              <th colSpan={6} className="px-4 py-3 border-b border-slate-200 font-semibold text-emerald-900 bg-emerald-50/50 text-center">
                Nueva Escala Calculada
              </th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
              {/* Valores Base */}
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium text-right">Básico</th>
              <th className="px-4 py-3 font-medium text-right">Adic. Especial</th>
              <th className="px-4 py-3 font-medium text-right">Viáticos</th>
              <th className="px-4 py-3 font-medium text-right">Tarifa Telef.</th>
              <th className="px-4 py-3 font-medium text-right border-r">Total Ant.</th>
              
              {/* Extra */}
              <th className="px-4 py-3 font-medium text-right bg-amber-50/30 border-r text-amber-800">Pago Único</th>
              
              {/* Nueva Escala */}
              <th className="px-4 py-3 font-medium text-right bg-emerald-50/30 text-emerald-800">Nuevo Básico</th>
              <th className="px-4 py-3 font-medium text-right bg-emerald-50/30 text-emerald-800">Nuevo Adic.</th>
              <th className="px-4 py-3 font-medium text-right bg-emerald-50/30 text-emerald-800">Nuevos Viát.</th>
              <th className="px-4 py-3 font-medium text-right bg-emerald-50/30 text-emerald-900 font-bold border-r">Nuevo Total</th>
              
              {/* Comparación */}
              <th className="px-4 py-3 font-medium text-right text-indigo-700">Aumento ($)</th>
              <th className="px-4 py-3 font-medium text-right text-indigo-700">Aumento (%)</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {calculatedData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.categoria}
                    onChange={(e) => updateRow(row.id, { categoria: e.target.value })}
                    className="w-full min-w-[150px] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-0 px-1 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.basico || ''}
                    onChange={(e) => updateRow(row.id, { basico: e.target.value })}
                    className="w-full min-w-[100px] text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-0 px-1 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.adicionalEspecial || ''}
                    onChange={(e) => updateRow(row.id, { adicionalEspecial: e.target.value })}
                    className="w-full min-w-[100px] text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-0 px-1 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.viaticos || ''}
                    onChange={(e) => updateRow(row.id, { viaticos: e.target.value })}
                    className="w-full min-w-[100px] text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-0 px-1 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.tarifaTelefonica || ''}
                    onChange={(e) => updateRow(row.id, { tarifaTelefonica: e.target.value })}
                    className="w-full min-w-[100px] text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-0 px-1 py-1"
                  />
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-700 bg-slate-50/50 border-r border-slate-100">
                  {formatCurrency(row.totalAnterior)}
                </td>
                
                {/* Pago Único */}
                <td className="px-4 py-3 text-right font-medium text-amber-700 bg-amber-50/10 border-r border-slate-100">
                  {formatCurrency(row.pagoUnico)}
                </td>

                {/* Nueva Escala */}
                <td className="px-4 py-3 text-right bg-emerald-50/10 text-slate-600">
                  {formatCurrency(row.nuevoBasico)}
                </td>
                <td className="px-4 py-3 text-right bg-emerald-50/10 text-slate-600">
                  {formatCurrency(row.nuevoAdicionalEspecial)}
                </td>
                <td className="px-4 py-3 text-right bg-emerald-50/10 text-slate-600">
                  {formatCurrency(row.nuevosViaticos)}
                </td>
                <td className="px-4 py-3 text-right bg-emerald-50/20 text-emerald-800 font-bold border-r border-emerald-100">
                  {formatCurrency(row.nuevoTotal)}
                </td>

                {/* Comparación */}
                <td className="px-4 py-3 text-right font-medium text-indigo-600">
                  +{formatCurrency(row.aumentoNeto)}
                </td>
                <td className="px-4 py-3 text-right font-bold text-indigo-700">
                  {formatPercent(row.aumentoPorcentual)}
                </td>
                
                {/* Acciones */}
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Eliminar fila"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryTable;
