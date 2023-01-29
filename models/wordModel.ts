import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
    },
    translation: {
      type: String,
    },
    sentence: {
      type: String,
    },
    meaning: {
      type: String,
    },
    image: {
      type: String,
    },
    audio: {
      type: String,
    },
    level: {
      type: String,
      enum: ["A", "B", "C"],
    },
  },
  {
    timestamps: true,
  }
);

const Word = mongoose.models.Word || mongoose.model("Word", wordSchema);

export default Word;
