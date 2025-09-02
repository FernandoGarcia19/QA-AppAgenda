import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../components/SignUp.jsx';

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('shows error if fields are empty', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    await waitFor(() => {
      expect(screen.getByText(/Todos los campos son obligatorios/i)).toBeInTheDocument();
    });
  });

  it('shows success alert and redirects on valid submit', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
    global.alert = jest.fn();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Usuario registrado exitosamente');
    });
  });
});
