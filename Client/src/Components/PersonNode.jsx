import React from "react";
import { createPerson, createSpouse } from "../utils/createPerson";
import "./PersonNode.css";
import {
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
  FaHeart,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function PersonNode({ person, onChange, onRemove }) {
  const handleChange = (field, value) =>
    onChange({ ...person, [field]: value });

  const handleMarriedChange = (value) =>
    onChange({
      ...person,
      married: value,
      spouse: value ? createSpouse() : null,
    });

  const handleSpouseChange = (field, value) =>
    onChange({
      ...person,
      spouse: { ...(person.spouse || {}), [field]: value },
    });

  const handleAddChild = () =>
    onChange({ ...person, children: [...person.children, createPerson()] });

  const handleChildChange = (index, updatedChild) => {
    const updated = [...person.children];
    updated[index] = updatedChild;
    onChange({ ...person, children: updated });
  };

  const handleRemoveChild = (index) => {
    onChange({
      ...person,
      children: person.children.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="person-node">
      <div className="person-node-card">
        <h4 className="person-node-title">Child</h4>

        <div className="person-node-fields">
          <div className="field-wrap">
            <FaUser className="field-icon" />
            <input
              type="text"
              placeholder="Name"
              value={person.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="field-wrap">
            <FaVenusMars className="field-icon" />
            <select
              value={person.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="has-icon"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="field-wrap">
            <FaBirthdayCake className="field-icon" />
            <input
              type="date"
              value={person.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>
        </div>

        <div className="person-node-married">
          <div className="married-label">
            <FaHeart className="married-icon" />
            <p>Married?</p>
          </div>

          <div className="married-options">
            <label
              className={`radio-pill ${
                person.married === true ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name={`married-${person.id}`}
                checked={person.married === true}
                onChange={() => handleMarriedChange(true)}
              />
              Yes
            </label>
            <label
              className={`radio-pill ${
                person.married === false ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name={`married-${person.id}`}
                checked={person.married === false}
                onChange={() => handleMarriedChange(false)}
              />
              No
            </label>
          </div>
        </div>

        {person.married && (
          <div className="person-node-spouse">
            <h5>Spouse</h5>
            <div className="person-node-fields">
              <div className="field-wrap">
                <FaUser className="field-icon" />
                <input
                  type="text"
                  placeholder="Spouse Name"
                  value={person.spouse?.name || ""}
                  onChange={(e) =>
                    handleSpouseChange("name", e.target.value)
                  }
                />
              </div>

              <div className="field-wrap">
                <FaBirthdayCake className="field-icon" />
                <input
                  type="date"
                  value={person.spouse?.dob || ""}
                  onChange={(e) =>
                    handleSpouseChange("dob", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )}

        <div className="person-node-actions">
          <button
            type="button"
            className="person-node-btn person-node-btn-add"
            onClick={handleAddChild}
          >
            <FaPlus className="btn-icon" />
            Add Child
          </button>
          <button
            type="button"
            className="person-node-btn person-node-btn-remove"
            onClick={onRemove}
          >
            <FaTimes className="btn-icon" />
            Remove
          </button>
        </div>
      </div>

      {person.children.length > 0 && (
        <div className="person-node-children">
          {person.children.map((child, index) => (
            <PersonNode
              key={child.id}
              person={child}
              onChange={(updated) => handleChildChange(index, updated)}
              onRemove={() => handleRemoveChild(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonNode;