
import MyNavBar from './components/Navbar';
import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Student from './components/Student';

test('Navbar renders correctly', () => {
  const { getByTestId } = render(<MyNavBar />);
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeDefined();
});

test("Show full name of a student", () =>{
  const student = {firstname: "Jair", lastname: "Trejo"};
  const { getByText } = render(<Student student={student} />);
  const studentFullName = getByText("Jair Trejo")
  expect(studentFullName).toBeDefined()
})
