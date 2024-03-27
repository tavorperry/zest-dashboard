import styled from 'styled-components';
import MainDashboard from "./components/MainDashboard.jsx";

const AppWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
`;

function App() {
    return (
    <AppWrapper>
      <div>
          <h1>Zest Dashboard</h1>
      </div>
      <p>
        The only dashboard you will ever need!
      </p>
        <MainDashboard />
    </AppWrapper>
  )
}

export default App
