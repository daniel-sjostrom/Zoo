from fastapi import APIRouter
import random

from settings import get_database_url

router = APIRouter()
SQL_DATABASE_URL = get_database_url()

ADJECTIVES = [
    "Joyful",
    "Spacious",
    "Courageous",
    "Enigmatic",
    "Radiant",
    "Cozy",
    "Lively",
    "Tranquil",
    "Gleaming",
    "Tenacious",
    "Whimsical",
    "Serene",
    "Vibrant",
    "Exquisite",
    "Harmonious",
    "Resilient",
    "Captivating",
    "Elegant",
    "Playful",
    "Majestic",
]

ROBOTS = [
    "Android",
    "Cyborg",
    "Machine",
    "Droid",
    "Synth",
    "Bot",
    "Automat",
    "Mecha",
    "Roboticist",
    "AI Agent",
    "Neural Network",
    "Humanoid",
    "Circuitry",
    "Automata",
    "Technobot",
    "Cybernetic",
    "Algorithm",
    "Virtual Assistant",
    "Drone",
    "Automatronic",
]

AVAILABLE_MODELS = [
    {
        "name": "Mistral 7b",
        "description": "The best 7b model at the moment",
        "file_name": "mistral-7b-instruct-v0.1.Q4_K_M.gguf",
    },
    {
        "name": "Llama 2 7b",
        "description": "The most popular 7b model",
        "file_name": "another-item-file-v1.0.XY_Z_A.gguf",
    },
]


def generate_random_robot():
    random_adjective = random.choice(ADJECTIVES)
    random_robot = random.choice(ROBOTS)
    return f"{random_adjective} {random_robot}"


@router.get("/ai-store")
async def get_ai_store():
    return {
        "name_suggestion": generate_random_robot(),
        "available_models": AVAILABLE_MODELS,
    }
