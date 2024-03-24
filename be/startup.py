import ollama
import httpx
import time

ollama_client = ollama.Client(host="http://host.docker.internal:11434")


async def download_models():
    retries = 5
    for _ in range(retries):
        try:
            if len(ollama_client.list()["models"]) == 0:
                print("Downloading gemma:7b")
                ollama_client.pull("gemma:7b")
                print("Download gemma:7b completed.")
            else:
                print("Models are already downloaded.")
                print(ollama_client.list()["models"])
            break
        except httpx.ConnectError as e:
            print(f"Connection to Ollama failed, retrying... ({e})")
            time.sleep(5)  # Wait for 5 seconds before retrying
    else:
        print("Failed to connect to Ollama after several retries.")


def get_ollama_client():
    return ollama_client
