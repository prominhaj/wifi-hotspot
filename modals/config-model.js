import mongoose, { Schema } from "mongoose";

const ConfigSchema = new Schema(
  {
    mikrotikConfig: {
        host: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        port: {
            type: Number,
            default: 8728,
        },
    },
  },
);

const Config =
  mongoose?.models?.Config ??
  mongoose.model("Config", ConfigSchema);

export default Config;
