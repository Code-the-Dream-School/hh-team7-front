import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ResetPasswordUpdate.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const ResetPasswordUpdate = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("auth");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        `${apiBaseUrl}/users/password-reset/update?auth=${token}`,
        { password }
      );
      setSuccess(true);
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="reset-password-update">
      <div className="form-container">
        {success ? (
          <div className="success-message">
            <h2>Password Updated Successfully!</h2>
            <p>You can now log in with your new password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordUpdate;
