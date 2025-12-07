export interface LinkItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
  isNew?: boolean;
}

export interface WidgetCategory {
  id: string;
  title: string;
  icon: string; // Emoji or icon class
  color: 'pink' | 'cyan' | 'lime' | 'purple';
  links: LinkItem[];
}

export interface GeminiResponse {
  answer: string;
  suggestedTools: string[];
}
