import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const save = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <Helmet>
        <title>My Profile | ToyTopia</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg card-shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <img src={user?.photoURL || "https://i.ibb.co/7bQQYkP/default-avatar.png"} className="w-16 h-16 rounded-full" />
          <div>
            <div className="font-semibold">{user?.displayName || "No name"}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>

        <form onSubmit={save} className="space-y-3">
          <input className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input className="input input-bordered w-full" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL" />
          <button className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </main>
  );
}
