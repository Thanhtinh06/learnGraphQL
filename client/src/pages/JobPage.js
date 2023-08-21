import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteJob, getJob } from "../lib/graphql/queries";

function JobPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getJob(jobId).then((value) => {
      setJob(value);
    });
  }, [jobId]);
  const handleRemoveJob = async (id) => {
    const result = await deleteJob({ id });
    if (result) {
      navigate("/");
    }
  };

  if (!job) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <h1 className="title is-2">{job?.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company.id}`}>{job?.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">Posted: {job?.date}</div>
        <p className="block">{job?.description}</p>
      </div>
      <div>
        <button
          onClick={() => {
            navigate(`/jobs/update/${jobId}`);
          }}
        >
          Edit{" "}
        </button>
        <button onClick={() => handleRemoveJob(jobId)}>Remove</button>
      </div>
    </div>
  );
}

export default JobPage;
