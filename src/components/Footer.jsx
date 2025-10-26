export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-t from-indigo-100 to-white py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <a className="link">Terms</a>
          <a className="link">Privacy</a>
          <a className="link">Contact</a>
        </div>
        <div>
          Follow us on <a className="font-semibold">Twitter</a> • <a className="font-semibold">Instagram</a>
        </div>
        <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ToyTopia — All rights reserved</div>
      </div>
    </footer>
  );
}
