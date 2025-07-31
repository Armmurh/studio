# GlobalGlow: AI-Powered Weather & Outfit Recommendations

GlobalGlow is a sleek, modern weather application that provides real-time weather forecasts for any location worldwide. It goes beyond simple data, using the power of the Gemini AI to generate insightful weather summaries and personalized outfit suggestions tailored to the current conditions.

Built with a cutting-edge tech stack, this app serves as an excellent example of integrating AI into a practical, user-friendly web application.

## Core Features:

*   **Global Weather Search:** Instantly retrieve current weather conditions for any city or country.
*   **Detailed Forecast:** Get key metrics like temperature (Celsius), humidity, and wind speed.
*   **AI-Driven Summary:** Receive a concise, easy-to-understand summary of the day's weather, powered by Google's Gemini.
*   **Smart Outfit Suggestions:** Let the AI act as your personal stylist, recommending the perfect outfit based on the forecast.
*   **Responsive Design:** Enjoy a seamless experience on any device, from desktop to mobile.
*   **Elegant UI:** A clean and beautiful interface built with ShadCN UI and Tailwind CSS.

## Tech Stack:

*   **Framework:** Next.js (with App Router)
*   **Generative AI:** Google's Gemini API via Genkit
*   **Weather Data:** OpenWeatherMap API
*   **Styling:** Tailwind CSS & ShadCN UI
*   **Deployment:** Firebase App Hosting

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
