import { Helmet } from "react-helmet-async";

export default function ExtraProtected() {
  const requests = JSON.parse(sessionStorage.getItem("tryRequests") || "[]");
  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>My Try Requests | ToyTopia</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Try Requests</h2>
      {requests.length === 0 ? (
        <div className="text-gray-500">You haven't tried any toy yet.</div>
      ) : (
        <ul className="space-y-3">
          {requests.map((r, i) => (
            <li key={i} className="bg-white p-4 rounded-md card-shadow">
              <div className="flex items-center justify-between">
                <div>{r.toyName}</div>
                <div className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
