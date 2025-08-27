export const logInfo = (message: string, meta?: any) => {
  console.log(`[INFO] ${message}`, meta || "");
};

export const logError = (message: string, meta?: any) => {
  console.error(`[ERROR] ${message}`, meta || "");
};
