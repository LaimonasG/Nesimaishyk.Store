import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        primary: "#ed9987",
        secondary: "#d22cf7",        
        accent: "#e222a9",      
        neutral: "#22242f",      
        "base-100": "#ede7ee",        
        info: "#a9c7e5",        
        success: "#45e8b4",       
        warning: "#d5a507",     
        error: "#ef7684",
        body:{
          "background-color":"#cacccc"
        }
        },
      },
    ],
  },
} 
export default config
