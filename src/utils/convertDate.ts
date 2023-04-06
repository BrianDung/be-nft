export const unixToDate = (time: number|string) =>{
  return new Date(Number(time) * 1000);
}

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
