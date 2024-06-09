import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/*
This is the 'ScrollToTop' component. It's a functional component that uses the 'useEffect' and 'useLocation' hooks from React and react-router-dom.

The 'useLocation' hook is used to get the current location object, which contains the 'pathname'. The 'pathname' is destructured from the location object.

The 'useEffect' hook is used to run a side effect after every render. In this case, it scrolls the window to the top whenever the 'pathname' changes. This is useful for ensuring the user starts at the top of the page when navigating to a new route.

The component doesn't render anything, so it returns null.*/

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// The 'ScrollToTop' component is exported for use in other parts of the application.
export default ScrollToTop;