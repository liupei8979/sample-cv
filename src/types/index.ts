export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ExperienceItemProps {
  year: string;
  description: string;
  isDarkMode?: boolean;
}

export interface AwardItemProps {
  year: string;
  description: string;
}
