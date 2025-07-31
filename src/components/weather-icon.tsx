import { Sun, Cloud, CloudSun, CloudRain, CloudSnow, CloudLightning, Haze, Wind, CloudFog } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  iconCode: string;
}

export function WeatherIcon({ iconCode, ...props }: WeatherIconProps) {
  const getIcon = (code: string) => {
    switch (code) {
      case '01d': return <Sun {...props} />;
      case '01n': return <Sun {...props} />; // Representing clear night with sun icon for simplicity
      case '02d': return <CloudSun {...props} />;
      case '02n': return <CloudSun {...props} />;
      case '03d':
      case '03n':
      case '04d':
      case '04n': return <Cloud {...props} />;
      case '09d':
      case '09n': return <CloudRain {...props} />;
      case '10d':
      case '10n': return <CloudRain {...props} />;
      case '11d':
      case '11n': return <CloudLightning {...props} />;
      case '13d':
      case '13n': return <CloudSnow {...props} />;
      case '50d':
      case '50n': return <CloudFog {...props} />;
      default: return <Haze {...props} />;
    }
  };

  return getIcon(iconCode);
}
