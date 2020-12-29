import { render, screen, fireEvent } from '@testing-library/react';

import Login from "./components/login/main";
test('Email invalido make#your@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:'make#your@wish.cl'}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Email invalido make?your@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:'make?your@wish.cl'}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Email invalido make@your@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:'make@your@wish.cl'}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Email invalido make@your_wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:'make@your_wish.cl'}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Email valido make_your@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:"make_your@wish.cl"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});
test('Email valido make-your@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:"make-your@wish.cl"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});
test('Email valido makeyour@wish.cl', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:"makeyour@wish.cl"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});

import Info from "./components/admin/Tabs/info";
test('Whatsapp no válido 000', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"000"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Whatsapp no válido 34567891e', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"34567891e"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Whatsapp no válido 123 43245', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"123 43245"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Whatsapp no válido 1234_2345', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"1234_2345"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Whatsapp no válido 97384583828', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"97384583828"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});
test('Whatsapp válido 945234567', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"945234567"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});
test('Whatsapp válido 000000000', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"000000000"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});
test('Whatsapp válido 999999999', () => {
  render(<Info />);
  const wsp = screen.getByTestId('wsp').querySelector('input');
  fireEvent.change(wsp,{target:{value:"999999999"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});




