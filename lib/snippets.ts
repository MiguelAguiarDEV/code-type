export interface CodeSnippet {
  id: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

export const codeSnippets: Record<string, CodeSnippet[]> = {
  javascript: [
    {
      id: 'js-1',
      difficulty: 'easy',
      description: 'Array filter and map',
      code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);`,
    },
    {
      id: 'js-2',
      difficulty: 'easy',
      description: 'Arrow function',
      code: `const greet = (name) => {
  return \`Hello, \${name}!\`;
};`,
    },
    {
      id: 'js-3',
      difficulty: 'medium',
      description: 'Async/await fetch',
      code: `async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    {
      id: 'js-4',
      difficulty: 'medium',
      description: 'Array reduce',
      code: `const cart = [
  { name: 'Book', price: 10 },
  { name: 'Pen', price: 2 },
  { name: 'Notebook', price: 5 }
];

const total = cart.reduce((sum, item) => sum + item.price, 0);`,
    },
    {
      id: 'js-5',
      difficulty: 'hard',
      description: 'Debounce function',
      code: `function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}`,
    },
  ],

  typescript: [
    {
      id: 'ts-1',
      difficulty: 'easy',
      description: 'Interface and type',
      code: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'guest';`,
    },
    {
      id: 'ts-2',
      difficulty: 'medium',
      description: 'Generic function',
      code: `function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const first = getFirstElement<number>([1, 2, 3]);`,
    },
    {
      id: 'ts-3',
      difficulty: 'medium',
      description: 'React component with TypeScript',
      code: `interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};`,
    },
    {
      id: 'ts-4',
      difficulty: 'hard',
      description: 'Utility types',
      code: `type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Omit<User, 'password'>;
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;`,
    },
    {
      id: 'ts-5',
      difficulty: 'hard',
      description: 'Advanced generics',
      code: `type ApiResponse<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { data, error: null, loading: false };
  } catch (error) {
    return { data: null as T, error: error.message, loading: false };
  }
}`,
    },
  ],

  python: [
    {
      id: 'py-1',
      difficulty: 'easy',
      description: 'List comprehension',
      code: `numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers if n % 2 == 0]
print(squares)`,
    },
    {
      id: 'py-2',
      difficulty: 'easy',
      description: 'Function definition',
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

message = greet("World")`,
    },
    {
      id: 'py-3',
      difficulty: 'medium',
      description: 'Class with methods',
      code: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def introduce(self) -> str:
        return f"Hi, I'm {self.name} and I'm {self.age} years old"`,
    },
    {
      id: 'py-4',
      difficulty: 'medium',
      description: 'Dictionary operations',
      code: `users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

names = [user["name"] for user in users if user["age"] >= 30]`,
    },
    {
      id: 'py-5',
      difficulty: 'hard',
      description: 'Decorator function',
      code: `def timing_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f}s")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)`,
    },
  ],

  react: [
    {
      id: 'react-1',
      difficulty: 'easy',
      description: 'Simple useState',
      code: `const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
};`,
    },
    {
      id: 'react-2',
      difficulty: 'medium',
      description: 'useEffect hook',
      code: `useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  };

  fetchData();
}, []);`,
    },
    {
      id: 'react-3',
      difficulty: 'medium',
      description: 'Custom hook',
      code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
    },
    {
      id: 'react-4',
      difficulty: 'hard',
      description: 'Context provider',
      code: `const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
    },
  ],

  go: [
    {
      id: 'go-1',
      difficulty: 'easy',
      description: 'Function with error',
      code: `func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}`,
    },
    {
      id: 'go-2',
      difficulty: 'medium',
      description: 'Struct and methods',
      code: `type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", p.Name)
}`,
    },
    {
      id: 'go-3',
      difficulty: 'hard',
      description: 'Goroutine with channel',
      code: `func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d processing job %d\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}`,
    },
  ],

  rust: [
    {
      id: 'rust-1',
      difficulty: 'medium',
      description: 'Option and Result',
      code: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}`,
    },
    {
      id: 'rust-2',
      difficulty: 'hard',
      description: 'Struct with impl',
      code: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}`,
    },
  ],
};

// Helper function to get random snippet
export function getRandomSnippet(language: string): CodeSnippet | null {
  const snippets = codeSnippets[language.toLowerCase()];
  if (!snippets || snippets.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * snippets.length);
  return snippets[randomIndex];
}

// Helper function to get snippet by difficulty
export function getSnippetByDifficulty(
  language: string,
  difficulty: 'easy' | 'medium' | 'hard'
): CodeSnippet | null {
  const snippets = codeSnippets[language.toLowerCase()];
  if (!snippets) return null;

  const filtered = snippets.filter(s => s.difficulty === difficulty);
  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

// Get all available languages
export function getAvailableLanguages(): string[] {
  return Object.keys(codeSnippets);
}