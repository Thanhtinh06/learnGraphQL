import { GraphQLClient, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const endpointGraph = "http://localhost:9000/graphql";

const client = new GraphQLClient(endpointGraph, {
  headers: () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
  },
});

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
  return company;
};

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: {
      title,
      description,
    },
  });
  return job;
};

export const deleteJob = async ({ id }) => {
  const mutation = gql`
    mutation DeleteJob($input: DeleteJobInput!) {
      job: deleteJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: {
      id,
    },
  });
  if (job) {
    return true;
  }
  return false;
};

export const updateJob = async ({ id, description, title }) => {
  const mutation = gql`
    mutation UpdateJob($input: UpdateJobInput!) {
      job: updateJob(input: $input) {
        id
        title
        description
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: {
      id,
      description,
      title,
    },
  });
  console.log("job update", job);
  return job;
};
