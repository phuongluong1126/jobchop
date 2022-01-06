export const SetJobs = (jobs) => {
  return {
    type: "SET_JOBS",
    payload: jobs,
  };
};
export const SetCompanies = (companies) => {
  return {
    type: "SET_COMPANIES",
    payload: companies,
  };
};
export const OpenKeyBoard = () => {
  return {
    type: "OPEN_KEYBOARD",
  };
};
export const CloseKeyBoard = () => {
  return {
    type: "CLOSE_KEYBOARD",
  };
};
export const SetSavedJobs = (job) => {
  return {
    type: "SET_SAVED_JOBS",
    payload: job,
  };
};
export const SetInfoProfile = (info) => {
  return {
    type: "SET_INFO_PROFILE",
    payload: info,
  };
};

export const ChartFilter = (info) => {
  return {
    type: "CHART_FILTER",
    payload: info,
  };
};

export const SetSearchFilter = (info) => {
  return {
    type: "SET_SEARCH_FILTER",
    payload: info,
  };
};