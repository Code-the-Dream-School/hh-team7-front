import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ResetPasswordVerify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("auth");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.post(`http://localhost:8000/api/v1/users/password-reset/verify?auth=${token}`);
        navigate(`/reset-password/update?auth=${token}`);
      } catch (err) {
        setError("Invalid or expired token. Please request a new password reset.");
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError("No reset token provided.");
    }
  }, [token, navigate]);

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>Verifying your token...</p>}
    </div>
  );
};

export default ResetPasswordVerify;
