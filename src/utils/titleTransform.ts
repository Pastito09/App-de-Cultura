export function titleTransform(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^\w\s]/g, '') // Elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '_')
    .toLowerCase(); // Reemplaza espacios por guiones bajos
}
