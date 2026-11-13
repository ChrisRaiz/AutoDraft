// Handles uploading a file to the R2 bucket
export async function postFile(request: Request, env: Env): Promise<Response> {
	const bucket = env.AUTODRAFT_BUCKET;
	const fileName = request.headers.get('X-Filename') || `file-${Date.now()}`;
	const fileBuffer = await request.arrayBuffer();

	// Validate that the bucket is configured
	if (!bucket) {
		return new Response('AUTODRAFT_BUCKET environmental variable is undefined.', {
			status: 500,
		});
	}

	try {
		// Upload file to R2 and return success response
		await bucket.put(fileName, fileBuffer);
		return Response.json({
			message: `Document ${fileName} uploaded successfully!`,
			url: `https://r2-worker.christopherraizz.workers.dev/files/${fileName}`,
		});
	} catch (err) {
		// Handle unexpected upload errors
		return new Response(`Error posting file: ${err}`, {
			status: 500,
		});
	}
}

// Handles retrieving a file from the R2 bucket
export async function getFile(request: Request, env: Env) {
	const bucket = env.AUTODRAFT_BUCKET;
	const fileName = request.headers.get('X-Filename');

	// Validate bucket and required header
	if (!bucket) return new Response('AUTODRAFT_BUCKET environmental variable is undefined.', { status: 500 });
	else if (!fileName) return new Response('X-Filename header is empty.', { status: 400 });

	try {
		// Attempt to retrieve file; return 404 if not found
		const file = await bucket.get(fileName);
		if (!file) return new Response('File not found', { status: 404 });

		// Stream file back with correct content type
		return new Response(file.body, {
			headers: {
				'Content-Type': file.httpMetadata?.contentType || 'application/octet-stream',
			},
		});
	} catch (err) {
		// Handle unexpected retrieval errors
		return new Response(`Error getting file: ${err}`, {
			status: 500,
		});
	}
}

// Handles deleting a file from the R2 bucket
export async function deleteFile(request: Request, env: Env): Promise<Response> {
	const bucket = env.AUTODRAFT_BUCKET;
	const fileName = request.headers.get('X-Filename');

	// Validate bucket and required header
	if (!bucket) return new Response('AUTODRAFT_BUCKET environmental variable is undefined.', { status: 500 });
	else if (!fileName) return new Response('X-Filename header is empty.', { status: 400 });

	try {
		// Attempt deletion and return success message
		await bucket.delete(fileName);
		return Response.json({
			message: `Document ${fileName} deleted successfully.`,
		});
	} catch (err) {
		// Handle unexpected deletion errors
		return new Response(`Error deleting file: ${err}`, {
			status: 500,
		});
	}
}
