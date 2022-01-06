export const URL = "http://bcf2-113-172-187-204.ngrok.io";

export const getAllJobs = () =>
    fetch(`${URL}/getall`)
    .then((res) => res.json())
    .catch((err) => console.log("Error", err));

export const getAllCompanies = () =>
    fetch(`${URL}/getcompany`)
    .then((res) => res.json())
    .catch((err) => console.log("Error", err));

export const getRelatedJobs = (title) =>
    fetch(`${URL}/getlist?title=${title}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

export const getJobsBySkill = (stringSkill) => {
     fetch(`${URL}/search?skill=${stringSkill}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};