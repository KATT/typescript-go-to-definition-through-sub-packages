import { b } from '@org/b';

b; // <-- ✅ goes to the definition of b
b.a; // <--- ❌ goes to the definition of b (should be a)
b.a.foo; // <--- ❌ goes to the definition of b (should be a.foo)
