export const unixToDate = (time: number|string) =>{
  return new Date(Number(time) * 1000);
}