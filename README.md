# Zest Repository Dashboard

This React application provides an interactive dashboard for GitHub users to explore repositories, with features to login, view detailed repository metrics, and add repositories to a list of favorites.

## Features

- **User Login**: Users can log in by providing a username. This feature is implemented for demonstration purposes without authentication.
- **Repository Search**: Users can search for GitHub repositories. The application fetches repository data, including stars, owner information, and more.
- **Favorites**: Users can add repositories to their favorites for quick access. This feature requires the user to be logged in.
- **Detailed Repository Information**: Clicking on a repository name opens a modal with detailed metrics about the repository, such as stars, forks, watchers, and more.
- **Visualization**: The detailed information modal includes a bar chart visualizing various metrics of the repository.
- **Favorites Filter**: Users can toggle a view that filters the displayed repositories to only show those marked as favorites.

## Technologies Used

- React.js for the frontend user interface.
- Ant Design (`antd`) for UI components like Buttons, Cards, Modals, and Tables.
- Axios for HTTP requests to fetch repository data and manage favorites.
- Recharts for rendering the bar chart in the repository details modal.

## Setup and Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. To start the application, run `npm run dev`. This will run the app in development mode.
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
5. Clone and start the BE MSs as well here - [BE Micro-Services repo](https://github.com/tavorperry/backend-micro-services)

## Usage

- Open the app to see the Top Rated Repositories in GitHub (10K> stars).
- Click on any repository name in the table to view detailed metrics and an option to add the repository to your favorites.
- You can enter a username and log in to access the favorites feature.
- The login button will also sign you up if you are a new user.
- You can log out at any time using the logout button.

## API References

- **Create New User**: `POST` request to `CREATE_NEW_USER_POST_API` to simulate user login.
- **Search Repositories**: `GET` request to `SEARCH_REPOS_GET_API` to fetch repositories.
- **Add to Favorites**: `POST` request to `ADD_TO_FAV_POST_API` to add a repository to the user's favorites.

## Summary

It was a fun project to work on. I hope you enjoy it as much as I did.

I implemented the mandatory features and some nice to have features.

I am looking forward to hearing from you soon and available for any questions or feedback.

Thank you for the opportunity.

Tavor
