# FitAI

A progressive web application that caters to the fitness needs of Kenyans by incorporating local cuisine in the food repository, while also catering to the ignorant majority by incorporating generative AI to answer questions on matters health and wellness.

The application integrates with the **USDA FoodData Central API** for comprehensive food nutrition data and uses a **ChatGPT-powered API endpoint** to provide intelligent health and wellness guidance through an interactive chatbot interface.

## 🎯 Features

- **Dashboard**: Track your daily calorie intake, calories burned, and view your progress
- **Food Logging**: Log meals with support for local Kenyan cuisine
- **Activity Tracking**: Monitor your physical activities and workouts
- **AI Chatbot**: Get answers to health and wellness questions using generative AI
- **Profile Management**: Manage your personal information and fitness goals
- **Questionnaire**: Set up your fitness profile with personalized questions
- **Notifications**: Stay updated with important fitness reminders
- **Weight Tracking**: Visualize your weight progress over time with charts

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: TanStack Query (React Query)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Analytics, Storage)
- **Icons**: Lucide React

## 🔌 API Integrations

### Food Database API
- **USDA FoodData Central API**: Used for searching and retrieving comprehensive nutrition information for foods
  - Endpoint: `https://api.nal.usda.gov/fdc/v1/foods/search`
  - Provides detailed nutritional data including calories, protein, fat, carbohydrates, and other nutrients
  - Supports portion-based calculations for accurate calorie tracking
  - API Key required (configure in `public/searchFood.js`)

### AI Chatbot Integration
- **ChatGPT API**: Integrated via a custom fitness-focused API endpoint
  - Endpoint: `https://lance-flow.vercel.app/fitness`
  - Provides intelligent responses to health, nutrition, and fitness-related questions
  - Uses POST requests with user messages to generate contextual fitness advice
  - Helps users understand nutrition, workouts, and wellness goals

## 📁 Project Structure

```
254Fit/
├── public/                 # Static assets and legacy HTML files
│   ├── firebase-config.js  # Firebase configuration
│   ├── auth.js            # Authentication utilities
│   └── *.html             # Legacy HTML pages
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── BottomNavigation.tsx
│   │   ├── CalorieRing.tsx
│   │   └── WeightChart.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Activity.tsx
│   │   ├── Chatbot.tsx
│   │   ├── LogFood.tsx
│   │   ├── Profile.tsx
│   │   ├── Questionnaire.tsx
│   │   ├── SignUp.tsx
│   │   └── Notifications.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd khy/254Fit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure Firebase:
   - Update `public/firebase-config.js` with your Firebase project credentials
   - Ensure Firebase Authentication, Analytics, and Storage are enabled in your Firebase console

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (if configured)

## 🎨 Routes

- `/` - Sign Up page
- `/questionnaire` - Initial fitness questionnaire
- `/dashboard` - Main dashboard with calorie tracking
- `/log-food` - Food logging interface
- `/activity` - Activity tracking
- `/chatbot` - AI health and wellness chatbot
- `/profile` - User profile management
- `/notifications` - Notifications center
- `*` - 404 Not Found page

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Enable Analytics
4. Enable Storage (if needed)
5. Copy your Firebase config to `public/firebase-config.js`

### API Keys Configuration

#### USDA FoodData Central API
1. Get your API key from [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide.html)
2. Update the API key in `public/searchFood.js`:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

#### ChatGPT API Endpoint
- The chatbot uses a pre-configured endpoint at `https://lance-flow.vercel.app/fitness`
- If you need to use a different endpoint, update the `API_URL` in:
  - `public/chatbot.html` (for legacy HTML version)
  - `src/pages/Chatbot.tsx` (for React version - currently uses mock data)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Firebase for backend services
- USDA FoodData Central API for comprehensive nutrition data
- OpenAI/ChatGPT for AI-powered health and wellness guidance
- The Kenyan fitness community for inspiration
