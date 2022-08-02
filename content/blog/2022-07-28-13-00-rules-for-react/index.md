---
title: Rules for React
description: Rules for React
date: 2022-07-28 13:00
tags: [react, typescript]
---

Heavily inspired by the brilliant [Tao of React](https://alexkondov.com/tao-of-react/), modified to include typescript examples, references to other documentation, and reasoned patterns.

[Setting up a new project? Jump here](#new-react-project)

## Components

### ~~DRY~~ AHA (Avoid Hasty Abstractions)

> duplication is far cheaper than the wrong abstraction

Summed up by [Kent Dodds' - AHA Programming 💡](https://kentcdodds.com/blog/aha-programming) and [Sandy Metz's - The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) articles, don't create any abstractions until you've seen the code implemented a few times.

### Favor Functional Components

- [eslint-plugin-react-prefer-function-component](https://www.npmjs.com/package/eslint-plugin-react-prefer-function-component)

Favor functional components - they have a simpler syntax. No lifecycle methods, constructors or boilerplate. You can express the same logic with less characters without losing readability.

Unless you need an error boundary they should be your go-to approach. The mental model you need to keep in your head is a lot smaller.

```jsx
// 👎 Class components are verbose
class Counter extends React.Component {
  state = {
    counter: 0,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <div>
        <p>counter: {this.state.counter}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

// 👍 Functional components are easier to read and maintain
function Counter() {
  const [counter, setCounter] = useState(0);

  handleClick = () => setCounter(counter + 1);

  return (
    <div>
      <p>counter: {counter}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

### Write Consistent Components

- [eslint-no-use-before-define](https://eslint.org/docs/latest/rules/no-use-before-define)
- [eslint-max-lines-per-function](https://eslint.org/docs/latest/rules/max-lines-per-function)
- [eslint-max-depth](https://eslint.org/docs/latest/rules/max-depth)
- [eslint-no-else-return](https://eslint.org/docs/latest/rules/no-else-return)

Stick to the same style for your components. Put utility functions in the same place, export the same way and follow the same naming patterns.

There isn’t a real benefit of one approach over the other.

No matter if you’re exporting at the bottom of the file or directly in the definition of the component, pick one and stick to it.

Consider limiting your function length (250 for React is advised), and banning the use of else's in favour of the [early return pattern AKA the bouncer pattern](https://rikschennink.nl/thoughts/the-bouncer-pattern/).

### Prefer named exporting of components

- [eslint-no-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md)

Always name your components. It helps when you’re reading an error stack trace and using the React Dev Tools.

```jsx
// 👎 Avoid this
export default () => <form>...</form>;
// or
export default function Form() {
  return <form>...</form>;
}

// 👍 Name your functions
export function Form() {
  return <form>...</form>;
}

export const Form = () => {
  return <form>...</form>;
}
```

It’s also easier to find where you are when developing if the component’s name is inside the file and enforces a consistent naming of components.

```jsx
// 👎 Avoid this
// ./form-contact.jsx
export default () => <form>...</form>;

// ./pages/login.jsx
import Form from "./form-contact";
// ./pages/home.jsx
import Contact from "./form-contact";

// 👍 Name your functions
export function FormContact() {
  return <form>...</form>;
}

// ./pages/login.jsx
import { FormContact } from "./form-contact";
// You can alias the import if absolutely necessary
// ./pages/home.jsx
import { FormContact as Contact } from "./form-contact";
```

Nextjs pushes for a default export on the page but also pushes for naming your functions.

### Organize Utility Functions

- See [Maintain a utility function directory](#maintain-a-utility-function-directory)

Utility functions that don’t need to hold a closure over the components should be moved outside. The ideal place is before the component definition so the file can be readable from top to bottom.

That reduces the noise in the component and leaves inside only those that need to be there.

```jsx
// 👎 Avoid nesting functions which don't need to hold a closure.
function Component({ date }) {
  function parseDate(rawDate) {
    ...
  }

  return <div>Date is {parseDate(date)}</div>
}

// 👍 Place the utility functions before the component
function parseDate(date) {
  ...
}

function Component({ date }) {
  return <div>Date is {parseDate(date)}</div>
}
```

You want to keep the least amount of utility functions inside the definition. Move as many as possible outside and pass the values from state as arguments.

Composing your logic out of pure functions that rely only on input makes it easier to track bugs and extend.

```jsx
// 👎 Utility functions shouldn't read from the component's state
export function Component() {
  const [value, setValue] = useState("");

  function isValid() {
    // ...
  }

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={validateInput}
      />
      <button
        onClick={() => {
          if (isValid) {
            // ...
          }
        }}
      >
        Submit
      </button>
    </>
  );
}

// 👍 Extract them and pass only the values they need
function isValid(value) {
  // ...
}

export function Component() {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={validateInput}
      />
      <button
        onClick={() => {
          if (isValid(value)) {
            // ...
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
```

### Don't Hardcode Markup

- [Google Javascript naming conventions](https://google.github.io/styleguide/jsguide.html#naming)
- [Clean Code Typescript](/2022-07-29-10-59-clean-code-typescript)

Don’t hardcode markup for navigation, filters or lists. Use a configuration object and loop through the items instead.

This means you only have to change the markup and items in a single place.

```jsx
// 👎 Hardcoded markup is harder to manage.
function Filters({ onFilterClick }) {
  return (
    <>
      <p>Book Genres</p>
      <ul>
        <li>
          <div onClick={() => onFilterClick("fiction")}>Fiction</div>
        </li>
        <li>
          <div onClick={() => onFilterClick("classics")}>Classics</div>
        </li>
        <li>
          <div onClick={() => onFilterClick("fantasy")}>Fantasy</div>
        </li>
        <li>
          <div onClick={() => onFilterClick("romance")}>Romance</div>
        </li>
      </ul>
    </>
  );
}

// 👍 Use loops and configuration objects
const GENRES = [
  {
    identifier: "fiction",
    name: Fiction,
  },
  {
    identifier: "classics",
    name: Classics,
  },
  {
    identifier: "fantasy",
    name: Fantasy,
  },
  {
    identifier: "romance",
    name: Romance,
  },
];

function Filters({ onFilterClick }) {
  return (
    <>
      <p>Book Genres</p>
      <ul>
        {GENRES.map((genre) => (
          <li>
            <div onClick={() => onFilterClick(genre.identifier)}>
              {genre.name}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
```

### Component Length

- See [Write Consistent Components](#write-consistent-components)

A React component is just a function that gets props and returns markup. They adhere to the same software design principles.

If a function is doing too many things, extract some of the logic and call another function. It’s the same with components - if you have too much functionality, split it in smaller components and call them instead.

If a part of the markup is complex, requires loops and conditionals - extract it.

Rely on props and callbacks for communication and data. Lines of code are not an objective measure. Think about responsibilities and abstractions instead.

### Write Comments in JSX

When something needs more clarity open a code block and give additional information. The markup is a part of the logic so when you feel that something needs more clarity - provide it.

```jsx
function Component(props) {
  return (
    <>
      {/* If the user is subscribed we don't want to show them any ads */}
      {user.subscribed ? null : <SubscriptionPlans />}
    </>
  );
}
```

### Use Error Boundaries

An error in one component shouldn’t bring down the entire UI. There are rare cases in which we want to take down the whole page or redirect if a critical error happens. Most of the times we’d be fine if we just hide a specific element from the screen.

In a function that deals with data you may have multiple try/catch statements. Put error boundaries to use not just on the top level. Wrap elements on the screen that can exist separately to avoid cascading failures.

```jsx
function Component() {
  return (
    <Layout>
      <ErrorBoundary>
        <CardWidget />
      </ErrorBoundary>

      <ErrorBoundary>
        <FiltersWidget />
      </ErrorBoundary>

      <div>
        <ErrorBoundary>
          <ProductList />
        </ErrorBoundary>
      </div>
    </Layout>
  );
}
```

### Destructure Props

Most React components are just functions. They get props and return markup. In a normal function you use the arguments it is passed directly, so it makes sense to apply the same principle here. No need to repeat `props` everywhere.

A reason not to destructure the props would be to distinguish what is external and what is internal state. But in a regular function there is no distinction between arguments and variables. Don’t create unnecessary patterns.

```jsx
// 👎 Don't repeat props everywhere in your component
function Input(props) {
  return <input value={props.value} onChange={props.onChange} />;
}

// 👍 Destructure and use the values directly
function Component({ value, onChange }) {
  const [state, setState] = useState("");

  return <div>...</div>;
}
```

### Use Typescript

Typescript is ideal for working with React components. It does compile time prop checking on components and will suit 90% of ways of working. If you require runtime type checking however, consider `InferPropTypes` from [@types/prop-types](https://www.npmjs.com/package/@types/prop-types).

An example of implementation:

```tsx
// Adapted from https://blog.logrocket.com/comparing-typescript-and-proptypes-in-react-applications
import React from "react";
import PropTypes, { InferProps } from "prop-types";

const BlogCardPropTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  authorName: PropTypes.string.isRequired,
};

type BlogCardTypes = InferProps<typeof BlogCardPropTypes>;
export const BlogCard: React.FC<BlogCardTypes> = ({
  authorName,
  createdAt,
  title,
}) => {
  return <span>Blog Card</span>;
};

BlogCard.propTypes = BlogCardPropTypes;
```

### Number of Props

The question of how many props should a component receive is a subjective one. The number of props that a component has is correlated to how much it’s doing. The more props you pass to it the more responsibilities it has.

A high number of props is a signal that a component is doing too much.

If I go above 5 props I consider whether this component should be split. In some cases, it may just need a lot of data. An input field, for example, may have a lot of props. In others it’s a sign that something needs to be extracted.

Note: The more props a component takes, the more reasons to rerender.

### Pass Objects Instead of Primitives

- See [Use Typescript](#use-typescript)

One way to limit the amount of props is to pass an object instead of primitive values. Rather than passing down the user name, email and settings one by one you can group them together. This also reduces the changes that need to be done if the user gets an extra field for example.

Using TypeScript makes this even easier.

```jsx
    // 👎 Don't pass values on by one if they're related
    <UserProfile
      bio={user.bio}
      name={user.name}
      email={user.email}
      subscription={user.subscription}
    />

    // 👍 Use an object that holds all of them instead
    <UserProfile user={user} />
```

### Conditional Rendering

- See [Write Consistent Components](#write-consistent-components)

In some situations using short circuit operators for conditional rendering may backfire and you may end up with an unwanted `0` in your UI. To avoid this default to using ternary operators. The only caveat is that they’re more verbose.

The short-circuit operator reduces the amount of code which is always nice. Ternaries are more verbose but there is no chance to get it wrong. Plus, adding the alternative condition is less of a change.

Prefer returing a react fragment (`<React.Fragment />` or `<></>`) over `null` to take advantage of typescripts type inference.

```jsx
// 👎 Try to avoid short-circuit operators
function Component() {
  const count = 0;

  return <div>{count && <h1>Messages: {count}</h1>}</div>;
}

// 👍 Use early return
function Component() {
  const count = 0;

  if (!count) {
    return <></>;
  }

  return (
    <div>
      <h1>Messages: {count}</h1>
    </div>
  );
}

// 👍 or use a ternary instead
function Component() {
  const count = 0;

  return <div>{count ? <h1>Messages: {count}</h1> : <></>}</div>;
}
```

### Be wary of using nested Ternary Operators

- [eslint-plugin-proper-ternary](https://github.com/getify/eslint-plugin-proper-ternary)
- [elint-no-nested-ternary](https://eslint.org/docs/latest/rules/no-nested-ternary)
- See [Write Consistent Components](#write-consistent-components)

They seem to save space at the time but it’s always better to be explicit and obvious in your intentions.

Ternary operators simplify assignment logic drastically, but striking a balance is tricky as they become hard to read after the first level.

```jsx
import { useRouter } from "next/router"

// 👎 Because let allows re-assignment, nav could be redeclared elsewhere in the code
const Component = () => {
  const router = useRouter()
  let nav = router.replace;

  if (typeof window !== "undefined") {
    nav = (path: string) => (window.location.href = path);
  }

 ...
}

// 👍 nav is only assigned once
const Component = () => {
  const router = useRouter()
  const nav = typeof window !== "undefined" ?
    (path: string) => (window.location.href = path) :
    router.replace;

 ...
}
```

```jsx
// 👎 Nested ternaries are hard to read in JSX
isSubscribed ? (
  <ArticleRecommendations />
) : isRegistered ? (
  <SubscribeCallToAction />
) : (
  <RegisterCallToAction />
);

// 👍 Place them inside a component on their own
function CallToActionWidget({ subscribed, registered }) {
  if (subscribed) {
    return <ArticleRecommendations />;
  }

  if (registered) {
    return <SubscribeCallToAction />;
  }

  return <RegisterCallToAction />;
}

function Component() {
  return <CallToActionWidget subscribed={subscribed} registered={registered} />;
}
```

### Get Functional - Map and Reduce

[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), and [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) are all array methods in JavaScript. Each one will iterate over an array and perform a transformation or computation. Each will return a new array based on the result of the function (except in the case of every and some which return boolean values).

They simplify code as they are declarative, as opposed to imperative which is more difficult to understand and reason about.

- figuring out the return and argument types is the first challenge

```ts
type Person = {
  name: string;
  surname: string;
};

const makeDisplayName = (person: Person): string => {
  return `${person.name} ${person.surname}`;
};

// 👎 Note how we're mutating a variable in the scope of another function - this habbit means we need to ba aware of all places listOfNames is being called.
//   Also are we sure it's iterating through all names without a breakout? Would we realise if the index started at 1 or stopped short of one list item?
const listOfNames = [];

for (let i = 0; i < listOfPeople.length; i++) {
  listOfNames.push(makeDisplayName(listOfPeople[i]));
}

// 👍 Map is doing exactly as expected - we dont have to question if anything else is happening inside the applied iterator as it's declared what it does - `makeDisplayName`
const listOfNames = listOfPeople.map(makeDisplayName);
```

```ts
// 👎 Fully Imperative
const isEveryNeedleInHaystack = (needles, haystack) => {
  for (let i = 0; i < needles.length; i++) {
    if (haystack.indexOf(needles[i]) === -1) {
      return false;
    }
  }

  return true;
};

// 👍 Fully Declarative
const isEveryNeedleInHaystack = (needles, haystack) =>
  needles.every((needle) => haystack.includes(needle));
```

Example of filtering a list of books with conditions.

```ts
type Book = {
  title: string;
  author;
  genre: string[];
};

// 👎 Imperative
let listOfBooks: Book[] = library;

if (isOver18) {
  listOfBooks = [...listOfBooks, ...restrictedBooks]; // mutates listOfBooks
}

if (genreSelected) {
  const filteredBooks = []; // remember this - but only if `genreSelected` is true

  for (const book of listOfBooks) {
    if (book.genre.indexOf(genreSelected) > -1) {
      filteredBooks.push(book);
    }
  }

  listOfBooks = filteredBooks;
}

setDisplayBooks(listOfBooks);

// 👍 Declarative
const hasGenre = (book: Book, genreSelected: string): boolean =>
  genreSelected ? book.includes(genreSelected) : true; // pure function that is descriptive and easy to reason about

const listOfBooks = isOver18 ? [...library, ...restrictedBooks] : library;
const filteredBooks = listOfBooks.filter((book) =>
  hasGenre(book, genreSelected)
);

setDisplayBooks(filteredBooks);
```

The following example takes a list of tasks and displays the duration grouped by `dueWeek` and `priority`. Functional methods allow us to break out of control flow with the use of `return` - something which is not allowed in imperative for-loops. We need to continue reading and understanding the code in case something is mutated later on.

```ts
type Priority = "low" | "med" | "high";
type Task = {
  name: string;
  priority: Priority;
  durationMinutes: number;
  weekDue: number;
};

type TimeEstimation = { weekDue: number } & Partial<Record<Priority, number>>; // { weekdue, low?, med?, high? }

const getIndex = (timeEstimations: TimeEstimation[], task: Task) =>
  timeEstimations.findIndex(
    (timeEstimation) => timeEstimation.weekDue === task.weekDue
  );

// 👎 Imperative
const weeklyEstimations = (tasks: Task[]): TimeEstimation[] => {
  const timeEstimations: TimeEstimation[] = [];

  for (const task of tasks) {
    const existingIndex = getIndex(timeEstimations, task);
    const existing = timeEstimations[existingIndex];

    if (existing) {
      const existingDuration = existing[task.priority];

      if (existingDuration) {
        existing[task.priority] += task.durationMinutes;
      } else {
        existing[task.priority] = task.durationMinutes;
      }
    } else {
      timeEstimations.push({
        weekDue: task.weekDue,
        [task.priority]: task.durationMinutes,
      });
    }
  }

  return timeEstimations;
};

// 👍 Declarative
const replaceAt = <T>(index: number, data: T, arr: T[]): T[] => {
  arr.splice(index, 1, data);
  return arr;
};

const weeklyEstimations = (tasks: Task[]): TimeEstimation[] =>
  tasks.reduce<TimeEstimation[]>((timeEstimations, task) => {
    const existingIndex = getIndex(timeEstimations, task);
    const existing = timeEstimations[existingIndex];

    if (existing) {
      const durationMinutes = existing[task.priority] || 0;

      return replaceAt(
        existingIndex,
        {
          ...existing,
          [task.priority]: durationMinutes + task.durationMinutes,
        },
        timeEstimations
      );
    }

    return [
      ...timeEstimations,
      { weekDue: task.weekDue, [task.priority]: task.durationMinutes },
    ];
  }, []);
```

### Move Lists in a Separate Component

Looping through a list of items is a common occurrence, usually done with the `map` function. However, in a component that has a lot of markup, the extra indentation and the syntax of `map` don’t help with readability.

When you need to map over elements, extract them in their own listing component, even if the markup isn’t much. The parent component doesn’t need to know about the details, only that it’s displaying a list.

Only keep a loop in the markup if the component’s main responsibility is to display it. Try to keep a single mapping per component but if the markup is long or complicated, extract the list either way.

```jsx
// 👎 Don't write loops together with the rest of the markup
function Component({ topic, page, articles, onNextPage }) {
  return (
    <div>
      <h1>{topic}</h1>
      {articles.map((article) => (
        <div>
          <h3>{article.title}</h3>
          <p>{article.teaser}</p>
          <img src={article.image} />
        </div>
      ))}
      <div>You are on page {page}</div>
      <button onClick={onNextPage}>Next</button>
    </div>
  );
}

// 👍 Extract the list in its own component
function Component({ topic, page, articles, onNextPage }) {
  return (
    <div>
      <h1>{topic}</h1>
      <ArticlesList articles={articles} />
      <div>You are on page {page}</div>
      <button onClick={onNextPage}>Next</button>
    </div>
  );
}
```

<!--
### Understand where your data exists

<!-- TODO STATE? --\>

### Raise state up

<!-- TODO Set state as high up. Components should expect data to exist - see early return --\>
-->

### Minimise the use of Optional Chaining

In thinking where your data exists, consider where data does, and doesn't exist. eg A user profile page _will always_ contain user details. Limit your use of [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

```js
const App: React.FC = () => {
  if (user) {
    return <Profile user={user} />;
  }

  return <LoginPage />;
};

// 👎 optional chaining offers no value here and only makes our testing complex - we need to constantly assert user information
type User = { name: string };

const Profile: React.FC<{ user?: User }> = ({ user }) => (
  <div>
    <h2>Hello {user?.name}</h2>
  </div>
);

// 👍 Simpler to test - we wouldn't show this component otherwise.
const Profile: React.FC<{ user: User }> = ({ user }) => (
  <div>
    <h2>Hello {user.name}</h2>
  </div>
);
```

### Avoid Nested Render Functions

When you need to extract markup from a component or logic, don’t put it in a function living in the same component. A component is just a function. Defining it this way is nesting inside its parent.

This means that it will have access to all the state and data of its parent. It makes the code more unreadable - what is this function doing in between all the components?

Move it in its own component, name it and rely on props instead of a closure.

```jsx
// 👎 Don't write nested render functions
function Component() {
  function renderHeader() {
    return <header>...</header>;
  }
  return <div>{renderHeader()}</div>;
}

// 👍 Extract it in its own component
import { Header } from "./Header";

function Component() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

## State Management

### Use Reducers

Sometimes you need a more powerful way to express and manage state changes. Start with `useReducer` before you reach for an external library. This is a great mechanism to do complex state management and it doesn’t require 3rd party dependencies.

In combination with React’s Context and TypeScript, `useReducer` can be really powerful. Unfortunately, it’s not that widely used. People still reach for 3rd party libraries.

If you need multiple pieces of state, move them to a reducer instead.

```jsx
// 👎 Don't use too many separate pieces of state
const TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState(TYPES.LARGE)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useSatte(null)

  return (
    ...
  )
}

// 👍 Unify them in a reducer instead
const TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const initialState = {
  isOpen: false,
  type: TYPES.LARGE,
  phone: '',
  email: '',
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    ...
    default:
      return state
  }
}

function Component() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    ...
  )
}
```

### Avoid typescript enums

Enums have a few [documented issues](https://fettblog.eu/tidy-typescript-avoid-enums/) (the [TS team agrees](https://twitter.com/orta/status/1348966323271987201?s=20)). A simpler alternative to enums is just declaring a union type of string literals or using as const to carry the data through to runtime.

```tsx
type Position = "left" | "right" | "top" | "bottom";

const buttonSizes = {
  default: "default",
  small: "small",
  large: "large",
} as const;

export const Button: React.FC<{ size: keyof typeof buttonSizes }> = ({
  size,
  ...props
}) => <Button size={size} {...props} />;
```

### Prefer Hooks to HOCs and Render Props

In some cases we need to enhance a component or give it access to external state. In general there are three ways to do this - higher order components (HOCs), render props and hooks.

Hooks have proven to be the most efficient way to achieve such composition. From a philosophical standpoint, a component is a function that **uses** other functions. Hooks allow you to tap into multiple sources of external functionality without them conflicting with each other. No matter the number of hooks, you know where each value comes from.

With HOCs you get values as props. This makes it unclear wether they come from the parent component or the wrapping one. Also, chaining multiple props together is known to cause errors.

Render props lead to high indentation and bad readability. Nesting multiple components with render props in the same tree makes the markup look even worse. Also it only exposes the values in the markup itself so you have to write the logic there or pass it down.

With hooks you work with simple values, which are easy to track and don’t interfere with the JSX.

```jsx
// 👎 Avoid using render props
function Component() {
  return (
    <>
      <Header />
      <Form>
        {({ values, setValue }) => (
          <input
            value={values.name}
            onChange={e => setValue('name', e.target.value)}
          />
          <input
            value={values.password}
            onChange={e => setValue('password', e.target.value)}
          />
        )}
      </Form>
      <Footer />
    </>
  )
}

// 👍 Favor hooks for their simplicity and readability
function Component() {
  const [values, setValue] = useForm()

  return (
    <>
      <Header />
      <input
        value={values.name}
        onChange={e => setValue('name', e.target.value)}
      />
      <input
        value={values.password}
        onChange={e => setValue('password', e.target.value)}
      />

      <Footer />
    </>
  )
}
```

### Use Data Fetching Libraries

Often the data that we want to manage in state is retrieved from an API. We need to keep that data in memory, update it and access it in multiple places.

Modern data fetching libraries like [React Query](https://react-query.tanstack.com/) provide enough mechanisms to manage the external data. We can cache it, invalidate it and fetch it anew. They can be used for sending data as well, triggering a refresh for another piece of data.

It’s even easier if you’re working with a GraphQL client like [Apollo](https://www.apollographql.com/docs/react/). It has the concept of client state built in.

### State Management Libraries

1. [MobX](https://mobx.js.org/react-integration.html)
1. [Tanstack Query](https://tanstack.com/query/v4)
1. [Zustand](https://github.com/pmndrs/zustand)
1. [Redux](https://redux.js.org/)
1. [Recoil](https://recoiljs.org/)

In most cases you don’t need a state management library, however above is listed in order of recommendation.

## Component Mental Models

### Container & Presentational

The predominant line of thinking is to split components in two groups - presentational and container components. Also known as smart and dumb.

The idea is that some components don’t have any functionality and state. They are just called by the parent component with some props. The container components contain the business logic, do the data fetching and manage the state.

This mental model is what the MVC structure is for back-end applications. It’s generic enough to work everywhere and you can’t go wrong with it.

**But**, in modern UI applications that pattern falls short. Pulling all the logic in a few components leads to bloat. They end up with too many responsibilities and become hard to manage. As an app grows putting the complexity in a few concentrated places is just not good for maintainability.

### Stateless & Stateful

Think of components as stateful and stateless. The mental model mentioned above implies that a few components should be managing a lot of the complexity. Instead, it should be spread throughout the app.

Data should live close to where it is used. When you’re using a GraphQL client you fetch the data in the component that displays it. Even if it’s not a top level one. Don’t think about **containers**, think about **responsibilities**. Consider what is the most logical component to hold a piece of state.

For example, a `<Form />` component should own the data of the form. An `<Input />` should be receiving values and calling callbacks when a change occurs. A `<Button />` should notify the form that it was pressed and let the form handle what happens.

Who does the validation in a form? Is the input field responsible? That would mean that this component becomes aware of the business logic of your application. How will it notify the form that there is an error? How will that error state be refreshed? Will the form know about that? If there’s an error but you try to submit, what will happen?

When faced with questions like this you should become aware that responsibilities are getting mixed up. In this case it’s better for the input to be left stateless and receive an error message from the form.

## Application Structure

### Maintain a utility function directory

Prefer the directory name `utils` for common utility files as `helpers` can be interpreted as informal. `lib`/`libs` is usually used for transmpiled typescript files. Aim to keep the utilities stateless and functional.

<!--
### Follow Casing Conventions

<!-- TODO Casing conventions in react --\>

 -->

### Group by Route/Module

<!-- TODO https://github.com/oldboyxx/jira_clone/tree/master/client -->

> The main rule to follow: **Files from one module can only import from ancestor folders within the same module or from `src/shared`.** This makes the codebase easier to understand, and if you're fiddling with code in one module, you will never introduce a bug in another module.

Grouping by containers and components makes applications hard to navigate. To understand what component belongs where you need a good level of familiarity.

Not all components are equal - some are used globally, others are made for a specific part of the app. This structure works well for the smallest of projects. But anything that goes beyond a handful of components becomes hard to manage.

```jsx
// 👎 Don't group by technical details
├── containers
|   ├── Dashboard.jsx
|   ├── Details.jsx
├── components
|   ├── Table.jsx
|   ├── Form.jsx
|   ├── Button.jsx
|   ├── Input.jsx
|   ├── Sidebar.jsx
|   ├── ItemCard.jsx

// 👍 Group by module/domain
├── modules
|   ├── common
|   |   ├── components
|   |   |   ├── Button.jsx
|   |   |   ├── Input.jsx
|   ├── dashboard
|   |   ├── components
|   |   |   ├── Table.jsx
|   |   |   ├── Sidebar.jsx
|   ├── details
|   |   ├── components
|   |   |   ├── Form.jsx
|   |   |   ├── ItemCard.jsx
```

Group by route/module from the start. This is a structure that supports change and growth. The point is not to have your application outgrow the architecture quickly. If it’s based on components and containers that will happen too fast.

A module based architecture is easy to extend. You can just add modules on top of it without increasing the complexity.

The container/component structure is not wrong but it’s too generic. It doesn’t tell the reader anything about the project besides that it uses React.

### Create a Common Module

Components like buttons, inputs and cards are used all over the place. Even if you’re not going with a module based structure it’s good to extract those.

You can see what common components you have even if you’re not using Storybook. It helps to avoid duplication. You don’t want everyone on the team to make their own version of a button. Unfortunately, this happens way too often because of badly structured projects.

<!--
### Button Example

<!-- TODO BUTTON --\>
-->

### Wrap External Components

Try not to import too many 3rd party components directly. By creating an adapter around them we can modify the API if we have to. Also, we can change the library in a single place.

This goes for component libraries like Semantic UI and utility components as well. The simplest thing you can do is reexport them from the common module so they’re pulled from the same place.

A component doesn’t need to know what library we’re using for the date picker - only that it exists.

```jsx
// 👎 Don't import directly
import { Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";

// 👍 Export the component and use it referencing your internal module
import { Button, DatePicker } from "@modules/common/components";
```

### Move Components in Folders

<!-- TODO RELEVANT -->

Create a components folder for each module in my React applications. Whenever you need to create a component, create it there first. If it needs extra files like styles or tests, create its own folder and put them there.

As a general practice it’s good to have an `index.js` file which exports the React component so you don’t have to change import paths or have repetitive ones like `import Form from 'components/UserForm/UserForm'`. Still, keep the component file with its name to avoid confusion when multiple files are open.

```jsx
    // 👎 Don't keep all component files together
    ├── components
        ├── Header.jsx
        ├── Header.scss
        ├── Header.test.jsx
        ├── Footer.jsx
        ├── Footer.scss
        ├── Footer.test.jsx

    // 👍 Move them in their own folder
    ├── components
        ├── Header
            ├── index.js
            ├── Header.jsx
            ├── Header.scss
            ├── Header.test.jsx
        ├── Footer
            ├── index.js
            ├── Footer.jsx
            ├── Footer.scss
            ├── Footer.test.jsx
```

## Performance

### Don't Optimize Prematurely

Before you make any kinds of optimizations, make sure that there is a reason for them. Following e best practice blindly is a waste of effort unless it’s impacting your application in a way.

Yes, it’s important to be aware of certain things but prioritize building readable and maintainable components before performance. Well written code is easier to improve.

When you notice a performance problem in your application - measure and identify the cause of your problem. No point in trying to reduce rerender count if your bundle size is enormous.

Once you know where the performance problems are coming from, fix them in the order of their impact.

### Watch The Bundle Size

The amount of JavaScript that has to be sent to the browser is the most important factor of your application’s performance. Your app can be blazing fast but chances are no one will find out about this if they have to load 4MB of JS to load it.

Don’t ship a single JS bundle. Split your application on the route level and even further. Make sure you’re sending the least amount of JS possible.

Load in the background or when the user shows intent that they’ll need another bundle. If a button press is triggering a PDF download, you can delay the download of the PDF library until the button is hovered.

### Rerenders - Callbacks, Arrays and Objects

- [Using React DevTools to highlight what components rerendered](https://jsramblings.com/how-to-check-if-your-component-rerendered-and-why/)

It’s good to try and reduce the amount of unnecessary rerenders that your app makes. Keep this in mind but also note that unnecessary rerenders will rarely have the greatest impact on your app.

The most common advice is to avoid passing callback functions as props. Using one means that a new function will be created each time, triggering a rerender. I haven’t faced any performance problems with callbacks and in fact that’s my go to approach.

If you are experiencing performance problems and the closures are the cause then remove them. But don’t make your code less readable ot more verbose unnecessarily.

Passing down arrays or objects directly falls into the same category of problems. They fail the reference check so they will trigger a rerender. If you need to pass a fixed array extract it as a constant before the component definition to make sure the same instance is passed each time.

## Testing

### Use a code coverage of 70-80%

https://kentcdodds.com/blog/write-tests

<!-- TODO TESTING-LIB -->

<!--

### Testing Strategy

<!-- TODO KENT C DODDS --\>
<!-- TODO FORGE ARTICLE --\>

### Implementing Testing from nothing

<!-- TODO QUICK VITE, TS JEST, BLINKDIFF, NIGHTWATCH --\>

-->

### Don't Rely on Snapshot Tests

Ever since I started working with React in 2016 I’ve had only one situation in which snapshot tests have caught a problem in my components. A call to `new Date()` without an argument had slipped and it always defaulted to the current date.

Besides this, snapshots have only been a cause for failed builds when a component is changed. The usual workflow is to make a change to the component, see that snapshots are failing, update them and proceed.

Don’t get me wrong, they are a good sanity check but they are not a replacement for good component level tests. I avoid even creating them anymore.

### Test Correct Rendering

The main thing that your tests should validate is whether the component works as expected. Make sure that it renders correctly with its default props and with ones passed to it.

Validate that for a given input (props) the function returns the correct result (JSX). Validate that everything you need is on the screen.

### Validate State & Events

A stateful component will most likely change as a response of an event. Simulate the events and make sure that the component responds properly to them.

Validate that the handler functions were called and correct arguments were passed. Check if internal state was properly set.

### Test Edge Cases

When you have the basic tests covered, make sure you add some to handle edge cases.

That would mean passing an empty array to make sure you’re not accessing an index without checking. Throw an error in an API call to make sure the component handles it.

### Write Integration Tests

Integration tests are meant to validate an entire page or a larger component. It tests whether it works well as an abstraction. They give us the most confident that the application works as expected.

The components on their own could be working well and their unit tests could be passing. The integration between them could have problems, though.

## Styling

<!-- TODO CSS MODULES, SCSS -->
<!-- TODO STICK TO ONE PATTERN -->

### Use CSS-in-JS

That’s a really controversial take which many people won’t agree with. I’d rather use a library like Styled Components or Emotion because it allows me to express everything about my component in JavaScript. One less file to maintain. No CSS conventions to think about.

The logical unit in React is the component so in terms of separation of concerns it should own everything related to it.

_Note: There is no wrong option when it comes to styles - SCSS, CSS modules, libraries like Tailwind. CSS-in-JS is just the approach I would recommend._

### Keep Styled Components Together

When it comes to CSS-in-JS components it’s normal to have multiple ones in the same file. Ideally we’d like to keep them in the same file as the regular component that uses them.

However, if they become too lengthy, as styles can get, extract them in their own file living next to the component that uses them. I’ve seen this pattern used in open source projects like Spectrum.

## Data Fetching

<!-- TODO HANDLING STATE WITH DATA FETCHING -->

### Use a Data Fetching Library

React doesn’t come with an opinionated way of fetching or updating data from an API. Each team creates their own implementation usually involving a service that holds async functions which communicate with the API.

Going that route means that we need to manage loading states and handle http errors on our own. That leads to verbose code with a lot of boilerplate.

Instead of doing that we should use libraries like [React Query](https://react-query.tanstack.com/) or [SWR](https://swr.vercel.app/). They make communicating with a server a natural part of the component lifecycle in an idiomatic way - a hook.

They come with caching built in and manage loading and error states for us. We just need to handle them. Also, they remove the need to use a state management library to handle that data.

## New React Project

### Typescript?

You're going to be creating proptypes either way, so you may as well get some typesafety included.

### Selection Process - React Frameworks and Libraries

| **Feature**  | CRA | Parcel | Vite | Next.js | Gatsby | Remix | Isles | Astro.js |
| ------------ | :-: | :----: | :--: | :-----: | :----: | :---: | :---: | :------: |
| Fast DX      | ❌  |   ✅   |  ✅  |   ✅    |   ❌   |  ✅   |  ✅   |    ✅    |
| Typescript   | ✅  |   ✅   |  ✅  |   ✅    |   ✅   |  ✅   |  ✅   |    ✅    |
| Good for SEO | ❌  |   ❌   |  ❌  |   ✅    |   ✅   |  ✅   |  ✅   |    ✅    |
| SPA          | ✅  |   ✅   |  ✅  |   ✅    |   ✅   |  ❌   |  ✅   |    ✅    |
| SSR          | ❌  |   ❌   |  ❌  |   ✅    |   ❌   |  ✅   |  ❌   |    ❌    |
| SSG          | ❌  |   ❌   |  ❌  |   ✅    |   ✅   |  ❌   |  ✅   |    ✅    |
