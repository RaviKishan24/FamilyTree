export const createPerson = () => ({
  id: crypto.randomUUID(),      
  name: "",
  gender: "",
  dob: "",
  photo: "",
  married: false,
  spouse: null,
  children: [],
});

export const createSpouse = () => ({
  name: "",
  dob: "",
  photo: "",
});