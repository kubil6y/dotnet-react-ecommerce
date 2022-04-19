import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./public.routes";

export const Routes = () => {
  return (
    <Switch>
      {publicRoutes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={component}
          exact={Boolean(exact)}
        />
      ))}
    </Switch>
  );
};
