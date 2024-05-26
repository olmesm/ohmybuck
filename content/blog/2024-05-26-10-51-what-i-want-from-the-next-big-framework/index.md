---
title: What I want from the next big framework
description: Move fast, break paradigms
date: 2024-05-26 10:51
tags: [frameworks, paradigms, react server components]
---

How could we write an application that has all the benefits of JSX components, none of the work of having to wire clients and servers, and maintain simplicity with all (or as much) state on the server.

I really hope this is the future of react server components, but if we didnt require a "web app" with rich interactivity is this possible now?

Keep in mind that this does not exist and although the following is inspired by react, it is jsx/html.

```jsx
export const main = () => {
  const handleOnSubmit = swap("todo-list", (event) => (
    <Post newTodo={event.currentTarget.value} />
  ))

  return (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  )
}

const List = async ({ request: { headers } }) => {
  const todos = await db.list()

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}

const Post = async ({ newTodo }: { newTodo: string }) => {
  await db.create({ data: newTodo })

  return <List />
}
```

## Challenge: Async components

As this runs on the server, we can await the components inside the parent but let's look past this for now and assume the server can handle this automatically.

## Challenge: Client-Server Referencing

How do we tranfer a reference to the client that once the form is submitted, we need it to swap out with a component on our server. This crosses the boundary and ultimately arent the same function.

Static Analysis would work and may be ideal but is complex and beyond my drive. A simpler way could be to create a registration function that would create a link for both systems to refer to.

```jsx
import { register, swap } from "next-big-framework"

export const main = () => {
  const handleOnSubmit = register(
    swap("todo-list", (event) => <Post newTodo={event.currentTarget.value} />)
  )

  return (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  )
}
```

What if we wat to know who posted the todo item?

```jsx
import { register, swap } from "next-big-framework"

export const main = ({ session }) => {
  const handleOnSubmit = register(
    swap("todo-list", (event) => (
      <Post newTodo={event.currentTarget.value} user={session.userId} />
    ))
  )

  return (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  )
}
```

This would register a new function for each user session and this would be tricky to keep the application performing.

## Challenge: Purity

Leading on from above, we would need to ensure that handler functions are pure and JS currently doesnt have a way to enforce this.

```jsx
import { register, swap } from "next-big-framework"

export const main = ({ session }) => {
  const handleOnSubmit = register(
    swap("todo-list", (event) => (
      <Post user={session.userId} newTodo={event.currentTarget.value} />
    ))
  )

  return (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  )
}
```

The above would require registration of the component to occur for each session. Session is just an example and this, and the amount of registered components end up being a product of all the combined possibility of variables. With things like strings and numbers this is an infinite number of results and it becomes near impossible to manage their lifecycles.

A dependencies array (like react hooks hooks require) could be one solution and would allow us to register a "sub-handler" of the main function.[^1]

[^1]: We havent acknowledged that we need to develop a method of creating a good DX around including all dependencies in the array. Plus we may have issues with React developers thinking they can optimise the function's "rendering" like they would with react hooks. We may be able to accomplish this by hacking react-hooks' eslint rules, but ideally we want this in compile time or runtime.

We also get an added benefit of keeping our state on the server - all that needs to be sent to the client here is a reference to the handler function.

```jsx
import { register, swap } from "next-big-framework"

export const main = ({ session }) => {
  const handleOnSubmit = register(
    swap("todo-list", (event) => (
      <Post user={session.userId} newTodo={event.currentTarget.value} />
    )),
    [session]
  )

  return (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  )
}
```

On to the next challenge; all is eagerly evaluated - when the client only intends to send a request to main#handleOnSubmit, everything in return would still be run... unless we lazily handled that.

## Challenge: Lazy Evaluation to allow for registration

Lets delay the rendering...

```jsx
import { register, swap } from "next-big-framework"

export const main = ({ session }) => {
  const handleOnSubmit = register(
    swap("todo-list", (event) => (
      <Post user={session.userId} newTodo={event.currentTarget.value} />
    )),
    [session]
  )

  return {
    handleOnSubmit,
    render: () => (
      <div>
        <List id="todo-list" />
        <NewTodo onSubmit={handleOnSubmit} />
      </div>
    ),
  }
}
```

While I'm not the biggest fan of classes in JS, the builder pattern can give us nice typesafety, and function isolation.

```jsx
import { Nbf, swap } from "next-big-framework"

export default new Nbf()
  .register("handleOnSubmit", ({ session }) =>
    swap("todo-list", (event) => (
      <Post user={session.userId} newTodo={event.currentTarget.value} />
    ))
  )
  .render(({ session, handleOnSubmit }) => (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  ))
```

### Enter Elysia.js

The above looks quite similar to elysia.js

```jsx
import { swap, register } from "next-big-framework"
import { Elysia } from "elysia"

export default new Elysia()
  .use(
    register("handleOnSubmit", ({ session }) =>
      swap("todo-list", (event) => (
        <Post user={session.userId} newTodo={event.currentTarget.value} />
      ))
    )
  )
  .get("/", ({ session, handleOnSubmit }) => (
    <div>
      <List id="todo-list" />
      <NewTodo onSubmit={handleOnSubmit} />
    </div>
  ))
```

Could our swap function do more?

```jsx
import { swap } from "next-big-framework"
import { Elysia } from "elysia"

export default new Elysia()
  .use(
    swap("handleOnSubmit", ({ session }, event) => (
      <Post user={session.userId} newTodo={event.currentTarget.value} />
    ))
  )
  .get("/", ({ session, handleOnSubmit }) => (
    <div>
      <List {...handleOnSubmit.target} />
      <NewTodo onSubmit={handleOnSubmit.fn} />
    </div>
  ))
```

Could we extend the register with a loader while we wait for the server to respond?

```jsx
import { swap } from "next-big-framework"
import { Elysia } from "elysia"

export default new Elysia()
  .use(
    swap(
      "handleOnSubmit",
      ({ session }, event) => (
        <Post user={session.userId} newTodo={event.currentTarget.value} />
      ),
      ({ session }) => <>Please wait {session.firstName}...</>
    )
  )
  .get("/", ({ session, handleOnSubmit }) => (
    <div>
      <List {...handleOnSubmit.target} />
      <NewTodo onSubmit={handleOnSubmit.fn} />
    </div>
  ))
```

### [Update] - RSC's `useActionState`

RSC may actually take us this direction, but with the stack outlined above - what about `useActionState` with Elysia's API?

```jsx
import { action } from "next-big-framework"
import { Elysia } from "elysia"

export default new Elysia()
  .use(
    action(
      async ({ session, body }) => {
        await db.create({ data: body })

        return <List />
      },
      ({ session }) => <>Adding {session.firstName}'s todo...</>
    )
  )
  .get("/", ({ session, action }) => (
    <div>
      {action.render}
      <NewTodo onSubmit={action.fn} />
    </div>
  ))
```

## Other challenges to solve

- handler event ≠ client side event
- still need to declare a handler route
- register, swap, ...what else?

Hope this rambling gets somewhere
