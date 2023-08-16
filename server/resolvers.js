import { getCompany } from "./db/companies.js";
import { getJob, getJobs } from "./db/jobs.js";
import { getUsers } from "./db/users.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    users: () => getUsers(),
    job: (__root, { id }) => getJob(id),
    company: (__root, { id }) => {
      return getCompany(id);
    },
  },
  Job: {
    date: ({ createdAt }) => toIosDate(createdAt),
    company: ({ companyId }) => getCompany(companyId),
  },
};

function toIosDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
