import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  errors?: { field: string; errors: string[] }[];
}

export function formatErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<ErrorResponse>;
  const errorResponse = axiosError.response?.data;

  let errorMessage = `${errorResponse?.message}.\n`;

  errorResponse?.errors?.forEach((err) => {
    errorMessage += `${err.errors.join(", ")}\n`;
  });

  if (!errorResponse) return "Erro interno!";
  return errorMessage;
}
