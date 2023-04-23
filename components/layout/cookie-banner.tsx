// CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface CookieBannerProps {
  countriesRequiringConsent: string[];
}

const CookieBanner: React.FC<CookieBannerProps> = ({ countriesRequiringConsent }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = Cookies.get('cookieConsent');
    if (!consentGiven) {
      const userCountry = 'Germany'; // Example country (use a geolocation service)
      if (countriesRequiringConsent.includes(userCountry)) {
        setShowBanner(true);
      }
    }
  }, [countriesRequiringConsent]);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#000',
      color: '#fff',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <p style={{ margin: 0 }}>
        We use cookies to improve your experience on our website.
        <button
          onClick={handleAccept}
          style={{
            marginLeft: '10px',
            backgroundColor: '#ffcc00',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          Accept
        </button>
      </p>
    </div>
  );
};

export default CookieBanner;
