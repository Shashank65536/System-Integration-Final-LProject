const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/analyze-text', async (req, res) => {
    const apiUrl = 'https://sys-integration-instance.cognitiveservices.azure.com/language/analyze-text/jobs?api-version=2023-11-15-preview';
    const subscriptionKey = '1c5e0cc661944bc3ad307f8b6f6d3fb0'; // Replace with your actual subscription key

    const payload = {
        "displayName": "Document ext Summarization Task Example",
        "analysisInput": {
            "documents": [
                {
                    "id": "1",
                    "language": "en",
                    "text": req.body.text
                }
            ]
        },
        "tasks": [
            {
                "kind": "ExtractiveSummarization",
                "taskName": "Document Extractive Summarization Task 1",
                "parameters": {
                    "sentenceCount": 6
                }
            }
        ]
    };

    console.log(payload);

    const headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    };

    try {
        // Send POST request
        const postResponse = await axios.post(apiUrl, payload, { headers: headers });
        const operationLocation = postResponse.headers['operation-location'];

        if (!operationLocation) {
            return res.status(500).send('Operation-Location header is missing in the response');
        }

        // Wait for some time before making the GET request
        console.log('Waiting for the operation to complete...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

        // Send GET request
        const getResult = await axios.get(operationLocation, { headers: headers });
        res.send(getResult.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
