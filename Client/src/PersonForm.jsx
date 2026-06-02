import React, { useState } from "react";
import "./PersonForm.css";

import PersonNode from "./PersonNode"

function PersonForm() {
    const createPerson = () => ({
        id: Date.now() + Math.random(),
        name: "",
        gender: "",
        age: "",
        photo: "",
        married: false,
        spouse: null,
        children: []
    })

    const [person, setPerson] = useState(createPerson());


    const handleChange = (field, value) => {
        setPerson(prev => ({
            ...prev,
            [field]: value
        }));

    };


    const handleMarriedChange = (value) => {
        setPerson(prev => ({
            ...prev,
            married: value,
            spouse: value ? { name: "", age: "", photo: "" } : null
        }));
    };

    const handleSpouseChange = (field, value) => {
        setPerson(prev => ({
            ...prev,
            spouse: {
                ...(prev.spouse || {}),
                [field]: value
            }
        }));
    };

    const handleAddChild = () => {
        setPerson(prev => ({
            ...prev,
            children: [...prev.children, createPerson()]
        }));
    }

    const handleChildChange = (index, updatedChild) => {

        const updatedChidren = [...person.children];
        updatedChidren[index] = updatedChild;

        setPerson(prev => ({
            ...prev,
            children: updatedChidren
        }))


    }
    return (
        <div className="person-container">
            <form className="family-form">
                <h2>Add Person</h2>
                <div>
                    <div className="form-grid">
                        <div className="input-form" >
                            <label>Name</label>
                            <input value={person.name} onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div className="input-form gender-main">
                            <label>Gender</label>
                            <select value={person.gender} onChange={(e) => handleChange("gender", e.target.value)}
                            >
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <div className="input-form">
                            <label>Age</label>
                            <input type="number" value={person.age} onChange={(e) => handleChange("age", e.target.value)} />
                        </div>

                        <div className="input-form">
                            <label>Photo</label>
                            <input type="file" onChange={(e) => handleChange("photo", e.target.files[0])}
                            />
                        </div>

                    </div>

                    <div className="married-row-container">

                        <p>Is Married?</p>

                        <div className="married-row">
                            <label>
                                <input type="radio" checked={person.married === true} onChange={() => handleMarriedChange(true)}
                                />
                                Yes
                            </label>

                            <label><input type="radio" checked={person.married === false} onChange={() => handleMarriedChange(false)} />
                                No
                            </label>
                        </div>
                    </div>
                    {person.married && (
                        <div className="spouse-section">

                            <h3>Spouse</h3>

                            <div className="form-grid">

                                <div className="input-form">
                                    <label>Spouse Name</label>
                                    <input value={person.spouse.name} onChange={(e) => handleSpouseChange("name", e.target.value)}
                                    />
                                </div>

                                <div className="input-form">
                                    <label>Spouse Age</label>
                                    <input type="number" value={person.spouse.age} onChange={(e) => handleSpouseChange("age", e.target.value)}
                                    />
                                </div>

                            </div>


                        </div>

                    )}
                    <h3>Children</h3>
                    <div className="add-child-row  child-container">
                        <button type="button" onClick={handleAddChild}>
                            + Add Child
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                    {person.children.map((child, index) => (
                        <PersonNode
                            key={child.id}
                            person={child}
                            onChange={(updatedChild) =>
                                handleChildChange(index, updatedChild)
                            }
                        />
                    ))}


                </div>


            </form>

        </div>
    );
}

export default PersonForm;