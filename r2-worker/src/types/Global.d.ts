declare global {
	interface Env {
		AUTODRAFT_BUCKET: R2Bucket;
		AUTH_HEADER: string;
		HMAC_SECRET: string;
	}
}

export {};
