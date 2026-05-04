import React from 'react';

const FontLoader = () => {
  const style = {
    '@import': [
      'url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap")',
    ],
  };

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

          :root {
            --font-serif: 'Cormorant Garamond', Georgia, serif;
            --font-sans: 'Josefin Sans', 'Segoe UI', sans-serif;
          }
        `,
      }}
    />
  );
};

export default FontLoader;
