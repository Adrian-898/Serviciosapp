import { useQuery } from '@tanstack/react-query';

const useParquimetro = () => {
	const { status, error, data, isFetching } = useQuery({
		queryKey: ['parquimetros'],
		queryFn: async () => {
			try {
				const response = await fetch('https://');

				// desestructurar propiedades del response para control de errores
				const { ok, status: responseStatus, statusText } = response;

				// chequear que no haya errores
				if (!ok) {
					throw new Error(
						`Error en el fetch: ${responseStatus} ${statusText}`,
					);
				}
				return await response.json();
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	});

	return { status, error, data, isFetching };
};

export default useParquimetro;
