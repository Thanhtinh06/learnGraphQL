import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobByCompany,
  getJobs,
  updateJob,
} from "./db/jobs.js";
import { getUsers } from "./db/users.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    users: () => getUsers(),
    job: (__root, { id }) => getJob(id),
    company: async (__root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundMessage("No company with ID" + id);
      }
      return company;
    },
  },
  Mutation: {
    createJob: (__root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i";
      return createJob({ companyId, title, description });
    },
    deleteJob: (__root, { input: { id } }) => {
      return deleteJob(id);
    },
    updateJob: (__root, { input: { id, title, description } }) => {
      return updateJob({ id, title, description });
    },
  },
  Job: {
    date: ({ createdAt }) => toIosDate(createdAt),
    company: async ({ companyId }) => {
      const company = await getCompany(companyId);
      if (!company) {
        throw notFoundMessage("No company with ID" + companyId);
      }
      return company;
    },
  },

  Company: {
    jobs: ({ id }) => getJobByCompany(id),
  },
};

function toIosDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}

function notFoundMessage(message) {
  return new GraphQLError(message, {
    extensions: { code: 400 },
  });
}
