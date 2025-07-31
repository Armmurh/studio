'use server';

/**
 * @fileOverview Provides an outfit recommendation based on the weather forecast.
 *   - getOutfitRecommendation - A function that takes weather information and returns an outfit suggestion.
 *   - OutfitRecommendationInput - The input type for the getOutfitRecommendation function.
 *   - OutfitRecommendationOutput - The return type for the getOutfitRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutfitRecommendationInputSchema = z.object({
  temperatureCelsius: z
    .number()
    .describe('The temperature in Celsius.'),
  humidityPercentage: z
    .number()
    .describe('The humidity as a percentage (0-100).'),
  windSpeedMs: z
    .number()
    .describe('The wind speed in meters per second.'),
  weatherDescription: z
    .string()
    .describe('A brief description of the weather conditions (e.g., sunny, rainy, cloudy).'),
});
export type OutfitRecommendationInput = z.infer<typeof OutfitRecommendationInputSchema>;

const OutfitRecommendationOutputSchema = z.object({
  outfitSuggestion: z
    .string()
    .describe('A suggestion for an appropriate outfit.'),
});
export type OutfitRecommendationOutput = z.infer<typeof OutfitRecommendationOutputSchema>;

export async function getOutfitRecommendation(
  input: OutfitRecommendationInput
): Promise<OutfitRecommendationOutput> {
  return outfitRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'outfitRecommendationPrompt',
  input: {schema: OutfitRecommendationInputSchema},
  output: {schema: OutfitRecommendationOutputSchema},
  prompt: `You are a personal stylist, providing outfit recommendations based on the weather.

  Weather conditions:
  - Temperature: {{temperatureCelsius}}°C
  - Humidity: {{humidityPercentage}}%
  - Wind speed: {{windSpeedMs}} m/s
  - Description: {{weatherDescription}}

  Based on these conditions, what outfit would you recommend? Be specific about the type of clothing.`,
});

const outfitRecommendationFlow = ai.defineFlow(
  {
    name: 'outfitRecommendationFlow',
    inputSchema: OutfitRecommendationInputSchema,
    outputSchema: OutfitRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
