import { Schema, model } from "mongoose";

// TODO | Format Text (future implementation, this will format text into specific formats)
// TODO | Add 'format' to IDynamicField.method & dynamicFieldSchema.method.enum
interface IFormatMethod {
  // Add interface code here...
}

const formatMethodSchema = new Schema<IFormatMethod>({
  // Add schema code here...
});

const FormatMethod = model("format", formatMethodSchema);

export default FormatMethod;

// Used for reference due to mixed types in dynamicFieldSchema - methodProps
// module.exports = model("format", formatMethodSchema);
