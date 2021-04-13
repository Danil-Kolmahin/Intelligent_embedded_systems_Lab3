export const makeRandomWithin = (max = 1, min = 0) => Math.ceil(Math.random() * (max - min + 1)) + min - 1

export const generateChromosome = (chromosomesNumber, geneNumber, min, max) => new Array(chromosomesNumber)
    .fill([], 0, chromosomesNumber)
    .map(() => new Array(geneNumber)
        .fill(0, 0, geneNumber)
        .map(() => makeRandomWithin(max, min))
    )

export const geneticCalculations = (chromosomes, options = {}) => new Promise(r => {
    let count = 0
    while (count < 10000) {
        // console.log(chromosomes)
        // getting deltas
        const getDelta = (xArray, modulo = true) => {
            const delta = -options.abcArgs.reduce((acc, cur, i) => acc - cur * xArray[i], options.yArg)
            return modulo ? (delta <= 0 ? -delta : delta) : delta
        }
        const deltaValues = chromosomes.map(chrome => getDelta(chrome))

        // checking if any delta === 0
        const findResult = chromosomes.find((_, i) => deltaValues[i] === 0)
        if (findResult) r({
            chromosomes,
            deltaValues,
            findResult,
            count,
            toString() {
                return JSON.stringify({
                    chromosomes: JSON.stringify(chromosomes),
                    deltaValues: JSON.stringify(deltaValues),
                    findResult: JSON.stringify(findResult),
                    count
                }, null, 2)
            }
        }.toString())
        count++

        // calculating the chances of becoming a parent
        const parentChances = deltaValues.map(delta => 1 / delta)
        const deltasSum = parentChances.reduce((acc, cur) => acc + cur)
        parentChances.forEach((delta, i) => parentChances[i] = delta / deltasSum)
        parentChances.slice(0, parentChances.length - 1).forEach((_, i) => parentChances[i + 1] += parentChances[i])

        // generating chances of becoming a parent using the roulette method
        const rouletteValues = chromosomes.map(() => Math.random())
        const parents = rouletteValues.map(
            (chance) => chromosomes[parentChances.findIndex(
                (_, i) => parentChances[i] >= chance && ((i > 0 ? parentChances[i - 1] : 0) < chance)
            )]
        )

        // crossbreeding
        const children = []
        parents.forEach((_, i) => {
            if (i % 2 === 0) {
                children[i] = parents[i].slice(0, options.crossoverLine).concat(parents[i + 1].slice(options.crossoverLine))
                children[i + 1] = parents[i + 1].slice(0, options.crossoverLine).concat(parents[i].slice(options.crossoverLine))
            }
        })

        // mutations
        children.forEach((_, i) => {
                if (Math.random() >= 0.5) {
                    const geneNumber = makeRandomWithin(children[i].length)
                    const addingValue = makeRandomWithin(options.maxMutationsValue, options.minMutationsValue)
                    if (children[i][geneNumber] + addingValue >= options.minGeneValue &&
                        children[i][geneNumber] + addingValue <= options.maxGeneValue) children[i][geneNumber] += addingValue
                }
            }
        )

        chromosomes = children
    }
    r('count is over 9999')
})

// export const asyncGeneticCalculations = (params, isString = true) => new Promise(r => r(geneticCalculations(params).toString()))

console.log(geneticCalculations(generateChromosome(4, 4, 1, 5), {
    abcArgs: [1, 1, 2, 4],
    yArg: 21,

    minGeneValue: 1,
    maxGeneValue: 5,

    crossoverLine: 2,

    minMutationsValue: -1,
    maxMutationsValue: 1,
}))