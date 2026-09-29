const ExamplefamilyData = {
  _id: "family1",
  userId: "user123",
  familyName: "Rajput Family",

  rootPerson: {
    _id: "1",
    name: "Ram Singh",
    gender: "male",
    dob: new Date("1945-05-12"),
    photo: "",

    spouse: {
      name: "Sita Devi",
      dob: new Date("1948-09-18"),
      photo: ""
    },

    children: [
      {
        _id: "2",
        name: "Mohan Singh",
        gender: "male",
        dob: new Date("1970-04-10"),
        photo: "",

        spouse: {
          name: "Sunita Singh",
          dob: new Date("1973-08-20"),
          photo: ""
        },

        children: [
          {
            _id: "3",
            name: "Ravi Singh",
            gender: "male",
            dob: new Date("1998-01-15"),
            photo: "",

            spouse: {
              name: "Priya Singh",
              dob: new Date("2000-06-11"),
              photo: ""
            },

            children: [
              {
                _id: "4",
                name: "Aryan Singh",
                gender: "male",
                dob: new Date("2024-03-02"),
                photo: "",

                spouse: {},

                children: []
              },
              {
                _id: "5",
                name: "Anaya Singh",
                gender: "female",
                dob: new Date("2026-01-20"),
                photo: "",

                spouse: {},

                children: []
              }
            ]
          },
          {
            _id: "6",
            name: "Neha Singh",
            gender: "female",
            dob: new Date("2002-11-10"),
            photo: "",

            spouse: {},

            children: []
          }
        ]
      },

      {
        _id: "7",
        name: "Suresh Singh",
        gender: "male",
        dob: new Date("1975-07-25"),
        photo: "",

        spouse: {
          name: "Kiran Singh",
          dob: new Date("1978-02-12"),
          photo: ""
        },

        children: [
          {
            _id: "8",
            name: "Rohit Singh",
            gender: "male",
            dob: new Date("2001-09-08"),
            photo: "",

            spouse: {},

            children: []
          },
          {
            _id: "9",
            name: "Sneha Singh",
            gender: "female",
            dob: new Date("2004-12-14"),
            photo: "",

            spouse: {},

            children: []
          }
        ]
      },

      {
        _id: "10",
        name: "Geeta Sharma",
        gender: "female",
        dob: new Date("1980-02-28"),
        photo: "",

        spouse: {
          name: "Amit Sharma",
          dob: new Date("1978-10-16"),
          photo: ""
        },

        children: [
          {
            _id: "11",
            name: "Kabir Sharma",
            gender: "male",
            dob: new Date("2005-05-01"),
            photo: "",

            spouse: {},

            children: []
          }
        ]
      }
    ]
  }
};

export default ExamplefamilyData;