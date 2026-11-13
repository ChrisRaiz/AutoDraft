import { ConnectOptions, Error, Mongoose } from "mongoose";

module.exports = (
  instance: Mongoose,
  instanceName: string,
  uri: string,
  options: ConnectOptions = {}
) => {
  // By default, Mongoose skips properties not defined in the schema (strictQuery).
  instance.set("strictQuery", true);

  // Connect to MongoDB
  instance
    .connect(uri, options)
    .then()
    .catch((err: Error) =>
      console.error(`MongoDB ${instanceName} connection failed, ` + err)
    );

  // Event handling
  instance.connection.once("open", () =>
    console.info(`MongoDB ${instanceName} connection opened!`)
  );
  instance.connection.on("connected", () =>
    console.info(`MongoDB ${instanceName} connection succeeded!`)
  );
  instance.connection.on("error", (err: Error) => {
    console.error(`MongoDB ${instanceName} connection failed, ` + err);
    instance.disconnect();
  });
  instance.connection.on("disconnected", () =>
    console.info(`MongoDB ${instanceName} connection disconnected!`)
  );

  // Graceful exit
  process.on("SIGINT", () => {
    instance.connection.close().then(() => {
      console.info(
        `Mongoose ${instanceName} connection disconnected through app termination!`
      );
      process.exit(0);
    });
  });
};
