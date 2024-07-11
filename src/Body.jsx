import React, { useState, useEffect, useRef, useCallback } from "react";
import Tutorial from "./Tutorial";
import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import crying from "./assets/crying.gif";
import "./App.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

// Define the filter options
const filterOptions = [
  "All",
  "Remote",
  "Offline",
  "Part-time",
  "Full-time",
  "Internship",
  "Contract",
  "Home-tuition",
  "Online-tuition",
];
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
  "Others",
];

const educationOptions = [
  "10 pass",
  "12 pass",
  "Graduate",
  "Diploma",
  "ITI",
  "BTech",
  "MTech",
  "Phd",
  "Paramedical",
  "Nursing",
  "vocational training",
  "Certification Programs",
  "Associate Degree",
  "Postgraduate Diploma",
  "Charted Accountancy",
  "Company Secretary",
  "Military Training",
  "Aviation Training",
  "Online Courses",
  "Others",
];

export default function Body() {
  const navigate = useNavigate();
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [newTutorialJobs, setNewTutorialJobs] = useState([]);
  // const userData = JSON.parse(localStorage.getItem("user"));
  // const [user, setUser] = useState(userData);
  const [loading, setLoading] = useState(true);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [firstTimeFetch, setFirstTimeFetch] = useState(true);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {

    if(user && user.email){
      axios.get(`https://learndukeserver.vercel.app/getUser/${user.email}`).then((userResponse) => {
      
        if(userResponse.data === ""){
            localStorage.removeItem("user");
            setUser(null);
            window.location.reload();
          }
        
      
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      const fetchJobs = async () => {
        setLoading(true);
        try {
          if (
            searchTitle === "" &&
            searchLocation === "" &&
            selectedFilter === "All" &&
            selectedDomains.length === 0 &&
            selectedEducations.length === 0
          ) {
            setNewTutorialJobs([]);
          }
          const response = await axios.get(
            "https://learndukeserver.vercel.app/getReviewedJobs",
            {
              params: {
                title: searchTitle,
                location: searchLocation,
                jobType: selectedFilter === "All" ? "" : selectedFilter,
                domain: selectedDomains.length > 0 ? selectedDomains : "",
                education:
                  selectedEducations.length > 0 ? selectedEducations : "",
                page,
              },
            }
          );

          if (page === 1 && firstTimeFetch) {
            setFirstTimeFetch(false);
            setNewTutorialJobs([...response.data.jobs]);
            setLoading(false);
          } else {
            setNewTutorialJobs([...newTutorialJobs, ...response.data.jobs]);
            setLoading(false);
          }
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    }, 500);

    setDebounceTimeout(timeoutId);
  }, [
    searchTitle,
    selectedDomains,
    selectedEducations,
    selectedFilter,
    searchLocation,
    page,
  ]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setPage(1);
    setFirstTimeFetch(true);
  };

  const handleDomainChange = (newDomains) => {
    setSelectedDomains(newDomains);
    setPage(1);
    setFirstTimeFetch(true);
  };

  const handleEducationChange = (newEducations) => {
    setSelectedEducations(newEducations);
    setPage(1);
    setFirstTimeFetch(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full lg:w-10/12 mx-auto p-4 flex-grow">
        <div className="flex flex-col ">
          <div className="flex flex-col md:flex-row  space-y-3 md:space-x-3 w-full">
            <div
              className="w-full flex flex-col md:flex-row border border-gray-300 items-center rounded-lg "
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-full md:w-1/2 flex">
                <FaSearch className="text-gray-500 m-4 text-xl" />
                <input
                  type="text"
                  placeholder="Search for a job"
                  value={searchTitle}
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                    setPage(1);
                    setFirstTimeFetch(true);
                  }}
                  className="border-none rounded-l-lg p-4 w-full focus:outline-none"
                />
              </div>
              <div className="border-r-2 h-10 w-0.5 m-1 hidden md:flex"></div>
              <div className="border-t border-gray-300 w-full h-0.5 md:hidden"></div>
              <div className="w-full md:w-1/2 flex">
                <FaMapMarkerAlt className="text-gray-500 m-4 text-xl" />
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                    setPage(1);
                    setFirstTimeFetch(true);
                  }}
                  className="border-none rounded-r-lg p-4 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 w-full">
            <div className="text-2xl font-semibold">
              Search remote and offline jobs near your location
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div className="flex flex-wrap gap-2">
              <FilterOptions
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
                selectedDomains={selectedDomains}
                onDomainChange={handleDomainChange}
                selectedEducations={selectedEducations}
                onEducationChange={handleEducationChange}
              />
            </div>
            {loading ? (
              <div className="flex justify-center mt-10">
                <Loader />
              </div>
            ) : newTutorialJobs.length > 0 ? (
              <InfiniteScroll
                dataLength={newTutorialJobs.length}
                next={() => setPage(page + 1)}
                hasMore={page < totalPage}
                loader={<Loader />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:m-3">
                  {newTutorialJobs.map((job, index) => (
                    <Tutorial
                      key={index}
                      imageLink={job.imageLink}
                      userName={job.userName}
                      title={job.title}
                      description={job.description}
                      minAmountPerHour={job.minAmountPerHour}
                      maxAmountPerHour={job.maxAmountPerHour}
                      jobType={job.jobType}
                      phoneNumber={job.phoneNumber}
                      location={job.location}
                      whatsappNumber={job.whatsappNumber}
                      email={job.email}
                      requirements={job.requirements}
                      responsibilities={job.responsibilities}
                      tags={job.tags}
                      id={job._id}
                      isPremium={job.isPremium}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <img src={crying} alt="No jobs found" className="w-32" />
                <div className="text-center text-lg font-semibold text-gray-500">
                  No jobs found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterOptions({
  selectedFilter,
  onFilterChange,
  selectedDomains,
  onDomainChange,
  selectedEducations,
  onEducationChange,
}) {
  const containerRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDomainOptions, setSelectedDomainOptions] =
    useState(selectedDomains);
  const [selectedEducationOptions, setSelectedEducationOptions] =
    useState(selectedEducations);

  const [selectedDomain, setSelectedDomain] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      containerRef.current.scrollLeft = 0; // Reset scroll position on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDomainCheckboxChange = (option) => {
    setSelectedDomainOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleEducationCheckboxChange = (option) => {
    setSelectedEducationOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleApplyFilters = () => {
    onDomainChange(selectedDomainOptions);
    onEducationChange(selectedEducationOptions);
    setOpenModal(false);
  };

  const handleClearFilters = () => {
    setSelectedDomainOptions([]);
    setSelectedEducationOptions([]);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row-reverse space-x-2 w-full lg:hidden relative">
        <div
          className="flex items-center overflow-x-auto w-full space-x-2 ml-2 hide-scrollbar"
          ref={containerRef}
        >
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-1 bg-gray-200 rounded-lg font-semibold whitespace-nowrap text-sm ${
                selectedFilter === option ? "bg-gray-400 text-black" : ""
              }`}
              onClick={() => onFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {/* horizontal line */}
        <div className="border-r-2 h-10 w-0.5 m-1"></div>
        <div className="mt-2.5">
          <button
            className="px-4 py-1 bg-gray-200 rounded-lg font-semibold whitespace-nowrap text-sm"
            onClick={() => setOpenModal(true)}
          >
            <FaFilter className="inline-block text-lg" />
            <MdOutlineKeyboardArrowDown className="inline-block text-lg ml-2" />
          </button>
        </div>
        {/* Optional: Add a fade effect to indicate scrollability */}
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white pointer-events-none"></div>
      </div>
      <div className="hidden lg:flex justify-between w-full items-center mt-4">
        <div className="flex gap-2">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-1 bg-gray-200 rounded-lg font-semibold whitespace-nowrap text-sm ${
                selectedFilter === option ? "bg-gray-400 text-black" : ""
              }`}
              onClick={() => onFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-1 bg-gray-200 rounded-lg font-semibold whitespace-nowrap text-sm"
          onClick={() => setOpenModal(true)}
        >
          Filter
          <FaFilter className="inline-block text-md ml-2 mb-0.5" />
        </button>
      </div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-10">
          <div
            className="bg-white p-4 rounded-lg w-96 h-3/4 overflow-y-auto  relative"
            style={{ zIndex: 1000 }}
          >
            <div className="flex relative justify-between items-center mb-4">
              <div
                className={`text-xl font-semibold cursor-pointer ${
                  selectedDomain ? "text-blue-500" : "text-black"
                }`}
                onClick={() => setSelectedDomain(true)}
              >
                Select Domain
              </div>
              {/* vertical line */}
              <div className="border-r-2 h-10 w-0.5 mx-2"></div>
              <div
                className={`text-xl font-semibold cursor-pointer ${
                  !selectedDomain ? "text-blue-500" : "text-black"
                }`}
                onClick={() => setSelectedDomain(false)}
              >
                Select Education
              </div>
              <button onClick={() => setOpenModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {selectedDomain ? (
              <div className="flex flex-col">
                {domainOptions.map((option, index) => (
                  <label key={index} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={selectedDomainOptions.includes(option)}
                      onChange={() => handleDomainCheckboxChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {educationOptions.map((option, index) => (
                  <label key={index} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={selectedEducationOptions.includes(option)}
                      onChange={() => handleEducationCheckboxChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            <div className="flex space-x-1 p-3 -bottom-4 sticky">
              <button
                onClick={handleApplyFilters}
                className="w-1/2 px-4 mx-2 py-2 bg-blue-500 text-white rounded-lg"
              >
                Apply
              </button>
              <button
                onClick={handleClearFilters}
                className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
