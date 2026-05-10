/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16A34A",
        "primary-dark": "#14532D",
        "primary-light": "#DCFCE7",
        canvas: "#F8FAFC",
        ink: "#1F2937",
        danger: "#DC2626",
        warning: "#FACC15",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      boxShadow: {
        card: "0 24px 60px rgba(20, 83, 45, 0.12)",
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(22, 163, 74, 0.22), transparent 40%), radial-gradient(circle at bottom right, rgba(220, 252, 231, 0.95), transparent 42%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.95 },
          "50%": { opacity: 0.65 },
        },
      },
    },
  },
  plugins: [],
};
