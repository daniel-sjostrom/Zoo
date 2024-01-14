# FROM python:3.8
FROM jupyter/base-notebook:latest

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

ARG ENV

USER root
RUN apt-get update && \
    apt-get install -y sudo g++ gcc clang clang-tools cmake git && \
    rm -rf /var/lib/apt/lists/*

USER $NB_UID

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

RUN pip3 install ctransformers --no-binary ctransformers

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--reload-dir", "/app"]
