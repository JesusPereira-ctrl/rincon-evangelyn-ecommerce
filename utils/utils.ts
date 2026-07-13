/**
 * Formatea un número al estándar de Peso Chileno (CLP)
 * @param valor - El número a formatear
 * @returns El string formateado (ej: $15.500)
 */
export const moneyFormatToClp = (valor: number): string => {
  if (typeof valor !== 'number' || isNaN(valor)) {
    return '$0';
  }

  const numeroFormateado = new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
  }).format(valor);

  return `$${numeroFormateado}`;
};
