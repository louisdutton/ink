// test-utils.js
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: any) => {
	return children;
};

const customRender = (ui: ReactElement<any>, options = {}) =>
	render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
