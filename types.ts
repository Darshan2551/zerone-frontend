export enum EventCategory {
  CODING = 'Coding',
  DESIGN = 'Design',
  PHOTOGRAPHY = 'Photography',
  TREASURE_HUNT = 'Treasure Hunt',
  MANAGEMENT = 'Management',
  QUIZ = 'Quiz',
  GAMING = 'Gaming',
  SPEAKING = 'Speaking',
}

export interface Coordinator {
  name: string;
  phone: string;
  image?: string; // Optional custom image
}

export interface EventDetails {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  description: string;
  prizePool: string;
  registrationFee: string;
  teamSize: string; 
  rules: string[];
  coordinators: Coordinator[];
  imageUrl: string; 
}

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}