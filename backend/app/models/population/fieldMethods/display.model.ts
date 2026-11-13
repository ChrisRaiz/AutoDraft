import { Schema, model } from "mongoose";

interface IDisplayMethod {
  defaultState: boolean;
  text: string;
}

// DynamicFieldSchema - Method - Show/Hide Text
const displayMethodSchema = new Schema<IDisplayMethod>(
  {
    defaultState: { type: Boolean, required: true }, // true = show | false = hide
    text: { type: String, required: true }, // The text to show/hide if condition(s) are met
  },
  { _id: false }
);

const DisplayMethod = model("display", displayMethodSchema);

export default DisplayMethod;

// Used for reference due to mixed types in dynamicFieldSchema - methodProps
// module.exports = model("display", displayMethodSchema);
