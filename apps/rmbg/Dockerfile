# syntax=docker/dockerfile:1.4
FROM python:3.12.3-alpine AS builder

WORKDIR /app

COPY apps/rmbg/requirements.txt /app
RUN pip3 install -r requirements.txt

COPY /apps/rmbg /app

ENTRYPOINT ["python3"]
CMD ["index.py"]
