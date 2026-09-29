import "./PersonCard.css";

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <div className="avatar">
        {person.name.charAt(0)}
      </div>

      <h4>{person.name}</h4>

      <p>{person.gender}</p>

      <p>{new Date(person.dob).toLocaleDateString()}</p>

      {person.spouse?.name && (
        <p>❤ {person.spouse.name}</p>
      )}
    </div>
  );
}

export default PersonCard;