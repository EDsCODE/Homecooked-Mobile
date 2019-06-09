export function normalize(data, key) {
    let dict = {};
    data.forEach(datum => {
        dict[datum[key]] = datum;
    });
    return dict;
}
