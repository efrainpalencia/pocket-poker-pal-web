import { render} from '@testing-library/react';
import {screen} from '@testing-library/dom'
import App from '../App';
import {describe, expect, it} from "vitest";

describe('App', () => {
    it('renders', () => {
        render(<App />);

        expect(screen.getByText("Vite + React")).toBeInTheDocument();
    })
})