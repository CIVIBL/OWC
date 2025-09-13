import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta_text: string;
  };
  about: {
    name: string;
    title: string;
    description: string;
    extended_description: string;
    discord: string;
  };
  services: {
    title: string;
    beginner_title: string;
    beginner_subtitle: string;
    competitive_title: string;
    competitive_subtitle: string;
    additional_info: string;
  };
  approach: {
    title: string;
    intro: string;
  };
  contact: {
    title: string;
    subtitle: string;
    discord: string;
    form_title: string;
  };
}

interface ContentContextType {
  content: ContentData | null;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => void;
}

const defaultContent: ContentData = {
  hero: {
    title: 'Master the <span class="text-amber-500">Old World</span> with Expert Coaching',
    subtitle: 'Transform your gameplay from novice to champion with personalized coaching from a master judge and competitive veteran',
    cta_text: 'Book Coaching Session'
  },
  about: {
    name: 'Shayne Hall',
    title: 'About Your <span class="text-amber-500">Coach</span>',
    description: 'With years of experience as both a competitive player and official judge at major Canadian Warhammer events, I bring a unique dual perspective to coaching that sets me apart from other instructors.',
    extended_description: 'My deep understanding of the rules comes from countless hours adjudicating complex interactions at tournament level, while my competitive experience ensures I understand what it takes to succeed under pressure.',
    discord: 'auce'
  },
  services: {
    title: 'Coaching <span class="text-amber-500">Services</span>',
    beginner_title: 'New to the Old World?',
    beginner_subtitle: 'Build a strong foundation for lasting success',
    competitive_title: 'Ready to Compete?',
    competitive_subtitle: 'Elevate your game to tournament level',
    additional_info: 'Additional services include mental game preparation, multi-round event strategies, and avoiding common mistakes that cost games.'
  },
  approach: {
    title: 'Coaching <span class="text-amber-500">Approach</span>',
    intro: 'My coaching philosophy combines technical expertise with personalized mentorship, ensuring you not only improve your gameplay but understand the fundamental concepts that drive long-term success.'
  },
  contact: {
    title: 'Get <span class="text-amber-500">Started</span>',
    subtitle: 'Ready to elevate your game? Let\'s discuss your goals and create a personalized coaching plan.',
    discord: 'auce',
    form_title: 'Send Me a Message'
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ContentData | null>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to fetch from the PHP API first
      const response = await fetch('./content-api.php?' + Date.now(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Check if we got valid content data
        if (data && typeof data === 'object' && !data.error) {
          setContent(data);
          console.log('Content loaded from API:', data);
        } else {
          setContent(defaultContent);
        }
      } else {
        // If API request fails, use default content
        console.warn('Failed to fetch from API (status:', response.status, '), using default content');
        setContent(defaultContent);
      }
      
    } catch (err) {
      console.error('Error fetching content:', err);
      // On any error, fall back to default content
      setContent(defaultContent);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const refreshContent = () => {
    fetchContent();
  };

  return (
    <ContentContext.Provider value={{ content, isLoading, error, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};