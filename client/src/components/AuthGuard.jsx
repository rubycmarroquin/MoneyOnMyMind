import { withAuthenticationRequired } from "@auth0/auth0-react";
export const AuthGuard = ({ component }) => {
  // creates a protected route for the given component
  const Component = withAuthenticationRequired(component);
  return <Component />;
};
