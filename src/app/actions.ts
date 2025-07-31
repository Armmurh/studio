'use server';

import { z } from 'zod';
import { getWeatherSummary } from '@/ai/flows/weather-summary';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
});

export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface AiSummary {
  summary: string;
  outfitSuggestion: string;
}

interface ActionState {
  error?: string | null;
  data?: {
    weather: WeatherData;
    ai: AiSummary;
  } | null;
}

export async function getWeatherForLocation(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = formSchema.safeParse({
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.location?.join(', '),
    };
  }

  const location = validatedFields.data.location;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    return { error: 'OpenWeatherMap API key is not configured.' };
  }

  try {
    // 1. Geocode location to get coordinates
    const geoRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    if (!geoRes.ok) {
      const errorData = await geoRes.json();
      if (geoRes.status === 404) {
        return { error: `Could not find location: ${location}` };
      }
      return { error: errorData.message || 'Failed to fetch location data.' };
    }

    const geoData = await geoRes.json();

    if (!geoData || !geoData.coord) {
      return { error: `Could not find location: ${location}` };
    }
    
    const weather: WeatherData = {
      location: geoData.name,
      country: geoData.sys.country,
      temperature: Math.round(geoData.main.temp),
      humidity: geoData.main.humidity,
      windSpeed: geoData.wind.speed,
      description: geoData.weather[0].main,
      icon: geoData.weather[0].icon,
    };
    
    // 2. Get AI summary
    const aiSummary = await getWeatherSummary({
        location: `${weather.location}, ${weather.country}`,
        temperature: weather.temperature,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed
    });

    return {
        data: {
            weather,
            ai: aiSummary
        }
    }

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
