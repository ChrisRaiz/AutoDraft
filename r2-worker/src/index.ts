import handleFileRoutes from './routes/files.routes';
import handleTestRoutes from './routes/test.routes';
import authenticateHMAC from './auth/auth';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Authenticate the request using HMAC before processing
		const authError = await authenticateHMAC(request, env);
		if (authError) return authError;

		const url = new URL(request.url);

		// Route request to appropriate handler based on path
		switch (true) {
			case url.pathname.startsWith('/files'):
				return handleFileRoutes(request, env, ctx);

			case url.pathname.startsWith('/test'):
				return handleTestRoutes(request, env, ctx);

			// Return 404 for unmatched paths
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
