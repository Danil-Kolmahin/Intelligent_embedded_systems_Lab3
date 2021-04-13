const second = 1000

export const perceptronModel = (
    {
        P = 1,
        func = (dot, wArray) => dot.reduce((res, x, i) => res + x * wArray[i], 0),
        dots = [[0, 0]],
        learningSpeed = 0.1,
        timeDeadline = null,
        iterationsNumber = null
    } = {}
) => {
    if (iterationsNumber) {
        timeDeadline = null
    } else if (!timeDeadline) {
        iterationsNumber = 100
    }
    let isContinue = true
    let timeOut
    if (timeDeadline) timeOut = setTimeout(() => isContinue = false, timeDeadline * second)

    const getDelta = (i) => P - func(dots[i], wArray)
    let wArray = new Array(dots[0].length).fill(0, 0, dots[0].length)
    for (let iteration = 0; iteration < (timeDeadline ? Infinity : iterationsNumber); iteration++) {
        if (!isContinue) return 'timeDeadline >= iterationsNumber'
        // check if satisfied
        if (getDelta(0) < 0 && getDelta(1) > 0) {
            clearTimeout(timeOut)
            return {
                wArray,
                w1: P - getDelta(0),
                w2: P - getDelta(1),
                iteration,
                toString() {
                    return JSON.stringify({
                        wArray: JSON.stringify(wArray),
                        w1: P - getDelta(0),
                        w2: P - getDelta(1),
                        iteration,
                    }, null, 2)
                }
            }
        }
        // getting deltas
        let delta = getDelta(iteration % dots.length)
        wArray = wArray.map((w, i) => w + delta * dots[iteration % dots.length][i] * learningSpeed)
        console.log(wArray)
    }
    clearTimeout(timeOut)
    return 'iteration >= iterationsNumber'
}

// const learningSpeeds = [0.001, 0.01, 0.05, 0.1, 0.2, 0.3]
// const iterationsNumber = [100, 200, 500, 1000]
// const timeDeadline = [0.5, 1, 2, 5].map(el => el * second)
// const dots = [[0, 6], [1, 5], [3, 3], [2, 4]]
// const P = 4

// console.log(
//     perceptronModel({
//         P: 4,
//         dots: [[1, 5], [2, 4]],
//         learningSpeed: 0.1,
//         timeDeadline: 0,
//         //iterationsNumber: 7
//     })//.wArray[0] === -1.1362560000000017
// )