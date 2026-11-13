import * as files from '../controllers/files.controller';

// Handle file-related routes based on HTTP method and path
const handleFileRoutes = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	const url = new URL(request.url);

	switch (request.method) {
		case 'POST':
			if (url.pathname === '/files/postFile') return files.postFile(request, env);

		case 'GET':
			if (url.pathname === '/files/getFile') return files.getFile(request, env);

		case 'DELETE':
			if (url.pathname === '/files/deleteFile') return files.deleteFile(request, env);

		default:
			return new Response('Not Found', { status: 404 });
	}
};

export default handleFileRoutes;
