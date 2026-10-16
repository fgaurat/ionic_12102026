import { interval, map, share, take, tap,merge } from "rxjs";


let obs1$ = interval(500).pipe(map(x=>`obs1: ${x}`));
let obs2$ = interval(1000).pipe(map(x=>`obs2: ${x}`));


let obs3$ = merge(obs1$,obs2$)

obs3$.pipe(take(5)).subscribe((d) => console.log("ob3", d));