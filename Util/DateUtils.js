export const dateDiffDays=({ date1, date2 })=>{
    // Calcular la diferencia en milisegundos
    const diferencia_ms = date1.getTime() - date2.getTime();
    // Convertir la diferencia de milisegundos a días
    const diferencia_dias = Math.floor(diferencia_ms / (1000 * 60 * 60 * 24));
    return diferencia_dias
}
