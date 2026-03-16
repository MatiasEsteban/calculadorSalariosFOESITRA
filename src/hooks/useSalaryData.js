import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

export const useSalaryData = () => {
  const { salaryData, setSalaryData } = useContext(AppContext);

  // Agregar una nueva fila con ID único
  const addRow = (row) => {
    const newRow = { 
      id: uuidv4(),
      categoria: row.categoria || 'Nueva Categoría',
      basico: Number(row.basico) || 0,
      adicionalEspecial: Number(row.adicionalEspecial) || 0,
      viaticos: Number(row.viaticos) || 0,
      tarifaTelefonica: Number(row.tarifaTelefonica) || 0,
    };
    setSalaryData(prev => [...prev, newRow]);
  };

  // Actualizar fila existente
  const updateRow = (id, updatedFields) => {
    setSalaryData(prev => prev.map(row => {
      if (row.id === id) {
        return { 
          ...row, 
          ...updatedFields,
          // Asegurar que si se editan sean números (excepto categoría)
          ...(updatedFields.basico !== undefined && { basico: Number(updatedFields.basico) || 0 }),
          ...(updatedFields.adicionalEspecial !== undefined && { adicionalEspecial: Number(updatedFields.adicionalEspecial) || 0 }),
          ...(updatedFields.viaticos !== undefined && { viaticos: Number(updatedFields.viaticos) || 0 }),
          ...(updatedFields.tarifaTelefonica !== undefined && { tarifaTelefonica: Number(updatedFields.tarifaTelefonica) || 0 }),
        };
      }
      return row;
    }));
  };

  // Eliminar fila
  const deleteRow = (id) => {
    setSalaryData(prev => prev.filter(row => row.id !== id));
  };

  // Importar datos de forma masiva (sobreescribe los actuales)
  const importData = (dataArray) => {
    const formattedData = dataArray.map(item => ({
      id: item.id || uuidv4(),
      categoria: item.categoria || 'Sin Nombre',
      basico: Number(item.basico) || 0,
      adicionalEspecial: Number(item.adicionalEspecial) || 0,
      viaticos: Number(item.viaticos) || 0,
      tarifaTelefonica: Number(item.tarifaTelefonica) || 0,
    }));
    setSalaryData(formattedData);
  };

  // Reiniciar lista de datos a vacío
  const resetData = () => setSalaryData([]);

  return { salaryData, addRow, updateRow, deleteRow, importData, resetData };
};
