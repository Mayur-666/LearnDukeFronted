import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import "./App.css";

export default function CreateJob() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loaderAfterSubmit, setLoaderAfterSubmit] = useState(false);

  const domainOptions = [
    "Information Technology (IT)",
    "Engineering",
    "Technician",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Construction",
    "Hospitality",
    "Transportation and Logistics",
    "Real Estate",
    "Media and Entertainment",
    "Marketing and Advertising",
    "Energy and Utilities",
    "Government",
    "Non-Profit",
    "Consulting",
    "Legal",
    "Automotive",
    "Pharmaceuticals",
    "Consumer Goods",
    "Agriculture",
    "Aerospace and Defense",
    "Insurance",
    "Human Resources",
    "Research and Development (R&D)",
    "Biotechnology",
    "Food and Beverage",
    "Environmental Services",
    "Sports and Recreation",
    "Data entry",
    "Content writing",
    "Security Guard",
    "Driver",
    "Plumber",
    "Domestic",
    "Sales and Marketing",
    "BPO",
    "Medical",
    "Paramedical",
    "Nursing",
    "Others"
  ];

  const filterOptions = [
    "Remote",
    "Offline",
    "Part-time",
    "Full-time",
    "Internship",
    "Contract",
    "Home-tuition",
    "Online-tuition",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Arabic",
    "Portuguese",
    "Italian",
    "Dutch",
    "Turkish",
    "Polish",
    "Swedish",
    "Danish",
    "Norwegian",
    "Finnish",
    "Greek",
    "Hebrew",
    "Hindi",
    "Bengali",
    "Urdu",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Gujarati",
    "Punjabi",
    "Marathi",
    "Odia",
    "Assamese",
    "Nepali",
    "Sindhi",
    "Sanskrit",
    "Persian",
    "Pashto",
    "Kurdish",
    "Balochi",
    "Sindhi",
    "Sinhala",
    "Burmese",
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setEmail(user.email);
    }
  }, []);

  const handleAddNewJob = () => {
    setFormData({
      title: "",
      description: "",
      minAmountPerHour: "",
      maxAmountPerHour: "",
      jobType: "",
      location: "",
      phoneNumber: "",
      whatsappNumber: "",
      countryCode: "+1",
      isDifferentWhatsappNumber: false,
      requirements: "",
      responsibilities: "",
      tags: [],
      domain: "",
      benifits: [],
      education: "",
      languages: [],
    });
    setShowModal(false);
    setStep(1);
  };

  const handleReturnToJobs = () => {
    navigate("/teachingJobs");
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minAmountPerHour: "",
    maxAmountPerHour: "",
    jobType: "",
    location: "",
    phoneNumber: "",
    whatsappNumber: "",
    countryCode: "+1",
    isDifferentWhatsappNumber: false,
    requirements: "",
    responsibilities: "",
    tags: [],
    domain: "",
    benifits: [],
    education: "",
    languages: [],
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    minAmountPerHour: false,
    maxAmountPerHour: false,
    jobType: false,
    location: false,
    phoneNumber: false,
    whatsappNumber: false,
    requirements: false,
    responsibilities: false,
    tags: false,
    domain: false,
    benifits: false,
    education: false,
    languages: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "isDifferentWhatsappNumber" && !newValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isDifferentWhatsappNumber: newValue,
        whatsappNumber: prevFormData.phoneNumber,
      }));
    }

    if (name === "phoneNumber" && !formData.isDifferentWhatsappNumber) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phoneNumber: newValue,
        whatsappNumber: newValue,
      }));
    }

    // if the user has checked the checkbox then the whatsapp number should be different means keep empty
    if (name === "isDifferentWhatsappNumber" && newValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        whatsappNumber: "",
      }));
    }

    if (
      formData.isDifferentWhatsappNumber &&
      name !== "isDifferentWhatsappNumber"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        whatsappNumber: formData.whatsappNumber,
      }));
    }

    if (name === "tags") {
      const tagsArray = value
        .split(" ")
        .map((tag) => tag.trim())
      setFormData({ ...formData, [name]: tagsArray });
    } else {
      setFormData({ ...formData, [name]: newValue });

      if (name === "phoneNumber" && !formData.isDifferentWhatsappNumber) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          phoneNumber: newValue,
          whatsappNumber: newValue,
        }));
      }
    }
  };
  const handleAddBenefit = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      benifits: [...prevFormData.benifits, ""],
    }));
  };

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = formData.benifits.map((benefit, i) =>
      i === index ? value : benefit
    );
    setFormData({ ...formData, benifits: updatedBenefits });
  };

  const handleLanguageChange = (language) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter((lang) => lang !== language)
      : [...formData.languages, language];
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const validateStep = () => {
    let errors = false;
    const updatedFormErrors = { ...formErrors };

    switch (step) {
      case 1:
        if (!formData.title) {
          updatedFormErrors.title = true;
          errors = true;
        } else {
          updatedFormErrors.title = false;
        }
        if (!formData.description) {
          updatedFormErrors.description = true;
          errors = true;
        } else {
          updatedFormErrors.description = false;
        }
        if (!formData.domain) {
          updatedFormErrors.domain = true;
          errors = true;
        } else {
          updatedFormErrors.domain = false;
        }
        break;
      case 2:
        if (!formData.minAmountPerHour) {
          updatedFormErrors.minAmountPerHour = true;
          errors = true;
        } else {
          updatedFormErrors.minAmountPerHour = false;
        }
        if (!formData.maxAmountPerHour) {
          updatedFormErrors.maxAmountPerHour = true;
          errors = true;
        } else {
          updatedFormErrors.maxAmountPerHour = false;
        }
        if (!formData.jobType) {
          updatedFormErrors.jobType = true;
          errors = true;
        } else {
          updatedFormErrors.jobType = false;
        }
        break;
      case 3:
        if (!formData.location) {
          updatedFormErrors.location = true;
          errors = true;
        } else {
          updatedFormErrors.location = false;
        }
        if (!formData.requirements) {
          updatedFormErrors.requirements = true;
          errors = true;
        } else {
          updatedFormErrors.requirements = false;
        }
        break;
      case 4:
        if (!formData.responsibilities) {
          updatedFormErrors.responsibilities = true;
          errors = true;
        } else {
          updatedFormErrors.responsibilities = false;
        }
        if (!formData.tags.length) {
          updatedFormErrors.tags = true;
          errors = true;
        } else {
          updatedFormErrors.tags = false;
        }
        break;
      case 5:
        if (!formData.benifits.length) {
          updatedFormErrors.benifits = true;
          errors = true;
        } else {
          updatedFormErrors.benifits = false;
        }
        if (!formData.education) {
          updatedFormErrors.education = true;
          errors = true;
        } else {
          updatedFormErrors.education = false;
        }
        if (!formData.languages.length) {
          updatedFormErrors.languages = true;
          errors = true;
        } else {
          updatedFormErrors.languages = false;
        }
        break;
      case 6:
        if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
          updatedFormErrors.phoneNumber =
            "Please enter a valid 10 digit phone number";
          errors = true;
        } else {
          updatedFormErrors.phoneNumber = false;
        }
        if (
          formData.isDifferentWhatsappNumber &&
          (!formData.whatsappNumber || formData.whatsappNumber.length !== 10)
        ) {
          updatedFormErrors.whatsappNumber =
            "Please enter a valid 10 digit phone number";
          errors = true;
        } else {
          updatedFormErrors.whatsappNumber = false;
        }
        break;
      default:
        break;
    }

    setFormErrors(updatedFormErrors);
    return !errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoaderAfterSubmit(true);

    if (validateStep()) {
      const cleanedTags = formData.tags.filter((tag) => tag.trim() !== "");
      const jobData = { ...formData, tags: cleanedTags, email: email };
      await axios
        .post("https://learndukeserver.vercel.app/addJob", jobData)
        .then((res) => {
          console.log("Job created successfully:", res.data);
        });
      setShowModal(true);
    }
    setLoaderAfterSubmit(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Title */}
            <div className="mb-4 ">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.title && submitted ? "border-red-500" : ""
                }`}
              />
              {formErrors.title && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.description && submitted ? "border-red-500" : ""
                }`}
                rows="4"
              />
              {formErrors.description && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            {/* i need domain dropdown*/}
            <div className="mb-4">
              <label
                htmlFor="domain"
                className="block text-gray-700 font-semibold mb-2"
              >
                Domain
              </label>
              <select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.domain && submitted ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Domain</option>
                {domainOptions.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>

              {formErrors.domain && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Amount Per Hour */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="mb-4 md:w-1/2">
                <label
                  htmlFor="minAmountPerHour"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Minimum Amount per Month
                </label>
                <input
                  type="number"
                  id="minAmountPerHour"
                  name="minAmountPerHour"
                  value={formData.minAmountPerHour}
                  onChange={handleChange}
                  className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    formErrors.minAmountPerHour && submitted
                      ? "border-red-500"
                      : ""
                  }`}
                  min={100}
                />
                {formErrors.minAmountPerHour && submitted && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div className="mb-4 md:w-1/2">
                <label
                  htmlFor="maxAmountPerHour"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Maximum Amount per Month
                </label>
                <input
                  type="number"
                  id="maxAmountPerHour"
                  name="maxAmountPerHour"
                  value={formData.maxAmountPerHour}
                  onChange={handleChange}
                  className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    formErrors.maxAmountPerHour && submitted
                      ? "border-red-500"
                      : ""
                  }`}
                  max={10000}
                />
                {formErrors.maxAmountPerHour && submitted && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>
            {/* Job Type */}
            <div className="mb-4">
              <label
                htmlFor="jobType"
                className="block text-gray-700 font-semibold mb-2"
              >
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.jobType && submitted ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Job Type</option>
                {filterOptions.map((option, index) => (
                  // add a null option to show by default
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formErrors.jobType && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-semibold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.location && submitted ? "border-red-500" : ""
                }`}
              />
              {formErrors.location && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            {/* Requirements */}
            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-gray-700 font-semibold mb-2"
              >
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.requirements && submitted ? "border-red-500" : ""
                }`}
                rows="4"
              />
              {formErrors.requirements && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/* Responsibilities */}
            <div className="mb-4">
              <label
                htmlFor="responsibilities"
                className="block text-gray-700 font-semibold mb-2"
              >
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.responsibilities && submitted
                    ? "border-red-500"
                    : ""
                }`}
                rows="4"
              />
              {formErrors.responsibilities && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            {/* Tags */}
            <div className="mb-4">
              <label
                htmlFor="tags"
                className="block text-gray-700 font-semibold mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(" ")}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.tags && submitted ? "border-red-500" : ""
                }`}
                placeholder="Enter tags separated by space"
              />
              {formErrors.tags && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
              <div className="mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            {/* Benefits */}
            <div className="mb-4">
              <label
                htmlFor="benifits"
                className="block text-gray-700 font-semibold mb-2"
              >
                Benefits
              </label>
              <div className="flex flex-wrap">
                {formData.benifits.map((benefit, index) => (
                  <div key={index} className="relative mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleBenefitChange(index, e.target.value)
                      }
                      className={`border rounded py-2 px-3 pr-10 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200`}
                      placeholder="Enter a benefit"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedBenefits = formData.benifits.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, benifits: updatedBenefits });
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <MdClose />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="bg-orange-500 text-white rounded py-2 px-4 mt-2"
              >
                Add Benefit
              </button>
              {formErrors.benifits && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  Please add at least one benefit
                </p>
              )}
            </div>
            {/* Education */}
            <div className="mb-4">
              <label
                htmlFor="education"
                className="block text-gray-700 font-semibold mb-2"
              >
                Education
              </label>
              {/* dropdown for education */}
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.education && submitted ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Education</option>
                <option value="10 pass">10 pass</option>
                <option value="12 pass">12 pass</option>
                <option value="Graduate">Graduate</option>
                <option value="Deploma">Diploma</option>
                <option value="ITI">ITI</option>
                <option value="BTech">BTech</option>
                <option value="MTech">MTech</option>
                <option value="Phd">Phd</option>
                {/* medical */}
                <option value="Paramedical">Paramedical</option>
                <option value="Nursing">Nursing</option>
                <option value="Vocational Training">Vocational Training</option>
                <option value="Certification Programs">
                  Certification Programs
                </option>
                <option
                  value="Associate Degree
"
                >
                  Associate Degree
                </option>
                <option
                  value="Postgraduate Diploma
"
                >
                  Postgraduate Diploma
                </option>
                <option value="Chartered Accountancy">
                  Charted Accountancy
                </option>
                <option value="Company Secretary">Company Secretary</option>
                <option value="Military Training">Military Training</option>
                <option value="Aviation Training">Aviation Training</option>
                <option value="Online Courses">Online Courses</option>
                <option value="Other">Other</option>
              </select>

              {formErrors.education && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            {/* Languages */}
            <div className="mb-4">
              <label
                htmlFor="languages"
                className="block text-gray-700 font-semibold mb-2"
              >
                Languages
              </label>
              <div className="flex flex-wrap">
                {languageOptions.map((language, index) => (
                  <div key={index} className="flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      id={`language-${index}`}
                      name={`language-${index}`}
                      value={language}
                      checked={formData.languages.includes(language)}
                      onChange={() => handleLanguageChange(language)}
                      className="mr-2"
                    />
                    <label htmlFor={`language-${index}`}>{language}</label>
                  </div>
                ))}
              </div>
              {formErrors.languages && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  Please select at least one language
                </p>
              )}
            </div>
          </>
        );
      case 6:
        return (
          <>
            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`border rounded-r py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    formErrors.phoneNumber && submitted ? "border-red-500" : ""
                  }`}
                  pattern="\d{10}"
                  placeholder="1234567890"
                />
              </div>
              {formErrors.phoneNumber && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
            {/* Is Different WhatsApp Number */}
            <div className="mb-4 flex items-center sm:items-start">
              <input
                type="checkbox"
                id="isDifferentWhatsappNumber"
                name="isDifferentWhatsappNumber"
                checked={formData.isDifferentWhatsappNumber}
                onChange={handleChange}
                className="mr-2"
              />
              <label
                htmlFor="isDifferentWhatsappNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Is your WhatsApp number different from your phone number?
              </label>
              
            </div>
            {/* WhatsApp Number */}
            {formData.isDifferentWhatsappNumber && (
              <div className="mb-4">
                <label
                  htmlFor="whatsappNumber"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  WhatsApp Number
                </label>
                <div className="flex">
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className={`border rounded-r py-2 px-3 w-full text-black bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                      formErrors.whatsappNumber && submitted
                        ? "border-red-500"
                        : ""
                    }`}
                    pattern="\d{10}"
                    placeholder="1234567890"
                  />
                </div>
                {formErrors.whatsappNumber && submitted && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.whatsappNumber}
                  </p>
                )}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            navigate("/teachingJobs");
          }}
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          X
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex justify-center items-center w-full md:w-3/4 lg:w-1/2 px-4">
          <div className="flex w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 mx-1 rounded ${
                  step > index + 1
                    ? "bg-green-500"
                    : step === index + 1
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-orange-100 shadow-md rounded px-8 pt-6 pb-8 w-full md:w-3/4 lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Create a Job - Step {step}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              {step < 6 ? (
                <button
                  type="button"
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  {/* i need circle animation */}
                  {loaderAfterSubmit ? (
                    <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 border-t-blue-500 animate-spin"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* You can add any icon or animation here */}
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m-4-8l4 4m4 0l4-4m-4 4V4"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Job Created Successfully
                    </h3>
                    <div className="mt-2">
                      {/* Modal content */}
                      <p className="text-sm text-gray-500">
                        Your job has been created successfully. What would you
                        like to do next?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddNewJob}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add a New Job
                </button>
                <button
                  type="button"
                  onClick={handleReturnToJobs}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Return to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
