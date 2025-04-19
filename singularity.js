function createSingularEntity({ enableAsyncIteration = false } = {}) {
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
      }
    };

    // Conditionally add async iterator
    if (enableAsyncIteration) {
      iterable[Symbol.asyncIterator] = function () {
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
      };
    }
  
    // Cache for property access optimization
    const propertyCache = new Map();

    // Proxy to trap everything
    const proxy = new Proxy(trap, {
      get(target, prop, receiver) {
        // Check cache first
        if (propertyCache.has(prop)) {
          return propertyCache.get(prop);
        }
          
        // Awaitable via `then`
        if (prop === 'then') {
          return (resolve, reject) => {
            target.__hasBeenAwaited = true;
            console.log("Awaited");
            resolve("✅ Await complete");
            return Promise.resolve(); // Fixed: No hanging Promise
          };
        }

        if (prop === 'catch') {
          return function (rejectHandler) {
            console.log("Caught something? 😬");
            // Improved: Call rejectHandler if provided
            return Promise.resolve(rejectHandler ? rejectHandler(null) : "🫣 but everything's fine");
          };
        }
        
        if (prop === 'finally') {
          return function (handler) {
            console.log("Finally block executed");
            handler(); // Call the handler directly
            return Promise.resolve(); // to allow chaining
          };
        }
        
        // Iterable protocol
        if (prop === Symbol.iterator) {
          return iterable[Symbol.iterator];
        }

        // Async iterable protocol
        if (prop === Symbol.asyncIterator && enableAsyncIteration) {
          return iterable[Symbol.asyncIterator];
        }
        
        // Coercion behavior
        if (prop === Symbol.toPrimitive) {
          return () => "🌀 Wizard Entity";
        }

        // Custom string tag for debugging
        if (prop === Symbol.toStringTag) {
          return "🌌 Singularity";
        }

        console.log(`Accessed property: '${String(prop)}'`);
        
        const value = Reflect.get(target, prop, receiver);
        propertyCache.set(prop, value); // Cache the value
        return value;
      },

      set(target, prop, value, receiver) {
        console.log(`Set property: '${String(prop)}' =`, value);
        propertyCache.set(prop, value); // Update cache
        return Reflect.set(target, prop, value, receiver);
      },
  
      apply(target, thisArg, args) {
        return target.apply(thisArg, args);
      }
    });
  
    return proxy;
}
  
// 🔮 Usage
const singularity = createSingularEntity({ enableAsyncIteration: true });

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

// 🧪 Coercion and String Tag
console.log("Coerced: " + singularity);
console.log(Object.prototype.toString.call(singularity));
