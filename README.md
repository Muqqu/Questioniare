# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
# Career Path Questionnaire

## Overview

The Career Path Questionnaire is a multilingual, interactive web application designed to help users discover suitable career paths based on their skills, preferences, and experiences. Built with React and leveraging modern web technologies, this application provides personalized career recommendations through a series of targeted questions.

## Features

- **Multilingual Support**: Available in English, Estonian, and Russian.
- **Interactive Questionnaire**: User-friendly interface with single-choice and comparison questions.
- **Personalized Recommendations**: Provides top 3 career path recommendations based on user responses.
- **Responsive Design**: Fully functional on both desktop and mobile devices.
- **Google Analytics Integration**: Tracks user interactions and completion events.

## Tech Stack

- React
- Tailwind CSS
- react-ga (for Google Analytics)

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/career-path-questionnaire.git
   cd career-path-questionnaire
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Analytics tracking ID:
   ```
   REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X
   ```

4. Start the development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Project Structure

```
career-path-questionnaire/
├── public/
├── src/
│   ├── components/
│   │   └── Questionnaire.js
│   ├── Data/
│   │   ├── MultilingualCareerQuestionnaire.json
│   │   └── CareerPaths.json
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Configuration

The questionnaire content and scoring rules are configured in two JSON files:

- `src/Data/MultilingualCareerQuestionnaire.json`: Contains the questions and options in multiple languages.
- `src/Data/CareerPaths.json`: Contains the career paths, fields, and scoring rules.

Modify these files to customize the questionnaire content and scoring logic.

## Deployment

To build the project for production, run:

```
npm run build
```

This will create a `build` directory with optimized production-ready files.

## Contributing

We welcome contributions to the Career Path Questionnaire! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project.
- Special thanks to [Anthropic](Muhammad Muqaddam) for their AI assistance in developing this application.

## Contact

For any questions or concerns, please open an issue on this repository or contact the maintainer at [muhammadmuqaddamshaikh@gmail.com](mailto:muhammadmuqaddamshaikh@gmail.com).
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#   Q u e s t i o n i a r e 
 
 #   Q u e s t i o n i a r e 
 
 #   Q u e s t i o n i a r e 
 
 #   Q u e s t i o n i a r e 
 
 