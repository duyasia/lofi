module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
                'slide-in-from-right': 'slide-in-from-right 0.4s ease-out',
            },
            keyframes: {
                'fade-in': {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                'slide-in-from-top': {
                    'from': { transform: 'translateY(-8px)', opacity: '0' },
                    'to': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-from-right': {
                    'from': { transform: 'translateX(16px)', opacity: '0' },
                    'to': { transform: 'translateX(0)', opacity: '1' },
                },
            },
            backdropBlur: {
                'xl': '20px',
            },
        },
    },
    plugins: [],
};
