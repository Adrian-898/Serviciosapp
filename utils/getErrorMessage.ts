const getErrorMessage = (error: unknown) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Algo salió mal...";
  }

  return message;
};

export default getErrorMessage;
