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
              // For simulation purposes, we'll just resolve something
              return Promise.resolve("🫣 but everything's fine");
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
        
        console.log(`Accessed property: '${String(prop)}'`);
        
        // Coercion behavior
        if (prop === Symbol.toPrimitive) {
          return () => "🌀 Wizard Entity";
        }
  
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
  
  const singularity = createSingularEntity();
  
  // can be invoked as a Function with any number of arguments
  singularity("Hello", "Welcome to the Void"); 
  
  // can be awaited in async context
  (async () => {
    const result = await singularity;
    console.log(result);
  })();

  // can be chained with `then` and `catch` as a Promise 
  singularity
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));

  // can be Iterated over in any for loop
  for (const val of singularity) {
    console.log("Looping:", val);
  }

  // Set and Access any prop on this JS singularity
singularity.fooBar = "Some FooBar value";
console.log("singularity.fooBar = ", singularity.fooBar);
