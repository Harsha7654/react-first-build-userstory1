import { useAuth } from "../auth/useAuth.js";
import Subjects from "./Subject.js";
import ViewOnlySubjects from "./ViewOnlySubjects.js";

export default function MyDashboard() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  // View ----------------------------------------
  return (
    <section>
      {loggedinUser?.UserRoleID === 2 ? (
        <ViewOnlySubjects loggedinUserID={loggedinUser.UserID} />
      ) : (
        <Subjects loggedinUserID={loggedinUser.UserID} />
      )}
    </section>
  );
}
