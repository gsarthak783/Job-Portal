import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sidebar from "../Sidebar/Sidebar";
import Jobs from "./Jobs";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);


  useEffect(() => {
    window.scrollTo(0,0);
    
    setIsLoading(true);
    let fetchData = async () => {
      const res = await axios.get("http://localhost:1234/job-api/active-jobs")
      let result = res.data.payload;
      setJobs(result);
      setIsLoading(false);
      console.log(result);
    }
    fetchData();
    

  }, []);

   // Function to handle toggle sidebar button click event
   const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = jobs?.filter(
    (job) => job.jobTitle?.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    // console.log(event.target.value);
  };

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // Filtering Input Items

    // console.log(filteredItems)
    if (query) {
      filteredJobs = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      console.log((selected));

      filteredJobs = filteredJobs?.filter(
        ({
          jobLocation,
          experienceLevel,
          maxSalary,
          // jobPostingDate,
          employmentType,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          // jobPostingDate >= selected ||
          parseInt(maxSalary) <= parseInt(selected) ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      //console.log(filteredJobs);
    }

    // Slice the data based on the current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs?.slice(startIndex, endIndex);

    return filteredJobs?.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className="">
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-slate-100 md:grid grid-cols-4 gap-8 lg:px-10 px-4 py-10">
        <div className="col-span-1 bg-slate-50 p-4 rounded">
          <Sidebar handleChange={handleChange} />
        </div>

        <div className="col-span-3 bg-slate-50 p-4 rounded">
          {isLoading ? ( // Loading indicator
            <p className="text-3xl text-center font-semibold">Loading...</p>
          ) : result?.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result?.length} Jobs</h3>
              <p className="text-3xl text-center font-semibold">No Jobs found</p>
            </>
          )}

          {/* pagination block here */}
          {result?.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems?.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems?.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
