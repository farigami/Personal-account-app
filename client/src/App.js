import { useEffect, useContext, useState } from "react";
import { checkHandler } from "./http/userAPI";
import Header from "./components/header/header";
import { Route, Routes } from "react-router";
import { publicRoutes, authRoutes, semipublicRoutes, adminRoutes } from "./routes/routes";
import { Footer } from "./components/footer/footer";
import { Context } from './index';
import { observer } from 'mobx-react-lite';

import './app.scss'
import { NotFound } from "./components/notfound/notfounds";
import Spinner from "react-bootstrap/esm/Spinner";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    checkHandler().then(data => {
      if (data !== 401) {
        user.setUser(data)
        user.SetIsAuth(true)
      }
      setLoading(false)
    })
  }, [user])
  if (loading) return <Spinner className="m-4" animation="border" variant="success"></Spinner>
  return (
    <div className="App">
      <Header />
      <Routes>
        {publicRoutes.map(({ path, Component, children }) =>
          <Route path={path} key={path} element={<Component />} >
            {children && children.map(({ path, Component }) =>
              <Route path={path} key={path} element={<Component />} />
            )}
          </Route>
        )}
        {!user.getIsAuth() &&
          semipublicRoutes.map(({ path, Component, children }) =>
            <Route path={path} key={path} element={<Component />} >
              {children && children.map(({ path, Component }) =>
                <Route path={path} key={path} element={<Component />} />
              )}
            </Route>)
        }
        {user.getIsAuth() &&
          authRoutes.map(({ path, Component, children }) =>
            <Route path={path} key={path} element={<Component />} >
              {children && children.map(({ path, Component }) =>
                <Route path={path} key={path} element={<Component />} />
              )}
            </Route>)
        }
        {user.getIsAuth() &&
          adminRoutes.map(({ path, Component, children }) =>
            <Route path={path} key={path} element={<Component />} >
              {children && children.map(({ path, Component }) =>
                <Route path={path} key={path} element={<Component />} />
              )}
            </Route>)
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
})

export default App;
