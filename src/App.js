import { RouterProvider } from 'react-router-dom';
import router from './router';
import "../src/Style.scss";
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [chooseFriend, setChooseFriend] = useState()

  return (
    <>
      <UserContext.Provider value={{ chooseFriend, setChooseFriend }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
