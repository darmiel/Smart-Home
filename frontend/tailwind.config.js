const colors = require("tailwindcss/lib/public/colors");
module.exports = {
    content: [
        './src/*',
        './src/Components/*'
    ],
    theme: {
        extend: {},
        colors: {
            gray: colors.coolGray,
            blue: colors.lightBlue,
            red: colors.rose,
            pink: colors.fuchsia,
            'darkReader': '#181A1B'
        },
        screens: {
            'sm': {'min': '0px', 'max': '584px'},
            // => @media (min-width: 640px) { ... }
            'md': '585px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    darkMode: 'class',
    plugins: [
        require('flowbite/plugin')
    ],
}
