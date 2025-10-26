import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      nav(from, { replace: true });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <Helmet>
        <title>Login | ToyTopia</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg card-shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="flex justify-between items-center">
            <button className="btn btn-primary" disabled={loading}>
              Login
            </button>
            <Link to="/forgot-password" className="text-sm link">
              Forgot password?
            </Link>
          </div>
        </form>
        <div className="divider">OR</div>
        <button onClick={googleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>
        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="link">Register</Link>
        </p>
      </div>
    </main>
  );
}
