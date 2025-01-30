import { useAuth } from "../auth/useAuth.js";
//import MyModules from '../entities/modules/MyModules.js';
//import MyProjects from '../entities/projects/MyProjects.js';
import Subjects from "./Subject.js";

export default function MyDashboard() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <section>
      <h1>My Dashboard</h1>
      <Subjects loggedinUserID={loggedinUser.UserID} />
    </section>
  );
}
