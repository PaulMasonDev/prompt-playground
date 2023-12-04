# --- Stage 1: Build the Expo (React Native) Web App ---

FROM node:18.15.0 as build-stage
WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .
RUN npx expo export:web

# Log the contents of the web-build directory
RUN ls -la /app/frontend/web-build

# --- Stage 2: Setup Python Environment for FastAPI ---

FROM python:3.10

# Copy the built Expo web app from the build-stage
WORKDIR /app
COPY --from=build-stage /app/frontend/web-build /app/frontend/web-build

# Set the working directory for Python backend
WORKDIR /app/backend

# Copy the Python backend files
COPY ./backend .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Environment variables for FastAPI
ENV UVICORN_HOST=0.0.0.0
ENV UVICORN_PORT=8000
EXPOSE 8000

# Run the FastAPI 
# ...

# Use the shell form of CMD to allow environment variable expansion
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
