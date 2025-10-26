import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchToyById } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function ToyDetails() {
  const { id } = useParams();
  const [toy, setToy] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchToyById(id).then(setToy).catch(() => toast.error("Toy not found"));
  }, [id]);

  if (!toy) return <div className="p-8 text-center">Loading...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet><title>{toy.toyName} | ToyTopia</title></Helmet>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <img src={toy.pictureURL} className="w-full h-64 object-cover rounded shadow" />
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">{toy.toyName}</h2>
          <p className="mt-3">{toy.description}</p>

          <div className="mt-4 flex gap-6 font-semibold">
            <span>${toy.price}</span>
            <span>⭐ {toy.rating}</span>
            <span>{toy.availableQuantity} left</span>
          </div>
        </div>
      </div>
    </main>
  );
}
