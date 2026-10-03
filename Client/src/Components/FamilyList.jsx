import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFamilies } from "../features/family/familyThunk";
import {
  FaTree,
  FaUsers,
  FaPlus,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";
import "./FamilyList.css";

function FamilyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { families, isLoading, error } = useSelector((state) => state.family);

  useEffect(() => {
    dispatch(fetchFamilies());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="family-page">
        <div className="family-state">
          <FaSpinner className="family-spinner" />
          <p>Loading your family trees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="family-page">
        <div className="family-state family-state-error">
          <p>{error}</p>
          <button
            className="family-btn family-btn-primary"
            onClick={() => dispatch(fetchFamilies())}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (families.length === 0) {
    return (
      <div className="family-page">
        <div className="family-state">
          <div className="family-empty-icon">
            <FaTree />
          </div>
          <h2>No family trees yet</h2>
          <p>Start building your family history today.</p>
          <button
            className="family-btn family-btn-primary"
            onClick={() => navigate("/add-family")}
          >
            <FaPlus className="family-btn-icon" />
            Create your first tree
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="family-page">
      <div className="family-header">
        <div>
          <h1 className="family-title">My Family Trees</h1>
          <p className="family-subtitle">
            {families.length}{" "}
            {families.length === 1 ? "tree" : "trees"} in your collection
          </p>
        </div>
        <button
          className="family-btn family-btn-primary"
          onClick={() => navigate("/add-family")}
        >
          <FaPlus className="family-btn-icon" />
          New Tree
        </button>
      </div>

      <div className="family-grid">
        {families.map((family) => (
          <article
            key={family._id}
            className="family-card"
            onClick={() => navigate(`/family/${family._id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/family/${family._id}`);
            }}
          >
            <div className="family-card-top">
              <div className="family-card-icon">
                <FaTree />
              </div>
              <h3 className="family-card-name">{family.familyName}</h3>
            </div>

            <div className="family-card-body">
              <div className="family-card-row">
                <FaUsers className="family-card-row-icon" />
                <span>{family.rootPerson?.name || "Unknown"}</span>
              </div>
              <div className="family-card-row family-card-muted">
                <FaCalendarAlt className="family-card-row-icon" />
                <span>
                  {family.createdAt
                    ? new Date(family.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
              </div>
            </div>

            <div className="family-card-footer">
              <span className="family-card-link">View tree</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FamilyList;