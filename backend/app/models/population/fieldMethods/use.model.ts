import { Schema, model } from "mongoose";

interface IUseMethod {
  defaultText: string;
  textMap: Map<string, string>;
}

// DynamicFieldSchema - Method - Use X/Y/Z Text
const useMethodSchema = new Schema<IUseMethod>(
  {
    defaultText: { type: String, required: true }, // text to use if no matching key in textMap
    textMap: { type: Map, of: String, required: true }, // key = form answer | value = text
  },
  { _id: false }
);

const UseMethod = model("use", useMethodSchema);

export default UseMethod;

// Used for reference due to mixed types in dynamicFieldSchema - methodProps
// module.exports = model("use", useMethodSchema);
