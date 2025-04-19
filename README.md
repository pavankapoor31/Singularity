# Singularity

**Singularity**: A JavaScript entity that’s awaitable, callable, iterable, thenable, and mutable — a black hole of logic. 

✅ **Awaitable** • **Callable** • **Iterable** • **Thenable** • **Trap Everything**

🕳️ *One object. Infinite identities. Everything, everywhere, all at once.*

![image](https://github.com/user-attachments/assets/9f2a946b-2ebf-479b-bd98-5c9412452660)
---

## Features

- 🔁 **Iterable**: Works with `for...of`
- ⏳ **Awaitable**: Can be `await`ed
- 🔗 **Thenable/Catchable**: Supports full promise chaining
- 🧠 **Callable**: Acts like a function
- 🛠️ **Mutable**: Get/Set arbitrary properties
- ⚙️ **Configurable**: Enable/disable async iteration via options

---

## Usage

```js
const singularity = createSingularEntity({ enableAsyncIteration: true });

// Callable
singularity("Hello", "Welcome to the Void"); 

// Awaitable
(async () => {
  const result = await singularity;
  console.log(result);
})();

// Thenable + Catchable
singularity
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));

// Iterable
for (const val of singularity) {
  console.log("Looping:", val);
}

// Async Iterable
(async () => {
  for await (const val of singularity) {
    console.log("Async Looping:", val);
  }
})();

// Property Access
singularity.fooBar = "Some FooBar value";
console.log("singularity.fooBar =", singularity.fooBar);

// Coercion + Tagging
console.log("Coerced:", String(singularity));
console.log(Object.prototype.toString.call(singularity));
