const questions = [
  // ======================
  // 🟡 MEDIUM (q1–q30)
  // ======================

  {
    id: "q1",
    question: "What is the output?",
    options: ["0 1 2", "1 2 3", "0 1", "Error"],
    correct: "0 1",
    code: `for i in range(3):
    if i == 2:
        break
    print(i, end=" ")`,
  },

  {
    id: "q2",
    question: "What is the output?",
    options: ["[2,3,4]", "[1,2,3,4]", "[0,1,2,3,4]", "Error"],
    correct: "[2,3,4]",
    code: `print(list(filter(lambda x: x > 1, [-3,-2,-1,0,1,2,3,4])))`,
  },

  {
    id: "q3",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "True",
    code: `print(isinstance(5, int))`,
  },

  {
    id: "q4",
    question: "What is the output?",
    options: ["[1,2,3]", "[1,2]", "Error", "None"],
    correct: "[1,2]",
    code: `a=[1,2,3]
a.pop()
print(a)`,
  },
  {
    id: "q5",
    question: "What is the output?",
    options: ["[2,4,6]", "1,2,3", "[1,2,3]", "[1,4,9]"],
    correct: "[2,4,6]",
    code: `print(list(map(lambda x:x*2,[1,2,3])))`,
  },

  {
    id: "q6",
    question: "What is the output?",
    options: ["6", "12", "0", "None"],
    correct: "6",
    code: `print(sum({1,1,2,2,3,3}))`,
  },

  {
    id: "q7",
    question: "What is the output?",
    options: ["{'a':1,'b':2}", "['a','b']", "('a','b')", "[1,2]"],
    correct: "['a','b']",
    code: `print(list({'a':1,'b':2}))`,
  },

  {
    id: "q8",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "False",
    code: `print(10 > 5 > 10)`,
  },

  {
    id: "q9",
    question: "What is the output?",
    options: ["[1,2,3,4]", "[1,2,3]", "Error", "None"],
    correct: "[1,2,3,4]",
    code: `a=[1,2]
a+= [3,4]
print(a)`,
  },

  {
    id: "q10",
    question: "What is the output?",
    options: ["3", "2", "Error", "1"],
    correct: "2",
    code: `print(len((1,)))`,
  },

  {
    id: "q11",
    question: "What is the output?",
    options: ["Error", "True", "False", "None"],
    correct: "True",
    code: `print(type({}) == dict)`,
  },

  {
    id: "q12",
    question: "What is the output?",
    options: ["0", "1", "Error", "None"],
    correct: "1",
    code: `print(True + False)`,
  },

  {
    id: "q13",
    question: "What is the output?",
    options: ["2", "3", "IndexError", "1"],
    correct: "2",
    code: `x=[1,2,3]
print(x[-2])`,
  },

  {
    id: "q14",
    question: "What type of error occurs?",
    options: ["TypeError", "AttributeError", "ValueError", "No Error"],
    correct: "AttributeError",
    code: `a=10
a.append(5)`,
  },

  {
    id: "q15",
    question: "What is the output?",
    options: ["[1,2]", "[2,3]", "Error", "None"],
    correct: "[2,3]",
    code: `print([i for i in [1,2,1,3,1] if i!=1])`,
  },

  {
    id: "q16",
    question: "What type of error occurs?",
    options: ["TypeError", "AttributeError", "NameError", "No Error"],
    correct: "TypeError",
    code: `for i in 5:
    print(i)`,
  },

  {
    id: "q17",
    question: "What type of error occurs?",
    options: ["TypeError", "KeyError", "IndexError", "No Error"],
    correct: "KeyError",
    code: `d={}
print(d["x"])`,
  },

  {
    id: "q18",
    question: "What is the output?",
    options: ["Error", "1", "True", "False"],
    correct: "True",
    code: `print(bool(1))`,
  },

  {
    id: "q19",
    question: "What is the output?",
    options: ["[1,2,3]", "[3,2,1]", "Error", "None"],
    correct: "[3,2,1]",
    code: `print(sorted([3,2,1]))`,
  },

  {
    id: "q20",
    question: "What is the output?",
    options: ["Error", "None", "True", "False"],
    correct: "None",
    code: `def f():
    pass
print(f())`,
  },

  {
    id: "q21",
    question: "What is the output?",
    options: ["5", "10", "Error", "None"],
    correct: "10",
    code: `x=5
x*=2
print(x)`,
  },

  {
    id: "q22",
    question: "What is the output?",
    options: ["[[1],[2]]", "[[1,2],[1,2]]", "[[1,2],[2]]", "Error"],
    correct: "[[1,2],[2]]",
    code: `a=[[1],[2]]
b=a
b[0].append(2)
print(a)`,
  },

  {
    id: "q23",
    question: "What is the output?",
    options: ["Error", "1", "0", "None"],
    correct: "1",
    code: `print(len({1,1,1}))`,
  },

  {
    id: "q24",
    question: "What is the output?",
    options: ["2", "Error", "1", "3"],
    correct: "1",
    code: `print([1,2,3].index(2))`,
  },

  {
    id: "q25",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "False",
    code: `print(bool(0.0))`,
  },

  {
    id: "q26",
    question: "What is the output?",
    options: ["Error", "True", "False", "None"],
    correct: "True",
    code: `print(isinstance("abc", str))`,
  },

  {
    id: "q27",
    question: "What is the output?",
    options: ["abc", "a b c", "Error", "None"],
    correct: "a b c",
    code: `print(" ".join("abc"))`,
  },

  {
    id: "q28",
    question: "What is the output?",
    options: ["[1,2,3]", "[1,2]", "Error", "None"],
    correct: "[1,2]",
    code: `a=[1,2,3]
del a[-1]
print(a)`,
  },

  {
    id: "q29",
    question: "What is the output?",
    options: ["24", "1", "4", "ValueError"],
    correct: "24",
    code: `def f(n):
    try:
        if n == 1:
            raise ValueError
        return n * f(n-1)
    except:
        return 1

print(f(4))`,
  },

  {
    id: "q30",
    question: "What is the output?",
    options: ["0 1 E 0 1 0", "0 1 2 0 1", "Error", "None"],
    correct: "0 1 E 0 1 0",
    code: `def f(n):
    for i in range(n):
        try:
            if i == 2:
                raise Exception
            print(i, end=" ")
        except:
            print("E", end=" ")
    if n > 0:
        f(n-1)

f(3)`,
  },

  {
    id: "q31",
    question: "What is the output?",
    options: ["Error", "3", "5", "None"],
    correct: "Error",
    code: `a=(1,2,3)
a[0]=5`,
  },

  {
    id: "q32",
    question: "What is the output?",
    options: ["[1,2,3,4]", "[4]", "Error", "None"],
    correct: "[4]",
    code: `a=[1,2,3]
b=a
a=[4]
print(b)`,
  },

  {
    id: "q33",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "True",
    code: `print({1,2} & {2,3} == {2})`,
  },

  {
    id: "q34",
    question: "What is the output?",
    options: ["[1,2,3]", "[3,2,1]", "Error", "None"],
    correct: "[1,2,3]",
    code: `a=[1,2,3]
b=a[:]
b.reverse()
print(a)`,
  },

  {
    id: "q35",
    question: "What is the output?",
    options: ["TypeError", "5", "ValueError", "10"],
    correct: "TypeError",
    code: `print(5 + "5")`,
  },

  {
    id: "q36",
    question: "What does 'is' operator check?",
    options: ["Value equality", "Object identity", "Type equality", "None"],
    correct: "Object identity",
  },

  {
    id: "q37",
    question:
      "Which concept allows using same function name with different behavior?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
    correct: "Polymorphism",
  },

  {
    id: "q38",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "False",
    code: `print([] is [])`,
  },

  {
    id: "q39",
    question: "What is the output?",
    options: ["1", "2", "Error", "None"],
    correct: "2",
    code: `class A:
    x=1
a=A()
a.x=2
print(a.x)`,
  },

  {
    id: "q40",
    question: "What is the output?",
    options: ["1", "2", "Error", "None"],
    correct: "1",
    code: `class A:
    x=1
a=A()
print(a.x)`,
  },

  {
    id: "q41",
    question: "What is the output?",
    options: ["ValueError", "1", "AttributeError", "None"],
    correct: "AttributeError",
    code: `class A:
    x = 1

a = A()
del a.x
print(A.x)`,
  },

  {
    id: "q42",
    question: "What is the output?",
    options: [
      "[1] [1,2] [1,2,3] [1,2,3,4]",
      "[1,2,3,4] [1,2,3,4] [1,2,3,4] [1,2,3,4]",
      "Error",
      "None",
    ],
    correct: "[1,2,3,4] [1,2,3,4] [1,2,3,4] [1,2,3,4]",
    code: `def f(x, l=[]):
    l.append(x)
    return l

print(f(1), f(2), f(3), f(4))`,
  },

  {
    id: "q43",
    question: "What is the output?",
    options: ["True", "False", "Error", "None"],
    correct: "True",
    code: `print(bool("False"))`,
  },

  {
    id: "q44",
    question: "What is the output?",
    options: ["0", "1", "Error", "None"],
    correct: "0",
    code: `print(False * 10)`,
  },

  {
    id: "q45",
    question: "What is the output?",
    options: ["Error", "3", "2", "1"],
    correct: "3",
    code: `def f(a,b=2):
    return a+b
print(f(1))`,
  },

  {
    id: "q46",
    question: "What is the output?",
    options: ["TypeError", "True", "False", "1"],
    correct: "TypeError",
    code: `print(len(1))`,
  },

  {
    id: "q47",
    question: "What is the output?",
    options: ["Value Error", "1", "Type Error", "2"],
    correct: "Value Error",
    code: `def f(a, b):
    return a+b

print(f(1))`,
  },

  {
    id: "q48",
    question: "What is the output?",
    options: ["[1,2]", "[2,3]", "[1,2,3]", "Error"],
    correct: "[2,3]",
    code: `print([i for i in range(5) if i%2 if i>1])`,
  },

  {
    id: "q49",
    question: "What is the output?",
    options: ["[0,1,2]", "[2,2,2]", "[0,0,0]", "Error"],
    correct: "[2,2,2]",
    code: `funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,
  },

  {
    id: "q50",
    question: "What is the output?",
    options: ["Error", "2", "3", "None"],
    correct: "2",
    code: `x=2
def f():
    global x
    x=3
f()
print(2)`,
  },
];

export default questions;

// const questions = [
//   // ======================
//   // 🟢 SIMPLE (q1–q20)
//   // ======================
//   {
//     id: "q1",
//     question: "What is the output?",
//     options: ["3", "6", "Error", "None"],
//     correct: "6",
//     code: `print(sum([1,2,3]))`,
//   },
//   {
//     id: "q2",
//     question: "What is the output?",
//     options: ["[1,2,3]", "[3,2,1]", "Error", "None"],
//     correct: "[3,2,1]",
//     code: `print(list(reversed([1,2,3])))`,
//   },
//   {
//     id: "q3",
//     question: "What is the output?",
//     options: ["3", "2", "Error", "None"],
//     correct: "3",
//     code: `print(len("abc"))`,
//   },
//   {
//     id: "q4",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "False",
//     code: `print(bool(""))`,
//   },
//   {
//     id: "q5",
//     question: "What is the output?",
//     options: ["[1,2]", "[2,3]", "[1,2,3]", "Error"],
//     correct: "[2,3]",
//     code: `print([x for x in [1,2,3] if x>1])`,
//   },
//   {
//     id: "q6",
//     question: "What is the output?",
//     options: ["abc", "a b c", "['a','b','c']", "Error"],
//     correct: "abc",
//     code: `print("".join(["a","b","c"]))`,
//   },
//   {
//     id: "q7",
//     question: "Which function returns maximum value?",
//     options: ["max()", "maximum()", "top()", "high()"],
//     correct: "max()",
//   },
//   {
//     id: "q8",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "True",
//     code: `print(5 in [1,2,5])`,
//   },
//   {
//     id: "q9",
//     question: "What is the output?",
//     options: ["[0,1,2]", "[1,2,3]", "[0,1]", "Error"],
//     correct: "[0,1,2]",
//     code: `print(list(range(3)))`,
//   },
//   {
//     id: "q10",
//     question: "What is the output?",
//     options: ["2", "3", "Error", "None"],
//     correct: "2",
//     code: `print(abs(-2))`,
//   },

//   {
//     id: "q11",
//     question: "What is the output?",
//     options: ["HELLO", "hello", "Error", "None"],
//     correct: "HELLO",
//     code: `print("hello".upper())`,
//   },
//   {
//     id: "q12",
//     question: "What is the output?",
//     options: ["['a','b']", "ab", "Error", "None"],
//     correct: "['a','b']",
//     code: `print(list("ab"))`,
//   },
//   {
//     id: "q13",
//     question: "What is the output?",
//     options: ["1", "0", "Error", "None"],
//     correct: "1",
//     code: `print(int(True))`,
//   },
//   {
//     id: "q14",
//     question: "What is the output?",
//     options: ["26", "36", "21", "Error"],
//     correct: "26",
//     code: `def f(a, b=5, c=10):
//     return a + b + c

// print(f(1, c=20))`,
//   },
//   {
//     id: "q15",
//     question: "What is the output?",
//     options: ["[1,4,9]", "[1,2,3]", "Error", "None"],
//     correct: "[1,4,9]",
//     code: `print([x*x for x in [1,2,3]])`,
//   },
//   {
//     id: "q16",
//     question: "What is the output?",
//     options: ["abc", "a,b,c", "Error", "None"],
//     correct: "a,b,c",
//     code: `print(",".join(["a","b","c"]))`,
//   },
//   {
//     id: "q17",
//     question: "What is the output?",
//     options: ["True False", "False True", "False False", "True True"],
//     correct: "False True",
//     code: `print(bool([]), bool([0]))`,
//   },
//   {
//     id: "q18",
//     question: "What is the output?",
//     options: ["0", "1", "Error", "None"],
//     correct: "0",
//     code: `print(len([]))`,
//   },
//   {
//     id: "q19",
//     question: "What is the output?",
//     options: ["5", "3", "Error", "None"],
//     correct: "3",
//     code: `print(len({1,2,2,3,3}))`,
//   },

//   {
//     id: "q20",
//     question: "What is the output?",
//     options: ["[(1,4),(2,5),(3,None)]", "[(1,4),(2,5)]", "Error", "None"],
//     correct: "[(1,4),(2,5)]",
//     code: `print(list(zip([1,2,3],[4,5])))`,
//   },

//   // ======================
//   // 🟡 MEDIUM (q21–q40)
//   // ======================
//   {
//     id: "q21",
//     question: "What is the output?",
//     options: ["[0,2,4]", "[1,3,5]", "Error", "None"],
//     correct: "[0,2,4]",
//     code: `print([x for x in range(6) if x%2==0])`,
//   },
//   {
//     id: "q22",
//     question: "What is the output?",
//     options: ["['a','b','c']", "[abc]", "Error", "None"],
//     correct: "['a','b','c']",
//     code: `print([i for i in "abc"])`,
//   },

//   {
//     id: "q23",
//     question: "What is the output?",
//     options: ["[1] [2]", "[1] [1,2]", "[1,2] [1,2]", "Error"],
//     correct: "[1] [1,2]",
//     code: `def f(x, y=[]):
//     y.append(x)
//     return y

// print(f(1),end="")
// print(f(2))`,
//   },

//   {
//     id: "q24",
//     question: "What is the output?",
//     options: ["None", "[1,2,3]", "Error", "[]"],
//     correct: "None",
//     code: `a=[1,2,3]; print(a.sort())`,
//   },
//   {
//     id: "q25",
//     question: "What is the output?",
//     options: ["Error", "3", "0", "None"],
//     correct: "Error",
//     code: `print(min([]))`,
//   },

//   {
//     id: "q26",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "True",
//     code: `print(all([1,2,3]))`,
//   },
//   {
//     id: "q27",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "True",
//     code: `print(any([0,0,5]))`,
//   },
//   {
//     id: "q28",
//     question: "What is the output?",
//     options: ["[(0,'a')]", "[(0,'a'),(1,'b')]", "Error", "None"],
//     correct: "[(0,'a'),(1,'b')]",
//     code: `print(list(enumerate(['a','b'])))`,
//   },
//   {
//     id: "q29",
//     question: "What is the output?",
//     options: ["[1,4,9]", "[1,2,3]", "Error", "None"],
//     correct: "[1,4,9]",
//     code: `print(list(map(lambda x:x*x,[1,2,3])))`,
//   },
//   {
//     id: "q30",
//     question: "What is the output?",
//     options: ["[4,5]", "[3,4,5]", "[2,3,4,5]", "Error"],
//     correct: "[4,5]",
//     code: `print(list(filter(lambda x:x>3,[2,3,4,5])))`,
//   },

//   {
//     id: "q31",
//     question: "What is the output?",
//     options: ["p", "h", "n", "Error"],
//     correct: "h",
//     code: `print(min("python"))`,
//   },

//   {
//     id: "q32",
//     question: "What is the output?",
//     options: ["Error", "True", "False", "None"],
//     correct: "Error",
//     code: `print({[1]:2})`,
//   },
//   {
//     id: "q33",
//     question: "What is the output?",
//     options: ["[1,3]", "[2,4]", "Error", "None"],
//     correct: "[1,3]",
//     code: `print(list(filter(lambda x: x%2, [1,2,3,4])))`,
//   },

//   {
//     id: "q34",
//     question: "What is the output?",
//     options: ["5", "Error", "None", "0"],
//     correct: "5",
//     code: `x=5
// def f():
//     print(x)
// f()`,
//   },
//   {
//     id: "q35",
//     question: "What is the output?",
//     options: ["Error", "5", "None", "0"],
//     correct: "Error",
//     code: `def f():
//     print(x)
//     x=5
// f()`,
//   },

//   {
//     id: "q36",
//     question: "What is the output?",
//     options: ["10", "5", "Error", "None"],
//     correct: "10",
//     code: `x=5
// def f():
//     global x
//     x=10
// f()
// print(x)`,
//   },
//   {
//     id: "q37",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "False",
//     code: `print({} == set())`,
//   },

//   {
//     id: "q38",
//     question: "What is the output?",
//     options: ["[1,2,3]", "[1,2,3,4]", "Error", "None"],
//     correct: "[1,2,3]",
//     code: `a=[1,2,3]; b=a.copy(); b.append(4); print(a)`,
//   },
//   {
//     id: "q39",
//     question: "Which mode is used for appending file?",
//     options: ["r", "w", "a", "x"],
//     correct: "a",
//   },
//   {
//     id: "q40",
//     question: "What is the output?",
//     options: ["[2,4]", "[0,2,4]", "Error", "None"],
//     correct: "[2,4]",
//     code: `print([i for i in range(5) if i%2==0 if i>1])`,
//   },

//   {
//     id: "q41",
//     question: "What is the output?",
//     options: ["15", "120", "10", "Error"],
//     correct: "15",
//     code: `def f(n):
//     if n == 0:
//         return 0
//     return n + f(n-1)

// print(f(5))`,
//   },

//   {
//     id: "q42",
//     question: "What is the output?",
//     options: ["[5] [5,5] [5,5,5]", "[5,5,5]", "[5] [5] [5]", "Error"],
//     correct: "[5] [5,5] [5,5,5]",
//     code: `def f(x=[]):
//     x.append(5)
//     return x

// print(f(), f(), f())`,
//   },

//   {
//     id: "q43",
//     question: "What is the output?",
//     options: ["Error", "True", "False", "None"],
//     correct: "True",
//     code: `print(type(lambda x:x)==type(lambda y:y))`,
//   },
//   {
//     id: "q44",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "False",
//     code: `print(5 is 5.0)`,
//   },
//   {
//     id: "q45",
//     question: "What is the output?",
//     options: ["True", "False", "Error", "None"],
//     correct: "True",
//     code: `print(5==5.0)`,
//   },

//   {
//     id: "q46",
//     question: "What is the output?",
//     options: ["Hi None", "None Hi", "Hi", "None"],
//     correct: "Hi None",
//     code: `print(print("Hi"))`,
//   },

//   {
//     id: "q47",
//     question: "What is the output?",
//     options: [
//       "[(1,2),(2,3)]",
//       "{1:2,2:3}",
//       "{(1,2),(2,3)}",
//       "[(1,2),(2,3),(None,None)]",
//     ],
//     correct: "[(1,2),(2,3)]",
//     code: `print(list(zip([1,2],[2,3])))`,
//   },

//   {
//     id: "q48",
//     question: "What is the output?",
//     options: ["False", "True", "Error", "None"],
//     correct: "False",
//     code: `print(bool([]))`,
//   },
//   {
//     id: "q49",
//     question: "What is the output?",
//     options: [
//       "{10:2,100:3,1000:4}",
//       "{10:1,100:2,1000:3}",
//       "{2:10,3:100,4:1000}",
//       "{10:'2',100:'3',1000:'4'}",
//     ],
//     correct: "{10:2,100:3,1000:4}",
//     code: `print({i:len(str(i)) for i in [10,100,1000]})`,
//   },

//   {
//     id: "q50",
//     question: "What is the output?",
//     options: ["6", "9", "Error", "None"],
//     correct: "9",
//     code: `def f(*args):
//     return sum(args)

// print(f(1,2,3) + f(1,2))`,
//   },
// ];

// export default questions;

// // [
// //   {
// //     id: "q1",
// //     question: "Which of the following is a valid Python identifier?",
// //     options: ["2var", "var_name", "var-name", "var name"],
// //     correct: "var_name",
// //   },
// //   {
// //     id: "q2",
// //     question: "What is the output of following code?",
// //     options: ["3.33", "3", "4", "Error"],
// //     correct: "3",
// //     code: `print(10 // 3)`,
// //   },
// //   {
// //     id: "q3",
// //     question: "Which are Boolean values?",
// //     options: ["True, False", "Yes, No", "1, 0", "true, false"],
// //     correct: "True, False",
// //   },
// //   {
// //     id: "q4",
// //     question: "What is the output of the following code?",
// //     options: ["2.5", "2", "3", "Error"],
// //     correct: "2.5",
// //     code: `x = 5
// // y = 2
// // print(x / y)`,
// //   },

// //   {
// //     id: "q5",
// //     question: "What will be the output of the following code?",
// //     options: ["No error", "TypeError", "SyntaxError", "ValueError"],
// //     correct: "TypeError",
// //     code: `x = "10"
// // y = 5
// // print(x + y)`,
// //   },

// //   {
// //     id: "q6",
// //     question: "What will be the output of the following code?",
// //     options: ["True", "False", "0", "1"],
// //     correct: "False",
// //     code: `print(bool(0))`,
// //   },

// //   {
// //     id: "q7",
// //     question: "What will be the output of the following code?",
// //     options: ["H", "e", "l", "o"],
// //     correct: "l",
// //     code: `x = "Hello"
// // print(x[-2])`,
// //   },

// //   {
// //     id: "q8",
// //     question: "What will be the output of the following code?",
// //     options: ["553", "103", "55 + 3", "Error"],
// //     correct: "553",
// //     code: `print('5' * 2 + '3')`,
// //   },
// //   {
// //     id: "q9",
// //     question: "What will be the output of the following code?",
// //     options: ["True", "False", "Error", "None"],
// //     correct: "True",
// //     code: `print(0.0 == False)`,
// //   },

// //   {
// //     id: "q10",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "Error", "None"],
// //     correct: "A",
// //     code: `x = 10
// // if x > 5:
// //     print("A")
// // else:
// //     print("B")`,
// //   },
// //   {
// //     id: "q11",
// //     question: "How do you define a string in Python?",
// //     options: ['"Hello"', "'Hello'", "'''Hello'''", "All of the above"],
// //     correct: "All of the above",
// //   },
// //   {
// //     id: "q12",
// //     question: "Which statement is TRUE about Python variables?",
// //     options: [
// //       "Variables must be declared before use",
// //       "Variables are created when assigned a value",
// //       "Python requires type declaration",
// //       "Variables cannot change type",
// //     ],
// //     correct: "Variables are created when assigned a value",
// //   },
// //   {
// //     id: "q13",
// //     question: "Which is NOT a valid assignment in Python?",
// //     options: ["x = y = 10", "x, y = 1, 2", "x = 10", "10 = x"],
// //     correct: "10 = x",
// //   },
// //   {
// //     id: "q14",
// //     question:
// //       "Which is the correct syntax of a conditional statement in Python?",
// //     options: ["if x > 5:", "if (x > 5)", "if x > 5 then", "if x > 5 {}"],
// //     correct: "if x > 5:",
// //   },
// //   {
// //     id: "q15",
// //     question: "Which keyword is used for multiple conditions in Python?",
// //     options: ["else if", "elif", "elseif", "ifelse"],
// //     correct: "elif",
// //   },
// //   {
// //     id: "q16",
// //     question: "What will be the output of the following code?",
// //     options: ["True", "False", "0", "Error"],
// //     correct: "False",
// //     code: `x = 0
// // if x:
// //     print('True')
// // else:
// //     print('False')`,
// //   },
// //   {
// //     id: "q17",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "A B", "Error"],
// //     correct: "B",
// //     code: `x = 5
// // if x > 10:
// //     print('A')
// // print('B')`,
// //   },

// //   {
// //     id: "q18",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "Error", "None"],
// //     correct: "A",
// //     code: `x = 5
// // print('A') if x > 2 else print('B')`,
// //   },
// //   {
// //     id: "q19",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "A B", "Error"],
// //     correct: "A B",
// //     code: `x = 6
// // if x > 2:
// //     print('A')
// // if x > 5:
// //     print('B')`,
// //   },
// //   {
// //     id: "q20",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "C", "Error"],
// //     correct: "B",
// //     code: `x = 3
// // result = 'A' if x > 5 else 'B'
// // print(result)`,
// //   },
// //   {
// //     id: "q21",
// //     question: "What will be the output of the following code?",
// //     options: ["A", "B", "Default", "Error"],
// //     correct: "B",
// //     code: `x = 2
// // match x:
// //     case 1:
// //         print('A')
// //     case 2:
// //         print('B')
// //     case _:
// //         print('Default')`,
// //   },
// //   {
// //     id: "q22",
// //     question: "What does '_' represent in match-case?",
// //     options: ["Variable", "Default case", "Error", "Loop"],
// //     correct: "Default case",
// //   },
// //   {
// //     id: "q23",
// //     question: "What will be the output of the following code?",
// //     options: ["1 2 3", "0 1 2", "0 1 2 3", "Error"],
// //     correct: "0 1 2",
// //     code: `for i in range(3):
// //     print(i)`,
// //   },
// //   {
// //     id: "q24",
// //     question: "What will be the output of the following code?",
// //     options: ["1 2 3", "0 1 2", "1 2", "Error"],
// //     correct: "1 2 3",
// //     code: `for i in range(1, 4):
// //     print(i, end=' ')`,
// //   },
// //   {
// //     id: "q25",
// //     question: "What will be the output of the following code?",
// //     options: ["5 4 3 2 1", "4 3 2 1 0", "5 4 3 2", "Error"],
// //     correct: "5 4 3 2 1",
// //     code: `for i in range(5, 0, -1):
// //     print(i, end=' ')`,
// //   },
// //   {
// //     id: "q26",
// //     question: "What will be the output of the following code?",
// //     options: ["0 1 2", "1 2", "0 1", "Error"],
// //     correct: "0 1",
// //     code: `i = 0
// // while i < 3:
// //     if i == 2:
// //         break
// //     print(i, end=' ')
// //     i += 1`,
// //   },
// //   {
// //     id: "q27",
// //     question: "What will be the output of the following code?",
// //     options: ["0 1 2 Done", "0 1", "Done", "Error"],
// //     correct: "0 1",
// //     code: `for i in range(3):
// //     if i == 2:
// //         break
// //     print(i, end=' ')
// // else:
// //     print('Done')`,
// //   },
// //   {
// //     id: "q28",
// //     question: "What will be the output of the following code?",
// //     options: ["Infinite loop", "0 1 2", "Error", "None"],
// //     correct: "Infinite loop",
// //     code: `i = 0
// // while i < 3:
// //     print(i)
// //     `,
// //   },
// //   {
// //     id: "q29",
// //     question: "What will be the output of the following code?",
// //     options: ["1 2 3", "0 1 2", "Error", "Infinite loop"],
// //     correct: "Infinite loop",
// //     code: `i = 0
// // while i < 3:
// //     print(i)
// //     if i == 1:
// //         continue
// //     i += 1`,
// //   },
// //   {
// //     id: "q30",
// //     question: "What will be the output of the following code?",
// //     options: ["0 1 2", "0 1", "0 1 2 3", "Error"],
// //     correct: "0 1 2",
// //     code: `for i in range(4):
// //     if i == 3:
// //         continue
// //     print(i, end=' ')`,
// //   },
// //   {
// //     id: "q31",
// //     question: "What will be the output of the following code?",
// //     options: ["['a','b','c']", "['abc']", "Value Error", "None"],
// //     correct: "['a','b','c']",
// //     code: `print(list("abc"))`,
// //   },
// //   {
// //     id: "q32",
// //     question: "Which is a correct dictionary in Python?",
// //     options: ["{1,2,3}", '{"a":1, "b":2}', '["a":1]', "(1:2)"],
// //     correct: '{"a":1, "b":2}',
// //   },
// //   {
// //     id: "q33",
// //     question: "What will be the output of the following code?",
// //     options: ["[1,2,3]", "[1,2,3,4]", "Error", "None"],
// //     correct: "[1,2,3,4]",
// //     code: `x = [1,2,3]
// // x.append(4)
// // print(x)`,
// //   },
// //   {
// //     id: "q34",
// //     question: "What will be the output of the following code?",
// //     options: ["[1,3,5]", "[0,2,4]", "[2,4]", "Error"],
// //     correct: "[0,2,4]",
// //     code: `print([i for i in range(5) if i%2==0])`,
// //   },
// //   {
// //     id: "q35",
// //     question: "Which data structure is mutable in Python?",
// //     options: ["tuple", "string", "list", "int"],
// //     correct: "list",
// //   },
// //   {
// //     id: "q36",
// //     question: "Which data type does NOT allow duplicate values?",
// //     options: ["list", "tuple", "set", "dict"],
// //     correct: "set",
// //   },
// //   {
// //     id: "q37",
// //     question: "What will be the output of the following code?",
// //     options: ["2", "3", "4", "Error"],
// //     correct: "3",
// //     code: `a = [1, 2, 3]
// // print(len(a))`,
// //   },
// //   {
// //     id: "q38",
// //     question: "Which data structure is ordered and immutable?",
// //     options: ["list", "set", "tuple", "dict"],
// //     correct: "tuple",
// //   },
// //   {
// //     id: "q39",
// //     question: "Which data structure uses key-value pairs?",
// //     options: ["list", "tuple", "set", "dict"],
// //     correct: "dict",
// //   },
// //   {
// //     id: "q40",
// //     question: "Which operation is NOT allowed on tuple?",
// //     options: ["access", "iteration", "modification", "indexing"],
// //     correct: "modification",
// //   },
// //   {
// //     id: "q41",
// //     question: "What will be the output of the following code?",
// //     options: ["1", "2", "3", "Error"],
// //     correct: "1",
// //     code: `d = {"a": 1, "b": 2}
// // print(d["a"])`,
// //   },
// //   {
// //     id: "q42",
// //     question: "What will be the output of the following code?",
// //     options: ["Hlo", "Helo", "Hello", "Error"],
// //     correct: "Hlo",
// //     code: `s = "Hello"
// // print(s[::2])`,
// //   },
// //   {
// //     id: "q43",
// //     question: "What will be the output of the following code?",
// //     options: ["Hello", "olleH", "olH", "Error"],
// //     correct: "olH",
// //     code: `s = "Hello"
// // print(s[::-2])`,
// //   },
// //   {
// //     id: "q44",
// //     question: "What will be the output of the following code?",
// //     options: ["[0, 1, 2, 3, 4]", "[1, 3, 5]", "[0, 2, 4]", "Error"],
// //     correct: "[1, 3, 5]",
// //     code: `print([x for x in range(6) if x % 2 == 1])`,
// //   },
// //   {
// //     id: "q45",
// //     question: "What will be the output of the following code?",
// //     options: ["{'x': 9}", "{'x': 3}", "{9: 'x'}", "Error"],
// //     correct: "{'x': 9}",
// //     code: `print({x: x**2 for x in [3]})`,
// //   },
// //   {
// //     id: "q46",
// //     question: "What will be the output of the following code?",
// //     options: ["[1, 4, 9, 16]", "[1, 2, 3, 4]", "[2, 4, 6, 8]", "Error"],
// //     correct: "[1, 4, 9, 16]",
// //     code: `print([x**2 for x in range(1, 5)])`,
// //   },
// //   {
// //     id: "q47",
// //     question: "Which operation gives common elements of two sets?",
// //     options: ["union", "difference", "intersection", "add"],
// //     correct: "intersection",
// //   },
// //   {
// //     id: "q48",
// //     question: "What will be the output of the following code?",
// //     options: ["{1, 2, 3}", "{1, 2}", "{2, 3}", "Error"],
// //     correct: "{1, 2, 3}",
// //     code: `a = {1, 2}
// // b = {2, 3}
// // print(a | b)`,
// //   },
// //   {
// //     id: "q49",
// //     question: "What happens if you use remove() on a missing element in a set?",
// //     options: ["Nothing", "Error", "False", "None"],
// //     correct: "Error",
// //   },
// //   {
// //     id: "q50",
// //     question: "Which of the following is NOT allowed in a set?",
// //     options: ["int", "tuple", "list", "string"],
// //     correct: "list",
// //   },
// // ];
