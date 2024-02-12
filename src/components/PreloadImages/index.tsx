import React, { useEffect } from 'react';

const PreloadImages: React.FC = () => {
  useEffect(() => {
    const imageUrls = [
        'assets/ui/main_menu/redesign/bg/main_menu_0.webp',
        'assets/ui/main_menu/redesign/bg/main_menu_1.webp',
        'assets/ui/main_menu/redesign/bg/main_menu_2.webp',
        'assets/ui/main_menu/redesign/bg/main_menu_3.webp',
        'assets/ui/main_menu/redesign/bg/main_menu_4.webp',
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return null;
};

export default PreloadImages;