const FermatFactorization = (n) => {
    const s = Math.ceil(Math.sqrt(n))
    const maximumIterationsNumber = 100
    let y
    for (let k = 0; k < maximumIterationsNumber; k++) {
        y = (s + k) ** 2 - n
        y = Math.sqrt(y)
        if (Math.floor(y) === y) return [(s + k - y), (s + k + y)]
    }
}

console.log(FermatFactorization(14647))