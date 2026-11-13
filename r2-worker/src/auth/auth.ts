// Verifies HMAC auth headers
const authenticateHMAC = async (request: Request, env: Env): Promise<Response | null> => {
	// Extract HMAC-related headers from the incoming request
	const filename = request.headers.get('X-Filename');
	const timestamp = request.headers.get('X-Timestamp');
	const signature = request.headers.get('X-Signature');

	// If any required header is missing, reject the request
	if (!filename || !timestamp || !signature) {
		return new Response('Missing auth headers', { status: 400 });
	}

	// Validate timestamp to prevent replay attacks (max 5 min drift)
	const MAX_DRIFT = 5 * 60 * 1000; // 5 minutes
	const now = Date.now();
	const sentTime = parseInt(timestamp, 10);

	// Reject if timestamp is invalid or too old
	if (isNaN(sentTime) || Math.abs(now - sentTime) > MAX_DRIFT) {
		return new Response('Request expired or invalid timestamp', { status: 400 });
	}

	// Prepare HMAC secret and data for verification
	const secret = env.HMAC_SECRET;
	const encoder = new TextEncoder();
	const data = `${filename}:${timestamp}`; // Reconstruct the signed string

	// Import the shared HMAC secret key for verification
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);

	// Convert the hex signature string into a Uint8Array for comparison
	const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

	// Perform constant-time verification of the signature using the key
	const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(data));

	// Reject the request if the signature doesn't match
	if (!isValid) {
		return new Response('Invalid signature', { status: 401 });
	}

	// If valid, allow the request to proceed
	return null;
};

export default authenticateHMAC;
