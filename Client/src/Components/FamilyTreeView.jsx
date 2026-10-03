import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilyById } from "../features/family/familyThunk";
import { FamilyTree, rel } from "@memoir/tree";
import { FaArrowLeft, FaUser, FaSpinner, FaTree } from "react-icons/fa";
import "./FamilyTreeView.css";

/**
 * Converts your backend's nested rootPerson tree into @memoir/tree's
 * flat people + relationships format.
 */
function convertToMemoirFormat(rootPerson) {
  const people = {};
  const relationships = [];
  let idCounter = 0;

  function walk(person, parentId = null, parentSpouseId = null) {
    const personId = person._id || `person-${idCounter++}`;

    // Register the person
    people[personId] = {
      id: personId,
      name: person.name,
      gender: person.gender,
      dob: person.dob,
      photo: person.photo || "",
    };

    // Handle spouse
    let localSpouseId = null;
    if (person.spouse && person.spouse.name) {
      localSpouseId = `${personId}-spouse`;
      people[localSpouseId] = {
        id: localSpouseId,
        name: person.spouse.name,
        gender: person.gender === "male" ? "female" : "male",
        dob: person.spouse.dob,
        photo: person.spouse.photo || "",
      };

      // Declare the partnership
      relationships.push(
        rel.partner(personId, localSpouseId, { relation: "spouse" })
      );
    }

    // Declare parent-child link
    if (parentId) {
      if (parentSpouseId) {
        // Child belongs to the parent + spouse union
        relationships.push(
          rel.children([parentId, parentSpouseId], [personId])
        );
      } else {
        // Child belongs to a single parent
        relationships.push(rel.parents(personId, [parentId]));
      }
    }

    // Recurse into children
    if (person.children && person.children.length > 0) {
      person.children.forEach((child) => {
        walk(child, personId, localSpouseId);
      });
    }
  }

  walk(rootPerson);
  return { people, relationships };
}

/**
 * Custom card component matching your green theme.
 * @memoir/tree passes ARIA props, keyboard handlers, and click handlers
 * via rootProps — always spread them onto the card root[citation:2].
 */
function ProfileCard({ person, ...rootProps }) {
  return (
    <div {...rootProps} className="tree-person-card">
      <div className="tree-person-avatar">
        {person.photo ? (
          <img src={person.photo} alt={person.name} />
        ) : (
          <FaUser />
        )}
      </div>
      <div className="tree-person-info">
        <span className="tree-person-name">{person.name}</span>
        <span className="tree-person-meta">
          {person.gender}
          {person.dob && ` · ${new Date(person.dob).getFullYear()}`}
        </span>
      </div>
    </div>
  );
}

function FamilyTreeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFamily, isLoading, error } = useSelector(
    (state) => state.family
  );

  useEffect(() => {
    if (id) dispatch(fetchFamilyById(id));
  }, [id, dispatch]);

  const memoirData = useMemo(() => {
    if (!currentFamily?.rootPerson) return null;
    return convertToMemoirFormat(currentFamily.rootPerson);
  }, [currentFamily]);

  const subjectId = useMemo(() => {
    if (!memoirData || !currentFamily?.rootPerson) return null;
    return currentFamily.rootPerson._id || "person-0";
  }, [memoirData, currentFamily]);

  if (isLoading) {
    return (
      <div className="tree-page">
        <div className="tree-state">
          <FaSpinner className="tree-spinner" />
          <p>Loading family tree...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tree-page">
        <div className="tree-state tree-state-error">
          <p>{error}</p>
          <button
            className="tree-btn tree-btn-primary"
            onClick={() => navigate("/families")}
          >
            Back to families
          </button>
        </div>
      </div>
    );
  }

  if (!currentFamily || !memoirData || !subjectId) {
    return (
      <div className="tree-page">
        <div className="tree-state">
          <p>No family loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tree-page">
      <div className="tree-header">
        <button
          className="tree-back-btn"
          onClick={() => navigate("/families")}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="tree-title-block">
          <div className="tree-title-icon">
            <FaTree />
          </div>
          <div>
            <h1 className="tree-title">{currentFamily.familyName}</h1>
            <p className="tree-subtitle">
              Started with {currentFamily.rootPerson?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="tree-canvas">
        <FamilyTree
          people={memoirData.people}
          subject={subjectId}
          relationships={memoirData.relationships}
          card={ProfileCard}
          layoutMode="compact-family"
          limits={{
            ancestorGenerations: 3,
            descendantGenerations: 3,
          }}
        />
      </div>
    </div>
  );
}

export default FamilyTreeView;