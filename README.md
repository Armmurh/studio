# GlobalGlow Weather App

This is a weather forecast application built with Next.js, OpenWeatherMap, and the Gemini API.

## Features

- Get weather forecasts for any location worldwide.
- AI-powered weather summaries.
- AI-based outfit recommendations based on the weather.
- Elegant, responsive design.

## Getting Started

### 1. Set up Environment Variables

Before running the application, you need to provide your API keys.

Create a file named `.env.local` in the root of the project by copying the example file:

```bash
cp .env .env.local
```

Now, open `.env.local` and add your API keys:

```
OPENWEATHERMAP_API_KEY="YOUR_OPENWEATHERMAP_API_KEY"
GOOGLE_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_API_KEY"
```

- You can get an OpenWeatherMap API key from [https://openweathermap.org/api](https://openweathermap.org/api).
- You can get a Google AI (Gemini) API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Install Dependencies and Run

Install the necessary packages and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
