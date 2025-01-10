export const fatal = (message: string, cause?: string): never => {
  throw new Error(message, {
    cause,
  });
};
