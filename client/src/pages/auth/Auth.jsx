import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? "https://localhost:7172/api/auth/login"
        : "https://localhost:7172/api/auth/register";

      const body = isLogin
        ? { email, password }
        : { fullName, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Bir hata oluştu");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("Token alınamadı");
      }

      toast.success(isLogin ? "Giriş başarılı!" : "Kayıt başarılı!");

      if (isLogin) {
        // Giriş yaptıktan sonra anasayfaya yönlendir
        navigate("/");
      } else {
        // Kayıt başarılıysa login ekranına yönlendir (giriş ekranı)
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setFullName("");
      }
    } catch (error) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        <div className="relative h-72">
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              isLogin ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Şifre"
                className="border rounded px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Yükleniyor..." : "Giriş Yap"}
              </button>
              <p className="text-center mt-2">
                Üye değil misiniz?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 underline"
                >
                  Kayıt Ol
                </button>
              </p>
            </form>
          </div>

          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              !isLogin ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Register Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>
              <input
                type="text"
                placeholder="Ad Soyad"
                className="border rounded px-3 py-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Şifre"
                className="border rounded px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Yükleniyor..." : "Kayıt Ol"}
              </button>
              <p className="text-center mt-2">
                Zaten üye misiniz?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-green-600 underline"
                >
                  Giriş Yap
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
