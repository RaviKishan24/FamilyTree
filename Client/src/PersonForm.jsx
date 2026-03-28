import React, { useState } from "react";
import "./PersonForm.css";

function PersonForm() {

    const createPerson = [{
        name: "",
        gender: "",
        age: "",
        photo: "",
        married: false,
        spouse: { name: "", age: "" },
        children: []
    }];

    const [person, setPerson] = useState(createPerson);
    const handleMarriedChange = (value) => {
        setPerson(prev => ({ ...prev, married: value }));

    };

    const handleSpouseChange = (field, value) => {
        setPerson(prev => ({ ...prev, spouse: { ...prev.spouse, [field]: value } }));
    };

    const handleAddChild=()=>{
        
    }



    return (
        <div className="person-container">

            <form className="family-form">

                <h2>Add Person</h2>

                <div>

                    {
                        person.map((item, index) => {
                            return <>
                                <div className="form-grid" key={index}>
                                    <div className="input-form" >
                                        <label>Name</label>
                                        <input value={person.name} onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="input-form">
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
                                        <input
                                            type="number"
                                            value={person.age}
                                            onChange={(e) => handleChange("age", e.target.value)}
                                        />
                                    </div>

                                    <div className="input-form">
                                        <label>Photo</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleChange("photo", e.target.files[0])}
                                        />
                                    </div>

                                </div>
                                <div className="married-row-container">

                                    <p>Is Married?</p>

                                    <div className="married-row">
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
                                <div className="add-child-row">
                                    <button type="button" onClick={handleAddChild}>
                                        + Add Child
                                    </button>
                                </div>
                            </>
                        })
                    }

                </div>

                <button type="submit">Submit</button>

            </form>

        </div>
    );
}

export default PersonForm;