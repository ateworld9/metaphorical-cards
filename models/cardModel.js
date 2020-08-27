import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    deckTitle: String,
    coverPath: String,
    picturePath: Array
});

export default mongoose.model("cards", cardSchema);