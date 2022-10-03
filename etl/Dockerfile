FROM python:2-slim

# Environment variables
ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD pass
ENV POSTGRES_DB default
ENV DATA_PATH /data

# Setting working directory
WORKDIR /etl

# Install dependencies
COPY requirements.txt /etl/
RUN pip install -r requirements.txt

# Copying main files
COPY watcher/ /etl/watcher/
COPY start.py /etl/

# Start ETL
CMD python start.py
