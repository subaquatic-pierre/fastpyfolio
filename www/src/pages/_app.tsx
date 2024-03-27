import { ReactElement, ReactNode, useEffect } from 'react';
import AOS from 'aos';

// scroll bar
import 'simplebar/dist/simplebar.css';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

// third party
import { Provider as ReduxProvider } from 'react-redux';

// project import
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import RTLLayout from 'components/RTLLayout';
import Snackbar from 'components/@extended/Snackbar';
import 'regenerator-runtime/runtime';
import Notistack from 'components/third-party/Notistack';
import { ConfigProvider } from 'contexts/ConfigContext';

import { store } from 'store';
import ThemeCustomization from 'themes';
import { AuthContextProvider } from 'contexts/AuthContext';
import 'styles/main.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps & Props) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out'
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ConfigProvider>
        <ThemeCustomization>
          <RTLLayout>
            <Locales>
              <ScrollTop>
                <AuthContextProvider>
                  <Notistack>
                    <Snackbar />
                    <Component {...pageProps} />
                  </Notistack>
                </AuthContextProvider>
              </ScrollTop>
            </Locales>
          </RTLLayout>
        </ThemeCustomization>
      </ConfigProvider>
    </ReduxProvider>
  );
}
