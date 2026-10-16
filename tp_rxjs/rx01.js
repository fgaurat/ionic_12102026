import { interval, map, take, tap } from "rxjs";

// interval(500).pipe(
//     take(5),
//     tap(d=>console.log('tap',d)),
//     map(d => d*10),
//     tap(d=>console.log('tap 2',d)),
// ).subscribe(console.log);

let obs$ = interval(500)
obs$ = obs$.pipe(
    take(5)
)

obs$.subscribe(d => console.log("obs1",d))
obs$.subscribe(d => console.log("obs2",d))