import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFamily } from "../features/family/familyThunk";
import PersonNode from "../Components/PersonNode";
import { createPerson, createSpouse } from "../utils/createPerson";
import "./PersonForm.css";
import {
  FaTree,
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
  FaHeart,
  FaUsers,
  FaPlus,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";

function PersonForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.family);

  const [familyName, setFamilyName] = useState("");
  const [person, setPerson] = useState(createPerson());

  // ── form field handlers ──────────────────────────────
  const handleChange = (field, value) =>
    setPerson((prev) => ({ ...prev, [field]: value }));

  const handleMarriedChange = (value) =>
    setPerson((prev) => ({
      ...prev,
      married: value,
      spouse: value ? createSpouse() : null,
    }));

  const handleSpouseChange = (field, value) =>
    setPerson((prev) => ({
      ...prev,
      spouse: { ...(prev.spouse || {}), [field]: value },
    }));

  const handleAddChild = () =>
    setPerson((prev) => ({
      ...prev,
      children: [...prev.children, createPerson()],
    }));

  const handleChildChange = (index, updatedChild) => {
    setPerson((prev) => {
      const updated = [...prev.children];
      updated[index] = updatedChild;
      return { ...prev, children: updated };
    });
  };

  // ── strip UI-only fields recursively before sending ──
  const sanitizePerson = (p) => ({
    name: p.name,
    gender: p.gender,
    dob: p.dob || null,
    photo: p.photo || "",
    spouse:
      p.married && p.spouse
        ? {
            name: p.spouse.name,
            dob: p.spouse.dob || null,
            photo: p.spouse.photo || "",
          }
        : undefined,
    children: (p.children || []).map(sanitizePerson),
  });

  // ── submit via Redux thunk ──────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      familyName: familyName.trim(),
      rootPerson: sanitizePerson(person),
    };

    try {
      const result = await dispatch(createFamily(payload)).unwrap();
      toast.success("Family tree saved successfully!");
      console.log("Saved family:", result.family);

      // Reset form
      setFamilyName("");
      setPerson(createPerson());
    } catch (err) {
      // err is the string returned from rejectWithValue
      const message =
        typeof err === "string" ? err : "Error saving family tree";
      toast.error(message);
    }
  };

  return (
    <div className="person-container">
      <form className="family-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="form-header-icon">
            <FaTree className="header-icon" />
          </div>
          <h2>Add Family Tree</h2>
          <p className="form-subtitle">
            Build your family structure with parents, spouses, and children
          </p>
        </div>

        <div className="form-section">
          <div className="input-form">
            <label htmlFor="familyName">Family Name</label>
            <div className="field-wrap">
              <FaTree className="field-icon" />
              <input
                id="familyName"
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="e.g. Sharma Family"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Root Person</h3>
          <div className="form-grid">
            <div className="input-form">
              <label htmlFor="rootName">Full Name</label>
              <div className="field-wrap">
                <FaUser className="field-icon" />
                <input
                  id="rootName"
                  type="text"
                  value={person.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            <div className="input-form">
              <label htmlFor="rootGender">Gender</label>
              <div className="field-wrap">
                <FaVenusMars className="field-icon" />
                <select
                  id="rootGender"
                  value={person.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                  className="has-icon"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-form">
              <label htmlFor="rootDob">Date of Birth</label>
              <div className="field-wrap">
                <FaBirthdayCake className="field-icon" />
                <input
                  id="rootDob"
                  type="date"
                  value={person.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="married-row-container">
          <div className="married-label">
            <FaHeart className="married-icon" />
            <p>Is Married?</p>
          </div>

          <div className="married-options">
            <label
              className={`radio-pill ${person.married === true ? "active" : ""}`}
            >
              <input
                type="radio"
                name="married"
                checked={person.married === true}
                onChange={() => handleMarriedChange(true)}
              />
              Yes
            </label>
            <label
              className={`radio-pill ${person.married === false ? "active" : ""}`}
            >
              <input
                type="radio"
                name="married"
                checked={person.married === false}
                onChange={() => handleMarriedChange(false)}
              />
              No
            </label>
          </div>
        </div>

        {person.married && (
          <div className="spouse-section">
            <h3>Spouse Details</h3>
            <div className="form-grid">
              <div className="input-form">
                <label htmlFor="spouseName">Spouse Name</label>
                <div className="field-wrap">
                  <FaUser className="field-icon" />
                  <input
                    id="spouseName"
                    type="text"
                    value={person.spouse?.name || ""}
                    onChange={(e) => handleSpouseChange("name", e.target.value)}
                    placeholder="Enter spouse name"
                  />
                </div>
              </div>

              <div className="input-form">
                <label htmlFor="spouseDob">Spouse DOB</label>
                <div className="field-wrap">
                  <FaBirthdayCake className="field-icon" />
                  <input
                    id="spouseDob"
                    type="date"
                    value={person.spouse?.dob || ""}
                    onChange={(e) => handleSpouseChange("dob", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="children-section">
          <div className="children-header">
            <h3>
              <FaUsers className="children-icon" />
              Children
            </h3>
            <button
              type="button"
              className="add-child-btn"
              onClick={handleAddChild}
            >
              <FaPlus className="btn-icon" />
              Add Child
            </button>
          </div>

          {person.children.length === 0 && (
            <p className="empty-children">
              No children added yet. Click <strong>"Add Child"</strong> to start
              building the tree.
            </p>
          )}

          {person.children.map((child, index) => (
            <PersonNode
              key={child.id}
              person={child}
              onChange={(updated) => handleChildChange(index, updated)}
              onRemove={() =>
                setPerson((prev) => ({
                  ...prev,
                  children: prev.children.filter((_, i) => i !== index),
                }))
              }
            />
          ))}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <FaPaperPlane className="btn-icon" />
              Submit Family Tree
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
