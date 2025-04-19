function createSingularEntity() {
    // Base callable function
    let trap = function (...args) {
      console.log("Function called with args:", args);
    };
  
    // Proper iterable protocol implementation
    const iterable = {
      [Symbol.iterator]() {
        console.log("Iterated");
        let i = 0;
        return {
          next() {
            if (i++ < 3) {
              return { value: `✨ ${i}`, done: false };
            } else {
              return { done: true };
            }
          }
        };
      },

      [Symbol.asyncIterator]() {
        console.log("Async Iterated");
        let i = 0;
        return {
          async next() {
            if (i++ < 3) {
              return { value: `⏳ ${i}`, done: false };
            } else {
              return { done: true };
            }
          }
        };
      }
    };
  
    // Proxy to trap everything
    const proxy = new Proxy(trap, {
      get(target, prop, receiver) {
          
        // Awaitable via `then`
        if (prop === 'then') {
          return (resolve, reject) => {
            target.__hasBeenAwaited = true;
            console.log("Awaited");
            resolve("✅ Await complete");
            return new Promise(() => {}); // to allow chaining
          };
        }

        if (prop === 'catch') {
          return function (rejectHandler) {
            console.log("Caught something? 😬");
            return Promise.resolve("🫣 but everything's fine");
          };
        }
      
        if (prop === 'finally') {
          return function (handler) {
            console.log("Finally block executed");
            handler();
            return Promise.resolve();
          };
        }
      
        // Iterable protocols
        if (prop === Symbol.iterator) {
          return iterable[Symbol.iterator];
        }

        if (prop === Symbol.asyncIterator) {
          return iterable[Symbol.asyncIterator];
        }
        
        if (prop === Symbol.toPrimitive) {
          return () => "🌀 Wizard Entity";
        }

        if (prop === Symbol.toStringTag) {
          return "🌌 Singularity";
        }

        console.log(`Accessed property: '${String(prop)}'`);
        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        console.log(`Set property: '${String(prop)}' =`, value);
        return Reflect.set(target, prop, value, receiver);
      },
  
      apply(target, thisArg, args) {
        return target.apply(thisArg, args);
      }
    });
  
    return proxy;
}

// 🔮 Usage
const singularity = createSingularEntity();

// 🗣️ Callable
singularity("Hello", "Welcome to the Void");

// ⏳ Awaitable
(async () => {
  const result = await singularity;
  console.log(result);
})();

// 🔗 Thenable + Catchable
singularity
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));

// 🔁 Iterable
for (const val of singularity) {
  console.log("Looping:", val);
}

// 🔄 Async Iterable
(async () => {
  for await (const val of singularity) {
    console.log("Async Looping:", val);
  }
})();

// 🧠 Property Get/Set
singularity.fooBar = "Some FooBar value";
console.log("singularity.fooBar = ", singularity.fooBar);

// 🧪 Coercion
console.log("Coerced: " + singularity);
console.log(Object.prototype.toString.call(singularity));
