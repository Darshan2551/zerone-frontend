import { EventCategory, EventDetails, TimelineItem, Coordinator } from './types';

export const EVENTS: EventDetails[] = [
  {
    id: 'vedix',
    title: 'VEDIX',
    subtitle: 'The Battle of Code',
    category: EventCategory.CODING,
    description: 'A solo coding event to test your algorithmic prowess. Languages: C, C++, Java, Python.',
    prizePool: '₹4000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    rules: [
      'Valid College ID mandatory.',
      'Max 3 participants per college.',
      'Report 30 mins before event.',
      'No personal gadgets allowed.',
      'Malpractice leads to disqualification.'
    ],
    coordinators: [
      { name: 'Darshan S Naik', phone: '9535598827' },
      { name: 'Bindushree T R', phone: '8050020429' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'garuda',
    title: 'GARUDA ANVESHANA',
    subtitle: 'Treasure Hunt',
    category: EventCategory.TREASURE_HUNT,
    description: 'Decipher clues and navigate the empire to find the hidden treasure.',
    prizePool: '₹7000',
    registrationFee: '₹400 / Team',
    teamSize: '4 Members',
    rules: [
      'Max 2 teams per college.',
      'No property damage.',
      'No external help allowed.',
      'Stay within campus limits.'
    ],
    coordinators: [
      { name: 'Nithya Tejavi', phone: '7899422270' },
      { name: 'Shashiraj', phone: '9353042284' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'web-kala',
    title: 'WEB KALA VINYASA',
    subtitle: 'Web & Poster Designing',
    category: EventCategory.DESIGN,
    description: 'Showcase your creativity in UI/UX and visual design. Tools: Photoshop, Canva, Figma, HTML/CSS.',
    prizePool: '₹5000',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    rules: [
      'Max 2 teams per college.',
      'Bring own laptop & internet.',
      'No external templates/code allowed.',
      'Software must be pre-installed.'
    ],
    coordinators: [
      { name: 'Nuthan A M', phone: '9845541168' },
      { name: 'Harshitha S', phone: '6363323303' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'drishti',
    title: 'DRISHTI',
    subtitle: 'The Royal Lens',
    category: EventCategory.PHOTOGRAPHY,
    description: 'Capture the essence of the fest. An on-spot photography and videography challenge.',
    prizePool: '₹3000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    rules: [
      'Original content only.',
      'Editing allowed within venue.',
      'Bring own equipment.',
      'No copyright violations.'
    ],
    coordinators: [
      { name: 'Pooja R', phone: '8296077558' },
      { name: 'Akash Y', phone: '6363614954' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'raja-neeti',
    title: 'RAJA NEETI SABHA',
    subtitle: 'IT Manager',
    category: EventCategory.MANAGEMENT,
    description: 'Test your leadership, crisis management, and decision-making skills.',
    prizePool: '₹3000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    rules: [
      'Professional attire recommended.',
      'Judges decision is final.',
      'Smartphone usage restricted.',
      'Problem solving & decision making.'
    ],
    coordinators: [
      { name: 'Madhumitha S', phone: '9482139571' },
      { name: 'Jeevan G', phone: '9686585450' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'prajna',
    title: 'PRAJNA PARIKSHA',
    subtitle: 'The Test of Wisdom (IT Quiz)',
    category: EventCategory.QUIZ,
    description: 'A battle of wits covering tech, coding, and general IT knowledge.',
    prizePool: '₹4500',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    rules: [
      'Fixed time limits.',
      'Programming & Networking questions.',
      'Bring own mobile devices.',
      'No malpractice.'
    ],
    coordinators: [
      { name: 'Likitha P Kumar', phone: '8660290349' },
      { name: 'Rahul H N', phone: '9632607249' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'chakravyuha',
    title: 'CHAKRAVYUHA WARZONE',
    subtitle: 'BGMI',
    category: EventCategory.GAMING,
    description: 'Survive the battleground. Squad up and dominate the warzone.',
    prizePool: '₹7000',
    registrationFee: '₹500 / Team',
    teamSize: '4 Members',
    rules: [
      'Bring own mobile devices.',
      'No emulators/triggers.',
      'Custom room provided.',
      'Exploits lead to ban.'
    ],
    coordinators: [
      { name: 'Achyuth U S', phone: '9148686067' },
      { name: 'Bindusree K S', phone: '8904464903' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'dhwani',
    title: 'DHWANI YUDDHA',
    subtitle: 'Tech Talk',
    category: EventCategory.SPEAKING,
    description: 'Articulate your ideas. A platform to speak on emerging technologies.',
    prizePool: '₹3000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    rules: [
      '4 Rounds total.',
      '5 mins prep time.',
      'No paper material allowed.',
      'Judged on creativity & clarity.'
    ],
    coordinators: [
      { name: 'Madhumitha S', phone: '9482139571' },
      { name: 'Jeevan G', phone: '9686585450' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1475721027767-4d529c181569?q=80&w=1000&auto=format&fit=crop'
  }
];

export const TIMELINE: TimelineItem[] = [
  { time: '08:00 AM - 09:00 AM', title: 'The Royal Inaugural', description: 'Opening of the Gates' },
  { time: '09:15 AM - 01:00 PM', title: 'The Battles Begin', description: 'Round 1 of all events' },
  { time: '01:00 PM - 02:00 PM', title: 'Grand Feast', description: 'Lunch Break' },
  { time: '02:00 PM - 04:00 PM', title: 'The Final Showdown', description: 'Final Rounds' },
  { time: '04:30 PM - 05:30 PM', title: 'Victory Ceremony', description: 'Valedictory & Prize Distribution' },
];

export const FACULTY_COORDINATORS: Coordinator[] = [
  { name: 'Dr. H S VijayaKumar', phone: '' },
  { name: 'Dr. Prashanth G K', phone: '' }
];

export const STUDENT_COORDINATORS: Coordinator[] = [
  { name: 'Khushi Jagadeesh', phone: '9019854409' },
  { name: 'Lingadevaru H P', phone: '9019746824' }
];