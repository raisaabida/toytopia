import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="https://i.ibb.co/3mT1sKf/404.png" alt="404" className="mx-auto w-64 mb-6" />
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="mt-2 text-gray-500">Oops! We couldn't find that page.</p>
        <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
      </div>
    </main>
  );
}
