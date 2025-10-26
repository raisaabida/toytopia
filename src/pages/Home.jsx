import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { fetchToys } from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";

// ✅ FIXED: Import modules from swiper/modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Swiper styles (make sure these exist)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [toys, setToys] = useState([]);
  useEffect(() => {
    fetchToys().then(setToys).catch(() => toast.error("Failed to load toys"));
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Home | ToyTopia</title>
      </Helmet>

      {/* Slider Section */}
      <section className="mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination
          autoplay={{ delay: 3500 }}
          loop
        >
          <SwiperSlide>
            <div className="rounded-lg p-8 flex items-center gap-6 bg-gradient-to-r from-pink-100 to-yellow-100">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="Building Sets"
                className="w-48 rounded-lg shadow"
              />
              <div>
                <h2 className="text-3xl font-bold">Playful Building Sets</h2>
                <p className="mt-2">Bright bricks to spark creativity.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="rounded-lg p-8 flex items-center gap-6 bg-gradient-to-r from-indigo-100 to-cyan-100">
              <img
                src="https://images.unsplash.com/photo-1687708522434-6197bb47c933?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="Soft Toys"
                className="w-48 rounded-lg shadow"
              />
              <div>
                <h2 className="text-3xl font-bold">Soft Toys & Cuddles</h2>
                <p className="mt-2">Safe and huggable friends.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="rounded-lg p-8 flex items-center gap-6 bg-gradient-to-r from-green-100 to-blue-100">
              <img
                src="https://plus.unsplash.com/premium_photo-1723507389644-a69471da76d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="Puzzles"
                className="w-48 rounded-lg shadow"
              />
              <div>
                <h2 className="text-3xl font-bold">Creative Puzzles</h2>
                <p className="mt-2">Brain-building challenges.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Popular Toys Section */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Popular Toys</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {toys.slice(0, 6).map((t) => (
            <div key={t.toyId} className="bg-white rounded-lg p-4 card-shadow">
              <img
                src={t.pictureURL}
                alt={t.toyName}
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-3">
                <h4 className="font-semibold">{t.toyName}</h4>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm">
                    ⭐ {t.rating} • {t.availableQuantity} left
                  </div>
                  <div className="font-bold">${t.price}</div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link
                    to={`/toy/${t.toyId}`}
                    className="btn btn-sm btn-outline"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why ToyTopia Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Why ToyTopia?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-pink-50 to-yellow-50 rounded-lg">
            <h4 className="font-bold">Local Sellers</h4>
            <p className="mt-2 text-sm">
              Support small stores and discover hidden gems.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
            <h4 className="font-bold">Safe Choices</h4>
            <p className="mt-2 text-sm">
              Carefully curated toys and clear descriptions.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-lime-50 to-green-50 rounded-lg">
            <h4 className="font-bold">Playful UI</h4>
            <p className="mt-2 text-sm">
              Colorful design that kids and parents love.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}