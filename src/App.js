import './App.css';
import Todo from './components/Todo';
import { ThemeProvider } from 'react-bootstrap';
const App = () => {
  return (
    <>
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <div className='heading'>
          <img src="https://img.icons8.com/wired/64/null/todo-list--v1.png" alt='logo-img' />
          <h5 className='title'>Todo List</h5>
        </div>
        <Todo />
      </ThemeProvider>
    </>
  );
}

export default App;
