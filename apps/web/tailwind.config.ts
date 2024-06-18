import sharedConfig from '@repo/config-tailwind'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
}

export default config
