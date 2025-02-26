import { useAuth } from "../auth/useAuth.js";

function Account() {
  const { loggedinUser } = useAuth();

  return (
    <section>
      <h1>Account Details</h1>
      {loggedinUser ? (
        <div className="account-details">
          <p>
            <strong>Username:</strong> {loggedinUser.UserUsername}
          </p>
          <p>
            <strong>Email:</strong> {loggedinUser.UserEmail}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {loggedinUser.UserRoleID === 1 ? "Teacher" : "Student"}
          </p>
        </div>
      ) : (
        <p>No user is logged in.</p>
      )}
    </section>
  );
}

export default Account;
