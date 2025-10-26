import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const loc = useLocation();
  useState(() => {
    if (loc.state?.email) setEmail(loc.state.email);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent — redirecting to Gmail");
      window.open("https://mail.google.com", "_blank");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <Helmet>
        <title>Reset Password | ToyTopia</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg card-shadow">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn btn-primary w-full">Send Reset Email</button>
        </form>
      </div>
    </main>
  );
}
