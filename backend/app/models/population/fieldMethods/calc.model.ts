import { Schema, model } from "mongoose";

interface ICalcMethod {
  calculation: "sum" | "difference" | "product" | "quotient" | "equation";
  formArguments: string[];
  equation: string | null;
}

// DynamicFieldSchema - Method - Calculate Text
const calcMethodSchema = new Schema<ICalcMethod>(
  {
    calculation: {
      type: String,
      enum: ["sum", "difference", "product", "quotient", "equation"],
    }, // Add | Subtract | Multiply | Divide | Custom
    formArguments: { type: [String], required: true }, // Form field values to use for the calculation
    equation: { type: String, default: null }, // Only used if calculation property is set to 'equation' | eval(equation: string)
  },
  { _id: false }
);

const CalcMethod = model("calc", calcMethodSchema);

export default CalcMethod;

// Used for reference due to mixed types in dynamicFieldSchema - methodProps
// module.exports = model("calc", calcMethodSchema);
