import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer component', () => {
    const { getByText } = render(<Footer />);
    const footerElement = getByText(/© 2023 Copyright: Poke App/i);
    expect(footerElement).toBeInTheDocument();
});

test('Footer component has correct classnames applied', () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector('footer');
    expect(footerElement).toHaveClass('p-5 bg-slate-50');
});