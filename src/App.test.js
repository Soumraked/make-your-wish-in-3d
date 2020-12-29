import { render, screen, fireEvent } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
//import App from './App';
import Login from "./components/login/main";
test('Email valido', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:"danilobepo@gmail.com"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Success");
});
test('Email invalido', () => {
  render(<Login />);
  const email = screen.getByTestId('email').querySelector('input');
  fireEvent.change(email,{target:{value:"danilobepo@@gmail.com"}});
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId('res').innerHTML).toMatch("Error");
});

// import Info from "./components/admin/Tabs/info";
// test('renders learn react link', () => {
//   render(<Info />);
//   const input = screen.getByTestId('wsp');
//   UserEvent.type(input,"");
//   fireEvent.click(screen.getByTestId('btn'));
//   expect(screen.getAllByTestId('wsp'));
// });
