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

const composition = 10873
const requiredNumbers = [83, 131]

console.log(
    FermatFactorization(composition)[0] === requiredNumbers[0] ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
    FermatFactorization(composition)
)