import { mixed, number, string } from "../dist";

const subject = mixed({
    name: string()
});

const extendsSubject = subject.extends({ name: number(), age: number() });
;
console.log(extendsSubject.parser({ name: 1, age: 17 }));

