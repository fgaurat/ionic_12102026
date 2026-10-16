import { interval, map, share, take, tap,merge, switchMap } from "rxjs";

let obs$ = interval(1000).pipe(
    take(5),
    tap(x=>console.log("avant ",x  )),
    switchMap(()=> interval(200).pipe(take(5))),
    tap(x=>console.log("\taprès ",x  )),
    switchMap(()=> interval(100).pipe(take(5))),
    tap(x=>console.log("\t\taprès après ",x  )),

).subscribe(x=>console.log("apres ",x ))

