import { GraphQLClient, gql } from "graphql-request";

const endpointGraph = "http://localhost:9000/graphql";

const client = new GraphQLClient(endpointGraph);

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
};

export const getJob = async (id) => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        description
        id
        title
        company {
          name
          id
        }
      }
    }
  `;
  const { job } = await client.request(query, { id });
  return job;
};
export const getCompany = async (id) => {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
          date
        }
      }
    }
  `;
  const { company } = await client.request(query, { id });
  console.log("company", company);
  return company;
};
