import Family from "../Models/FamilyModel.js";
import mongoose from "mongoose";

// Walk the whole tree and validate every person
const validatePerson = (p, path = "rootPerson") => {
  if (!p || typeof p !== "object") throw new Error(`Invalid person at ${path}`);

  if (!p.name || !String(p.name).trim())
    throw new Error(`Name is required at ${path}`);

  if (!["male", "female", "other"].includes(p.gender))
    throw new Error(`Gender must be male/female/other at ${path}`);

  if (!p.dob) throw new Error(`Date of birth is required at ${path}`);

  if (new Date(p.dob).toString() === "Invalid Date")
    throw new Error(`Invalid DOB at ${path}`);

  // Spouse — optional, but if present must be valid
  if (p.spouse) {
    if (!p.spouse.name || !String(p.spouse.name).trim())
      throw new Error(`Spouse name required at ${path}`);
    if (p.spouse.dob && new Date(p.spouse.dob).toString() === "Invalid Date")
      throw new Error(`Invalid spouse DOB at ${path}`);
  }

  // Recurse — this is what makes it dynamic
  if (Array.isArray(p.children)) {
    p.children.forEach((c, i) => validatePerson(c, `${path}.children[${i}]`));
  }
};

// Build a CLEAN object containing ONLY fields the schema wants.
// This strips: id, married, age, __v, _id from children, etc.
const sanitizePerson = (p) => ({
  name: p.name.trim(),
  gender: p.gender,
  dob: new Date(p.dob),
  photo: p.photo || "",
  spouse: p.spouse
    ? {
        name: p.spouse.name?.trim() || "",
        dob: p.spouse.dob ? new Date(p.spouse.dob) : undefined,
        photo: p.spouse.photo || "",
      }
    : undefined,
  // Recurse: any depth, any number of children
  children: Array.isArray(p.children) ? p.children.map(sanitizePerson) : [],
});

export const CreateFamily = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const { familyName, rootPerson } = req.body;

    if (!familyName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Family name is required",
      });
    }

    if (!rootPerson || typeof rootPerson !== "object") {
      return res.status(400).json({
        success: false,
        message: "Root person is required",
      });
    }

    try {
      validatePerson(rootPerson);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    const cleanRoot = sanitizePerson(rootPerson);

    const family = await Family.create({
      userId: req.user.id || req.user._id,
      familyName: familyName.trim(),
      rootPerson: cleanRoot,
    });

    return res.status(201).json({
      success: true,
      message: "Family created successfully",
      family,
    });
  } catch (error) {
    console.error("CreateFamily error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const findFamilies = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const userId = req.user.id || req.user._id;

    const families = await Family.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: families.length,
      families,
    });
  } catch (error) {
    console.error("findFamilies error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const FindOneFamily = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const { id } = req.params; // ← family ID from URL
    console.log("id for search one family",id)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Family ID is required",
      });
    }

    // Validate that id is a valid Mongo ObjectId format,
    // otherwise Mongoose throws a CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid family ID",
      });
    }

    const family = await Family.findById(id);

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    // Ensure the logged-in user owns this family
    const userId = req.user.id || req.user._id;
    if (family.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this family",
      });
    }

    return res.status(200).json({
      success: true,
      family,
    });
  } catch (error) {
    console.error("FindOneFamily error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
