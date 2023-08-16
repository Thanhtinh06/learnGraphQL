import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../lib/graphql/queries";

function HomePage() {
  const [jobs, setJobs] = useState();
  useEffect(() => {
    getJobs()
      .then((value) => {
        setJobs(value);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
