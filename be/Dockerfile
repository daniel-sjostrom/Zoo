# FROM python:3.8
FROM jupyter/base-notebook:latest

WORKDIR /app

COPY . /app

ARG ENV

USER $NB_UID

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--reload-dir", "/app"]
