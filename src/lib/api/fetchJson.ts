type TFetchJsonOptions = RequestInit & {
  fallbackErrorMessage?: string;
};

const getErrorMessageFromResponse = async (
  response: Response,
  fallbackMessage: string,
) => {
  try {
    const errorData: unknown = await response.json();

    if (
      errorData &&
      typeof errorData === "object" &&
      "message" in errorData &&
      typeof errorData.message === "string"
    ) {
      return errorData.message;
    }
  } catch {
    // Keep fallback message when response body cannot be parsed.
  }

  return fallbackMessage;
};

export const fetchJson = async <TResponse>(
  input: RequestInfo | URL,
  options: TFetchJsonOptions = {},
): Promise<TResponse> => {
  const {
    fallbackErrorMessage = "Unable to reach the server. Please check your connection.",
    ...fetchOptions
  } = options;

  let response: Response;

  try {
    response = await fetch(input, fetchOptions);
  } catch {
    throw new Error(fallbackErrorMessage);
  }

  if (!response.ok) {
    const errorMessage = await getErrorMessageFromResponse(
      response,
      `Request failed (${response.status})`,
    );

    throw new Error(errorMessage);
  }

  try {
    return (await response.json()) as TResponse;
  } catch {
    throw new Error("Failed to parse server response.");
  }
};
