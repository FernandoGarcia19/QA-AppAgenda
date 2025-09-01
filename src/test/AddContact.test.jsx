import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddContact from '../components/AddContact.jsx';

global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
global.alert = jest.fn();

describe('AddContact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input fields', () => {
    render(
      <MemoryRouter initialEntries={["/addContact/1"]}>
        <Routes>
          <Route path="/addContact/:id" element={<AddContact />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefono/i)).toBeInTheDocument();
  });

  it('shows success alert and redirects on save', async () => {
    render(
      <MemoryRouter initialEntries={["/addContact/1"]}>
        <Routes>
          <Route path="/addContact/:id" element={<AddContact />} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText(/Telefono/i), { target: { value: '123456789' } });
    fireEvent.click(screen.getByRole('button', { name: /✔/i }));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Contacto agregado exitosamente');
    });
  });
});
