import React from 'react'
import StartPage from './components/StartPage';

function App() {
  // if (localStorage.getItem("token")) return (
  //   <div>
  //     <StartPage token={true} comp={"newsfeed"}></StartPage>
  //   </div>
  // );
  // else return (
  //   <div>
  //     <StartPage token={false} comp={"login"}></StartPage>
  //   </div>
  // );
  return (
      <div>
        <StartPage></StartPage>
      </div>
    );
}

export default App;
