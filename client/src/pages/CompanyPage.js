import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({
          company,
          loading: false,
          error: false,
        });
      } catch (error) {
        setState({
          company: null,
          loading: false,
          error: true,
        });
      }
    })();
  }, [companyId]);

  if (state.loading) {
    return <p>Loading</p>;
  }
  if (state.error) {
    return <p>Not Found Company</p>;
  }
  return (
    <div>
      <h1 className="title">{state.company.name}</h1>
      <div className="box">{state.company.description}</div>
      <h2>Jobs at {state.company.name}</h2>
      <JobList jobs={state.company.jobs} />
    </div>
  );
}

export default CompanyPage;
