import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  const validate = (pw) => /(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(pw);

  const submit = async (e) => {
    e.preventDefault();
    if (!validate(password)) return toast.error("Password must have uppercase, lowercase and at least 6 chars");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL });
      toast.success("Registered");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      nav("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <Helmet>
        <title>Register | ToyTopia</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg card-shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="input input-bordered w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input input-bordered w-full" placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
          <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <input type={showPass ? "text" : "password"} className="input input-bordered w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-2 top-2 text-sm">👁️</button>
          </div>
          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>
        <button onClick={googleLogin} className="btn btn-outline w-full">Continue with Google</button>
        <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
    </main>
  );
}
