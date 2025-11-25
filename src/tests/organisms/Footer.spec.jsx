import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../components/organisms/Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('renderiza el título Centro de ayuda y su enlace', () => {
    expect(screen.getByText('Centro de ayuda')).not.toBeNull();
    const contactoLink = screen.getByRole('link', { name: /Contacto/i });
    expect(contactoLink.getAttribute('href')).toBe('/contact');
  });

  it('renderiza la sección Tienda con todos sus enlaces', () => {
    expect(screen.getByText('Tienda')).not.toBeNull();
    expect(screen.getByRole('link', { name: /Tiendas/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /Política de privacidad/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /Preguntas frecuentes/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /Términos y condiciones/i }).getAttribute('href')).toBe('/');
  });

  it('renderiza la sección Redes Sociales con enlaces externos', () => {
    expect(screen.getByText('Redes Sociales')).not.toBeNull();
    const links = screen.getAllByRole('link');
    expect(links.some(link => link.getAttribute('href') === 'https://instagram.com')).toBeTrue();
    expect(links.some(link => link.getAttribute('href') === 'https://facebook.com')).toBeTrue();
  });

  it('renderiza el footer-bottom con el año actual', () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} ZapaStore. Todos los derechos reservados.`)
    ).not.toBeNull();
  });
});
