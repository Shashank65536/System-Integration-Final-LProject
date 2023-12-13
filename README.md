# Microsoft Azure Cognitive Services: Text Translator API

## Overview
This repository contains the implementation and documentation for the Text Translator API using Microsoft Azure Cognitive Services. It focuses on providing a powerful AI service for translating and summarizing text data efficiently and accurately.

## Features
- **Abstractive Summarization:** Generates summaries that capture the main ideas without necessarily using the same words as the original text.
- **Contextual Input Range:** Ability to specify the range within a document for generating summaries.
- **Custom Summarization:** Allows the creation of custom AI models for summarizing specific types of unstructured text.

## API Endpoints
1. **Text Summarization:** `http://164.90.154.233:3000/azure-ai/summarize_text`
2. **Conversation Summarization:** `http://164.90.154.233:3000/azure-ai/summarize_conversations`

## Usage
- The APIs accept HTTP POST requests with a specific JSON structure for the payload.
- **Refer this swagger link for the usage of apis** `http://164.90.154.233:3000/api-docs/#/`

## Getting Started
To start using these APIs, refer to the above swagger for Request and response structure.
## Text Summarization API

### Endpoint
**URL**: `http://164.90.154.233:3000/azure-ai/summarize_text`

### Request Structure
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
- **Body**: 
  - `text` (string): Text to be summarized.

#### Example Request Payload
```json
[
    {
        "text": "At Microsoft, we have been on a quest to advance AI beyond existing techniques, by taking a more holistic, human-centric approach to learning and understanding. As Chief Technology Officer of Azure AI services, I have been working with a team of amazing scientists and engineers to turn this quest into a reality. In my role, I enjoy a unique perspective in viewing the relationship among three attributes of human cognition: monolingual text (X), audio or visual sensory signals, (Y) and multilingual (Z). At the interseaction of all three, there’s magic—what we call XYZ-code as illustrated in Figure 1—a joint representation to create more powerful AI that can speak, hear, see, and understand humans better. We believe XYZ-code will enable us to fulfill our long-term vision: cross-domain transfer learning, spanning modalities and languages. The goal is to have "
    },
    {
        "text": "Create a project plan for your own personal brand. If you’re more comfortable behind a screen, you might want to avoid in-person events and speaking opportunities, at least to start. If you know that you have trouble following through, you might want to plan out posts and activities several months in advance, so that you won’t stall a few weeks in"
    }
]
```

#### Example Request Payload
```json
[
    {
        "summarizedText": "Microsoft is working towards advancing AI through a holistic, human-centric approach. The Chief Technology Officer of Azure AI services, who has a unique perspective on human cognition, is working with a team to develop a new concept called XYZ-code, which combines monolinguistic text, audio or visual sensory signals, and multilinguality. This approach is aimed at creating more powerful AI that can better understand humans, with the long-term vision of cross-domain transfer learning across modalities and languages."
    },
    {
        "summarizedText": "The document suggests creating a project plan for one's personal brand. It suggests that individuals more comfortable behind a screen might want to avoid in-person events and speaking opportunities for the initial stages. If they struggle with follow-through, they might want to plan posts and activities months in advance to avoid stalling."
    }
]
```


## Conversation Summarization API

### Endpoint
**URL**: `http://164.90.154.233:3000/azure-ai/summarize_conversations`

### Request Structure
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
- **Body**: 
  - `text` (string): Text to be summarized.

#### Example Request Payload
```json
{
    "displayName": "Conversation Task Example",
    "analysisInput": {
        "conversations": [
            {
                "conversationItems": [
                    {
                        "text": "Hello, you’re chatting with Rene. How may I help you?",
                        "id": "1",
                        "role": "Agent",
                        "participantId": "Agent_1"
                    },
                    {
                        "text": "Hi, I tried to set up wifi connection for Smart Brew 300 espresso machine, but it didn’t work.",
                        "id": "2",
                        "role": "Customer",
                        "participantId": "Customer_1"
                    },
                    {
                        "text": "I’m sorry to hear that. Let’s see what we can do to fix this issue. Could you please try the following steps for me? First, could you push the wifi connection button, hold for 3 seconds, then let me know if the power light is slowly blinking on and off every second?",
                        "id": "3",
                        "role": "Agent",
                        "participantId": "Agent_1"
                    },
                    {
                        "text": "Yes, I pushed the wifi connection button, and now the power light is slowly blinking.",
                        "id": "4",
                        "role": "Customer",
                        "participantId": "Customer_1"
                    },
                    {
                        "text": "Great. Thank you! Now, please check in your Contoso Coffee app. Does it prompt to ask you to connect with the machine? ",
                        "id": "5",
                        "role": "Agent",
                        "participantId": "Agent_1"
                    },
                    {
                        "text": "No. Nothing happened.",
                        "id": "6",
                        "role": "Customer",
                        "participantId": "Customer_1"
                    },
                    {
                        "text": "I’m very sorry to hear that. Let me see if there’s another way to fix the issue. Please hold on for a minute.",
                        "id": "7",
                        "role": "Agent",
                        "participantId": "Agent_1"
                    }
                ],
                "modality": "text",
                "id": "conversation1",
                "language": "en"
            }
        ]
    },
    "tasks": [
        {
            "taskName": "Conversation Task 1",
            "kind": "ConversationalSummarizationTask",
            "parameters": {
                "summaryAspects": [
                    "issue"
                ]
            }
        },
        {
            "taskName": "Conversation Task 2",
            "kind": "ConversationalSummarizationTask",
            "parameters": {
                "summaryAspects": [
                    "resolution"
                ],
                "sentenceCount": 1
            }
        }
    ]
}
```

#### Example Request Payload
```json
{
    "jobId": "fd4428b3-e503-401d-95bb-b108ce7cfcc3",
    "lastUpdatedDateTime": "2023-12-13T00:56:39Z",
    "createdDateTime": "2023-12-13T00:56:37Z",
    "expirationDateTime": "2023-12-14T00:56:37Z",
    "status": "succeeded",
    "errors": [],
    "displayName": "Conversation Task Example",
    "tasks": {
        "completed": 2,
        "failed": 0,
        "inProgress": 0,
        "total": 2,
        "items": [
            {
                "kind": "conversationalSummarizationResults",
                "taskName": "Conversation Task 1",
                "lastUpdateDateTime": "2023-12-13T00:56:39.0265931Z",
                "status": "succeeded",
                "results": {
                    "conversations": [
                        {
                            "summaries": [
                                {
                                    "aspect": "issue",
                                    "text": "Customer is unable to set up wifi connection for Smart Brew 300 espresso machine."
                                }
                            ],
                            "id": "conversation1",
                            "warnings": []
                        }
                    ],
                    "errors": [],
                    "modelVersion": "latest"
                }
            },
            {
                "kind": "conversationalSummarizationResults",
                "taskName": "Conversation Task 2",
                "lastUpdateDateTime": "2023-12-13T00:56:39.1627802Z",
                "status": "succeeded",
                "results": {
                    "conversations": [
                        {
                            "summaries": [
                                {
                                    "aspect": "resolution",
                                    "text": "The agent instructed the customer to push the wifi connection button, hold for 3 seconds, and check if the power light blinks on and off every second."
                                }
                            ],
                            "id": "conversation1",
                            "warnings": []
                        }
                    ],
                    "errors": [],
                    "modelVersion": "latest"
                }
            }
        ]
    }
}
```


