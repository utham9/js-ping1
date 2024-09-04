import * as fs from 'fs';
import axios, { Method } from 'axios';

// Define the structure of the JSON configuration
interface ApiConfig {
    endpoint: string;
    method: Method;
    payload: Record<string, any>;
    interval: number;
}

// Function to read and parse the JSON configuration file
function readConfigFile(filePath: string): ApiConfig {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to make the API call
async function callApi(config: ApiConfig) {
    try {
        const response = await axios({
            url: config.endpoint,
            method: config.method,
            data: config.payload,
        });
        console.log(`API Response: ${response.status} - ${response.statusText}`);
    } catch (error) {
        console.error(`Error calling API: ${error.message}`);
    }
}

// Main function to start the periodic API calls
function startMonitoring(configPath: string) {
    const config = readConfigFile(configPath);
    console.log(`Monitoring API at ${config.endpoint} every ${config.interval / 1000} seconds`);
    console.log(config)
    setInterval(() => {
        callApi(config);
    }, config.interval);
}

// Specify the path to the JSON configuration file
const configFilePath = './api.json';

// Start monitoring the API
startMonitoring(configFilePath);
 