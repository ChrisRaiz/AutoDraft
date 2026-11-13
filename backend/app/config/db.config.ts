require("dotenv").config();

export const CONN_OPTIONS = {
  minPoolSize: 2, // Minimum number of connections to keep in the pool
  maxPoolSize: 10, // Maximum number of connections in the pool
  maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
  waitQueueTimeoutMS: 5000, // Wait up to 5 seconds for a connection
};

export const INIT_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.APP}`;
export const USERS_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/${process.env.USERS_DB}?retryWrites=true&w=majority&appName=${process.env.APP}`;
export const METADATA_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/${process.env.METADATA_DB}?retryWrites=true&w=majority&appName=${process.env.APP}`;
export const DOCUMENTS_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/${process.env.DOCUMENTS_DB}?retryWrites=true&w=majority&appName=${process.env.APP}`;
export const PORT = Number(process.env.PORT) || 3000;

module.exports = {
  URI: {
    INIT: INIT_URI,
    USERS: USERS_URI,
    METADATA: METADATA_URI,
    DOCUMENTS: DOCUMENTS_URI,
  },
  CONN_OPTIONS: CONN_OPTIONS,
  PORT: PORT,
};
