import { WeatherForecast } from '@/components/weather-forecast';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Auwalu Iliyasu Tukur`s Weather Forecast
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg md:text-xl font-body">
          Built under the 3MTT program using OpenWeatherMap and Gemini AI.
        </p>
      </div>
      <WeatherForecast />
    </main>
  );
}
