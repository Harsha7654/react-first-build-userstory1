import { useAuth } from "../auth/useAuth.js";
//import MyModules from '../entities/modules/MyModules.js';
//import MyProjects from '../entities/projects/MyProjects.js';
import Subjects from "./Subject.js";
import ViewOnlySubjects from "./ViewOnlySubjects.js";

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
      {loggedinUser?.UserID >= 11 && loggedinUser?.UserID <= 20 ? (
        <ViewOnlySubjects loggedinUserID={loggedinUser.UserID} />
      ) : (
        <Subjects loggedinUserID={loggedinUser.UserID} />
      )}
    </section>
  );
}
