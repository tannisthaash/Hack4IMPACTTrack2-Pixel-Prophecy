import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { RoleLayout } from "./layouts/RoleLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RoleSelection } from "./pages/RoleSelection";
import { RestaurantDashboard } from "./pages/RestaurantDashboard";
import { NGODashboard } from "./pages/NGODashboard";
import { VolunteerDashboard } from "./pages/VolunteerDashboard";
import { ImpactDashboard } from "./pages/ImpactDashboard";
import { Profile } from "./pages/Profile";
import { Contact } from "./pages/Contact";
import { HowItWorks as HowItWorksPage } from "./pages/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "role-selection",
        Component: RoleSelection,
      },
      {
        path: "impact",
        Component: ImpactDashboard,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "how-it-works",
        Component: HowItWorksPage,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "restaurant",
        Component: RoleLayout,
        children: [
          { path: "dashboard", Component: RestaurantDashboard },
          { path: "map", Component: RestaurantDashboard },
          { path: "profile", Component: Profile },
        ]
      },
      {
        path: "ngo",
        Component: RoleLayout,
        children: [
          { path: "dashboard", Component: NGODashboard },
          { path: "map", Component: NGODashboard },
          { path: "profile", Component: Profile },
        ]
      },
      {
        path: "volunteer",
        Component: RoleLayout,
        children: [
          { path: "dashboard", Component: VolunteerDashboard },
          { path: "map", Component: VolunteerDashboard },
          { path: "profile", Component: Profile },
        ]
      },
    ],
  },
]);