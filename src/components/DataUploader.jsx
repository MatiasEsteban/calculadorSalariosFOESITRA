import { useState, useRef } from 'react';
import { useSalaryData } from '../hooks/useSalaryData';
import Papa from 'papaparse';
import { FileUp, Plus, Upload, AlertCircle, FileJson } from 'lucide-react';

const DataUploader = () => {
  const { addRow, importData } = useSalaryData();
  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);
  const [error, setError] = useState('');

  const handleAddEmptyRow = () => {
    addRow({
      categoria: 'Nueva Categoría',
      basico: 0,
      adicionalEspecial: 0,
      viaticos: 0,
      tarifaTelefonica: 0
    });
  };

  const processCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error al procesar el archivo CSV. Revisa el formato.');
          return;
        }
        
        // Mapear campos en caso de que las cabeceras CSV tengan otro formato
        const formatted = results.data.map(row => ({
          categoria: row.categoria || row.Categoria || row.CATEGORIA || 'Sin Categoría',
          basico: Number(row.basico || row.Basico || row.BASICO) || 0,
          adicionalEspecial: Number(row.adicionalEspecial || row['Adicional Especial'] || row.adicional_especial) || 0,
          viaticos: Number(row.viaticos || row.Viaticos || row.VIATICOS) || 0,
          tarifaTelefonica: Number(row.tarifaTelefonica || row['Tarifa Telefonica'] || row.tarifa_telefonica) || 0,
        }));
        
        importData(formatted);
        setError('');
        if(fileInputRef.current) fileInputRef.current.value = '';
      },
      error: () => {
        setError('No se pudo leer el archivo CSV.');
      }
    });
  };

  const processJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          const formatted = data.map(item => ({
            categoria: item.categoria || 'Sin Categoría',
            basico: Number(item.basico) || 0,
            adicionalEspecial: Number(item.adicionalEspecial) || 0,
            viaticos: Number(item.viaticos) || 0,
            tarifaTelefonica: Number(item.tarifaTelefonica) || 0,
          }));
          importData(formatted);
          setError('');
        } else {
          setError('El archivo JSON debe contener un arreglo de objetos.');
        }
      } catch (err) {
        setError('Archivo JSON inválido.');
      }
      if(jsonInputRef.current) jsonInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'csv' && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      processCSV(file);
    } else if (type === 'json' && file.name.endsWith('.json')) {
      processJSON(file);
    } else {
      setError(`Se esperaba un archivo formato ${type.toUpperCase()}.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <FileUp className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-lg">Carga de Datos</h2>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2 border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleAddEmptyRow}
          className="w-full flex justify-center items-center gap-2 bg-white border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5 text-slate-400" />
          Agregar Fila Manual
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-4 text-slate-400">O importar desde archivo</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e, 'csv')}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col justify-center items-center gap-2 border-2 border-dashed border-slate-300 text-slate-600 font-medium py-4 px-4 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer bg-slate-50"
            >
              <Upload className="w-6 h-6 text-indigo-400" />
              <span className="text-xs">Importar CSV</span>
            </button>
          </div>
          <div className="w-1/2">
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={jsonInputRef}
              onChange={(e) => handleFileUpload(e, 'json')}
            />
            <button
              onClick={() => jsonInputRef.current?.click()}
              className="w-full flex flex-col justify-center items-center gap-2 border-2 border-dashed border-slate-300 text-slate-600 font-medium py-4 px-4 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer bg-slate-50"
            >
              <FileJson className="w-6 h-6 text-emerald-400" />
              <span className="text-xs">Importar JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUploader;
