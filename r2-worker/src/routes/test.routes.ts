import * as test from '../controllers/test.controller';

// Handle test-related routes based on HTTP method and path
const handleTestRoutes = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	const url = new URL(request.url);

	switch (request.method) {
		case 'POST':
			return new Response('Not Found', { status: 404 });

		case 'GET':
			switch (url.pathname) {
				case '/test/getMedia':
					return test.getMedia(request, env);

				case '/test/getTodo':
					return test.getTodo(request, env);
			}

		case 'DELETE':
			return new Response('Not Found', { status: 404 });

		default:
			return new Response('Not Found', { status: 404 });
	}
};

export default handleTestRoutes;
