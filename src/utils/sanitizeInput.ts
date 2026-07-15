
export const sanitizeInput = (val?: string) => (val && val.trim() ? val.trim() : undefined);