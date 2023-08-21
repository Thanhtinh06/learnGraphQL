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
    // arg3 : context
    createJob: (__root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizationError("Missing authentication");
      }
      return createJob({ companyId: user.companyId, title, description });
    },
    deleteJob: async (__root, { input: { id } }, { user }) => {
      if (!user) {
        throw unauthorizationError("Missing authentication");
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundMessage("Can't remove another job's company");
      }
      return job;
    },
    updateJob: (__root, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw unauthorizationError("Missing authentication");
      }
      return updateJob({ id, title, description, companyId: user.companyId });
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
function unauthorizationError(message) {
  return new GraphQLError(message, {
    extensions: { code: 401 },
  });
}
