# ES6 SYNTAX PREFERRED FOR JS

ES6 (ECMAScript 2015) isn’t just “new syntax”—it’s a shift toward writing cleaner, safer, and more 
maintainable JavaScript. When people say “ES6 practices,” they mean using these features in a disciplined way.

## 1. Prefer let and const over var

    var has function scope → causes bugs
    let & const have block scope → predictable behavior
    const PI = 3.14;   // never changes
    let count = 0;     // changes later

    Rule: Use const by default. Only use let if reassignment is needed.

## 2. Use Arrow Functions (but don’t overuse)

    Cleaner syntax + lexical this.
    const add = (a, b) => a + b;

    Don’t use arrow functions for:
    Object methods
    Constructors

## 3. Destructuring (clean extraction)

    Instead of messy access:
    const user = { name: "Aman", age: 19 };
    const { name, age } = user;
    Also works with arrays:
    const [first, second] = [10, 20];

## 4. Template Literals (ditch string concatenation)

    const name = "Aman";
    console.log(`Hello ${name}`);
    Cleaner + readable than "Hello " + name

## 5. Default Parameters

    function greet(name = "Guest") {
    return `Hello ${name}`;
    }

## 6. Spread & Rest Operators (...)

    Spread (copy/merge)
        const arr = [1, 2];
        const newArr = [...arr, 3];

    Rest (collect arguments)
        function sum(...nums) {
        return nums.reduce((a, b) => a + b, 0);
        }

## 7. Use Modules (import/export)

    Stop using everything in one file.
    // math.js
    export const add = (a, b) => a + b;
    // main.js
    import { add } from './math.js';

## 8. Use Classes (when needed, not blindly)

    class Person {
        constructor(name) {
            this.name = name;
        }
        greet() {
            return `Hi, I'm ${this.name}`;
        }
    }
    But don’t over-engineer — functions are often enough.

## 9. Promises instead of callback hell

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    Even better → use async/await:
    const getData = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
    };

## 10. Use map, filter, reduce (functional style)

    const nums = [1, 2, 3, 4];
    const doubled = nums.map(n => n * 2);
    const even = nums.filter(n => n % 2 === 0);

## 11. Avoid Mutating Data

    Bad:
    arr.push(5);

    Better:
    const newArr = [...arr, 5];
    Helps in React + clean state management

## 12. Use Strict Equality (===)

    5 === "5"  // false (correct)
    5 == "5"   // true (dangerous)

## 13. Optional Chaining (?.) & Nullish Coalescing (??)

    user?.profile?.name
    const name = input ?? "Default";




## 🔹 Optional Chaining (?.)

    Problem it solves:
    Accessing deeply nested properties without crashing your app.

    Without optional chaining:
    const user = {};
    console.log(user.profile.name); 
    // ERROR: Cannot read properties of undefined

    Because profile doesn’t exist.

    With optional chaining:
    console.log(user.profile?.name);

    Output: undefined (no crash)

    How it works:
    If anything before ?. is null or undefined, JS stops there.
    No error, just returns undefined.
    More examples:
    user?.profile?.name
    arr?.[0]
    func?.()

## 🔹 Nullish Coalescing (??)

    Problem it solves:
    Providing a default value only when value is null or undefined

    Using || (common mistake):
    const count = 0;
    console.log(count || 10); // 10 (WRONG)

    Because 0 is treated as falsy.

    Using ??:
    const count = 0;
    console.log(count ?? 10); // 0 (CORRECT)
    Rule:

    ?? only replaces when value is:
        null
        undefined

    NOT when value is:
        0
        false
        ""