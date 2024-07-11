import Modal from "../../../Modal";
import { useEffect, useState } from "react";

function SubDomain({ next, handleSubDomainChange, back, mentorData }) {
  const inputDomains = [
    "Engineering",
    "Data Science",
    "Career Counselling",
    "Product",
    "Schooling",
    "Govt. Exams",
    "College",
    "JEE / NEET",
    "Extra Class",
    "Interview Prep",
    "Business",
  ];
  const allSubDomains = [
    {
      "Engineering": [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps/SRE/Cloud Engineer",
        "Cyber Security Engineer",
        "QA Automation Engineer",
        "Engineering Manager",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Environmental Engineering",
        "Instruments Engineering",
        "AIML Engineer",
        "Computer Science",
      ],
    },{
      "Data Science" : [
        "Data Engineer",
        "Data Scientist",
        "Data Analyst",
        "Machine learning engineer",
        "Business intelligence analyst",
        "Big data engineer",
      ]
    },{
      "Career Counselling": [
        "Career Path",
        "Study Abroad ",
        "Admission Path",
        "Life Skill",
        "College Path",
        "Course Path",
        "Job Path",
        "Career Advisor",
        "Career Consultant",
      ]
    },
    {"Product" : [
      "Product Manager",
      "Program Manager",
      "Project Manager",
      "UI / UX Designer",
    ]},
    {
      "Schooling": [
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
      ],
    },
    {
      "Govt. Exams": [
        "UPSC",
        "MPPSC",
        "NDA",
        "SSC CHSL",
        "SSC CGL",
        "OPSC OAS",
        "OSSSC",
        "Railway Group D ",
        "Banking",
        "Judiciary",
        "Defence",
        "State PSC",
        "Police",
        "Teaching",
      ],
    },
    {
      "College": [
        "Pharmacy",
        "Management",
        "Commerce",
        "Arts",
        "Science",
        "Law",
        "Medical",
        "Engineering",
        "Fashion",
        "Design",
        "Mass Communication",
        "Hotel Management",
        "Agriculture",
        "Computer Application",
      ]
    }, {
      "Extra Class" :[
        "Dance", 
        "Music",
        "Art and Craft",
        "Yoga",
        "Meditation",
        "Cooking",
        "Photography",
        "Fitness",
        "Personality Development",
        "Public Speaking",
        "Communication Skills",
        "Debate",
        "Instrumental Music",
        "Painting",
        "Sketching",
        "Craft",
      ]
    },{
      "JEE / NEET": [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
      ]
    }, {
      "Interview Prep": [
        "Resume Round",
        "GD Round",
        "Aptitude Round",
        "Technical Interview",
        "HR Interview",
        "Salary Negotiation"
      ]
    },{
      "Business":[
        "Business analyst",
        "Product manager",
        "Project manager",
        "Digital marketing manager",
        "Sales manager",
        "HR manager",
      ]
    }
  ];

  const [subDomains, setSubDomains] = useState([]);
  const [selectedSubDomain, setSelectedSubDomain] = useState(mentorData.subDomain);
  useEffect(() => {
    setSelectedSubDomain(mentorData.subDomain);
  }, [mentorData]);
  const [showModal, setShowModal] = useState(false);

  const handleChecked = (e) => {
    let updatedSd;
    if (e.target.checked) {
      updatedSd = [...selectedSubDomain, e.target.value];
    } else {
      updatedSd = selectedSubDomain.filter((value) => value !== e.target.value);
    }
    setSelectedSubDomain(updatedSd);
  };

  const handleNotChecked = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    const domain = mentorData.domain;

    inputDomains.map((dom) => {
      if (domain.includes(dom)) {
        allSubDomains.map((sd) => {
          if (sd[dom]) {
            sd[dom].map((singleSubDomain) => {
             !subDomains.includes(singleSubDomain) && setSubDomains((prev) => [...prev, singleSubDomain]);
            });
          }
        });
      }
    });
  }, []);

  return (
    <form
      className="w-64 lg:w-7/12 flex flex-col items-center"
      onSubmit={selectedSubDomain.length > 0 ? next : handleNotChecked}
    >
      <h1 className="text-2xl flex text-center">Choose Your Sub Domain</h1>
      <div className="h-64 overflow-y-scroll flex mt-3  flex-col lg:w-11/12 section w-full">
        {subDomains.length > 0 ? (
          subDomains.map((singleSubDomain, i) => (
            <div key={i} className="flex my-2 text-lg  ">
              <input
                type="checkbox"
                id={singleSubDomain}
                name={singleSubDomain}
                value={singleSubDomain}
                checked={selectedSubDomain.includes(singleSubDomain)}
                onChange={handleChecked}
                className="mx-3 cursor-pointer"
              />
              <label className=" cursor-pointer" htmlFor={singleSubDomain}>
                {singleSubDomain}
              </label>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
      <br />
      <div className="flex ">
        <button
          className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500"
          type="button"
          onClick={back}
        >
          Back
        </button>
        <button
          className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white"
          type="submit"
          onClick={() => handleSubDomainChange(selectedSubDomain)}
        >
          Next
        </button>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-xl flex items-center justify-center">
            Please select atleast one sub domain
          </div>
        </Modal>
      )}
    </form>
  );
}

export default SubDomain;
