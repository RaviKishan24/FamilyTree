import mongoose from "mongoose";
const PersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dob: { type: Date, required: true },
    photo: { type: String, default: "" },
    spouse: {
      name: String,
      dob: Date,
      photo: String,
    },
    children: [], 
  },
  { _id: true },
);

PersonSchema.add({
  children: [PersonSchema],
});

const FamilySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    familyName: { type: String, required: true },
    rootPerson: { type: PersonSchema, required: true },
  },
  { timestamps: true },
);

const Family = new mongoose.model("Family", FamilySchema);

export default Family;
