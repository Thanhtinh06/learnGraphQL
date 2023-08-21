import { useEffect, useState } from "react";
import { createJob, getJob, updateJob } from "./../lib/graphql/queries";
import { useNavigate, useParams } from "react-router";

function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { jobId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!jobId) {
      await createJob({ title, description })
        .then(() => navigate("/"))
        .catch(({ response }) => alert(response.errors[0].message));
    } else {
      await updateJob({ id: jobId, title, description })
        .then((value) => {
          const message = value
            ? "Update Successfull"
            : "Can't update another job's company";
          alert(message);
        })
        .catch(({ response }) => alert(response.errors[0].message));
    }
  };
  useEffect(() => {
    if (jobId) {
      (async () => {
        const { title, description } = await getJob(jobId);
        setTitle(title);
        setDescription(description);
      })();
    }
  }, [jobId]);

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
