from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI()

# Fine-tuned models
MODELS = {
    "scrum_master": "ft:gpt-3.5-turbo-1106:personal:scrum-sm-v1:B5YnDhug",
    "product_owner": "ft:gpt-3.5-turbo-1106:personal:scrum-po-v1:B5YXch3Y",
    "developer_1": "ft:gpt-3.5-turbo-1106:personal:scrum-dev1-v1:B5YofKx6",
    "developer_2": "ft:gpt-3.5-turbo-1106:personal:scrum-dev2-v1:B5Ypzq89",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    role: str
    message: str

@app.post("/generate_response")
def generate_response(request: ChatRequest):
    """
    Generates a response from the fine-tuned AI model.
    """
    model_id = MODELS.get(request.role)
    if not model_id:
        raise HTTPException(status_code=400, detail=f"Invalid role: {request.role}")

    response = client.chat.completions.create(model=model_id,
    messages=[{"role": "user", "content": request.message}])

    return {"response": response.choices[0].message.content}

# Scrum Team Workflow
def get_model_response(role, conversation):
    """
    Calls the fine-tuned model for the given role with the ongoing conversation history.
    """
    model_name = MODELS.get(role)
    if not model_name:
        return f"Error: Model for {role} not found."

    response = client.chat.completions.create(model=model_name,
    messages=conversation)

    return response.choices[0].message.content

@app.post("/start_sprint_planning")
def start_sprint_planning():
    """
    Initiates the Sprint Planning conversation systematically among Scrum Master, Product Owner, and Developers.
    """

    conversation = [
        {"role": "system", "content": "You are a Scrum Master in a Scrum Agile team. Your job is to facilitate Sprint Planning."},
        {"role": "user", "content": "Let's start the Sprint Planning. What are the priorities for this sprint?"}
    ]

    # Scrum Master initiates
    scrum_master_response = get_model_response("scrum_master", conversation)
    conversation.append({"role": "assistant", "content": scrum_master_response})

    # Product Owner provides sprint priorities
    conversation.append({"role": "system", "content": "You are a Product Owner in a Scrum Agile team. You define sprint priorities."})
    product_owner_response = get_model_response("product_owner", conversation)
    conversation.append({"role": "assistant", "content": product_owner_response})

    # Developer 1 (Backend) estimates tasks
    conversation.append({"role": "system", "content": "You are Developer 1, a backend developer in an Agile Scrum team. You estimate and plan backend work."})
    dev1_response = get_model_response("developer_1", conversation)
    conversation.append({"role": "assistant", "content": dev1_response})

    # Developer 2 (Frontend) responds
    conversation.append({"role": "system", "content": "You are Developer 2, a frontend developer in an Agile Scrum team. You estimate and plan UI development."})
    dev2_response = get_model_response("developer_2", conversation)
    conversation.append({"role": "assistant", "content": dev2_response})

    return {
        "scrum_master": scrum_master_response,
        "product_owner": product_owner_response,
        "developer_1": dev1_response,
        "developer_2": dev2_response
    }


