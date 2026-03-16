/**
 * Motor de cálculo para escalas salariales.
 * Recibe una fila de datos de la escala anterior y la configuración de aumentos,
 * y devuelve los nuevos valores calculados.
 * 
 * @param {Object} rowData - Fila de datos salariales
 * @param {Object} settings - Configuración de porcentajes de aumento
 * @returns {Object} - Fila con los campos calculados
 */
export const calculateRow = (rowData, settings) => {
  // 1. Extraer y asegurar tipo numérico de los datos entrada
  const basico = Number(rowData.basico) || 0;
  const adicionalEspecial = Number(rowData.adicionalEspecial) || 0;
  const viaticos = Number(rowData.viaticos) || 0;
  const tarifaTelefonica = Number(rowData.tarifaTelefonica) || 0;

  // Extraer configuración
  const porcPagoUnico = Number(settings.porcentajePagoUnico) || 0;
  const porcAumentoBasico = Number(settings.porcentajeAumentoBasico) || 0;
  const porcAumentoAdicional = Number(settings.porcentajeAumentoAdicional) || 0;
  const porcAumentoViaticos = Number(settings.porcentajeAumentoViaticos) || 0;

  // 2. Cálculo Total Anterior
  const totalAnterior = basico + adicionalEspecial + viaticos + tarifaTelefonica;

  // 3. Cálculo de Pago Único
  const pagoUnico = totalAnterior * (porcPagoUnico / 100);

  // 4. Generación de Nueva Escala
  const nuevoBasico = basico + (totalAnterior * (porcAumentoBasico / 100));
  const nuevoAdicionalEspecial = adicionalEspecial + (totalAnterior * (porcAumentoAdicional / 100));
  const nuevosViaticos = viaticos + (totalAnterior * (porcAumentoViaticos / 100));
  const nuevaTarifaTelefonica = tarifaTelefonica; // Sin cambios

  const nuevoTotal = nuevoBasico + nuevoAdicionalEspecial + nuevosViaticos + nuevaTarifaTelefonica;

  // 5. Comparativas
  const aumentoNeto = nuevoTotal - totalAnterior;
  const aumentoPorcentual = totalAnterior > 0 ? (aumentoNeto / totalAnterior) * 100 : 0;

  // 6. Retorno de objeto enriquecido manteniendo el ID y Categoría y añadiendo cálculos
  return {
    ...rowData, // Mantiene id, categoria y valores base
    totalAnterior,
    pagoUnico,
    nuevoBasico,
    nuevoAdicionalEspecial,
    nuevosViaticos,
    nuevaTarifaTelefonica,
    nuevoTotal,
    aumentoNeto,
    aumentoPorcentual
  };
};

/**
 * Recalcula toda una lista de escalas usando la configuración proporcionada.
 * 
 * @param {Array} dataList - Lista de filas salariales
 * @param {Object} settings - Configuración de aumentos
 * @returns {Array} - Lista de filas enriquezidas con cálculos
 */
export const calculateAll = (dataList, settings) => {
  if (!Array.isArray(dataList)) return [];
  return dataList.map(row => calculateRow(row, settings));
};
