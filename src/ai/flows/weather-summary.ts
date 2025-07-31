'use server';
/**
 * @fileOverview A weather summary AI agent.
 *
 * - getWeatherSummary - A function that handles the weather summary process.
 * - WeatherSummaryInput - The input type for the getWeatherSummary function.
 * - WeatherSummaryOutput - The return type for the getWeatherSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherSummaryInputSchema = z.object({
  location: z.string().describe('The location to get the weather forecast for.'),
  temperature: z.number().describe('The temperature in Celsius.'),
  humidity: z.number().describe('The humidity in percentage.'),
  windSpeed: z.number().describe('The wind speed in m/s.'),
});
export type WeatherSummaryInput = z.infer<typeof WeatherSummaryInputSchema>;

const WeatherSummaryOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the day\'s weather forecast.'),
  outfitSuggestion: z.string().describe('An outfit suggestion based on the weather forecast.'),
});
export type WeatherSummaryOutput = z.infer<typeof WeatherSummaryOutputSchema>;

export async function getWeatherSummary(input: WeatherSummaryInput): Promise<WeatherSummaryOutput> {
  return weatherSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherSummaryPrompt',
  input: {schema: WeatherSummaryInputSchema},
  output: {schema: WeatherSummaryOutputSchema},
  prompt: `You are a helpful AI assistant that provides a brief summary of the day's weather forecast and an outfit suggestion based on the weather.

  Location: {{location}}
  Temperature: {{temperature}}°C
  Humidity: {{humidity}}%
  Wind Speed: {{windSpeed}} m/s

  Summary:
  Outfit Suggestion: `,
});

const weatherSummaryFlow = ai.defineFlow(
  {
    name: 'weatherSummaryFlow',
    inputSchema: WeatherSummaryInputSchema,
    outputSchema: WeatherSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
