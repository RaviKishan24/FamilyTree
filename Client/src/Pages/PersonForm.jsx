import React, { useState } from "react";
import axios from "axios";
import PersonNode from "../Components/PersonNode";
import { createPerson, createSpouse } from "../utils/createPerson";
import "./PersonForm.css";

function PersonForm() {
  const [familyName, setFamilyName] = useState("");
  const [person, setPerson] = useState(createPerson());
  const [loading, setLoading] = useState(false);

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
    const updated = [...person.children];
    updated[index] = updatedChild;
    setPerson((prev) => ({ ...prev, children: updated }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        familyName,
        rootPerson: sanitizePerson(person),
      };
      const res = await axios.post(
        "http://localhost:5000/api/family/create",
        payload,
        { withCredentials: true },
      );
      alert("Family tree saved!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error saving family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="person-container">
      <form className="family-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Add Family Tree</h2>
          <p className="form-subtitle">
            Build your family structure with parents, spouses, and children
          </p>
        </div>

        <div className="form-section">
          <div className="input-form">
            <label>Family Name</label>
            <input
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g. Sharma Family"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Root Person</h3>
          <div className="form-grid">
            <div className="input-form">
              <label>Full Name</label>
              <input
                value={person.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="input-form">
              <label>Gender</label>
              <select
                value={person.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-form">
              <label>Date of Birth</label>
              <input
                type="date"
                value={person.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="married-row-container">
          <p>Is Married?</p>
          <label>
            <input
              type="radio"
              checked={person.married === true}
              onChange={() => handleMarriedChange(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              checked={person.married === false}
              onChange={() => handleMarriedChange(false)}
            />
            No
          </label>
        </div>

        {person.married && (
          <div className="spouse-section">
            <h3>Spouse Details</h3>
            <div className="form-grid">
              <div className="input-form">
                <label>Spouse Name</label>
                <input
                  value={person.spouse?.name || ""}
                  onChange={(e) => handleSpouseChange("name", e.target.value)}
                  placeholder="Enter spouse name"
                />
              </div>
              <div className="input-form">
                <label>Spouse DOB</label>
                <input
                  type="date"
                  value={person.spouse?.dob || ""}
                  onChange={(e) => handleSpouseChange("dob", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* CHILDREN */}
        <div className="children-section">
          <div className="children-header">
            <h3>Children</h3>
            <button
              type="button"
              className="add-child-btn"
              onClick={handleAddChild}
            >
              + Add Child
            </button>
          </div>

          {person.children.length === 0 && (
            <p className="empty-children">
              No children added yet. Click "Add Child" to start building the
              tree.
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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Submit Family Tree"}
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
