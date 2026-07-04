import { createSlice } from "@reduxjs/toolkit";

const mockJobs = [
    {
        _id: "mock_1",
        title: "Senior Frontend Developer",
        description: "We're looking for a passionate Senior Frontend Developer to build beautiful, high-performance React applications used by millions of users. You'll own features end-to-end and collaborate with a world-class design and product team.",
        location: "Bangalore",
        jobType: "Full Time",
        position: 3,
        salary: 25,
        experience: 3,
        requirements: ["React.js", "TypeScript", "Tailwind CSS", "Redux", "REST APIs", "Git"],
        applications: [],
        createdAt: new Date().toISOString(),
        company: { _id: "c1", name: "TechCorp India", logo: "" },
    },
    {
        _id: "mock_2",
        title: "Backend Engineer (Node.js)",
        description: "Join our platform engineering team to design, build, and scale high-throughput REST APIs and microservices on AWS. You'll work with Node.js, Express, MongoDB, and Redis to power our SaaS platform serving 500K+ users.",
        location: "Hyderabad",
        jobType: "Full Time",
        position: 2,
        salary: 18,
        experience: 2,
        requirements: ["Node.js", "Express.js", "MongoDB", "Redis", "AWS", "Docker"],
        applications: [],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        company: { _id: "c2", name: "CloudSoft Solutions", logo: "" },
    },
    {
        _id: "mock_3",
        title: "UI/UX Designer",
        description: "We're hiring a creative UI/UX Designer to craft intuitive, visually stunning user experiences. You'll create wireframes, prototypes, and high-fidelity designs while collaborating closely with engineers and the product team.",
        location: "Mumbai",
        jobType: "Full Time",
        position: 1,
        salary: 14,
        experience: 2,
        requirements: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Illustration"],
        applications: [],
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        company: { _id: "c3", name: "DesignHub", logo: "" },
    },
    {
        _id: "mock_4",
        title: "Data Scientist",
        description: "As a Data Scientist at DataWave AI, you'll analyze complex datasets, build and deploy machine learning models, and deliver actionable insights that drive our product roadmap. You'll work with Python, TensorFlow, and cloud-based data pipelines.",
        location: "Pune",
        jobType: "Full Time",
        position: 2,
        salary: 22,
        experience: 3,
        requirements: ["Python", "TensorFlow", "Scikit-learn", "SQL", "Pandas", "Tableau"],
        applications: [],
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        company: { _id: "c4", name: "DataWave AI", logo: "" },
    },
    {
        _id: "mock_5",
        title: "FullStack Developer",
        description: "We're a fast-growing startup looking for a FullStack Developer who thrives in an agile environment. You'll own features from database to UI, using React on the frontend and Node.js + PostgreSQL on the backend.",
        location: "Delhi NCR",
        jobType: "Remote",
        position: 4,
        salary: 20,
        experience: 2,
        requirements: ["React.js", "Node.js", "PostgreSQL", "GraphQL", "TypeScript", "CI/CD"],
        applications: [],
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        company: { _id: "c5", name: "StartupLaunch", logo: "" },
    },
];


const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs: mockJobs,
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;