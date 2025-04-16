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
        useTLS: {
            type: Boolean,
            default: false,
        },
        timeout: {
            type: Number,
            default: 30,
        },
        keepalive: {
            type: Boolean,
            default: false,
        },
    },
  },
);

const Config =
  mongoose?.models?.Config ??
  mongoose.model("Config", ConfigSchema);

export default Config;
