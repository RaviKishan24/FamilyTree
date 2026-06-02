import React from "react";

const createPerson = () => ({
    id: Date.now() + Math.random(),
    name: "",
    age: "",
    married: false,
    spouse: null,
    children: []
});

function PersonNode({ person, onChange }) {

    const handleChange = (field, value) => {
        onChange({ ...person, [field]: value });
    };

  
    const handleMarriedChange = (value) => {
        onChange({
            ...person,
            married: value,
            spouse: value ? { name: "", age: "" } : null
        });
    };

    const handleSpouseChange = (field, value) => {
        onChange({
            ...person,
            spouse: {
                ...(person.spouse || {}),
                [field]: value
            }
        });
    };

    const handleAddChild = () => {
        onChange({
            ...person,
            children: [...person.children, createPerson()]
        });
    };

    const handleChildChange = (index, updatedChild) => {
        const updatedChildren = [...person.children];
        updatedChildren[index] = updatedChild;

        onChange({ ...person, children: updatedChildren });
    };

    return (
        <div style={{
            marginLeft: "20px",
            borderLeft: "2px solid gray",
            paddingLeft: "10px",
            marginTop: "10px"
        }}>

            <h4>Child</h4>

           
            <input
                placeholder="Name"
                value={person.name}
                onChange={(e) => handleChange("name", e.target.value)}
            />


            <input
                placeholder="Age"
                value={person.age}
                onChange={(e) => handleChange("age", e.target.value)}
            />

    
            <p>Married</p>

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

            {person.married && (
                <div style={{ marginLeft: "10px" }}>
                    <h5>Spouse</h5>

                    <input
                        placeholder="Spouse Name"
                        value={person.spouse?.name || ""}
                        onChange={(e) =>
                            handleSpouseChange("name", e.target.value)
                        }
                    />

                    <input
                        placeholder="Spouse Age"
                        value={person.spouse?.age || ""}
                        onChange={(e) =>
                            handleSpouseChange("age", e.target.value)
                        }
                    />
                </div>
            )}

   
            <button type="button" onClick={handleAddChild}>
                + Add Child
            </button>

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
    );
}

export default PersonNode;