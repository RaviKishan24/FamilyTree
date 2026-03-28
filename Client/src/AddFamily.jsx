import React, { useState } from "react";
import "./AddFamily.css";
import PersonForm from "./PersonForm";

function AddFamily() {

    return (
        <div className="add-family-container">
            <h1 className="add-family-heading">Add Your Family</h1>
            <PersonForm/>

        </div>
    );
}

export default AddFamily;