/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "window-background": "#C0C0C0",
        "window-header": "#000080"
      },
      boxShadow: {
        window: "inset -1px -1px 0 0 rgba(0, 0, 0, 1), inset 1px 1px 0 0 #FFFFFF, inset -2px -2px 0 0 #7F7F7F, inset 2px 2px 0 0 #DFDFDF, 1px 1px 1px 0 rgba(0,0,0,0.2)",
        "window-reverse": "inset -1px -1px 0 0 #FFFFFF, inset 1px 1px 0 0 #808080, inset -2px -2px 0 0 #C1C1C1, inset 2px 2px 0 0 #000000",
        "window-reverse-back": "inset -1px -1px 0 0 #FFFFFF, inset 1px 1px 0 0 #808080, inset -2px -2px 0 0 #C1C1C1, inset 2px 2px 0 0 #000000, 1px 1px 1px 0 rgba(0,0,0,0.2)",
      },
      fontFamily: {
        Windows95: ["w95"]
      }
    },
  },
  plugins: [],
}