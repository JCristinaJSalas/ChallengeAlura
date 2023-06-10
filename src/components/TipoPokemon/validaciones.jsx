export const validarNombre = (nombre) => {
  const lennombre = nombre.length;
  return 2 <= lennombre && lennombre < 30 ? true : false;
};

export const validarDescripcion = (descripcion) => {
  const lendescripcion = descripcion.length;
  return 2 < lendescripcion && lendescripcion < 300 ? true : false;
};

export const validarLogo = (logo) => {
  const lenlogo = logo.length;
  return 10 < lenlogo ? true : false;
};
export const validarCreador = (creador) => {
  const lencreador = creador.length;
  return 2 < lencreador && lencreador < 100 ? true : false;
};
export const validarTipo = (tipo) => {
  return tipo !== 'Tipo de Pokemon' ? true : false;
};
export const validarPuntos = (puntos) => {
  return puntos !== '' && !isNaN(puntos) ? true : false;
};