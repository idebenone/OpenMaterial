import dotenv from "dotenv"
dotenv.config();

import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai"

import RESPONSE from "../utils/responses";
import { appendFields } from "../utils/chartUtils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt_template = (request: string) => {
    return `
Prompt: You are an expert in creating detailed and accurate educational content.  Your task is to generate structured data in the form of a flowchart that outlines the path to learn any given topic. The flowchart should consist of nodes representing sub-topics or sections and edges representing the connections between these nodes. Each node must have a unique identifier, a label for the sub-topic or section name, and a brief description of the sub-topic or section. The data should be formatted as JSON objects following the provided schema for nodes and edges. Ensure the content is informative, knowledgeable, and straightforward.
Schema:
interface NodeSchema {id: string;label: string;content: string;}
interface EdgeSchema {source: string;target: string;}
Instructions:
Identify the main topic and break it down into sub-topics or sections at deeper levels.
For each sub-topic, provide a brief description.
Create nodes for each sub-topics following the NodeSchema.
Create edges to show the connections between nodes following the EdgeSchema.
Ensure each node has unique id, with label as the sub-topic or section name and content as a brief description.
Include multiple levels of depth to cover the topic comprehensively.

Example:
If the user wishes to learn Mathematics at the elementary level, the data should be structured as follows:

Nodes:
[{"id":"1","label":"Trigonometry","content":"Introductiontotrigonometry."},{"id":"2","label":"Triangles","content":"Understandingdifferenttypesoftriangles."},{"id":"3","label":"TrigonometricFunctions","content":"Introductiontosine,cosine,andtangentfunctions."},{"id":"4","label":"RightAngledTriangle","content":"Propertiesandcharacteristicsofright-angledtriangles."},{"id":"5","label":"IsoscelesTriangle","content":"Propertiesandcharacteristicsofisoscelestriangles."},{"id":"6","label":"SineFunction","content":"Understandingthesinefunctionanditsapplications."},{"id":"7","label":"CosineFunction","content":"Understandingthecosinefunctionanditsapplications."},{"id":"8","label":"TangentFunction","content":"Understandingthetangentfunctionanditsapplications."},{"id":"9","label":"AdvancedApplications","content":"Exploringadvancedapplicationsoftrigonometry."},{"id":"10","label":"TrigonometricIdentities","content":"Understandingfundamentaltrigonometricidentities."},{"id":"11","label":"LawofSines","content":"Exploringthelawofsines."},{"id":"12","label":"LawofCosines","content":"Exploringthelawofcosines."}]

Edges:
[{"source":"1","target":"2"},{"source":"1","target":"3"},{"source":"2","target":"4"},{"source":"2","target":"5"},{"source":"3","target":"6"},{"source":"3","target":"7"},{"source":"3","target":"8"},{"source":"1","target":"9"},{"source":"9","target":"10"},{"source":"9","target":"11"},{"source":"9","target":"12"}]

Request:
Generate a detailed flowchart data structure in JSON format for the following topic: ${request}. Provide JSON data only`
}

const generateMap = async (req: Request, res: Response) => {
    const { user_prompt } = req.body;
    if (!user_prompt) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY())
    try {
        const response = await model.generateContent(prompt_template(user_prompt));
        const { nodes, edges } = JSON.parse(response.response.text().slice(7, -3));
        const { updatedNodes, updatedEdges } = appendFields(nodes, edges);
        return res.status(201).json(RESPONSE.OK("Successfully generated", { nodes: updatedNodes, edges: updatedEdges }))
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}


const nodes = [
    {
        "id": "1",
        "label": "Advanced Frontend Development",
        "content": "A comprehensive guide to mastering advanced frontend development techniques and technologies."
    },
    {
        "id": "2",
        "label": "JavaScript Mastery",
        "content": "Deep dive into advanced JavaScript concepts and best practices."
    },
    {
        "id": "3",
        "label": "Functional Programming",
        "content": "Understanding and implementing functional programming principles in JavaScript."
    },
    {
        "id": "4",
        "label": "Asynchronous Programming",
        "content": "Mastering asynchronous operations, promises, and async/await."
    },
    {
        "id": "5",
        "label": "Advanced DOM Manipulation",
        "content": "Advanced techniques for manipulating the DOM efficiently and effectively."
    },
    {
        "id": "6",
        "label": "Modern JavaScript Frameworks",
        "content": "Learning and utilizing popular JavaScript frameworks like React, Vue, or Angular."
    },
    {
        "id": "7",
        "label": "React.js",
        "content": "Mastering React's component-based architecture, state management, and hooks."
    },
    {
        "id": "8",
        "label": "Vue.js",
        "content": "Exploring Vue's reactivity system, single-file components, and Vuex for state management."
    },
    {
        "id": "9",
        "label": "Angular",
        "content": "Understanding Angular's dependency injection, modules, and data binding."
    },
    {
        "id": "10",
        "label": "Performance Optimization",
        "content": "Optimizing frontend applications for speed, responsiveness, and scalability."
    },
    {
        "id": "11",
        "label": "Code Optimization",
        "content": "Implementing techniques for improving JavaScript code efficiency and readability."
    },
    {
        "id": "12",
        "label": "Caching Strategies",
        "content": "Utilizing caching mechanisms to enhance website performance."
    },
    {
        "id": "13",
        "label": "Accessibility",
        "content": "Building accessible web applications that cater to users with disabilities."
    },
    {
        "id": "14",
        "label": "Web Security",
        "content": "Implementing secure coding practices to prevent vulnerabilities and protect user data."
    },
    {
        "id": "15",
        "label": "Cross-Site Scripting (XSS)",
        "content": "Understanding and mitigating XSS attacks."
    },
    {
        "id": "16",
        "label": "SQL Injection",
        "content": "Preventing and addressing SQL injection vulnerabilities."
    },
    {
        "id": "17",
        "label": "Testing and Debugging",
        "content": "Mastering frontend testing methodologies and effective debugging techniques."
    },
    {
        "id": "18",
        "label": "Unit Testing",
        "content": "Writing unit tests to verify individual components and functions."
    },
    {
        "id": "19",
        "label": "Integration Testing",
        "content": "Testing the interaction between different components and systems."
    },
    {
        "id": "20",
        "label": "End-to-End Testing",
        "content": "Testing the complete user flow from beginning to end."
    },
    {
        "id": "21",
        "label": "Debugging Tools",
        "content": "Utilizing debugging tools like browser developer consoles and debugging extensions."
    },
    {
        "id": "22",
        "label": "Build Tools",
        "content": "Leveraging build tools like Webpack or Parcel for managing project dependencies and automating tasks."
    },
    {
        "id": "23",
        "label": "Version Control",
        "content": "Using Git for collaborative development, code management, and tracking changes."
    },
    {
        "id": "24",
        "label": "Deployment",
        "content": "Deploying frontend applications to production environments."
    },
    {
        "id": "25",
        "label": "Cloud Hosting",
        "content": "Deploying applications to cloud platforms like AWS, Azure, or Google Cloud."
    },
    {
        "id": "26",
        "label": "Continuous Integration and Continuous Deployment (CI/CD)",
        "content": "Automating the build, test, and deployment process using CI/CD pipelines."
    }
]

const edges = [
    {
        "source": "1",
        "target": "2"
    },
    {
        "source": "2",
        "target": "3"
    },
    {
        "source": "2",
        "target": "4"
    },
    {
        "source": "2",
        "target": "5"
    },
    {
        "source": "1",
        "target": "6"
    },
    {
        "source": "6",
        "target": "7"
    },
    {
        "source": "6",
        "target": "8"
    },
    {
        "source": "6",
        "target": "9"
    },
    {
        "source": "1",
        "target": "10"
    },
    {
        "source": "10",
        "target": "11"
    },
    {
        "source": "10",
        "target": "12"
    },
    {
        "source": "1",
        "target": "13"
    },
    {
        "source": "1",
        "target": "14"
    },
    {
        "source": "14",
        "target": "15"
    },
    {
        "source": "14",
        "target": "16"
    },
    {
        "source": "1",
        "target": "17"
    },
    {
        "source": "17",
        "target": "18"
    },
    {
        "source": "17",
        "target": "19"
    },
    {
        "source": "17",
        "target": "20"
    },
    {
        "source": "17",
        "target": "21"
    },
    {
        "source": "1",
        "target": "22"
    },
    {
        "source": "1",
        "target": "23"
    },
    {
        "source": "1",
        "target": "24"
    },
    {
        "source": "24",
        "target": "25"
    },
    {
        "source": "24",
        "target": "26"
    }
]

const generateDummyMap = async (req: Request, res: Response) => {
    const { updatedNodes, updatedEdges } = appendFields(nodes, edges)
    return res.status(200).json(RESPONSE.OK("Data generated successful", { nodes: updatedNodes, edges: updatedEdges }))
}

export { generateMap, generateDummyMap };

