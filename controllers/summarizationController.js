const express = require('express');
const axios = require('axios');
exports.summarizeText = async(req, res) => {
    const apiUrl = process.env.TEXT_API_URL;
    const subscriptionKey = process.env.SUBSCRIPTION_KEY;
    
    let count = 1;
    const documents = [];
    req.body.forEach(text =>{

        const documentObject = {
            "id":++count,
            "language": "en",
            "text":text.text
        }
        documents.push(documentObject);

    });

    const payload = {
        "displayName": "Document ext Summarization Task Example",
        "analysisInput": {
            "documents": documents
        },
        "tasks": [
            {
                "kind": "AbstractiveSummarization",
                "taskName": "Document Abstractive  Summarization Task 1",
                "parameters": {
                    "summaryLength": "short"
                }
            }
        ]
    };


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
        const result = concatenateTextFields(getResult.data);

        // console.log("gg is ", result.tasks.items[0].results.documents);
        res.send(result);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send(error.message);
    }
};

function concatenateTextFields(data) {

    const arr = [];
    const docs  = data.tasks.items[0].results.documents;
    docs.forEach(doc => {
        const eachSummary = {};
        eachSummary['summarizedText'] = doc.summaries[0].text;
        
        arr.push(eachSummary);
    });

    return arr;

}


exports.summarizeConversations = async(req, res) => {
    const apiUrl = process.env.CONVERSATION_API_URL;
    const subscriptionKey = process.env.SUBSCRIPTION_KEY;


    const payload = req.body;

    console.log(req.body);
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
};

