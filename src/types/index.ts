export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ExperienceItemProps {
  year: string;
  description: string;
  isDarkMode?: boolean;
  index?: number;
  total?: number;
  capability?: number;
}

export interface AwardItemProps {
  year: string;
  description: string;
}
