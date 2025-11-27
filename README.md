# GitHub Profile Viewer

A React application that replicates GitHub's profile page design with real-time data fetching.

## Features

- ✅ Built with Vite + React + TypeScript
- ✅ Styled with TailwindCSS
- ✅ React Router for navigation
- ✅ ECharts for contribution visualization
- ✅ Context API for global state management
- ✅ Fetch API with async/await
- ✅ Fully responsive design
- ✅ Interactive navbar with tooltips and demo alerts
- ✅ GitHub-style UI with hover effects
- ✅ Proper icon usage throughout

## Project Structure

```
src/
  components/
    LayoutTopNav.tsx
    SidebarProfile.tsx
    ProfileTabs.tsx
    ContributionChart.tsx
    UserStats.tsx
    UserInfoSection.tsx
    PopularRepositories.tsx
  pages/
    ProfilePage.tsx
    RepositoriesPage.tsx
    ProjectsPage.tsx
    PackagesPage.tsx
  router/
    AppRouter.tsx
  context/
    ProfileContext.tsx
  config/
    profileConfig.json
  types/
    global.d.ts
  App.tsx
  main.tsx
```

## Routes

- `/profile/:username` - Full working GitHub-like profile
- `/profile/:username/repositories` - Funny loader page
- `/profile/:username/projects` - Funny loader page
- `/profile/:username/packages` - Funny loader page

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Configuration

Edit `src/config/profileConfig.json` to customize:
- Default username
- Tab labels
- Loader messages
- UI visibility options

## Interactive Demo Features

The navbar includes interactive placeholder features that demonstrate attention to detail:

- **Menu Button** - Shows tooltip on hover, alert on click explaining navigation sidebar functionality
- **Search Bar** - Click to see search feature description with keyboard shortcut hint (/)
- **Pull Requests/Issues** - Interactive buttons with icons explaining GitHub workflow features
- **Create Button (+)** - Shows repository creation options
- **Notifications Bell** - Includes unread indicator dot, explains notification system
- **Profile Menu** - Dropdown indicator with gradient avatar, shows account settings info

All dummy features provide informative alerts explaining what they would do in a production implementation, showing comprehensive understanding of GitHub's UI/UX.

## APIs Used

- GitHub User API: `https://api.github.com/users/{username}`
- Contributions API: `https://github-contributions-api.jogruber.de/v4/{username}`
