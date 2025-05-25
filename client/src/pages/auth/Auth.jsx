import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lights, setLights] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const initialLights = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      opacity: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2
    }));
    setLights(initialLights);

    const interval = setInterval(() => {
      setLights(prevLights => 
        prevLights.map(light => ({
          ...light,
          x: (light.x + light.speedX + 100) % 100,
          y: (light.y + light.speedY + 100) % 100,
          opacity: light.opacity + (Math.random() - 0.5) * 0.05,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Arkaplan Işık Efektleri */}
      {lights.map(light => (
        <div
          key={light.id}
          className="absolute rounded-full bg-blue-400 mix-blend-screen pointer-events-none"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            opacity: light.opacity,
            boxShadow: `0 0 15px 20px rgba(100, 200, 255, ${light.opacity * 0.7})`,
            transform: `scale(${1 + Math.sin(Date.now() / 1000 + light.id) * 0.5})`,
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}

      {/* Gradyan arkaplan */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>

      {/* Ana Container */}
      <div className="w-full max-w-md z-10">
        {/* Işık halkaları - Form etrafında */}
        <div className="absolute -inset-2 rounded-2xl bg-blue-500/10 blur-md animate-pulse"></div>
        <div className="absolute -inset-4 rounded-2xl bg-purple-500/10 blur-xl opacity-70"></div>
        
        {/* Form container with 3D effect */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s ease" : "none",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
          }}
        >
          {/* Kenar ışıkları */}
          <div className="absolute -top-px -left-px -right-px -bottom-px rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 pointer-events-none animate-light-border"></div>
          
          <div className="relative h-[32rem] overflow-hidden p-1">
            {/* Login Form */}
        <div 
  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] transform ${
    isLogin ? "translate-y-0 opacity-100 z-10" : "-translate-y-full opacity-0 z-0"
  }`}
>
  <div className="relative bg-gray-800/70 p-8 rounded-xl border border-gray-700/50 backdrop-blur-lg">
    {/* Işık efekti - Form kenarı */}
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm opacity-70 animate-pulse"></div>
    
    {/* Işık halkası */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl animate-float"></div>
    {/* login formu */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
          Hoş Geldiniz
        </h2>
        <p className="text-gray-400 mt-2 animate-fade-in">Hesabınıza giriş yapın</p>
      </div>

      <div className="space-y-5">
        {/* Email Input */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative flex items-center bg-gray-700/80 rounded-lg px-4 py-3 border border-gray-600/30 group-hover:border-blue-400/50 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input
              type="email"
              placeholder="Email Adresiniz"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative flex items-center bg-gray-700/80 rounded-lg px-4 py-3 border border-gray-600/30 group-hover:border-blue-400/50 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input
              type="password"
              placeholder="Şifreniz"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Şifremi Unuttum */}
        <div className="flex justify-end">
          <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Şifremi unuttum?
          </button>
        </div>

        {/* Giriş Butonu */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş Yapılıyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Giriş Yap
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>

      {/* Kayıt Ol Butonu */}
      <div className="text-center mt-2">
  <p className="text-gray-400">
    Hesabınız yok mu?{' '}
    <button 
      type="button" 
      onClick={() => setIsLogin(false)}
      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 inline-flex items-center"
    >
      <span className="hover:underline">Kayıt Ol</span>
      <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </button>
  </p>
</div>

    </form>
  </div>
</div>

            {/* Register Form */}
            <div
  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] transform ${
    !isLogin ? "translate-y-0 opacity-100 z-10" : "translate-y-full opacity-0 z-0"
  }`}
>
  <div className="relative bg-gray-800/70 p-8 rounded-xl border border-gray-700/50 backdrop-blur-lg">
    {/* Işık efekti - Form kenarı */}
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 blur-sm opacity-70 animate-pulse"></div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          Yeni Hesap Oluştur
        </h2>
        <p className="text-gray-400 mt-2 animate-fade-in">Hemen kayıt olun</p>
      </div>

      <div className="space-y-5">
        {/* Full Name Input */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative flex items-center bg-gray-700/80 rounded-lg px-4 py-3 border border-gray-600/30 group-hover:border-green-400/50 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              placeholder="Ad Soyad"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative flex items-center bg-gray-700/80 rounded-lg px-4 py-3 border border-gray-600/30 group-hover:border-green-400/50 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative flex items-center bg-gray-700/80 rounded-lg px-4 py-3 border border-gray-600/30 group-hover:border-green-400/50 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <input
              type="password"
              placeholder="Şifre"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Kayıt Butonu */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
           {loading ? (
  <>
    <svg 
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" cy="12" r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Kayıt Olunuyor...
  </>
) : (
  <>Kayıt Ol</>
)}

          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-green-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>

      {/* Girişe Dön Butonu */}
      <div className="text-center mt-6">
        <p className="text-gray-400">
          Hesabınız var mı?{' '}
          <button 
            type="button" 
            onClick={() => setIsLogin(true)}
            className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300 inline-flex items-center"
          >
            <span className="hover:underline">Giriş Yap</span>
            <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
        </p>
      </div>
    </form>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;