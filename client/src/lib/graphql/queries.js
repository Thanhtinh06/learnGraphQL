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
  console.log("result", jobs);
  return jobs;
};
