import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    server: {
        host: process.env.VITE_HOST || '127.0.0.1',
        port: 5173,
        strictPort: true,
        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost',
            port: 5173,
        },
        middlewareMode: false,
        cors: true,
    },
    plugins: [  
        tailwindcss(),
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
});
