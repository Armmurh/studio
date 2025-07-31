'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Wind, Droplets, Thermometer, Search, BrainCircuit, Sparkles, Shirt } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getWeatherForLocation, type ActionState } from '@/app/actions';
import { WeatherIcon } from './weather-icon';

const initialState: ActionState = {
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto font-bold tracking-wider shadow-lg hover:shadow-xl transition-shadow">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-5 w-5 animate-spin" />
          Searching...
        </>
      ) : (
        <>
          <Search className="mr-2 h-5 w-5" />
          Get Forecast
        </>
      )}
    </Button>
  );
}

function WeatherCardSkeleton() {
    return (
      <Card className="w-full animate-pulse mt-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/5 rounded-md" />
          <Skeleton className="h-6 w-2/5 rounded-md" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-12 w-24 rounded-md" />
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          <Separator />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
}

export function WeatherForecast() {
  const [state, formAction] = useActionState(getWeatherForLocation, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="w-full max-w-2xl mt-8">
      <Card className="shadow-lg rounded-xl">
        <CardContent className="p-6">
          <form action={formAction} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              name="location"
              placeholder="Enter a city or country..."
              required
              className="flex-grow text-lg p-6 shadow-inner"
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
        {pending && <WeatherCardSkeleton />}
        {!pending && state.data && (
            <Card className="w-full overflow-hidden shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader className="bg-primary/10 p-6">
                <CardTitle className="text-3xl font-bold text-foreground font-headline">
                  {state.data.weather.location}, {state.data.weather.country}
                </CardTitle>
                <p className="text-lg text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-7xl font-bold text-primary">{state.data.weather.temperature}°C</p>
                    <p className="text-xl font-medium text-muted-foreground capitalize">{state.data.weather.description}</p>
                  </div>
                  <WeatherIcon iconCode={state.data.weather.icon} className="w-28 h-28 text-accent drop-shadow-lg" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <Thermometer className="mx-auto h-8 w-8 text-primary"/>
                        <p className="text-lg font-semibold mt-2">{state.data.weather.temperature}°C</p>
                        <p className="text-sm text-muted-foreground">Temperature</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <Droplets className="mx-auto h-8 w-8 text-primary"/>
                        <p className="text-lg font-semibold mt-2">{state.data.weather.humidity}%</p>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <Wind className="mx-auto h-8 w-8 text-primary"/>
                        <p className="text-lg font-semibold mt-2">{state.data.weather.windSpeed} m/s</p>
                        <p className="text-sm text-muted-foreground">Wind Speed</p>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-headline"><BrainCircuit className="text-accent"/> AI Summary</h3>
                  <p className="text-base text-foreground/80 leading-relaxed">{state.data.ai.summary}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-headline"><Shirt className="text-accent"/> Outfit Suggestion</h3>
                  <p className="text-base text-foreground/80 leading-relaxed">{state.data.ai.outfitSuggestion}</p>
                </div>
              </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
